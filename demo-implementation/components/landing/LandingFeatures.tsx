import { Headphones, MapPin, Radio, Sparkles } from 'lucide-react'

const items = [
  {
    icon: Radio,
    title: '走る前から、番組は始まっている',
    body: '今日の気分や距離を選ぶだけで、AI がトークの流れとトーンを組み立てます。スタートラインに立つ前から、自分向けの空気感がそこにあります。',
    tagline: 'セッション前のひと呼吸',
  },
  {
    icon: Sparkles,
    title: '好みも、ペースも、ひとつに',
    body: '目的や好物、よく走る距離や時間、コースのイメージまで。選んだ要素が放送の「らしさ」に溶け込み、毎回ちがう一本のラジオになります。',
    tagline: 'パーソナライズされた物語',
  },
  {
    icon: Headphones,
    title: '耳だけが、世界を広げる',
    body: '画面に縛られず、足元のリズムに集中できる。イヤホン越しに届く実況が、いつものコースを少し特別な時間に変えます。',
    tagline: '没入する音声体験',
  },
  {
    icon: MapPin,
    title: '場所の温度まで、声にのせて',
    body: '走る場所やコースのイメージを反映し、まるでそばで語りかけられるようなトーンを目指します。街路も河川敷も、あなたのステージです。',
    tagline: 'ルートがパーソナリティになる',
  },
] as const

export function LandingFeatures() {
  return (
    <section className="border-b border-white/[0.06] bg-[color-mix(in_srgb,var(--bg)_92%,var(--lp-navy-veil))] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--fg)] md:text-4xl">
            RUNdio がつくる、
            <span className="bg-gradient-to-r from-[var(--lp-dusk-lavender)] to-[var(--lp-dawn-apricot)] bg-clip-text text-transparent">
              {' '}
              走る時間に寄り添う体験
            </span>
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            記録アプリの延長ではなく、走る直前の気分まで拾い上げる体験を目指しています。
          </p>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {items.map(({ icon: Icon, title, body, tagline }) => (
            <li
              key={title}
              className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition hover:border-[color-mix(in_srgb,var(--lp-dusk-indigo)_35%,transparent)]"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--lp-dawn-peach)_12%,transparent)] to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--lp-dusk-lavender)]">
                {tagline}
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--lp-navy-veil)_40%,transparent)] text-[var(--lp-dawn-apricot)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--fg)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
