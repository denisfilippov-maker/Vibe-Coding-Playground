'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { NeonButton } from '@/components/ui/NeonButton'

const TITLE = 'Vibe Coding Playground'

// Architecture spec: factory variant с custom индексом
const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const ACCENT_COLORS = [
  'var(--accent-cyan)',
  'var(--accent-violet)',
  'var(--accent-green)',
  'var(--accent-pink)',
]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 7 + 4,
  delay: Math.random() * 5,
  color: ACCENT_COLORS[i % ACCENT_COLORS.length],
}))

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8])
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8])
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)]"
    >
      {/* Static gradient hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent-violet)', opacity: 0.12 }}
        animate={{ x: [0, 50, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent-cyan)', opacity: 0.09 }}
        animate={{ x: [0, -40, 20, 0], y: [0, 50, -30, 0], scale: [1, 0.88, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent-pink)', opacity: 0.09 }}
        animate={{ x: [0, 30, -15, 0], y: [0, -25, 35, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Floating particles — mix акцентных цветов */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{ y: [0, -35, 0], opacity: [0.08, 0.45, 0.08] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Content — parallax на движение мыши */}
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 px-4 py-2 glass rounded-full text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase"
        >
          ✦ Claude + Cursor · Vibe Coding
        </motion.div>

        {/* Заголовок — буквы по одной (stagger + custom variant)
            Слова обёрнуты в whitespace-nowrap, чтобы не разрывались середине */}
        <motion.h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
          initial="hidden"
          animate="visible"
        >
          {TITLE.split(' ').map((word, wordIdx) => {
            const charOffset = TITLE.split(' ')
              .slice(0, wordIdx)
              .reduce((acc, w) => acc + w.length + 1, 0)

            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => {
                  const globalIdx = charOffset + charIdx
                  return (
                    <motion.span
                      key={globalIdx}
                      custom={globalIdx}
                      variants={titleVariants}
                      className="inline-block"
                      style={
                        globalIdx >= 5
                          ? {
                              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }
                          : undefined
                      }
                    >
                      {char}
                    </motion.span>
                  )
                })}
                {wordIdx < TITLE.split(' ').length - 1 && (
                  <span className="inline-block w-3 sm:w-5 lg:w-7">&nbsp;</span>
                )}
              </span>
            )
          })}
        </motion.h1>

        {/* Подзаголовок с fade-in задержкой */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed font-body"
        >
          Showcase современной веб-разработки с AI-инструментами.
          Каждая секция — живая демонстрация одной мощной техники.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <NeonButton color="cyan" variant="filled">
            Изучить
          </NeonButton>
          <NeonButton color="violet" variant="outline">
            GitHub
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — пульсирующая стрелка вниз */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase mb-1">
          Скролл
        </span>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent-cyan)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
          className="-mt-4"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent-cyan)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
