'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { DevicePreview } from '@/components/interactive/DevicePreview'
import { fadeInUp } from '@/lib/animations'

export function ResponsiveSection() {
  return (
    <SectionWrapper id="responsive" className="bg-[var(--bg-elevated)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <SectionLabel number="05" label="Responsive" />
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)] mt-3 mb-3">
          Адаптивный дизайн
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Один макет — все устройства. Переключи и посмотри как меняется layout.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center py-10"
      >
        <DevicePreview />
      </motion.div>

      {/* Breakpoint legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3"
      >
        {[
          { bp: 'default', px: '< 640px', label: 'Mobile' },
          { bp: 'sm', px: '640px', label: 'Small' },
          { bp: 'md', px: '768px', label: 'Tablet' },
          { bp: 'lg', px: '1024px', label: 'Desktop' },
          { bp: 'xl', px: '1280px+', label: 'Wide' },
        ].map((item) => (
          <div key={item.bp} className="glass rounded-xl p-3 text-center">
            <p className="font-mono text-sm font-bold text-[var(--accent-cyan)]">{item.bp}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{item.px}</p>
            <p className="text-xs text-[var(--text-secondary)]">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
