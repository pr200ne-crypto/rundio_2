import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '600', '700'],
  display: 'swap',
})

type Variant = 'hero' | 'compact' | 'embed'

/**
 * ブランド案A：朝焼け・疾走のストリーク・爽快感（記号は CSS のみ、SVG 不使用）
 */
export function RundioLogoOptionA({ variant = 'hero' }: { variant?: Variant }) {
  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-baseline ${outfit.className}`}>
        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-sm font-bold tracking-[0.12em] text-transparent">
          RUN
        </span>
        <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-sm font-light italic tracking-wide text-transparent">
          dio
        </span>
      </span>
    )
  }

  if (variant === 'embed') {
    return (
      <div className={`flex items-center gap-2 ${outfit.className}`}>
        <SunriseMark className="h-9 w-20 shrink-0 scale-90" />
        <span className="inline-flex items-baseline">
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-base font-bold tracking-[0.1em] text-transparent">
            RUN
          </span>
          <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-base font-light italic tracking-wide text-transparent">
            dio
          </span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <SunriseMark className="h-[4.5rem] w-[11rem] md:h-[5rem] md:w-[12.5rem]" />
      <div
        className={`flex items-baseline justify-center text-4xl md:text-5xl lg:text-6xl ${outfit.className}`}
      >
        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text font-bold tracking-[0.14em] text-transparent">
          RUN
        </span>
        <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text font-light italic tracking-wide text-transparent">
          dio
        </span>
      </div>
    </div>
  )
}

function SunriseMark({ className = '' }: { className?: string }) {
  return (
    <div
      className={`-rotate-1 select-none rounded-2xl ${className}`}
      aria-hidden
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/30 via-amber-400/25 to-sky-400/25 ring-1 ring-orange-400/20">
        <div className="absolute bottom-[18%] left-[14%] h-[28%] w-[28%] min-h-[1.25rem] min-w-[1.25rem] rounded-full bg-gradient-to-br from-amber-100 to-orange-400 shadow-md shadow-orange-500/35" />
        <div className="absolute bottom-[32%] left-[38%] flex flex-col gap-[0.2em]">
          <div className="h-[0.2em] min-h-[2px] w-[2.2em] min-w-[1.75rem] -rotate-12 rounded-full bg-white/85" />
          <div className="ml-[0.35em] h-[0.2em] min-h-[2px] w-[1.7em] min-w-[1.35rem] -rotate-12 rounded-full bg-white/65" />
          <div className="ml-[0.15em] h-[0.2em] min-h-[2px] w-[1.2em] min-w-[1rem] -rotate-12 rounded-full bg-white/45" />
        </div>
        <div className="absolute bottom-1 right-2 h-1 w-1 rounded-full bg-sky-200/90 shadow-[0_0_6px_rgba(125,211,252,0.8)]" />
      </div>
    </div>
  )
}
