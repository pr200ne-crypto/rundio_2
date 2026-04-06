'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

export async function saveRunnerProfile(formData: FormData) {
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

  const likes_notes = String(formData.get('likes_notes') ?? '').trim()
  const run_purpose = String(formData.get('run_purpose') ?? '').trim()
  const course_label = String(formData.get('course_label') ?? '').trim()

  const run_distance_km = parseFloat(String(formData.get('run_distance_km') ?? ''))
  const run_duration_min = parseInt(String(formData.get('run_duration_min') ?? ''), 10)
  const course_lat = parseFloat(String(formData.get('course_lat') ?? ''))
  const course_lng = parseFloat(String(formData.get('course_lng') ?? ''))

  if (!Number.isFinite(run_distance_km) || run_distance_km <= 0 || run_distance_km > 200) {
    throw new Error('走る距離（km）を正しく入力してください（0 より大きく 200 以下）')
  }
  if (!Number.isFinite(run_duration_min) || run_duration_min < 5 || run_duration_min > 600) {
    throw new Error('走る時間（分）を正しく入力してください（5〜600）')
  }
  if (!Number.isFinite(course_lat) || !Number.isFinite(course_lng)) {
    throw new Error('地図をタップしてコースの起点を選んでください')
  }
  if (course_lat < -90 || course_lat > 90 || course_lng < -180 || course_lng > 180) {
    throw new Error('地図上の位置が不正です。もう一度タップしてください')
  }

  const { error } = await supabase.from('runner_profiles').upsert(
    {
      user_id: userRow.id,
      likes_notes: likes_notes || null,
      run_purpose: run_purpose || null,
      course_vibes: null,
      run_distance_km,
      run_duration_min,
      course_lat,
      course_lng,
      course_label: course_label || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) throw error

  revalidatePath('/home')
  redirect('/run/new')
}
