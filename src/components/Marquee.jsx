import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap.js'

const rows = [
  ['React', 'Spring Boot', 'Three.js', 'GSAP', 'Java', 'Tailwind', 'JPA', 'Vite'],
  ['Landing Pages', 'Sistemas Web', 'UI / UX', 'Animações', 'APIs REST', 'IA aplicada'],
]

export default function Marquee() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const tweens = gsap.utils.toArray('.marquee-track').map((track, i) => {
        const dir = i % 2 ? 1 : -1
        return gsap.fromTo(
          track,
          { xPercent: dir === -1 ? 0 : -50 },
          { xPercent: dir === -1 ? -50 : 0, duration: 28, ease: 'none', repeat: -1 },
        )
      })

      // scroll velocity speeds the rows up and flips them with scroll direction
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6)
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: boost * self.direction, duration: 0.2, overwrite: true })
            gsap.to(t, { timeScale: self.direction, duration: 1.2, delay: 0.2, overwrite: false })
          })
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="marquee" aria-hidden="true">
      {rows.map((words, i) => (
        <div key={i} className={`marquee-row ${i % 2 ? 'is-alt' : ''}`}>
          <div className="marquee-track">
            {[...words, ...words, ...words, ...words].map((w, j) => (
              <span key={j}>
                {w}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
