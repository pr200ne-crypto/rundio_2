'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { createBroadcastSession } from '@/lib/actions/broadcast'
import {
  DISTANCE_OPTION_LABELS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTION_LABELS,
  DURATION_OPTIONS_MIN,
} from '@/lib/onboarding-options'
import { DEFAULT_ASSUMED_PACE_MIN_PER_KM } from '@/lib/running/constants'

const selectClassName =
  'mt-1 w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-3 pr-10 text-sm text-zinc-100 outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600'

const selectChevronStyle: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
  backgroundSize: '1rem',
  backgroundPosition: 'right 0.75rem center',
  backgroundRepeat: 'no-repeat',
}

export function RunSessionForm() {
  const [mode, setMode] = useState<'time' | 'distance'>('time')

  return (
    <form action={createBroadcastSession} className="mt-8 flex flex-col gap-6">
      <input type="hidden" name="mode" value={mode} />
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-zinc-500">目標の種類</legend>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200">
          <input
            type="radio"
            checked={mode === 'time'}
            onChange={() => setMode('time')}
            className="accent-cyan-500"
          />
          時間
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200">
          <input
            type="radio"
            checked={mode === 'distance'}
            onChange={() => setMode('distance')}
            className="accent-cyan-500"
          />
          距離（想定ペース {DEFAULT_ASSUMED_PACE_MIN_PER_KM}:00/km で換算）
        </label>
      </fieldset>
      {mode === 'time' ? (
        <label className="block">
          <span className="text-xs text-zinc-500">目標時間</span>
          <select
            name="duration_min"
            required
            defaultValue="30"
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="目標時間を選択"
          >
            {DURATION_OPTIONS_MIN.map((min) => (
              <option key={min} value={String(min)}>
                {DURATION_OPTION_LABELS[min] ?? `${min} 分`}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <label className="block">
          <span className="text-xs text-zinc-500">目標距離</span>
          <select
            name="distance_km"
            required
            defaultValue="5"
            className={selectClassName}
            style={selectChevronStyle}
            aria-label="目標距離を選択"
          >
            {DISTANCE_OPTIONS_KM.map((km) => {
              const key = String(km)
              return (
                <option key={key} value={key}>
                  {DISTANCE_OPTION_LABELS[key] ?? `${km} km`}
                </option>
              )
            })}
          </select>
        </label>
      )}
      <button
        type="submit"
        className="rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-zinc-950"
      >
        放送を準備する
      </button>
    </form>
  )
}
