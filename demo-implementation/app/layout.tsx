import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { clerkAppearance } from '@/lib/clerk-appearance'
import './globals.css'

/** globals.css の :root --bg / --fg と同一に保つ */
const pageBg = '#0a0f1a'
const pageFg = '#f1f5f9'

/** ビルド時に Clerk キー未設定でも prerender を避ける */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'RUNdio — 走りに寄り添うあなただけのラジオ',
  description: 'RUNdio（社内デモ）— ラン × レディオ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html
        lang="ja"
        className="h-full"
        style={{ backgroundColor: pageBg }}
        suppressHydrationWarning
      >
        <body
          className="min-h-screen antialiased"
          style={{ backgroundColor: pageBg, color: pageFg }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
