import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap.js'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useGSAP(
    () => {
      const counter = { v: 0 }
      const finish = () => {
        setVisible(false)
        ScrollTrigger.refresh()
        window.dispatchEvent(new Event('intro-done'))
      }

      gsap
        .timeline({ onComplete: finish })
        .to(counter, {
          v: 100,
          duration: prefersReducedMotion ? 0.2 : 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        })
        .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
        .to('.loader-row', { yPercent: -120, duration: 0.6, ease: 'power3.in', stagger: 0.05 })
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
    },
    { scope: rootRef },
  )

  if (!visible) return null

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-mask">
          <span className="loader-row loader-name">Eduardo Mattos</span>
        </div>
        <div className="loader-mask">
          <span ref={countRef} className="loader-row loader-count">000</span>
        </div>
      </div>
      <div className="loader-bar">
        <i ref={barRef} />
      </div>
    </div>
  )
}
