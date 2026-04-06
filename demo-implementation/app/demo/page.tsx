import Link from 'next/link'

/**
 * LP の iframe 内で表示するミニUI（見た目のプレースホルダー）。
 * 本番フローは /run/* 等に移行予定。
 */
export default function DemoEmbedPage() {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      <div className="border-b border-zinc-800 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">RUNdio</p>
        <p className="text-sm text-zinc-400">今日のセッション</p>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <label className="text-xs text-zinc-500">目標時間</label>
          <div className="mt-1 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-lg font-medium">
            30 分
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-500">好みメモ（例）</label>
          <p className="mt-1 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
            ゴールは銭湯。ビールも好き。
          </p>
        </div>
        <button
          type="button"
          className="mt-auto w-full rounded-xl bg-cyan-500 py-4 text-center text-sm font-semibold text-zinc-950 opacity-90"
          disabled
        >
          放送を生成（接続予定）
        </button>
        <p className="text-center text-xs text-zinc-500">
          フル画面で操作する場合は{' '}
          <Link href="/sign-in" className="text-cyan-400 underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  )
}
