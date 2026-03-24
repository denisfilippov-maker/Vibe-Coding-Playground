'use client'

import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  from?: string
  to?: string
  animate?: boolean
  className?: string
}

export function GradientText({
  children,
  from = 'var(--accent-cyan)',
  to = 'var(--accent-violet)',
  animate = false,
  className,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent',
        animate && 'animate-gradient-shift bg-[length:200%_200%]',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {children}
    </span>
  )
}
