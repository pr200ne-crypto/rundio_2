import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { fetchPostsForList } from '@/lib/data/posts'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'
import { createServiceRoleClient } from '@/lib/supabase/service-role'

/**
 * GET /api/posts — 一覧（ログイン必須）
 * POST /api/posts — 新規作成 JSON: { title, body? }
 */
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const synced = await ensureSupabaseUser()
  if (!synced) {
    return NextResponse.json({ error: 'ユーザー情報を取得できません' }, { status: 401 })
  }

  const posts = await fetchPostsForList()
  return NextResponse.json({ posts })
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const synced = await ensureSupabaseUser()
  if (!synced) {
    return NextResponse.json({ error: 'ユーザー情報を取得できません' }, { status: 401 })
  }

  const row = await getSupabaseUserByClerkId()
  if (!row) {
    return NextResponse.json({ error: 'Supabase ユーザーが見つかりません' }, { status: 500 })
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
    .insert({ user_id: row.id, title, body: text })
    .select('id, title, body, created_at, user_id')
    .single()

  if (error) {
    console.error('POST /api/posts', error)
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 })
  }

  return NextResponse.json({ post: data }, { status: 201 })
}
