import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { AnimationsSection } from '@/components/sections/AnimationsSection'
import { InteractivitySection } from '@/components/sections/InteractivitySection'
import { VisualEffectsSection } from '@/components/sections/VisualEffectsSection'
import { ResponsiveSection } from '@/components/sections/ResponsiveSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AnimationsSection />
      <InteractivitySection />
      <VisualEffectsSection />
      <ResponsiveSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
