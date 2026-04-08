'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export function StartCta() {
  const { isSignedIn } = useAuth()
  return (
    <Link
      href={isSignedIn ? '/home' : '/sign-in'}
      className="inline-flex items-center justify-center rounded-full bg-[var(--lp-cta-primary)] px-8 py-3.5 text-sm font-semibold text-[var(--lp-cta-fg)] shadow-lg shadow-[color-mix(in_srgb,var(--lp-cta-primary)_22%,transparent)] transition-[background-color,box-shadow] hover:bg-[var(--lp-cta-primary-hover)] hover:shadow-[color-mix(in_srgb,var(--lp-cta-primary-hover)_28%,transparent)] motion-reduce:transition-none"
    >
      はじめる
    </Link>
  )
}
