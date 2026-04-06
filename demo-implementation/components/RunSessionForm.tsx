'use client'

import { useState } from 'react'
import { createBroadcastSession } from '@/lib/actions/broadcast'
import { DEFAULT_ASSUMED_PACE_MIN_PER_KM } from '@/lib/running/constants'

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
          <span className="text-xs text-zinc-500">目標時間（分）</span>
          <input
            type="number"
            name="duration_min"
            min={5}
            max={180}
            defaultValue={30}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
      ) : (
        <label className="block">
          <span className="text-xs text-zinc-500">目標距離（km）</span>
          <input
            type="number"
            name="distance_km"
            min={0.5}
            max={80}
            step={0.1}
            defaultValue={5}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
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
