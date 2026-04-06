/**
 * LP 右カラム装飾（走る人＋ヘッドホン）。SVG は public/illustrations/runner-hero.svg（リポオリジナル）
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="w-full max-w-[min(100%,22rem)] opacity-95 drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]">
        <img
          src="/illustrations/runner-hero.svg"
          alt=""
          width={400}
          height={320}
          className="h-auto w-full"
          decoding="async"
          aria-hidden
        />
      </div>
    </div>
  )
}
