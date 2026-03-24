'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1500,
  className,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, { duration, bounce: 0 })
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (isInView) {
      motionValue.set(to)
    }
  }, [isInView, motionValue, to])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      setDisplay(Math.round(v))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{display}{suffix}
    </span>
  )
}
