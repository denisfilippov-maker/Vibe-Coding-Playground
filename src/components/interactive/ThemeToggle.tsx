'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'relative w-32 h-16 rounded-full overflow-hidden',
        'border border-[var(--border)]',
        'transition-colors duration-500',
        isDark ? 'bg-[#0a0a1f]' : 'bg-[#e8f4fd]',
        className
      )}
    >
      <motion.div
        className="absolute inset-0 flex items-center"
        initial={false}
        animate={{ x: isDark ? 0 : 0 }}
      >
        {/* Stars (dark) */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              key="stars"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {[
                { top: '20%', left: '25%', size: 2 },
                { top: '50%', left: '15%', size: 1.5 },
                { top: '70%', left: '35%', size: 1 },
                { top: '30%', left: '45%', size: 1 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clouds (light) */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              key="clouds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-2 top-1/2 -translate-y-1/2"
            >
              <div className="w-10 h-4 bg-white rounded-full opacity-80" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toggle knob */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
        animate={{
          x: isDark ? 4 : 68,
          backgroundColor: isDark ? '#9d4edd' : '#fbbf24',
          boxShadow: isDark
            ? '0 0 16px #9d4edd, 0 0 32px rgba(157,78,221,0.3)'
            : '0 0 16px #fbbf24, 0 0 32px rgba(251,191,36,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </button>
  )
}

