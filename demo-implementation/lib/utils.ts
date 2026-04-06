/** クラス名を結合（Tailwind 併用用の最小実装） */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
