'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

/** POST /api/posts — Route Handler 経由で新規作成 */
export function CreatePostApiForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [pending, setPending] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setErr(null)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErr((data as { error?: string }).error ?? '投稿に失敗しました')
        return
      }
      setTitle('')
      setBody('')
      router.refresh()
    } catch {
      setErr('通信エラー')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
      <label className="block">
        <span className="text-xs text-zinc-500">タイトル</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
          placeholder="REST API で投稿"
        />
      </label>
      <label className="block">
        <span className="text-xs text-zinc-500">本文</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </label>
      {err ? <p className="text-xs text-red-400">{err}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-cyan-700 bg-cyan-950/40 py-2 text-sm font-medium text-cyan-200 disabled:opacity-50"
      >
        {pending ? '送信中…' : 'POST /api/posts で投稿'}
      </button>
    </form>
  )
}
