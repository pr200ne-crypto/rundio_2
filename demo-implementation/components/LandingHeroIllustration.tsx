import Image from 'next/image'

/**
 * LP 右カラム装飾。ラスタ画像のみ（SVG は使わない）
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-zinc-700/60 bg-zinc-900 shadow-[0_0_48px_rgba(34,211,238,0.1)] ring-1 ring-white/5">
        <Image
          src="/illustrations/hero-runner.jpg"
          alt=""
          width={720}
          height={900}
          className="h-auto w-full object-cover object-center"
          sizes="(max-width: 1024px) 90vw, 22rem"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-950/50 via-transparent to-cyan-950/30"
          aria-hidden
        />
      </div>
    </div>
  )
}
