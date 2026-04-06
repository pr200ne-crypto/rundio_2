import { auth, currentUser } from '@clerk/nextjs/server'
import type { User } from '@clerk/nextjs/server'
import { createServiceRoleClient } from './service-role'

function clerkEmailForSync(user: User, userId: string): string {
  const fromPrimary = user.primaryEmailAddress?.emailAddress
  const fromList = user.emailAddresses?.[0]?.emailAddress
  if (fromPrimary) return fromPrimary
  if (fromList) return fromList
  // public.users.email は NOT NULL。メール無し（電話のみ等）の Clerk ユーザー向けフォールバック
  const safeLocal = userId.replace(/[^a-zA-Z0-9_-]/g, '_')
  return `${safeLocal}@sync.placeholder.rundio`
}

function logSupabaseError(context: string, error: unknown) {
  if (error == null) {
    console.error(context, 'error is null/undefined')
    return
  }
  if (error instanceof Error) {
    const x = error as Error & { code?: string; details?: string; hint?: string }
    const line = [
      `${x.name}: ${x.message || '(no message)'}`,
      x.code && `code=${x.code}`,
      x.details && `details=${x.details}`,
      x.hint && `hint=${x.hint}`,
    ]
      .filter(Boolean)
      .join(' | ')
    console.error(context, line || String(error))
    return
  }
  if (typeof error === 'object') {
    const o = error as Record<string, unknown>
    const keys = Object.keys(o)
    if (keys.length === 0) {
      console.error(
        context,
        '{} (empty). Often: wrong SUPABASE_SERVICE_ROLE_KEY (use service_role JWT, not anon), wrong NEXT_PUBLIC_SUPABASE_URL, or project paused. Re-copy both from Supabase → Project Settings → API.'
      )
      return
    }
    console.error(
      context,
      JSON.stringify(o, (_, v) => (v === undefined ? null : v))
    )
    return
  }
  console.error(context, String(error))
}

/**
 * Clerkのユーザー情報をSupabaseのusersテーブルに同期する関数
 * Server ActionsやServer Component、Route Handlerから呼び出す
 */
export async function ensureSupabaseUser() {
  const { userId } = await auth()
  if (!userId) return null

  const user = await currentUser()
  if (!user) return null

  const supabase = createServiceRoleClient()

  const email = clerkEmailForSync(user, userId)
  const fullName =
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || null

  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        clerk_user_id: userId,
        email,
        full_name: fullName,
      },
      { onConflict: 'clerk_user_id' }
    )
    .select()
    .single()

  if (error) {
    logSupabaseError('Error syncing user to Supabase:', error)
    throw error
  }

  return data
}

export async function getSupabaseUserByClerkId() {
  const { userId } = await auth()
  if (!userId) return null

  const supabase = createServiceRoleClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', userId)
    .maybeSingle()

  return data ?? null
}
