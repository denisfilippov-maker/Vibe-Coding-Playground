'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MorphButtonProps {
  className?: string
}

export function MorphButton({ className }: MorphButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleClick = () => {
    if (state !== 'idle') {
      setState('idle')
      return
    }
    setState('loading')
    setTimeout(() => setState('done'), 1500)
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={{
        width: state === 'loading' ? 56 : state === 'done' ? 56 : 'auto',
        borderRadius: state !== 'idle' ? '28px' : '12px',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative h-14 px-8 font-display font-bold text-sm overflow-hidden',
        'border transition-colors duration-300',
        state === 'done'
          ? 'bg-[var(--accent-green)] border-[var(--accent-green)] text-[var(--bg-base)]'
          : 'bg-transparent border-[var(--accent-violet)] text-[var(--accent-violet)]',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap"
          >
            Нажми меня
          </motion.span>
        )}
        {state === 'loading' && (
          <motion.svg
            key="loading"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }}
            className="w-5 h-5 absolute inset-0 m-auto"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10" strokeLinecap="round" />
          </motion.svg>
        )}
        {state === 'done' && (
          <motion.svg
            key="done"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-6 h-6 absolute inset-0 m-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
