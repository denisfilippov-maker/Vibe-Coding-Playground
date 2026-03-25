'use client'

import { useState, useCallback } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { NeonButton } from '@/components/ui/NeonButton'
import type { Target, Transition } from 'framer-motion'
import type { AccentColor } from '@/types'

const SVG_PATH = 'M 10 50 C 25 10, 50 90, 75 30 C 85 10, 95 50, 100 45'

// Каждая карточка — своя уникальная анимация
const CARDS: {
  title: string
  desc: string
  color: AccentColor
  emoji: string
  hidden: Target
  visible: Target & { transition?: Transition }
}[] = [
  {
    title: 'Fade In',
    desc: 'opacity: 0 → 1',
    color: 'cyan',
    emoji: '👁',
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  },
  {
    title: 'Slide Up',
    desc: 'translateY: 80px → 0',
    color: 'violet',
    emoji: '⬆',
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  {
    title: 'Scale',
    desc: 'scale: 0.2 → 1',
    color: 'green',
    emoji: '⬡',
    hidden: { opacity: 0, scale: 0.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'backOut' } },
  },
  {
    title: 'Rotate Y',
    desc: 'rotateY: 90° → 0',
    color: 'pink',
    emoji: '🔄',
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
  {
    title: 'Spring',
    desc: 'stiffness: 400, damping: 10',
    color: 'cyan',
    emoji: '🌀',
    hidden: { opacity: 0, x: -60, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
  },
  {
    title: 'SVG Path',
    desc: 'pathLength: 0 → 1',
    color: 'violet',
    emoji: '✏',
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
]

const accentColor: Record<AccentColor, string> = {
  cyan: 'var(--accent-cyan)',
  violet: 'var(--accent-violet)',
  green: 'var(--accent-green)',
  pink: 'var(--accent-pink)',
}

function AnimCard({
  card,
  controls,
  index,
}: {
  card: (typeof CARDS)[number]
  controls: ReturnType<typeof useAnimation>
  index: number
}) {
  const color = accentColor[card.color]

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: card.hidden,
        visible: {
          ...card.visible,
          transition: {
            ...card.visible.transition,
            delay: index * 0.1,
          },
        },
      }}
      style={{ perspective: 800 }}
      className="glass rounded-2xl p-6 h-full flex flex-col gap-3 cursor-default"
    >
      {/* Color accent bar */}
      <div
        className="h-1 w-12 rounded-full mb-1"
        style={{ background: color }}
      />

      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
          {card.title}
        </h3>
        <span className="text-2xl">{card.emoji}</span>
      </div>

      <p
        className="text-xs font-mono px-2 py-1 rounded-lg w-fit"
        style={{
          color,
          background: `color-mix(in srgb, ${color} 12%, transparent)`,
        }}
      >
        {card.desc}
      </p>

      {/* SVG animation for last card */}
      {card.title === 'SVG Path' && (
        <svg viewBox="0 0 100 60" className="w-full h-10 mt-1" fill="none">
          <motion.path
            d={SVG_PATH}
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.4, ease: 'easeInOut', delay: index * 0.1 + 0.2 },
              },
            }}
          />
        </svg>
      )}
    </motion.div>
  )
}

export function AnimationsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { amount: 0.1, once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Первый вход в viewport
  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible')
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated, controls])

  const handleReplay = useCallback(async () => {
    await controls.start('hidden')
    // Небольшая пауза чтобы hidden-состояние отрисовалось
    await new Promise((r) => setTimeout(r, 120))
    controls.start('visible')
  }, [controls])

  return (
    <SectionWrapper id="animations">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-3">
          <SectionLabel number="02" label="Animations" />
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)]">
            Scroll-triggered анимации
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl">
            Каждая карточка — своя уникальная техника Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <AnimatedCounter
              to={100}
              className="font-display font-black text-4xl text-[var(--accent-cyan)]"
            />
            <p className="text-xs font-mono text-[var(--text-muted)] mt-1">анимаций</p>
          </div>
          <NeonButton color="cyan" variant="outline" onClick={handleReplay}>
            ↺ Replay
          </NeonButton>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CARDS.map((card, i) => (
          <AnimCard key={card.title} card={card} controls={controls} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
