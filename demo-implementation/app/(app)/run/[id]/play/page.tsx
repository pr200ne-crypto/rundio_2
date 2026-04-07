import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

type Props = { params: Promise<{ id: string }> }

export default async function PlayPage({ params }: Props) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params
  const supabase = createServiceRoleClient()

  const { data: job, error: jobErr } = await supabase
    .from('broadcast_jobs')
    .select('id,user_id,status,audio_storage_path,target_duration_min,target_distance_km')
    .eq('id', id)
    .maybeSingle()

  if (jobErr || !job) notFound()

  const { data: owner } = await supabase
    .from('users')
    .select('clerk_user_id')
    .eq('id', job.user_id)
    .single()

  if (!owner || owner.clerk_user_id !== userId) notFound()

  const src = job.audio_storage_path ?? '/demo-audio/demo.mp3'

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">再生</h1>
      <p className="mt-2 text-sm text-zinc-400">
        {job.target_duration_min != null && (
          <>目標時間の目安: {job.target_duration_min} 分</>
        )}
        {job.target_distance_km != null && (
          <>
            {job.target_duration_min != null && ' · '}
            距離: {Number(job.target_distance_km)} km
          </>
        )}
      </p>
      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <audio controls className="w-full" src={src}>
          <track kind="captions" />
        </audio>
      </div>
      <Link
        href="/run/new"
        className="mt-10 block rounded-xl border border-zinc-600 py-3 text-center text-sm text-zinc-200"
      >
        もう一回つくる
      </Link>
      <Link href="/home" className="mt-4 block text-center text-sm text-zinc-500">
        ホームへ
      </Link>
    </div>
  )
}
