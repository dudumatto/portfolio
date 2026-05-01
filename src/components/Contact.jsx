import React, { useMemo, useRef } from 'react'
import { gsap } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function Contact() {
  const sectionRef = useRef(null)
  const charsRef = useRef([])

  const heading = 'Vamos criar algo profissional juntos?'
  const words = useMemo(() => heading.split(' ').filter(Boolean), [heading])

  useGSAP(
    () => {
      const entryTween = gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      )

      const targets = charsRef.current.filter(Boolean)
      gsap.set(targets, { y: 80, opacity: 0 })

      const charsTween = gsap.to(targets, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      return () => {
        ;[entryTween, charsTween].filter(Boolean).forEach((tween) => {
          tween.scrollTrigger?.kill()
          tween.kill()
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col items-center justify-center px-8 text-center"
    >
      <h2 className="contact-heading font-display relative z-10 mx-auto text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.14] tracking-[-0.03em] md:text-[clamp(2.5rem,6vw,5rem)]">
        {(() => {
          let charIndex = 0
          return words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block"
              style={{ whiteSpace: 'nowrap' }}
            >
              {Array.from(word).map((c) => {
                const currentIndex = charIndex
                charIndex += 1
                return (
                  <span
                    key={`${c}-${currentIndex}`}
                    ref={(el) => {
                      charsRef.current[currentIndex] = el
                    }}
                    className="inline-block will-change-transform"
                    style={{ transform: 'translate3d(0,0,0)' }}
                  >
                    {c}
                  </span>
                )
              })}
              {wordIndex < words.length - 1 ? (
                <span aria-hidden="true">{'\u00A0'}</span>
              ) : null}
            </span>
          ))
        })()}
      </h2>

      <a
        href="mailto:mattosdudu2009@gmail.com"
        className="section-item contact-email relative z-10 mt-7 text-[1.2rem] opacity-95"
      >
        mattosdudu2009@gmail.com
      </a>

      <a
        href="tel:+5519983111501"
        className="section-item relative z-10 mt-2 text-sm opacity-90"
        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
      >
        WhatsApp / Telefone: 19 98311-1501
      </a>

      <div className="section-item relative z-10 mt-6 flex gap-8 text-sm">
        <a
          href="https://github.com/dudumatto"
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--text-secondary)')
          }
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpvSUD5DuQIm8hxiZv7EMPg%3D%3D"
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--text-secondary)')
          }
        >
          LinkedIn
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-10 text-xs opacity-50">
        © 2026 Eduardo Mattos.
      </div>
    </section>
  )
}
