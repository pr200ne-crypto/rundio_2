'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export function StartCta() {
  const { isSignedIn } = useAuth()
  return (
    <Link
      href={isSignedIn ? '/home' : '/sign-in'}
      className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-300"
    >
      はじめる
    </Link>
  )
}
