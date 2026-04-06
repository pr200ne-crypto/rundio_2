import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'

/** ビルド時に Clerk キー未設定でも prerender を避ける */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'RUNdio — 走るほど、あなたのラジオ',
  description: 'RUNdio（社内デモ）— ラン × レディオ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className="min-h-screen antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
