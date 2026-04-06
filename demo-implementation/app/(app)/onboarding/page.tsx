import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CourseMapPicker } from '@/components/CourseMapPicker'
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
          <span className="text-xs text-zinc-500">よく走る距離（km）</span>
          <input
            type="number"
            name="run_distance_km"
            min={0.5}
            max={200}
            step={0.1}
            defaultValue={5}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">よく走る時間（分）</span>
          <input
            type="number"
            name="run_duration_min"
            min={5}
            max={600}
            step={1}
            defaultValue={30}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <CourseMapPicker />
        <label className="block">
          <span className="text-xs text-zinc-500">コース・場所メモ（任意）</span>
          <input
            type="text"
            name="course_label"
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="例: 皇居外苑、多摩川河川敷…"
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
