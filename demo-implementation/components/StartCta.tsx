'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export function StartCta() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-300"
        >
          はじめる
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          href="/home"
          className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-medium text-zinc-950 transition hover:bg-cyan-300"
        >
          はじめる
        </Link>
      </SignedIn>
    </>
  )
}
