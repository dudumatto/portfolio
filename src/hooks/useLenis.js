import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap } from '../gsap.js'

export function useLenis() {
  useEffect(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches
    if (isMobile) return

    let lenis
    try {
      lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        smoothTouch: false,
      })
    } catch {
      return
    }

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}
