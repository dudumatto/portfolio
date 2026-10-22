import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../gsap.js'

export function useLenis() {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile || prefersReducedMotion) return

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}
