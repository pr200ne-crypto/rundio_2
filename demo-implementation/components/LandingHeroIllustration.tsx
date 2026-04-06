import Image from 'next/image'

/**
 * LP 右カラム装飾。ユーザー提供写真 + ブランド色（RUN オレンジ / dio シアン / zinc）に寄せるオーバーレイ
 */
export function LandingHeroIllustration() {
  return (
    <div className="mx-auto flex w-full max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-zinc-700/60 bg-zinc-950 shadow-[0_0_48px_rgba(34,211,238,0.12)] ring-1 ring-cyan-500/10">
        <Image
          src="/illustrations/hero-runner.jpg"
          alt=""
          width={150}
          height={150}
          className="h-full w-full scale-[1.06] object-cover object-[52%_42%] contrast-[1.06] saturate-[0.88]"
          sizes="(max-width: 1024px) 90vw, 22rem"
          priority
          quality={90}
        />
        {/* 夕焼けをロゴの amber / sky に寄せる */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-sky-400/30 via-amber-400/15 to-orange-500/25"
          aria-hidden
        />
        {/* ページ背景（zinc-950）と馴染ませる */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-cyan-950/20"
          aria-hidden
        />
        {/* 外縁のシアン glow（ロゴの dio 側） */}
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_72px_rgba(34,211,238,0.14)]"
          aria-hidden
        />
      </div>
    </div>
  )
}
