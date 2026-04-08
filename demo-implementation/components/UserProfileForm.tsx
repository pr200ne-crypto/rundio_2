'use client'

import type { CSSProperties } from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { useActionState } from 'react'
import {
  COURSE_PRESETS,
  DISTANCE_OPTION_LABELS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTION_LABELS,
  DURATION_OPTIONS_MIN,
  LIKES_OPTIONS,
  PURPOSE_OPTIONS,
  resolveCoursePresetId,
} from '@/lib/onboarding-options'
import {
  updateRunnerProfile,
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

export type RunnerProfileRow = {
  likes_notes: string | null
  run_purpose: string | null
  run_distance_km: number | null
  run_duration_min: number | null
  course_lat: number | null
  course_lng: number | null
  course_label: string | null
}

function distanceFormValue(km: number | null): string {
  if (km == null || !Number.isFinite(Number(km))) return ''
  const n = Number(km)
  const m = DISTANCE_OPTIONS_KM.find((d) => Math.abs(d - n) < 1e-4)
  return m != null ? String(m) : ''
}

function durationFormValue(min: number | null): string {
  if (min == null || !Number.isFinite(min)) return ''
  for (const m of DURATION_OPTIONS_MIN) {
    if (m === min) return String(m)
  }
  return ''
}

export function UserProfileForm({ profile }: { profile: RunnerProfileRow }) {
  const [state, formAction, pending] = useActionState(
    updateRunnerProfile,
    initialState
  )

  const defaultCourse = resolveCoursePresetId(
    profile.course_lat,
    profile.course_lng,
    profile.course_label
  )

  return (
    <div className="flex flex-col gap-8">
      {state.error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100"
        >
          {state.error}
        </div>
      ) : null}
      {state.saved && !state.error ? (
        <div
          role="status"
          className="rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-3 text-sm text-cyan-100"
        >
          保存しました。
        </div>
      ) : null}

      <p className="text-xs text-zinc-500">
        各項目は一覧から選ぶだけです（自由記述・数値の直接入力はありません）。
      </p>

      <form action={formAction} className="mt-2 flex flex-col gap-8">
        <fieldset className="min-w-0 space-y-2 border-0 p-0">
          <legend className="text-xs font-medium text-zinc-400">好み・好物</legend>
          <select
            name="likes_notes"
            required
            defaultValue={profile.likes_notes ?? ''}
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
          <legend className="text-xs font-medium text-zinc-400">走る目的・気分</legend>
          <select
            name="run_purpose"
            required
            defaultValue={profile.run_purpose ?? ''}
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
          <legend className="text-xs font-medium text-zinc-400">よく走る距離</legend>
          <select
            name="run_distance_km"
            required
            defaultValue={distanceFormValue(profile.run_distance_km)}
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
          <legend className="text-xs font-medium text-zinc-400">よく走る時間</legend>
          <select
            name="run_duration_min"
            required
            defaultValue={durationFormValue(profile.run_duration_min)}
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
          <p className="text-xs text-zinc-500">東京近郊の代表的なスポットから選びます。</p>
          <select
            name="course_preset"
            required
            defaultValue={defaultCourse || ''}
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
          className="rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-60"
        >
          {pending ? '保存中…' : '保存する'}
        </button>
      </form>

      <div className="border-t border-zinc-800 pt-8">
        <p className="text-xs font-medium text-zinc-400">アカウント</p>
        <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
          <button
            type="button"
            className="mt-3 w-full rounded-xl border border-zinc-600 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-900"
          >
            ログアウト
          </button>
        </SignOutButton>
        <p className="mt-2 text-xs text-zinc-500">サインアウト後はトップ（LP）へ移動します。</p>
      </div>
    </div>
  )
}
