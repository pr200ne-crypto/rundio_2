import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { UserProfileForm } from '@/components/UserProfileForm'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export default async function UserPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  await ensureSupabaseUser()
  const row = await getSupabaseUserByClerkId()
  if (!row) redirect('/sign-in')

  const supabase = createServiceRoleClient()
  const { data: profile } = await supabase
    .from('runner_profiles')
    .select(
      'likes_notes, run_purpose, run_distance_km, run_duration_min, course_lat, course_lng, course_label'
    )
    .eq('user_id', row.id)
    .maybeSingle()

  if (!profile) redirect('/onboarding')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">ユーザー</h1>
      <p className="mt-2 text-sm text-zinc-400">
        ランナープロフィールの確認・編集とログアウトができます。
      </p>
      <UserProfileForm profile={profile} />
    </div>
  )
}
