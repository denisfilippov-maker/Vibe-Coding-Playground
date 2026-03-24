'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AccentColor } from '@/types'

interface NeonButtonProps {
  children: React.ReactNode
  variant?: 'outline' | 'filled'
  color?: AccentColor
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const colorMap: Record<AccentColor, { border: string; text: string; bg: string; shadow: string }> = {
  cyan: {
    border: 'border-[var(--accent-cyan)]',
    text: 'text-[var(--accent-cyan)]',
    bg: 'bg-[var(--accent-cyan)]',
    shadow: 'hover:shadow-neon-cyan',
  },
  violet: {
    border: 'border-[var(--accent-violet)]',
    text: 'text-[var(--accent-violet)]',
    bg: 'bg-[var(--accent-violet)]',
    shadow: 'hover:shadow-neon-violet',
  },
  green: {
    border: 'border-[var(--accent-green)]',
    text: 'text-[var(--accent-green)]',
    bg: 'bg-[var(--accent-green)]',
    shadow: 'hover:shadow-neon-green',
  },
  pink: {
    border: 'border-[var(--accent-pink)]',
    text: 'text-[var(--accent-pink)]',
    bg: 'bg-[var(--accent-pink)]',
    shadow: 'hover:shadow-neon-pink',
  },
}

export function NeonButton({
  children,
  variant = 'outline',
  color = 'cyan',
  onClick,
  className,
  disabled = false,
}: NeonButtonProps) {
  const colors = colorMap[color]

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative px-6 py-3 rounded-xl font-display font-semibold text-sm tracking-wide',
        'border transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        colors.shadow,
        variant === 'outline'
          ? [colors.border, colors.text, 'bg-transparent']
          : [colors.bg, 'border-transparent', 'text-[var(--bg-base)]'],
        className
      )}
    >
      {children}
    </motion.button>
  )
}
