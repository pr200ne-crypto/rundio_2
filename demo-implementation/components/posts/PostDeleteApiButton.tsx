'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = { postId: string }

/** DELETE /api/posts/[id] — Route Handler 経由で削除 */
export function PostDeleteApiButton({ postId }: Props) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onDelete() {
    if (!confirm('この投稿を削除しますか？')) return
    setPending(true)
    setErr(null)
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErr((data as { error?: string }).error ?? '削除に失敗しました')
        return
      }
      router.refresh()
    } catch {
      setErr('通信エラー')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-1 text-xs text-red-200 disabled:opacity-50"
      >
        {pending ? '削除中…' : '削除（API）'}
      </button>
      {err ? <span className="text-xs text-red-400">{err}</span> : null}
    </div>
  )
}
