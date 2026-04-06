/** デモ用: アップロードした固定ファイルを再生（docs 準拠） */
export const DEMO_AUDIO_PUBLIC_PATH = '/demo-audio/demo.mp3'

/**
 * 距離目標時の想定ペース（分/km）。UI では入力させない（product-requirements 準拠）。
 * 変更は定数のみ。
 */
export const DEFAULT_ASSUMED_PACE_MIN_PER_KM = 6

export function estimateDurationMinutesFromDistance(km: number): number {
  if (!Number.isFinite(km) || km <= 0) {
    throw new RangeError('距離は正の数である必要があります')
  }
  return Math.max(1, Math.round(km * DEFAULT_ASSUMED_PACE_MIN_PER_KM))
}
