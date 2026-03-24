'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#animations', label: 'Анимации' },
  { href: '#interactivity', label: 'Интерактивность' },
  { href: '#visual-effects', label: 'Визуальные эффекты' },
  { href: '#responsive', label: 'Адаптивность' },
]

export function Navbar() {
  const progress = useScrollProgress()
  const { theme, toggleTheme } = useTheme()
  const isVisible = progress > 0.03

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'glass border-b border-[var(--border)]',
          'px-6 py-3'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-display font-bold text-sm tracking-wide text-[var(--text-primary)]">
            Vibe Coding
            <span className="text-[var(--accent-cyan)]"> Playground</span>
          </span>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-mono"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px bg-[var(--accent-cyan)] origin-left transition-none"
          style={{ transform: `scaleX(${progress})`, width: '100%' }}
        />
      </motion.nav>
    </>
  )
}
