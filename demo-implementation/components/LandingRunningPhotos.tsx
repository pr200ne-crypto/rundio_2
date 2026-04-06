import Image from 'next/image'

/** Unsplash（無料）— 案Aの配色に合わせたグラデオーバーレイでトーンを寄せる */
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1576678929414-aa7d35e12d75?auto=format&fit=crop&w=960&q=85',
    alt: '屋外の道路を走るランナー',
    credit: 'Andrew Tanglao',
    creditUrl: 'https://unsplash.com/@andrewtanglao?utm_source=rundio&utm_medium=referral',
  },
  {
    src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=960&q=85',
    alt: 'マラソンを走るランナーたち',
    credit: 'Quino Al',
    creditUrl: 'https://unsplash.com/@quinoal?utm_source=rundio&utm_medium=referral',
  },
] as const

const UNSPLASH_REF = 'https://unsplash.com/?utm_source=rundio&utm_medium=referral'

export function LandingRunningPhotos() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 lg:mx-0 lg:max-w-none">
      {PHOTOS.map((photo, index) => (
        <figure key={photo.src} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-orange-400/25 ring-offset-2 ring-offset-zinc-950">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover contrast-[1.05] saturate-[1.12] hue-rotate-[-8deg]"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority={index === 0}
            />
            {/* 案A: 朝焼けオレンジ〜スカイシアンへ寄せる */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-orange-500/45 via-amber-400/25 to-cyan-500/45 mix-blend-soft-light"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/55 via-transparent to-zinc-950/45"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-orange-400/10 mix-blend-overlay"
              aria-hidden
            />
          </div>
          <figcaption className="mt-2 text-center text-[11px] leading-relaxed text-zinc-500 lg:text-left">
            <a
              href={photo.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline-offset-2 hover:text-cyan-400 hover:underline"
            >
              Photo by {photo.credit}
            </a>
            {' on '}
            <a
              href={UNSPLASH_REF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline-offset-2 hover:text-cyan-400 hover:underline"
            >
              Unsplash
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
