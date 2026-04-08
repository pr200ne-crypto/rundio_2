import Image from 'next/image'

type LpPhotoFrameProps = {
  src: string
  alt: string
  priority?: boolean
  /** e.g. aspect-[3/4] sm:aspect-[4/5] */
  aspectClassName?: string
  objectPositionClassName?: string
  sizes: string
}

/**
 * LP 用の写真枠。ネイビー・マジックアワー系のオーバーレイでサイトトンマナに揃える。
 */
export function LpPhotoFrame({
  src,
  alt,
  priority = false,
  aspectClassName = 'aspect-[3/4] sm:aspect-[4/5]',
  objectPositionClassName = 'object-cover object-center',
  sizes,
}: LpPhotoFrameProps) {
  return (
    <figure className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--lp-navy-veil)] shadow-[0_0_48px_-10px_rgba(99,102,241,0.3)] ring-1 ring-[color-mix(in_srgb,var(--lp-dusk-lavender)_22%,transparent)]">
      <div className={`relative w-full ${aspectClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`${objectPositionClassName} saturate-[1.04] contrast-[1.02]`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_45%,transparent)] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-tr from-[color-mix(in_srgb,var(--lp-dawn-apricot)_16%,transparent)] via-transparent to-[color-mix(in_srgb,var(--lp-dusk-indigo)_20%,transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)]/45 via-transparent to-[var(--bg)]/45 opacity-80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_72px_rgba(10,15,26,0.5)]"
          aria-hidden
        />
      </div>
    </figure>
  )
}
