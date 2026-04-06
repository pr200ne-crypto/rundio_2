import { createClient } from '@supabase/supabase-js'

function decodeJwtPayload(segment: string): { role?: string } | null {
  try {
    const json = Buffer.from(segment, 'base64url').toString('utf8')
    return JSON.parse(json) as { role?: string }
  } catch {
    try {
      const json = Buffer.from(segment, 'base64').toString('utf8')
      return JSON.parse(json) as { role?: string }
    } catch {
      return null
    }
  }
}

function jwtRole(secretKey: string): string | undefined {
  const parts = secretKey.split('.')
  if (parts.length < 2) return undefined
  return decodeJwtPayload(parts[1])?.role
}

function assertServiceRoleKey(key: string) {
  if (key.includes('...')) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY に「...」が含まれています。.env.local.example をそのまま貼っていませんか？ Supabase Dashboard → Settings → API の service_role を末尾までコピーしてください。'
    )
  }
  const role = jwtRole(key)
  if (role === 'anon') {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY に anon（公開）キーが入っています。同じ画面の「service_role」用の長いシークレットをコピーし、anon と入れ替えてください。'
    )
  }
  if (role && role !== 'service_role') {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY の JWT role が "${role}" です。service_role キーが必要です（Dashboard → Settings → API）。`
    )
  }
}

function warnIfJwtRoleIsNotServiceRole(secretKey: string) {
  if (process.env.NODE_ENV !== 'development') return
  const role = jwtRole(secretKey)
  if (role && role !== 'service_role') {
    console.warn(
      `[Supabase] SUPABASE_SERVICE_ROLE_KEY の JWT role が "${role}" です。サーバー同期には通常 "service_role" のキーが必要です。anon / publishable 用キーを入れていないか確認してください。`
    )
  }
}

export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY が設定されていません')
  }
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL が設定されていません')
  }

  assertServiceRoleKey(key)
  warnIfJwtRoleIsNotServiceRole(key)

  return createClient(
    url,
    key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
