'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const DEMO_WAIT_MS = 2200

/** デモ用: 短い待機演出のあと再生画面へ */
export function WaitingRedirect() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setTick((n) => n + 1), 400)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const id = params.id
    if (!id) return
    const h = window.setTimeout(() => {
      router.replace(`/run/${id}/play`)
    }, DEMO_WAIT_MS)
    return () => window.clearTimeout(h)
  }, [params.id, router])

  const dots = '.'.repeat((tick % 3) + 1)

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mx-auto mb-8 h-14 w-14 animate-pulse rounded-full bg-cyan-500/30" />
      <h1 className="text-xl font-semibold text-zinc-50">放送を準備しています{dots}</h1>
      <p className="mt-4 text-sm text-zinc-400">
        デモでは事前アップロード音声へ接続します。本番ではここで生成ジョブの進捗を表示します。
      </p>
    </div>
  )
}
