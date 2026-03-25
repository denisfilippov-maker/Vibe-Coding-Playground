'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { ConfettiButton } from '@/components/interactive/ConfettiButton'
import { MorphButton } from '@/components/interactive/MorphButton'
import { AnimatedSlider } from '@/components/interactive/AnimatedSlider'
import { ThemeToggle } from '@/components/interactive/ThemeToggle'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function InteractivitySection() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [clickCount, setClickCount] = useState(0)

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])
    setClickCount((c) => c + 1)
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
  }, [])

  return (
    <SectionWrapper id="interactivity" className="bg-[var(--bg-elevated)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <SectionLabel number="03" label="Interactivity" />
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)] mt-3 mb-3">
          Живые взаимодействия
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Кликай, двигай, переключай — сайт реагирует мгновенно.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Confetti */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-sm font-mono text-[var(--text-secondary)] mb-2">Canvas Confetti</p>
            <ConfettiButton />
          </GlassCard>
        </motion.div>

        {/* Morph button */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-sm font-mono text-[var(--text-secondary)] mb-2">Морфинг кнопки</p>
            <MorphButton />
          </GlassCard>
        </motion.div>

        {/* Slider */}
        <motion.div variants={fadeInUp}>
          <GlassCard>
            <p className="text-sm font-mono text-[var(--text-secondary)] mb-4">Animated Slider</p>
            <AnimatedSlider />
          </GlassCard>
        </motion.div>

        {/* Theme toggle + click counter */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="flex flex-col items-center justify-center gap-6 py-8">
            <p className="text-sm font-mono text-[var(--text-secondary)]">Theme Toggle</p>
            <ThemeToggle />
          </GlassCard>
        </motion.div>

        {/* Ripple button + animated click counter */}
        <motion.div variants={fadeInUp} className="md:col-span-2">
          <GlassCard className="flex flex-col items-center gap-6 py-8">
            <div className="flex items-center gap-3 text-sm font-mono text-[var(--text-secondary)]">
              <span>Ripple Effect · кликов:</span>
              {/* Анимированные цифры — digit flip при каждом клике */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={clickCount}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="inline-block font-bold text-[var(--accent-pink)] tabular-nums min-w-[2ch] text-center"
                >
                  {clickCount}
                </motion.span>
              </AnimatePresence>
            </div>

            <button
              onClick={handleRipple}
              className="relative overflow-hidden px-10 py-4 rounded-2xl border border-[var(--accent-pink)] text-[var(--accent-pink)] font-display font-bold text-base"
            >
              <span className="relative z-10">Ripple кнопка</span>
              <AnimatePresence>
                {ripples.map((r) => (
                  <motion.span
                    key={r.id}
                    className="absolute rounded-full bg-[var(--accent-pink)] pointer-events-none"
                    style={{ left: r.x, top: r.y, x: '-50%', y: '-50%' }}
                    initial={{ width: 0, height: 0, opacity: 0.4 }}
                    animate={{ width: 400, height: 400, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ))}
              </AnimatePresence>
            </button>
          </GlassCard>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
