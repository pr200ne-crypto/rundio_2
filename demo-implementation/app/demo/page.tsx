import Link from 'next/link'
import {
  COURSE_PRESETS,
  DISTANCE_OPTION_LABELS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTION_LABELS,
  DURATION_OPTIONS_MIN,
  LIKES_OPTIONS,
  PURPOSE_OPTIONS,
} from '@/lib/onboarding-options'
import { RundioLogoOptionA } from '@/components/RundioLogoOptionA'

const embedSelectClass =
  'mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 opacity-90'

/**
 * LP の iframe 内で表示するミニUI。
 * オンボーディング（OnboardingForm）と同じ項目順・ラベル（操作は無効・見本）。
 */
export default function DemoEmbedPage() {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      <div className="border-b border-zinc-800 px-4 py-3">
        <RundioLogoOptionA variant="embed" />
        <p className="mt-2 text-sm text-zinc-400">プロフィール（デモ表示）</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <label className="text-xs text-zinc-500">好み・好物</label>
          <select
            className={embedSelectClass}
            disabled
            aria-hidden
            defaultValue={LIKES_OPTIONS[2]?.value ?? ''}
          >
            {LIKES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-500">走る目的・気分</label>
          <select
            className={embedSelectClass}
            disabled
            aria-hidden
            defaultValue={PURPOSE_OPTIONS[0]?.value ?? ''}
          >
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-500">よく走る距離</label>
          <select className={embedSelectClass} disabled aria-hidden defaultValue="5">
            {DISTANCE_OPTIONS_KM.map((km) => {
              const key = String(km)
              return (
                <option key={key} value={key}>
                  {DISTANCE_OPTION_LABELS[key] ?? `${km} km`}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-500">よく走る時間</label>
          <select className={embedSelectClass} disabled aria-hidden defaultValue="30">
            {DURATION_OPTIONS_MIN.map((min) => (
              <option key={min} value={String(min)}>
                {DURATION_OPTION_LABELS[min] ?? `${min} 分`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-zinc-500">コースの目安（プリセット地点）</label>
          <select
            className={embedSelectClass}
            disabled
            aria-hidden
            defaultValue={COURSE_PRESETS[0]?.id ?? ''}
          >
            {COURSE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="mt-auto w-full rounded-xl bg-cyan-500 py-4 text-center text-sm font-semibold text-zinc-950 opacity-90"
          disabled
        >
          放送を生成
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
