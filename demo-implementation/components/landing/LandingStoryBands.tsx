import { LpPhotoFrame } from '@/components/landing/LpPhotoFrame'

/** ヒーロー直後：ふたりで走るビーチ */
export function LandingDuoBeachBand() {
  return (
    <section className="border-b border-white/[0.06] py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <LpPhotoFrame
          src="/images/lp-band-duo-beach.png"
          alt="朝焼けの砂浜をふたりで走るランナー"
          aspectClassName="aspect-[3/4] min-h-[280px] sm:min-h-[360px]"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--lp-dawn-apricot)]">
            リズムを分かち合う
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--fg)] md:text-3xl">
            並んで走る朝の色は、
            <span className="bg-gradient-to-r from-[var(--lp-dawn-gold)] to-[var(--lp-dusk-lavender)] bg-clip-text text-transparent">
              ひとりのときとはちがう
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            同じ海岸線でも、隣に誰かがいるだけで呼吸の幅が変わる。RUNdio
            は、その空気感ごと番組に混ぜ込みたい——仲間と話しながら走る日も、静かに没頭する日も、選べるように。
          </p>
          <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
            Photo: Pam Santos / Pexels
          </p>
        </div>
      </div>
    </section>
  )
}

/** 特徴グリッドの後・デモ前：水辺・街のラン */
export function LandingWaterfrontBand() {
  return (
    <section className="border-b border-white/[0.06] bg-[color-mix(in_srgb,var(--bg)_88%,var(--lp-navy-veil))] py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--lp-dusk-lavender)]">
            街と水辺のあいだ
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--fg)] md:text-3xl">
            コースの輪郭が、
            <span className="bg-gradient-to-r from-[var(--lp-dusk-lavender)] to-[var(--lp-dawn-apricot)] bg-clip-text text-transparent">
              トークの骨格になる
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
            河川敷の直線も、水辺のカーブも、ビル群のシルエットも、走りながら聴くラジオの「景色」になります。いつものルートを選ぶだけで、実況のトーンが少しずつ変わるイメージです。
          </p>
          <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
            Photo: Shengpengpeng Cai / Unsplash
          </p>
        </div>
        <div className="order-1 md:order-2">
          <LpPhotoFrame
            src="/images/lp-band-waterfront.png"
            alt="夕方の水辺の遊歩道を走るランナーのシルエット"
            aspectClassName="aspect-[5/4] sm:aspect-[4/3] min-h-[260px]"
            objectPositionClassName="object-cover object-[center_40%]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  )
}
