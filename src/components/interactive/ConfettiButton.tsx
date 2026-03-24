'use client'

import { useCallback } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfettiButtonProps {
  className?: string
}

export function ConfettiButton({ className }: ConfettiButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x, y },
      colors: ['#00f5ff', '#9d4edd', '#39ff14', '#ff006e'],
      startVelocity: 35,
      gravity: 0.8,
      scalar: 1.1,
    })
  }, [])

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative px-8 py-4 rounded-2xl font-display font-bold text-base',
        'bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)]',
        'text-[var(--bg-base)]',
        'shadow-neon-cyan hover:shadow-neon-violet transition-shadow duration-500',
        'overflow-hidden',
        className
      )}
    >
      <span className="relative z-10">Взрыв! 🎉</span>
    </motion.button>
  )
}
