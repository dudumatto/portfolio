import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smooth: true })

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}
