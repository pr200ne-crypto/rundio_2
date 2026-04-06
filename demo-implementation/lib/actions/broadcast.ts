'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'
import {
  DEMO_AUDIO_PUBLIC_PATH,
  estimateDurationMinutesFromDistance,
} from '@/lib/running/constants'

export async function createBroadcastSession(formData: FormData) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  await ensureSupabaseUser()
  const supabase = createServiceRoleClient()

  const { data: userRow, error: userErr } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (userErr || !userRow) {
    throw new Error('ユーザー情報の取得に失敗しました')
  }

  const mode = String(formData.get('mode') ?? 'time')
  let target_duration_min: number
  let target_distance_km: number | null = null

  if (mode === 'distance') {
    const km = Number(String(formData.get('distance_km') ?? '').replace(',', '.'))
    target_distance_km = km
    target_duration_min = estimateDurationMinutesFromDistance(km)
  } else {
    target_duration_min = Math.max(
      1,
      Math.round(Number(String(formData.get('duration_min') ?? '30')))
    )
  }

  const { data: job, error } = await supabase
    .from('broadcast_jobs')
    .insert({
      user_id: userRow.id,
      status: 'ready',
      target_duration_min,
      target_distance_km,
      audio_storage_path: DEMO_AUDIO_PUBLIC_PATH,
      meta: { demo: true, source: 'stub' },
    })
    .select('id')
    .single()

  if (error || !job) {
    throw new Error('セッションの作成に失敗しました')
  }

  redirect(`/run/${job.id}/waiting`)
}
