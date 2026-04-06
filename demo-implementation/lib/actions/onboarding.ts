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
  const course_vibes = String(formData.get('course_vibes') ?? '').trim()

  const { error } = await supabase.from('runner_profiles').upsert(
    {
      user_id: userRow.id,
      likes_notes: likes_notes || null,
      run_purpose: run_purpose || null,
      course_vibes: course_vibes || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) throw error

  revalidatePath('/home')
  redirect('/run/new')
}
