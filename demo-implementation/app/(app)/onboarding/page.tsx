import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'
import { saveRunnerProfile } from '@/lib/actions/onboarding'

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
      <p className="mt-2 text-sm text-zinc-400">
        放送のトーンに使います（後から変更できる想定で実装予定）。
      </p>
      <form action={saveRunnerProfile} className="mt-8 flex flex-col gap-5">
        <label className="block">
          <span className="text-xs text-zinc-500">好み・好物（例: ビール、銭湯）</span>
          <textarea
            name="likes_notes"
            rows={3}
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="冷えたビール、サウナ後の電解質ドリンク…"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">走る目的・気分</span>
          <textarea
            name="run_purpose"
            rows={2}
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="ストレス発散、距離を伸ばしたい…"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">コースのイメージ</span>
          <textarea
            name="course_vibes"
            rows={2}
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="川沿い、静かな住宅街…"
          />
        </label>
        <button
          type="submit"
          className="mt-4 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-zinc-950"
        >
          保存して次へ
        </button>
      </form>
      <Link href="/home" className="mt-6 block text-center text-sm text-zinc-500">
        キャンセル
      </Link>
    </div>
  )
}
