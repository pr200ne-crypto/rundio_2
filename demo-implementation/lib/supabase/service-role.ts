import { createClient } from '@supabase/supabase-js'

function warnIfJwtRoleIsNotServiceRole(secretKey: string) {
  if (process.env.NODE_ENV !== 'development') return
  const parts = secretKey.split('.')
  if (parts.length < 2) return
  try {
    const json = Buffer.from(parts[1], 'base64url').toString('utf8')
    const payload = JSON.parse(json) as { role?: string }
    if (payload.role && payload.role !== 'service_role') {
      console.warn(
        `[Supabase] SUPABASE_SERVICE_ROLE_KEY の JWT role が "${payload.role}" です。サーバー同期には通常 "service_role" のキーが必要です。anon / publishable 用キーを入れていないか確認してください。`
      )
    }
  } catch {
    try {
      const json = Buffer.from(parts[1], 'base64').toString('utf8')
      const payload = JSON.parse(json) as { role?: string }
      if (payload.role && payload.role !== 'service_role') {
        console.warn(
          `[Supabase] SUPABASE_SERVICE_ROLE_KEY の JWT role が "${payload.role}" です。サーバー同期には通常 "service_role" のキーが必要です。`
        )
      }
    } catch {
      /* not a JWT */
    }
  }
}

export function createServiceRoleClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY が設定されていません')
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL が設定されていません')
  }

  warnIfJwtRoleIsNotServiceRole(process.env.SUPABASE_SERVICE_ROLE_KEY)

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
