import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
})

type Variant = 'hero' | 'compact' | 'embed'

/** ブランド案A：朝焼け〜空色のグラデのみ（記号マークなし、イタリックなし） */
export function RundioLogoOptionA({ variant = 'hero' }: { variant?: Variant }) {
  const run = (
    <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text font-bold tracking-[0.12em] text-transparent">
      RUN
    </span>
  )
  const dio = (
    <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text font-semibold tracking-[0.08em] text-transparent">
      dio
    </span>
  )

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-baseline text-sm ${outfit.className}`}>
        {run}
        {dio}
      </span>
    )
  }

  if (variant === 'embed') {
    return (
      <span className={`inline-flex items-baseline text-base ${outfit.className}`}>
        {run}
        {dio}
      </span>
    )
  }

  return (
    <div
      className={`flex items-baseline justify-center text-4xl md:text-5xl lg:text-6xl ${outfit.className}`}
    >
      <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text font-bold tracking-[0.14em] text-transparent">
        RUN
      </span>
      <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text font-semibold tracking-[0.1em] text-transparent">
        dio
      </span>
    </div>
  )
}
