import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/OnboardingForm'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export default async function OnboardingPage() {
  await ensureSupabaseUser()
  const row = await getSupabaseUserByClerkId()
  if (!row) redirect('/sign-in')

  const supabase = createServiceRoleClient()
  const { data: profile } = await supabase
    .from('runner_profiles')
    .select('id')
    .eq('user_id', row.id)
    .maybeSingle()

  if (profile) redirect('/run/new')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">あなたのランについて</h1>
      <OnboardingForm />
    </div>
  )
}
