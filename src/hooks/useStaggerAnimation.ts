'use client'

import { useRef, useEffect } from 'react'
import { useInView, useAnimation, type AnimationControls } from 'framer-motion'

interface UseStaggerAnimationOptions {
  threshold?: number
  once?: boolean
}

interface UseStaggerAnimationReturn {
  ref: React.MutableRefObject<HTMLDivElement | null>
  controls: AnimationControls
}

export function useStaggerAnimation({
  threshold = 0.2,
  once = true,
}: UseStaggerAnimationOptions = {}): UseStaggerAnimationReturn {
  const ref = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { amount: threshold, once })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  return { ref, controls }
}
