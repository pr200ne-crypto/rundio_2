import { LandingDemoSection } from '@/components/landing/LandingDemoSection'
import { LandingFeatures } from '@/components/landing/LandingFeatures'
import { LandingFinalCta } from '@/components/landing/LandingFinalCta'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { LandingHero } from '@/components/landing/LandingHero'
import {
  LandingDuoBeachBand,
  LandingWaterfrontBand,
} from '@/components/landing/LandingStoryBands'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <LandingHero />
      <LandingDuoBeachBand />
      <LandingFeatures />
      <LandingWaterfrontBand />
      <LandingDemoSection />
      <LandingFinalCta />
      <LandingFooter />
    </main>
  )
}
