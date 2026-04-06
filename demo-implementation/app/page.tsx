import { RundioLogoOptionA } from '@/components/RundioLogoOptionA'
import { StartCta } from '@/components/StartCta'

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-16 text-center">
        <div className="mb-10 flex justify-center">
          <RundioLogoOptionA variant="hero" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          走るほど、あなただけのラジオ
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          距離も時間も、好みもゴールも。AIが<strong className="text-zinc-200">走る前に</strong>
          あなたのセッションに合わせた放送を用意します。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <StartCta />
          <a
            href="#demo"
            className="rounded-full border border-zinc-600 px-8 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-400"
          >
            デモを見る
          </a>
        </div>
      </header>

      <section id="demo" className="mb-24">
        <div className="flex justify-center">
          <div className="relative rounded-[2.75rem] border-[10px] border-zinc-800 bg-zinc-900 p-3 shadow-2xl shadow-cyan-900/20">
            <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-zinc-800" />
            <iframe
              title="アプリデモ"
              src="/demo"
              className="block h-[720px] w-[360px] rounded-[2rem] bg-zinc-950 md:w-[390px]"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
