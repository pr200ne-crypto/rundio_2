/**
 * LP 右カラム装飾。SVG はインラインで描画（public 参照の失敗・文字化け SVG を避ける）
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="w-full max-w-[22rem] opacity-95 drop-shadow-[0_0_40px_rgba(34,211,238,0.12)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 320"
          fill="none"
          className="h-auto w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="lp-ill-bg" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="lp-ill-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="lp-ill-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="160" ry="120" fill="url(#lp-ill-bg)" />
          <path
            stroke="url(#lp-ill-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
            d="M48 168h56M32 188h72M56 208h48"
          />
          <path fill="#78716c" d="M188 214l-28 52-18-10 32-48z" />
          <ellipse
            cx="210"
            cy="168"
            rx="36"
            ry="44"
            fill="url(#lp-ill-body)"
            transform="rotate(-12 210 168)"
          />
          <path fill="#57534e" d="M228 198l52 36-12 16-56-40z" />
          <path fill="#fb923c" d="M232 148l48-8 4 20-52 4z" />
          <path fill="#fdba74" d="M168 156l-40 28 12 16 36-28z" />
          <circle cx="248" cy="112" r="28" fill="#fecdd3" />
          <path
            stroke="url(#lp-ill-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            d="M226 108c0-18 14-32 32-32s32 14 32 32"
          />
          <rect x="218" y="96" width="14" height="28" rx="4" fill="#22d3ee" opacity="0.9" />
          <rect x="276" y="96" width="14" height="28" rx="4" fill="#22d3ee" opacity="0.9" />
        </svg>
      </div>
    </div>
  )
}
