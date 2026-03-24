'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { NeonButton } from '@/components/ui/NeonButton'
import { GradientText } from '@/components/ui/GradientText'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export function FooterSection() {
  return (
    <SectionWrapper id="footer" className="relative overflow-hidden">
      {/* Background watermark text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display font-black text-[20vw] leading-none select-none whitespace-nowrap opacity-[0.03]"
          style={{ color: 'var(--text-primary)' }}
        >
          VIBE
        </span>
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col items-center text-center gap-8"
      >
        {/* Main CTA */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest">
            Хочешь научиться так же?
          </p>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-primary)] leading-tight">
            Вайбкодинг — это{' '}
            <GradientText
              from="var(--accent-cyan)"
              to="var(--accent-violet)"
              animate
            >
              реальный навык
            </GradientText>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Этот сайт создан с Claude + Cursor за один день.
            Подключайся к курсу и освой вайбкодинг с нуля.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
          <NeonButton color="cyan" variant="filled" className="text-base px-8 py-4">
            Пройти курс
          </NeonButton>
          <NeonButton color="violet" variant="outline">
            GitHub →
          </NeonButton>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
        />

        {/* Footer info */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-xs font-mono text-[var(--text-muted)]"
        >
          <span>Создано с Claude + Cursor за 1 день</span>
          <span className="text-[var(--accent-cyan)] opacity-60">
            Vibe Coding Playground
          </span>
          <span>© 2025 · MIT License</span>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
