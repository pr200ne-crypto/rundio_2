import Link from 'next/link'
import { LandingGoogleSignInButton } from '@/components/landing/LandingGoogleSignInButton'
import { StartCta } from '@/components/StartCta'

export function LandingFinalCta() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--lp-dusk-deep)_55%,var(--bg))] via-[color-mix(in_srgb,var(--lp-dusk-indigo)_12%,var(--bg))] to-[color-mix(in_srgb,var(--lp-dawn-rose)_08%,var(--bg))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-gradient-to-t from-[color-mix(in_srgb,var(--lp-dawn-gold)_15%,transparent)] to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--fg)] md:text-4xl">
          空の色が変わる前に、一歩だけ
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
          朝でも夜でも、走り出す前の数分が番組のはじまり。アカウントをつくるか、まずデモだけでもどうぞ。
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <StartCta />
          <Link
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-[var(--fg)] backdrop-blur-sm transition hover:border-[color-mix(in_srgb,var(--lp-dusk-lavender)_45%,transparent)] hover:bg-white/[0.07]"
          >
            デモを見る
          </Link>
          <LandingGoogleSignInButton />
        </div>
      </div>
    </section>
  )
}
