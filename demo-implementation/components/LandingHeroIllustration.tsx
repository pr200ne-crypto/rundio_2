/**
 * LP 右カラム装飾。外部画像ファイル不要（Vercel デプロイで欠落しない）。
 * ブランド色（RUN オレンジ / dio シアン / zinc）のグラデ＋軽い SVG。
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-zinc-700/60 bg-zinc-950 shadow-[0_0_48px_rgba(34,211,238,0.12)] ring-1 ring-cyan-500/10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900"
          aria-hidden
        />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-run" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id="hero-dio" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path
            d="M48 280 Q120 200 200 220 T352 140"
            stroke="url(#hero-run)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M72 320 Q180 260 260 180 T340 96"
            stroke="url(#hero-dio)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="200" cy="200" r="28" fill="url(#hero-dio)" opacity="0.35" />
          <circle cx="200" cy="200" r="12" fill="url(#hero-run)" opacity="0.9" />
        </svg>
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-sky-400/30 via-amber-400/15 to-orange-500/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-cyan-950/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_72px_rgba(34,211,238,0.14)]"
          aria-hidden
        />
      </div>
    </div>
  )
}
