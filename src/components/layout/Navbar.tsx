'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const NAVBAR_HEIGHT = 72

const navLinks = [
  { href: 'animations', label: 'Анимации' },
  { href: 'interactivity', label: 'Интерактивность' },
  { href: 'visual-effects', label: 'Визуальные эффекты' },
  { href: 'responsive', label: 'Адаптивность' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Navbar() {
  const progress = useScrollProgress()
  const { theme, toggleTheme } = useTheme()
  const isVisible = progress > 0.03
  const [activeSection, setActiveSection] = useState<string>('')

  // Highlight the section currently in viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(href) },
        { rootMargin: `-${NAVBAR_HEIGHT}px 0px -60% 0px`, threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault()
      scrollToSection(id)
    },
    []
  )

  return (
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
        {/* Logo — scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-sm tracking-wide text-[var(--text-primary)] hover:text-[var(--accent-cyan)] transition-colors duration-300"
        >
          Vibe Coding
          <span className="text-[var(--accent-cyan)]"> Playground</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-xs font-mono transition-colors duration-300',
                  isActive
                    ? 'text-[var(--accent-cyan)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="inline-block w-1 h-1 rounded-full bg-[var(--accent-cyan)] mr-1.5 mb-0.5 align-middle"
                  />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>

        <button
          onClick={toggleTheme}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 text-sm font-mono"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px bg-[var(--accent-cyan)] origin-left transition-none"
        style={{ transform: `scaleX(${progress})`, width: '100%' }}
      />
    </motion.nav>
  )
}
