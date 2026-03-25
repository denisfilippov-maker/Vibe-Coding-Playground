'use client'

import { useState } from 'react'
import * as RadixSlider from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface AnimatedSliderProps {
  className?: string
}

export function AnimatedSlider({ className }: AnimatedSliderProps) {
  const [value, setValue] = useState(40)

  const hue = Math.round((value / 100) * 280)
  const trackColor = `hsl(${hue}, 100%, 60%)`

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-[var(--text-secondary)]">Значение</span>
        <span
          className="text-2xl font-display font-bold tabular-nums transition-colors duration-300"
          style={{ color: trackColor }}
        >
          {value}
        </span>
      </div>

      <RadixSlider.Root
        value={[value]}
        onValueChange={([v]) => setValue(v)}
        min={0}
        max={100}
        step={1}
        className="relative flex items-center w-full h-8 cursor-pointer"
      >
        <RadixSlider.Track className="relative grow rounded-full h-2 bg-[var(--border)]">
          <RadixSlider.Range
            className="absolute rounded-full h-full transition-colors duration-300"
            style={{ backgroundColor: trackColor }}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-6 h-6 rounded-full shadow-lg outline-none transition-transform duration-150 hover:scale-110 focus:scale-110"
          style={{
            backgroundColor: trackColor,
            boxShadow: `0 0 12px ${trackColor}`,
          }}
        />
      </RadixSlider.Root>

      <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  )
}
