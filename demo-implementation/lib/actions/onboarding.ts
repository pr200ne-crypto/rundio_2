'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parseRunnerProfileForm } from '@/lib/profile-form'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export type OnboardingActionState = {
  error: string | null
  /** ユーザー画面のプロフィール更新成功時のみ true */
  saved?: boolean
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

async function upsertRunnerProfileForClerkUser(): Promise<
  | { ok: true; supabase: ReturnType<typeof createServiceRoleClient>; userRowId: string }
  | { ok: false; error: string }
> {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  try {
    await ensureSupabaseUser()
  } catch (e) {
    return {
      ok: false,
      error: `Supabase にユーザー情報を保存できませんでした。Vercel の SUPABASE_SERVICE_ROLE_KEY（service_role の JWT 全文）と NEXT_PUBLIC_SUPABASE_URL を確認してください。詳細: ${supabaseErrorMessage(e)}`,
    }
  }

  let supabase
  try {
    supabase = createServiceRoleClient()
  } catch (e) {
    return { ok: false, error: supabaseErrorMessage(e) }
  }

  const { data: userRow, error: userErr } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (userErr || !userRow) {
    return {
      ok: false,
      error: `ユーザー情報の取得に失敗しました。詳細: ${supabaseErrorMessage(userErr)}`,
    }
  }

  return { ok: true, supabase, userRowId: userRow.id }
}

/**
 * オンボーディング送信。本番で throw すると Digest だけになるため、
 * 検証・DB 失敗は { error } で返し画面上に表示する。
 */
export async function saveRunnerProfile(
  _prev: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const ctx = await upsertRunnerProfileForClerkUser()
  if (!ctx.ok) return { error: ctx.error }

  const parsed = parseRunnerProfileForm(formData)
  if (!parsed.ok) return { error: parsed.error }

  const { error } = await ctx.supabase.from('runner_profiles').upsert(
    {
      user_id: ctx.userRowId,
      likes_notes: parsed.likes_notes || null,
      run_purpose: parsed.run_purpose || null,
      course_vibes: null,
      run_distance_km: parsed.run_distance_km,
      run_duration_min: parsed.run_duration_min,
      course_lat: parsed.course_lat,
      course_lng: parsed.course_lng,
      course_label: parsed.course_label,
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
  revalidatePath('/user')
  redirect('/run/new')
}

/** ユーザー画面からのプロフィール更新（リダイレクトなし） */
export async function updateRunnerProfile(
  _prev: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const ctx = await upsertRunnerProfileForClerkUser()
  if (!ctx.ok) return { error: ctx.error }

  const parsed = parseRunnerProfileForm(formData)
  if (!parsed.ok) return { error: parsed.error }

  const { error } = await ctx.supabase.from('runner_profiles').upsert(
    {
      user_id: ctx.userRowId,
      likes_notes: parsed.likes_notes || null,
      run_purpose: parsed.run_purpose || null,
      course_vibes: null,
      run_distance_km: parsed.run_distance_km,
      run_duration_min: parsed.run_duration_min,
      course_lat: parsed.course_lat,
      course_lng: parsed.course_lng,
      course_label: parsed.course_label,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) {
    return {
      error: `プロフィールを保存できませんでした。詳細: ${supabaseErrorMessage(error)}`,
    }
  }

  revalidatePath('/home')
  revalidatePath('/user')
  revalidatePath('/onboarding')
  return { error: null, saved: true }
}
