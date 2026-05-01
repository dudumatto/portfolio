import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../gsap.js'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const bar = barRef.current
    if (!root || !bar) return

    gsap.set(root, { opacity: 1 })
    gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' })

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    })

    tl.to(bar, { scaleX: 1, duration: 0.9, ease: 'power2.out' })
      .to(root, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '>-0.05')

    return () => {
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
      <div className="px-8 text-center">
        <div className="font-display text-2xl font-extrabold tracking-[-0.02em]">
          Eduardo Mattos
        </div>
        <div
          className="mt-6 h-px w-[240px] overflow-hidden rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            ref={barRef}
            className="h-full w-full"
            style={{ background: 'var(--primary)' }}
          />
        </div>
      </div>
    </div>
  )
}

