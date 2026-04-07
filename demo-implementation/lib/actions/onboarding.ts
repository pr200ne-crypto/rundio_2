'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export type OnboardingActionState = { error: string | null }

function supabaseErrorMessage(err: unknown): string {
  if (err == null) return '不明なエラー'
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const m = (err as { message: unknown }).message
    if (typeof m === 'string' && m.length > 0) return m
  }
  if (err instanceof Error) return err.message || '不明なエラー'
  return String(err)
}

/**
 * オンボーディング送信。本番で throw すると Digest だけになるため、
 * 検証・DB 失敗は { error } で返し画面上に表示する。
 */
export async function saveRunnerProfile(
  _prev: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  try {
    await ensureSupabaseUser()
  } catch (e) {
    return {
      error: `Supabase にユーザー情報を保存できませんでした。Vercel の SUPABASE_SERVICE_ROLE_KEY（service_role の JWT 全文）と NEXT_PUBLIC_SUPABASE_URL を確認してください。詳細: ${supabaseErrorMessage(e)}`,
    }
  }

  let supabase
  try {
    supabase = createServiceRoleClient()
  } catch (e) {
    return {
      error: supabaseErrorMessage(e),
    }
  }

  const { data: userRow, error: userErr } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (userErr || !userRow) {
    return {
      error: `ユーザー情報の取得に失敗しました。詳細: ${supabaseErrorMessage(userErr)}`,
    }
  }

  const likes_notes = String(formData.get('likes_notes') ?? '').trim()
  const run_purpose = String(formData.get('run_purpose') ?? '').trim()
  const course_label = String(formData.get('course_label') ?? '').trim()

  const run_distance_km = parseFloat(String(formData.get('run_distance_km') ?? ''))
  const run_duration_min = parseInt(String(formData.get('run_duration_min') ?? ''), 10)
  const course_lat = parseFloat(String(formData.get('course_lat') ?? ''))
  const course_lng = parseFloat(String(formData.get('course_lng') ?? ''))

  if (!Number.isFinite(run_distance_km) || run_distance_km <= 0 || run_distance_km > 200) {
    return {
      error: '走る距離（km）を正しく入力してください（0 より大きく 200 以下）。',
    }
  }
  if (!Number.isFinite(run_duration_min) || run_duration_min < 5 || run_duration_min > 600) {
    return {
      error: '走る時間（分）を正しく入力してください（5〜600）。',
    }
  }
  if (!Number.isFinite(course_lat) || !Number.isFinite(course_lng)) {
    return {
      error: '地図をタップしてコースの起点を選んでから、「保存して次へ」を押してください。',
    }
  }
  if (course_lat < -90 || course_lat > 90 || course_lng < -180 || course_lng > 180) {
    return {
      error: '地図上の位置が不正です。もう一度タップしてください。',
    }
  }

  const { error } = await supabase.from('runner_profiles').upsert(
    {
      user_id: userRow.id,
      likes_notes: likes_notes || null,
      run_purpose: run_purpose || null,
      course_vibes: null,
      run_distance_km,
      run_duration_min,
      course_lat,
      course_lng,
      course_label: course_label || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) {
    return {
      error: `プロフィールを保存できませんでした。Supabase でマイグレーション（runner_profiles の距離・地図用カラムなど）がすべて当たっているか確認してください。詳細: ${supabaseErrorMessage(error)}`,
    }
  }

  revalidatePath('/home')
  redirect('/run/new')
}
