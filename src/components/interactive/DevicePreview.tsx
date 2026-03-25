'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { DeviceType } from '@/types'

interface DeviceConfig {
  label: string
  icon: string
  width: number
  breakpoint: string
}

const devices: Record<DeviceType, DeviceConfig> = {
  desktop: { label: 'Desktop', icon: '🖥', width: 600, breakpoint: 'xl' },
  tablet: { label: 'Tablet', icon: '📱', width: 380, breakpoint: 'md' },
  mobile: { label: 'Mobile', icon: '📲', width: 220, breakpoint: 'sm' },
}

export function DevicePreview() {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const config = devices[device]

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Device switcher */}
      <div className="flex gap-2 p-1 glass rounded-xl">
        {(Object.keys(devices) as DeviceType[]).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300',
              device === d
                ? 'bg-[var(--accent-cyan)] text-[var(--bg-base)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            <span>{devices[d].icon}</span>
            <span className="hidden sm:inline">{devices[d].label}</span>
          </button>
        ))}
      </div>

      {/* Preview frame — max-w-full prevents overflow on narrow screens */}
      <div className="relative overflow-hidden w-full max-w-full">
        <motion.div
          animate={{ width: config.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="glass rounded-2xl overflow-hidden"
          style={{ minHeight: 200, maxWidth: '100%' }}
        >
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--border)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-pink)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-green)]" />
            <div className="flex-1 mx-2 h-4 rounded-full bg-[var(--border)] text-[8px] font-mono text-[var(--text-muted)] flex items-center px-2 overflow-hidden">
              vibe-coding.vercel.app
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="h-4 rounded bg-[var(--text-muted)] opacity-30 w-2/3" />
            <div className="h-3 rounded bg-[var(--text-muted)] opacity-20 w-full" />
            <div className="h-3 rounded bg-[var(--text-muted)] opacity-20 w-4/5" />
            <div className="flex gap-2 mt-4">
              <div className="h-8 rounded-lg bg-[var(--accent-cyan)] opacity-70 w-20" />
              <div className="h-8 rounded-lg border border-[var(--border)] w-20" />
            </div>
          </div>
        </motion.div>

        {/* Breakpoint label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <span className="text-xs font-mono text-[var(--accent-cyan)]">
            breakpoint: <strong>{config.breakpoint}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
