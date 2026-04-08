import { LandingDemoSection } from '@/components/landing/LandingDemoSection'
import { LandingFeatures } from '@/components/landing/LandingFeatures'
import { LandingFinalCta } from '@/components/landing/LandingFinalCta'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingHero } from '@/components/landing/LandingHero'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <LandingHero />
      <LandingFeatures />
      <LandingDemoSection />
      <LandingFinalCta />
      <LandingFooter />
    </main>
  )
}
