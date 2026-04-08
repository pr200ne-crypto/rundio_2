import Image from 'next/image'

/**
 * LP ヒーロー右カラム。マジックアワーのランナー写真を、ネイビー基調の UI に馴染むよう
 * 角丸・リング・グラデオーバーレイでトンマナを合わせる。
 *
 * 差し替え: `public/images/lp-hero-runners.jpg`（横長 JPEG 推奨）
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <figure className="relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--lp-navy-veil)] shadow-[0_0_60px_-8px_rgba(99,102,241,0.25)] ring-1 ring-[color-mix(in_srgb,var(--lp-dusk-lavender)_22%,transparent)] lg:max-w-[28rem]">
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/11]">
          <Image
            src="/images/lp-hero-runners.jpg"
            alt="夕方の光と水面のきらめきを背景に、走る二人のシルエット"
            fill
            className="object-cover object-[center_35%] saturate-[1.05] contrast-[1.03]"
            sizes="(max-width: 1024px) 22rem, 28rem"
            priority
          />
          {/* 下辺を LP 背景ネイビーに溶かす */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_55%,transparent)] to-transparent"
            aria-hidden
          />
          {/* マジックアワー系の色気（派手にしすぎない） */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-tr from-[color-mix(in_srgb,var(--lp-dawn-apricot)_18%,transparent)] via-transparent to-[color-mix(in_srgb,var(--lp-dusk-indigo)_22%,transparent)]"
            aria-hidden
          />
          {/* 左右の軽いベネチアン */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)]/50 via-transparent to-[var(--bg)]/50 opacity-70"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(10,15,26,0.45)]"
            aria-hidden
          />
        </div>
      </figure>
    </div>
  )
}
