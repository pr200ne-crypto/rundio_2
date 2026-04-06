import Link from 'next/link'
import { redirect } from 'next/navigation'
import { RunSessionForm } from '@/components/RunSessionForm'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export default async function NewRunPage() {
  await ensureSupabaseUser()
  const row = await getSupabaseUserByClerkId()
  if (!row) redirect('/sign-in')

  const supabase = createServiceRoleClient()
  const { data: profile } = await supabase
    .from('runner_profiles')
    .select('id')
    .eq('user_id', row.id)
    .maybeSingle()

  if (!profile) redirect('/onboarding')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">セッション</h1>
      <p className="mt-2 text-sm text-zinc-400">
        目標をひとつ選んでください。距離から時間はサーバー側の想定ペースで換算します（入力はしません）。
      </p>
      <RunSessionForm />
      <Link href="/home" className="mt-6 block text-center text-sm text-zinc-500">
        戻る
      </Link>
    </div>
  )
}
