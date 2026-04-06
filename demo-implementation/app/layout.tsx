import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { clerkAppearance } from '@/lib/clerk-appearance'
import './globals.css'

const pageBg = '#09090b'
const pageFg = '#f4f4f5'

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
        className="h-full bg-zinc-950"
        style={{ backgroundColor: pageBg }}
        suppressHydrationWarning
      >
        <body
          className="min-h-screen bg-zinc-950 text-zinc-100 antialiased"
          style={{ backgroundColor: pageBg, color: pageFg }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
