import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { fetchPostById } from '@/lib/data/posts'
import { ensureSupabaseUser } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

type Ctx = { params: Promise<{ id: string }> }

/**
 * GET /api/posts/[id] — 1件
 * PATCH /api/posts/[id] — 更新 JSON: { title, body? }（本人のみ）
 * DELETE /api/posts/[id] — 削除（本人のみ）
 */
export async function GET(_request: Request, { params }: Ctx) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const synced = await ensureSupabaseUser()
  if (!synced) {
    return NextResponse.json({ error: 'ユーザー情報を取得できません' }, { status: 401 })
  }

  const { id } = await params
  const post = await fetchPostById(id)
  if (!post) {
    return NextResponse.json({ error: '見つかりません' }, { status: 404 })
  }

  return NextResponse.json({ post })
}

export async function PATCH(request: Request, { params }: Ctx) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const synced = await ensureSupabaseUser()
  if (!synced) {
    return NextResponse.json({ error: 'ユーザー情報を取得できません' }, { status: 401 })
  }

  const { id } = await params
  const existing = await fetchPostById(id)
  if (!existing) {
    return NextResponse.json({ error: '見つかりません' }, { status: 404 })
  }
  if (existing.users?.clerk_user_id !== userId) {
    return NextResponse.json({ error: '権限がありません' }, { status: 403 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON が不正です' }, { status: 400 })
  }

  const body = json as { title?: string; body?: string }
  const title = String(body.title ?? '').trim()
  const text = String(body.body ?? '').trim()
  if (!title) {
    return NextResponse.json({ error: 'title は必須です' }, { status: 400 })
  }

  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('posts')
    .update({
      title,
      body: text,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, title, body, created_at, updated_at, user_id')
    .single()

  if (error) {
    console.error('PATCH /api/posts', error)
    return NextResponse.json({ error: '更新に失敗しました' }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  await ensureSupabaseUser()

  const { id } = await params
  const existing = await fetchPostById(id)
  if (!existing) {
    return NextResponse.json({ error: '見つかりません' }, { status: 404 })
  }
  if (existing.users?.clerk_user_id !== userId) {
    return NextResponse.json({ error: '権限がありません' }, { status: 403 })
  }

  const supabase = createServiceRoleClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) {
    console.error('DELETE /api/posts', error)
    return NextResponse.json({ error: '削除に失敗しました' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
