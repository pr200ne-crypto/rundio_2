import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export default async function HomePage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

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
      <h1 className="text-2xl font-semibold text-zinc-50">ホーム</h1>
      <p className="mt-2 text-sm text-zinc-400">今日のセッションを始めましょう。</p>
      <Link
        href="/run/new"
        className="mt-8 block rounded-xl bg-cyan-500 py-4 text-center text-sm font-semibold text-zinc-950"
      >
        新しいランの放送をつくる
      </Link>
      <Link
        href="/posts"
        className="mt-4 block rounded-xl border border-zinc-600 py-4 text-center text-sm font-medium text-zinc-200"
      >
        投稿（CRUD デモ）
      </Link>
      <Link href="/" className="mt-6 block text-center text-sm text-zinc-500 underline">
        LP に戻る
      </Link>
    </div>
  )
}
