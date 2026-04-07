'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { CourseMapPicker } from '@/components/CourseMapPicker'
import {
  saveRunnerProfile,
  type OnboardingActionState,
} from '@/lib/actions/onboarding'

const initialState: OnboardingActionState = { error: null }

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
      <form action={formAction} className="mt-8 flex flex-col gap-5">
        <label className="block">
          <span className="text-xs text-zinc-500">好み・好物（例: ビール、銭湯）</span>
          <textarea
            name="likes_notes"
            rows={3}
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="冷えたビール、サウナ後の電解質ドリンク…"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">走る目的・気分</span>
          <textarea
            name="run_purpose"
            rows={2}
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="ストレス発散、距離を伸ばしたい…"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">よく走る距離（km）</span>
          <input
            type="number"
            name="run_distance_km"
            min={0.5}
            max={200}
            step={0.1}
            defaultValue={5}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">よく走る時間（分）</span>
          <input
            type="number"
            name="run_duration_min"
            min={5}
            max={600}
            step={1}
            defaultValue={30}
            required
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          />
        </label>
        <CourseMapPicker />
        <label className="block">
          <span className="text-xs text-zinc-500">コース・場所メモ（任意）</span>
          <input
            type="text"
            name="course_label"
            className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            placeholder="例: 皇居外苑、多摩川河川敷…"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-4 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-60"
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
