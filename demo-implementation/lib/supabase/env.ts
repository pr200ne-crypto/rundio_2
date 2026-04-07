/**
 * Supabase の公開キー。ダッシュボードの「anon」または「publishable」いずれの表記でも指定可能。
 */
export function getSupabasePublishableKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY または NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください'
    )
  }
  return key
}

/** ミドルウェア（Edge）用。未設定時は null を返し、throw しない */
export function tryGetSupabasePublicConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) return null
  return { url, key }
}
