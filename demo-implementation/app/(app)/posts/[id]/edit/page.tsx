import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { updatePost } from '@/lib/actions/posts'
import { fetchPostById } from '@/lib/data/posts'

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params
  const post = await fetchPostById(id)
  if (!post) notFound()

  if (post.users?.clerk_user_id !== userId) {
    redirect('/posts')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-50">投稿を編集</h1>
      <form action={updatePost} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="id" value={post.id} />
        <label className="block">
          <span className="text-xs text-zinc-500">タイトル</span>
          <input
            name="title"
            required
            defaultValue={post.title}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">本文</span>
          <textarea
            name="body"
            rows={6}
            defaultValue={post.body}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950"
          >
            保存
          </button>
          <Link
            href="/posts"
            className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-300"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  )
}
