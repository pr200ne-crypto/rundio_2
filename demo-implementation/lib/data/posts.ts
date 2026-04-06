import { createServiceRoleClient } from '@/lib/supabase/service-role'

export type PostRow = {
  id: string
  title: string
  body: string
  created_at: string
  user_id: string
  users: {
    email: string
    clerk_user_id: string
  } | null
}

export async function fetchPostsForList(): Promise<PostRow[]> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, title, body, created_at, user_id, users!posts_user_id_fkey(email, clerk_user_id)'
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('fetchPostsForList', error)
    return []
  }
  const rows = data ?? []
  return rows.map((row) => {
    const u = row.users as
      | { email: string; clerk_user_id: string }
      | { email: string; clerk_user_id: string }[]
      | null
    const users = Array.isArray(u) ? u[0] ?? null : u
    return { ...row, users } as PostRow
  })
}

export async function fetchPostById(id: string): Promise<PostRow | null> {
  const supabase = createServiceRoleClient()
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, title, body, created_at, user_id, users!posts_user_id_fkey(email, clerk_user_id)'
    )
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  const u = data.users as
    | { email: string; clerk_user_id: string }
    | { email: string; clerk_user_id: string }[]
    | null
  const users = Array.isArray(u) ? u[0] ?? null : u
  return { ...data, users } as PostRow
}
