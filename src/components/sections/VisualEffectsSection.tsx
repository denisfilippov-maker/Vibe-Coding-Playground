'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import type { AccentColor } from '@/types'

const COLOR_SHIFT_CARDS: {
  title: string
  desc: string
  accent: AccentColor
  bg: string
  glow: string
}[] = [
  {
    title: 'Cyan Card',
    desc: 'Наведи для эффекта',
    accent: 'cyan',
    bg: 'rgba(0,245,255,0.08)',
    glow: '0 0 30px rgba(0,245,255,0.4)',
  },
  {
    title: 'Violet Card',
    desc: 'Наведи для эффекта',
    accent: 'violet',
    bg: 'rgba(157,78,221,0.08)',
    glow: '0 0 30px rgba(157,78,221,0.4)',
  },
  {
    title: 'Green Card',
    desc: 'Наведи для эффекта',
    accent: 'green',
    bg: 'rgba(57,255,20,0.08)',
    glow: '0 0 30px rgba(57,255,20,0.4)',
  },
  {
    title: 'Pink Card',
    desc: 'Наведи для эффекта',
    accent: 'pink',
    bg: 'rgba(255,0,110,0.08)',
    glow: '0 0 30px rgba(255,0,110,0.4)',
  },
]

const glassCards: { color: AccentColor; label: string; emoji: string }[] = [
  { color: 'cyan', label: 'Cyan Glass', emoji: '💠' },
  { color: 'violet', label: 'Violet Glass', emoji: '🔮' },
  { color: 'green', label: 'Green Glass', emoji: '💚' },
  { color: 'pink', label: 'Pink Glass', emoji: '🌸' },
]

const neonTexts: { text: string; color: string }[] = [
  { text: 'NEON', color: 'var(--accent-cyan)' },
  { text: 'GLOW', color: 'var(--accent-violet)' },
  { text: 'VIBE', color: 'var(--accent-green)' },
  { text: 'CODE', color: 'var(--accent-pink)' },
]

export function VisualEffectsSection() {
  return (
    <SectionWrapper id="visual-effects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <SectionLabel number="04" label="Visual Effects" />
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)] mt-3 mb-3">
          Визуальные техники{' '}
          <GradientText animate>2025</GradientText>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Glassmorphism, neon glow, aurora, gradient mesh и другие эффекты.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="space-y-8"
      >
        {/* Glassmorphism cards */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-sm font-mono text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Glassmorphism
          </h3>
          <div className="relative rounded-3xl overflow-hidden p-6"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(157,78,221,0.3) 0%, rgba(0,245,255,0.15) 50%, rgba(255,0,110,0.1) 100%)',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {glassCards.map((card) => (
                <GlassCard key={card.color} glowColor={card.color} hoverable className="text-center">
                  <div className="text-3xl mb-2">{card.emoji}</div>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">{card.label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Neon glow */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-sm font-mono text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Neon Glow
          </h3>
          <div className="flex flex-wrap gap-6 justify-center py-8 glass rounded-3xl">
            {neonTexts.map(({ text, color }) => (
              <motion.span
                key={text}
                className="font-display font-black text-6xl sm:text-8xl cursor-default select-none"
                style={{ color }}
                whileHover={{
                  textShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
                  scale: 1.05,
                }}
                transition={{ duration: 0.2 }}
              >
                {text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Aurora effect */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-sm font-mono text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Aurora Effect
          </h3>
          <div className="relative rounded-3xl overflow-hidden h-40 flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(45deg, #9d4edd44, #00f5ff44, #39ff1444)',
                  'linear-gradient(135deg, #00f5ff44, #ff006e44, #9d4edd44)',
                  'linear-gradient(225deg, #39ff1444, #9d4edd44, #00f5ff44)',
                  'linear-gradient(315deg, #ff006e44, #39ff1444, #00f5ff44)',
                  'linear-gradient(45deg, #9d4edd44, #00f5ff44, #39ff1444)',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 backdrop-blur-sm" />
            <p className="relative font-display font-black text-2xl text-white/80 z-10">
              Aurora Borealis
            </p>
          </div>
        </motion.div>

        {/* Gradient mesh */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-sm font-mono text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Gradient Mesh + Noise
          </h3>
          <div className="relative rounded-3xl overflow-hidden h-40 flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'radial-gradient(ellipse at 25% 50%, #9d4edd 0%, transparent 50%), radial-gradient(ellipse at 75% 50%, #00f5ff 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, #ff006e 0%, transparent 50%)',
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
            <p className="relative font-display font-black text-2xl text-white/80 z-10 mix-blend-overlay">
              Mesh + Grain
            </p>
          </div>
        </motion.div>

        {/* Hover color shift */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-sm font-mono text-[var(--text-muted)] mb-4 uppercase tracking-wider">
            Hover Color Shift
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COLOR_SHIFT_CARDS.map((card) => (
              <HoverColorCard key={card.accent} card={card} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

function HoverColorCard({ card }: { card: typeof COLOR_SHIFT_CARDS[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: hovered ? card.bg : 'rgba(255,255,255,0.03)',
        boxShadow: hovered ? card.glow : '0 0 0px transparent',
        y: hovered ? -6 : 0,
        borderColor: hovered
          ? `var(--accent-${card.accent})`
          : 'rgba(255,255,255,0.08)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-2xl p-5 border cursor-default select-none"
    >
      <motion.div
        animate={{ color: hovered ? `var(--accent-${card.accent})` : 'var(--text-muted)' }}
        transition={{ duration: 0.25 }}
        className="text-2xl mb-3 font-bold font-mono"
      >
        {card.accent.toUpperCase().slice(0, 2)}
      </motion.div>
      <p className="text-sm font-display font-semibold text-[var(--text-primary)]">
        {card.title}
      </p>
      <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
        {hovered ? '← активен' : card.desc}
      </p>
    </motion.div>
  )
}
