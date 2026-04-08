export function LandingDemoSection() {
  return (
    <section
      id="demo"
      className="relative scroll-mt-8 border-b border-white/[0.06] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--lp-dusk-deep)_18%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--lp-dawn-apricot)]">
            インタラクティブ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--fg)] md:text-4xl">
            画面の中で、プロフィールの流れをのぞいてみる
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            実際のアプリではログイン後に同じ項目を操作できます。まずはデモ UI の雰囲気だけでも触ってみてください。
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-[color-mix(in_srgb,var(--lp-dawn-rose)_22%,transparent)] via-[color-mix(in_srgb,var(--lp-dusk-violet)_15%,transparent)] to-[color-mix(in_srgb,var(--lp-dusk-indigo)_20%,transparent)] opacity-70 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[2.75rem] border-[10px] border-[color-mix(in_srgb,var(--lp-navy-veil)_85%,var(--lp-dusk-deep))] bg-[color-mix(in_srgb,var(--bg)_70%,#0f172a)] p-3 shadow-[0_24px_80px_-12px_rgba(49,46,129,0.35)] ring-1 ring-[color-mix(in_srgb,var(--lp-dusk-lavender)_25%,transparent)]">
              <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-xl bg-[color-mix(in_srgb,var(--lp-navy-veil)_90%,black)] ring-1 ring-white/10" />
              <iframe
                title="アプリデモ"
                src="/demo"
                className="relative z-0 block h-[720px] w-[360px] rounded-[2rem] bg-[#0a0f1a] md:w-[390px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
