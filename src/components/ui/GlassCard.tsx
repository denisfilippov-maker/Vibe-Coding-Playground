'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AccentColor } from '@/types'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: AccentColor
  hoverable?: boolean
}

const glowMap: Record<AccentColor, string> = {
  cyan: 'hover:shadow-neon-cyan hover:border-[var(--accent-cyan)]',
  violet: 'hover:shadow-neon-violet hover:border-[var(--accent-violet)]',
  green: 'hover:shadow-neon-green hover:border-[var(--accent-green)]',
  pink: 'hover:shadow-neon-pink hover:border-[var(--accent-pink)]',
}

export function GlassCard({
  children,
  className,
  glowColor = 'cyan',
  hoverable = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6',
        hoverable && [
          'cursor-pointer transition-all duration-300',
          'hover:-translate-y-1',
          glowMap[glowColor],
        ],
        className
      )}
      whileHover={hoverable ? { y: -4 } : undefined}
    >
      {children}
    </motion.div>
  )
}
