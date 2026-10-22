import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../gsap.js'

// Ring follower + magnetic pull on `.magnetic` elements (fine pointers only)
export default function Cursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return
    const ring = ringRef.current
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
    let magnet = null

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      ring.classList.add('is-active')
      ring.classList.toggle('is-hover', !!e.target.closest('a, button'))

      const el = e.target.closest('.magnetic')
      if (magnet && magnet !== el) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      }
      magnet = el
      if (el) {
        const r = el.getBoundingClientRect()
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.35,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
          duration: 0.4,
          ease: 'power3.out',
        })
      }
    }
    const onLeave = () => ring.classList.remove('is-active')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
}
