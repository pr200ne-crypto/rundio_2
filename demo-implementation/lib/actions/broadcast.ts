'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'
import { DISTANCE_OPTIONS_KM, DURATION_OPTIONS_MIN } from '@/lib/onboarding-options'
import {
  DEMO_AUDIO_PUBLIC_PATH,
  estimateDurationMinutesFromDistance,
} from '@/lib/running/constants'

const DURATION_SET = new Set<number>([...DURATION_OPTIONS_MIN])

function isAllowedSessionDistance(km: number): boolean {
  return DISTANCE_OPTIONS_KM.some((d) => Math.abs(d - km) < 1e-6)
}

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
    const km = parseFloat(String(formData.get('distance_km') ?? ''))
    if (!Number.isFinite(km) || !isAllowedSessionDistance(km)) {
      throw new Error('距離の選択が正しくありません')
    }
    target_distance_km = km
    target_duration_min = estimateDurationMinutesFromDistance(km)
  } else {
    const duration = parseInt(String(formData.get('duration_min') ?? ''), 10)
    if (!Number.isFinite(duration) || !DURATION_SET.has(duration)) {
      throw new Error('時間の選択が正しくありません')
    }
    target_duration_min = duration
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
