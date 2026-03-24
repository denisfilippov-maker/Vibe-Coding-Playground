'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { GradientText } from '@/components/ui/GradientText'
import { NeonButton } from '@/components/ui/NeonButton'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const TITLE = 'Vibe Coding Playground'
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 6 + 4,
  delay: Math.random() * 4,
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
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'var(--accent-violet)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--accent-cyan)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--accent-pink)' }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--accent-cyan)] opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 px-4 py-2 glass rounded-full text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase"
        >
          ✦ Claude + Cursor · Vibe Coding
        </motion.div>

        {/* Title — letter by letter */}
        <motion.h1
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight mb-6"
          variants={staggerContainer(0.03)}
          initial="hidden"
          animate="visible"
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              className={char === ' ' ? 'inline-block w-4 sm:w-6 lg:w-8' : 'inline-block'}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              style={
                i > 4
                  ? {
                      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }
                  : undefined
              }
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed font-body"
        >
          Showcase современной веб-разработки с AI-инструментами.
          Каждая секция — живая демонстрация одной мощной техники.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">Скролл</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--accent-cyan)] to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
