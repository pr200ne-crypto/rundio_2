'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

async function requireOwnerUserId() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  await ensureSupabaseUser()
  const row = await getSupabaseUserByClerkId()
  if (!row) redirect('/sign-in')
  return { clerkUserId: userId, internalUserId: row.id }
}

export async function createPost(formData: FormData) {
  const { internalUserId } = await requireOwnerUserId()

  const title = String(formData.get('title') ?? '').trim()
  const body = String(formData.get('body') ?? '').trim()
  if (!title) {
    throw new Error('タイトルを入力してください')
  }

  const supabase = createServiceRoleClient()
  const { error } = await supabase.from('posts').insert({
    user_id: internalUserId,
    title,
    body,
  })

  if (error) {
    console.error('createPost', error)
    throw new Error('投稿の保存に失敗しました')
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePost(formData: FormData) {
  const { internalUserId } = await requireOwnerUserId()
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('不正なリクエストです')

  const supabase = createServiceRoleClient()
  const { data: post, error: fetchErr } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', id)
    .single()

  if (fetchErr || !post || post.user_id !== internalUserId) {
    throw new Error('編集する権限がありません')
  }

  const title = String(formData.get('title') ?? '').trim()
  const body = String(formData.get('body') ?? '').trim()
  if (!title) throw new Error('タイトルを入力してください')

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    console.error('updatePost', error)
    throw new Error('更新に失敗しました')
  }

  revalidatePath('/posts')
  revalidatePath(`/posts/${id}/edit`)
  redirect('/posts')
}

export async function deletePost(formData: FormData) {
  const { internalUserId } = await requireOwnerUserId()
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('不正なリクエストです')

  const supabase = createServiceRoleClient()
  const { data: post, error: fetchErr } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', id)
    .single()

  if (fetchErr || !post || post.user_id !== internalUserId) {
    throw new Error('削除する権限がありません')
  }

  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) {
    console.error('deletePost', error)
    throw new Error('削除に失敗しました')
  }

  revalidatePath('/posts')
}
