'use client'

import { useState } from 'react'

/** GET /api/posts のレスポンスを UI で確認（講義・検証用） */
export function PostsApiInspector() {
  const [loading, setLoading] = useState(false)
  const [json, setJson] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function run() {
    setLoading(true)
    setErr(null)
    setJson(null)
    try {
      const res = await fetch('/api/posts')
      const text = await res.text()
      if (!res.ok) {
        setErr(`${res.status} ${text}`)
        return
      }
      try {
        const parsed = JSON.parse(text)
        setJson(JSON.stringify(parsed, null, 2))
      } catch {
        setJson(text)
      }
    } catch {
      setErr('fetch に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-zinc-600 bg-zinc-950/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-300">REST API 検証</h3>
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className="rounded-lg bg-zinc-700 px-3 py-1 text-xs text-zinc-100 disabled:opacity-50"
        >
          {loading ? 'GET 実行中…' : 'GET /api/posts'}
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Next.js Route Handler（Node ランタイム）。認証 Cookie が自動で付与されます。
      </p>
      {err ? <pre className="mt-3 overflow-x-auto text-xs text-red-400">{err}</pre> : null}
      {json ? (
        <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-300">
          {json}
        </pre>
      ) : null}
    </div>
  )
}
