import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../gsap.js'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef(null)
  const fillRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const fill = fillRef.current
    const ring = ringRef.current
    if (!root || !fill || !ring) return

    gsap.set(root, { opacity: 1 })
    gsap.set(fill, { scaleY: 0, transformOrigin: '50% 100%' })
    gsap.set(ring, { scale: 1, transformOrigin: '50% 50%' })

    const tl = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh()
        setVisible(false)
      },
    })

    tl.to(fill, { scaleY: 1, duration: 1.25, ease: 'power2.out' })
      .to({}, { duration: 0.18 })
      .to(
        ring,
        { scale: 26, duration: 0.5, ease: 'power3.out' },
        '>-0.02',
      )
      .to(root, { opacity: 0, duration: 0.28, ease: 'power2.out' }, '<')

    const safety = window.setTimeout(() => {
      ScrollTrigger.refresh()
      setVisible(false)
    }, 2400)

    return () => {
      window.clearTimeout(safety)
      tl.kill()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={rootRef}
      className="loading-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'var(--bg)',
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={ringRef}
        style={{
          position: 'relative',
          width: 92,
          height: 92,
          borderRadius: 9999,
          border: '2px solid var(--primary)',
          overflow: 'hidden',
          transform: 'translate3d(0,0,0)',
        }}
      >
        <div
          ref={fillRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--primary)',
            borderRadius: 9999,
            transform: 'scaleY(0)',
          }}
        />
      </div>
    </div>
  )
}
