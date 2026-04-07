'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useActionState } from 'react'
import {
  COURSE_PRESETS,
  DISTANCE_OPTION_LABELS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTION_LABELS,
  DURATION_OPTIONS_MIN,
  LIKES_OPTIONS,
  PURPOSE_OPTIONS,
} from '@/lib/onboarding-options'
import {
  saveRunnerProfile,
  type OnboardingActionState,
} from '@/lib/actions/onboarding'

const initialState: OnboardingActionState = { error: null }

const selectClassName =
  'mt-1 w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-3 pr-10 text-sm text-zinc-100 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600'

const selectChevronStyle: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
  backgroundSize: '1rem',
  backgroundPosition: 'right 0.75rem center',
  backgroundRepeat: 'no-repeat',
}

export function OnboardingForm() {
  const [state, formAction, pending] = useActionState(
    saveRunnerProfile,
    initialState
  )

  return (
    <>
      {state.error ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100"
        >
          {state.error}
        </div>
      ) : null}
      <p className="mt-2 text-xs text-zinc-500">
        各項目は一覧から選ぶだけです（自由記述・数値の直接入力はありません）。
      </p>
      <form action={formAction} className="mt-6 flex flex-col gap-8">
        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">
            好み・好物
          </legend>
          <select
            name="likes_notes"
            required
            defaultValue=""
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="好み・好物を選択"
          >
            <option value="" disabled>
              選んでください
            </option>
            {LIKES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">
            走る目的・気分
          </legend>
          <select
            name="run_purpose"
            required
            defaultValue=""
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="走る目的・気分を選択"
          >
            <option value="" disabled>
              選んでください
            </option>
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">
            よく走る距離
          </legend>
          <select
            name="run_distance_km"
            required
            defaultValue=""
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="よく走る距離を選択"
          >
            <option value="" disabled>
              選んでください
            </option>
            {DISTANCE_OPTIONS_KM.map((km) => {
              const key = String(km)
              return (
                <option key={key} value={key}>
                  {DISTANCE_OPTION_LABELS[key] ?? `${km} km`}
                </option>
              )
            })}
          </select>
        </fieldset>

        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">
            よく走る時間
          </legend>
          <select
            name="run_duration_min"
            required
            defaultValue=""
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="よく走る時間を選択"
          >
            <option value="" disabled>
              選んでください
            </option>
            {DURATION_OPTIONS_MIN.map((min) => (
              <option key={min} value={String(min)}>
                {DURATION_OPTION_LABELS[min] ?? `${min} 分`}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">
            コースの目安（プリセット地点）
          </legend>
          <p className="text-xs text-zinc-500">
            東京近郊の代表的なスポットから選びます。
          </p>
          <select
            name="course_preset"
            required
            defaultValue=""
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="コースのプリセットを選択"
          >
            <option value="" disabled>
              選んでください
            </option>
            {COURSE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-60"
        >
          {pending ? '保存中…' : '保存して次へ'}
        </button>
      </form>
      <Link href="/home" className="mt-6 block text-center text-sm text-zinc-500">
        キャンセル
      </Link>
    </>
  )
}
