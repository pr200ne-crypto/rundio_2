import {
  COURSE_PRESETS,
  DISTANCE_OPTIONS_KM,
  DURATION_OPTIONS_MIN,
  LIKES_OPTIONS,
  PURPOSE_OPTIONS,
} from '@/lib/onboarding-options'

const LIKES_SET = new Set(LIKES_OPTIONS.map((o) => o.value))
const PURPOSE_SET = new Set(PURPOSE_OPTIONS.map((o) => o.value))
const DURATION_SET = new Set<number>([...DURATION_OPTIONS_MIN])

function isAllowedDistance(km: number): boolean {
  return DISTANCE_OPTIONS_KM.some((d) => Math.abs(d - km) < 1e-6)
}

export type ParsedRunnerProfileForm =
  | {
      ok: true
      likes_notes: string
      run_purpose: string
      run_distance_km: number
      run_duration_min: number
      course_lat: number
      course_lng: number
      course_label: string | null
    }
  | { ok: false; error: string }

/** オンボーディング・プロフィール更新で共通のフォーム検証 */
export function parseRunnerProfileForm(formData: FormData): ParsedRunnerProfileForm {
  const likes_notes = String(formData.get('likes_notes') ?? '').trim()
  const run_purpose = String(formData.get('run_purpose') ?? '').trim()
  const presetId = String(formData.get('course_preset') ?? '').trim()

  const run_distance_km = parseFloat(String(formData.get('run_distance_km') ?? ''))
  const run_duration_min = parseInt(String(formData.get('run_duration_min') ?? ''), 10)

  if (!LIKES_SET.has(likes_notes)) {
    return { ok: false, error: '好み・好物の選択が正しくありません。' }
  }
  if (!PURPOSE_SET.has(run_purpose)) {
    return { ok: false, error: '走る目的の選択が正しくありません。' }
  }
  if (!Number.isFinite(run_distance_km) || !isAllowedDistance(run_distance_km)) {
    return { ok: false, error: '距離の選択が正しくありません。' }
  }
  if (!Number.isFinite(run_duration_min) || !DURATION_SET.has(run_duration_min)) {
    return { ok: false, error: '時間の選択が正しくありません。' }
  }

  const preset = COURSE_PRESETS.find((p) => p.id === presetId)
  if (!preset) {
    return { ok: false, error: 'コースを選んでください。' }
  }

  const course_lat = preset.lat
  const course_lng = preset.lng
  const course_label = preset.label

  if (course_lat < -90 || course_lat > 90 || course_lng < -180 || course_lng > 180) {
    return { ok: false, error: 'コース地点の座標が不正です。' }
  }

  return {
    ok: true,
    likes_notes,
    run_purpose,
    run_distance_km,
    run_duration_min,
    course_lat,
    course_lng,
    course_label: course_label || null,
  }
}
