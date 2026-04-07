'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  COURSE_PRESETS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTIONS_MIN,
  LIKES_OPTIONS,
  PURPOSE_OPTIONS,
} from '@/lib/onboarding-options'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export type OnboardingActionState = { error: string | null }

const LIKES_SET = new Set(LIKES_OPTIONS.map((o) => o.value))
const PURPOSE_SET = new Set(PURPOSE_OPTIONS.map((o) => o.value))
const DURATION_SET = new Set<number>([...DURATION_OPTIONS_MIN])

function isAllowedDistance(km: number): boolean {
  return DISTANCE_OPTIONS_KM.some((d) => Math.abs(d - km) < 1e-6)
}

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
  const presetId = String(formData.get('course_preset') ?? '').trim()

  const run_distance_km = parseFloat(String(formData.get('run_distance_km') ?? ''))
  const run_duration_min = parseInt(String(formData.get('run_duration_min') ?? ''), 10)

  if (!LIKES_SET.has(likes_notes)) {
    return {
      error: '好み・好物の選択が正しくありません。',
    }
  }
  if (!PURPOSE_SET.has(run_purpose)) {
    return {
      error: '走る目的の選択が正しくありません。',
    }
  }
  if (!Number.isFinite(run_distance_km) || !isAllowedDistance(run_distance_km)) {
    return {
      error: '距離の選択が正しくありません。',
    }
  }
  if (!Number.isFinite(run_duration_min) || !DURATION_SET.has(run_duration_min)) {
    return {
      error: '時間の選択が正しくありません。',
    }
  }

  const preset = COURSE_PRESETS.find((p) => p.id === presetId)
  if (!preset) {
    return {
      error: 'コースを選んでください。',
    }
  }

  const course_lat = preset.lat
  const course_lng = preset.lng
  const course_label = preset.label

  if (course_lat < -90 || course_lat > 90 || course_lng < -180 || course_lng > 180) {
    return {
      error: 'コース地点の座標が不正です。',
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
