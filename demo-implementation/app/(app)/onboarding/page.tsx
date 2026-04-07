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

  const deployRef =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    process.env.VERCEL_DEPLOYMENT_ID?.slice(0, 8)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">あなたのランについて</h1>
      {deployRef ? (
        <p className="mt-1 text-xs text-zinc-600">
          この画面のビルド: <span className="font-mono text-zinc-500">{deployRef}</span>
          （GitHub の該当コミットと一致すれば最新デプロイです）
        </p>
      ) : (
        <p className="mt-1 text-xs text-zinc-600">ローカル実行中（npm run dev）</p>
      )}
      <OnboardingForm />
    </div>
  )
}
