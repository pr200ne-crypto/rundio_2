import Link from 'next/link'
import { LandingGoogleSignInButton } from '@/components/landing/LandingGoogleSignInButton'
import { LandingHeroIllustration } from '@/components/LandingHeroIllustration'
import { RundioLogoOptionA } from '@/components/RundioLogoOptionA'
import { StartCta } from '@/components/StartCta'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_srgb,var(--lp-dusk-indigo)_35%,transparent),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--lp-dawn-apricot)_32%,transparent)] via-[color-mix(in_srgb,var(--lp-dawn-rose)_18%,transparent)] to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-96 w-96 rounded-full bg-gradient-to-bl from-[color-mix(in_srgb,var(--lp-dusk-lavender)_22%,transparent)] via-[color-mix(in_srgb,var(--lp-dusk-indigo)_15%,transparent)] to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-[var(--lp-navy-veil)] to-transparent opacity-90"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-20 lg:pb-32">
        <div className="mb-12 flex justify-center lg:mb-14 lg:justify-start">
          <RundioLogoOptionA variant="hero" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              ランニング × AI ラジオ
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--fg)] md:text-5xl lg:text-[3.25rem]">
              走りに寄り添う
              <br />
              <span className="bg-gradient-to-r from-[var(--lp-dawn-gold)] via-[var(--lp-dawn-apricot)] to-[var(--lp-dusk-lavender)] bg-clip-text text-transparent">
                あなただけのラジオ
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] lg:mx-0">
              距離も時間も、好みもゴールも。AI が
              <strong className="font-semibold text-[color-mix(in_srgb,var(--fg)_88%,var(--lp-dawn-apricot))]">
                走る前に
              </strong>
              セッションに合わせた放送のたたきを用意します。
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
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
          <LandingHeroIllustration />
        </div>
      </div>
    </section>
  )
}
