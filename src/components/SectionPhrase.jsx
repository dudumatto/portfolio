import React, { useMemo, useRef } from 'react'
import { gsap } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function SectionPhrase({ phrase, sub }) {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const lineRef = useRef(null)

  const words = useMemo(() => {
    return phrase.split(' ').filter(Boolean)
  }, [phrase])

  useGSAP(
    () => {
      const targets = wordsRef.current.filter(Boolean)
      gsap.set(targets, { y: 24, opacity: 0 })
      gsap.set(lineRef.current, { width: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      tl.to(targets, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.45,
        ease: 'power2.out',
      }).to(
        lineRef.current,
        {
          width: '100%',
          duration: 0.45,
          ease: 'power2.out',
        },
        '>-0.05',
      )

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="section relative text-center"
    >
      <div className="section-inner">
        <div className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05]">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden"
            >
              <span
                ref={(el) => {
                  wordsRef.current[index] = el
                }}
                className="inline-block will-change-transform"
                style={{ transform: 'translate3d(0,0,0)' }}
              >
                {word}
                {index < words.length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </div>

        {sub ? (
          <p
            className="mt-6 max-w-2xl text-sm md:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {sub}
          </p>
        ) : null}

        <div className="mt-8 w-full max-w-2xl opacity-60">
          <div
            ref={lineRef}
            className="h-px w-0"
            style={{ background: 'var(--border)' }}
          />
        </div>
      </div>
    </section>
  )
}
