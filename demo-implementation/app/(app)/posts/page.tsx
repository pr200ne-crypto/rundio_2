import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CreatePostApiForm } from '@/components/posts/CreatePostApiForm'
import { PostDeleteApiButton } from '@/components/posts/PostDeleteApiButton'
import { PostsApiInspector } from '@/components/posts/PostsApiInspector'
import { createPost } from '@/lib/actions/posts'
import { fetchPostsForList } from '@/lib/data/posts'
import { ensureSupabaseUser, getSupabaseUserByClerkId } from '@/lib/supabase/auth-helpers'

export default async function PostsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  await ensureSupabaseUser()
  const row = await getSupabaseUserByClerkId()
  if (!row) redirect('/sign-in')

  const posts = await fetchPostsForList()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">投稿</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Supabase の <code className="text-cyan-400">posts</code> に永続化。作成は{' '}
        <strong className="text-zinc-200">Server Action</strong> または{' '}
        <strong className="text-zinc-200">Next.js Route Handler（REST）</strong>
        から選択できます。削除は <code className="text-cyan-400">DELETE /api/posts/[id]</code> です。
      </p>

      <div className="mt-8">
        <PostsApiInspector />
      </div>

      <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-sm font-medium text-zinc-300">新規投稿（Server Action）</h2>
        <p className="mt-1 text-xs text-zinc-500">サーバー上で処理（従来の Server Actions）</p>
        <form action={createPost} className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="text-xs text-zinc-500">タイトル</span>
            <input
              name="title"
              required
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              placeholder="今日のランの感想"
            />
          </label>
          <label className="block">
            <span className="text-xs text-zinc-500">本文</span>
            <textarea
              name="body"
              rows={4}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              placeholder="本文を入力…"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 py-2 text-sm font-semibold text-zinc-950"
          >
            投稿する
          </button>
        </form>
      </section>

      <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-sm font-medium text-zinc-300">新規投稿（REST API）</h2>
        <p className="mt-1 text-xs text-zinc-500">
          <code className="text-cyan-400">POST /api/posts</code> — Route Handler（Node ランタイム）
        </p>
        <CreatePostApiForm />
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium text-zinc-300">一覧</h2>
        <ul className="mt-4 space-y-4">
          {posts.length === 0 ? (
            <li className="text-sm text-zinc-500">まだ投稿がありません。</li>
          ) : (
            posts.map((p) => {
              const isMine = p.users?.clerk_user_id === userId
              return (
                <li
                  key={p.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-zinc-100">{p.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {p.users?.email ?? '不明なユーザー'} ·{' '}
                        {new Date(p.created_at).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    {isMine ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/posts/${p.id}/edit`}
                          className="rounded-lg border border-zinc-600 px-3 py-1 text-xs text-zinc-200"
                        >
                          編集
                        </Link>
                        <PostDeleteApiButton postId={p.id} />
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">{p.body}</p>
                </li>
              )
            })
          )}
        </ul>
      </section>

      <Link href="/home" className="mt-10 block text-center text-sm text-zinc-500">
        ホームへ
      </Link>
    </div>
  )
}
