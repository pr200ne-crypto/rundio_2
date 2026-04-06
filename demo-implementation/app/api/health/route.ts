import { NextResponse } from 'next/server'

/** Vercel / 監視用。認証不要。 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'rundio-demo',
    time: new Date().toISOString(),
  })
}
