import { LpPhotoFrame } from '@/components/landing/LpPhotoFrame'

/**
 * LP ヒーロー右カラム。ゴールデンアワーのビーチラン写真。
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="w-full max-w-[22rem] lg:max-w-[26rem]">
        <LpPhotoFrame
          src="/images/lp-hero-golden-runner.png"
          alt="砂浜を走るランナーのシルエット。朝か夕方の金色の光"
          priority
          aspectClassName="aspect-[3/4] w-full sm:aspect-[3/4]"
          objectPositionClassName="object-cover object-[center_30%]"
          sizes="(max-width: 1024px) 22rem, 26rem"
        />
        <p className="mt-3 text-center text-[11px] text-zinc-600 lg:text-left">
          Photo: Sara Ruffoni / Unsplash
        </p>
      </div>
    </div>
  )
}
