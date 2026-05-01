import React, { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(
    () => {
      const el = overlayRef.current
      if (!el) return

      gsap.set(el, { y: 40, opacity: 0 })
      const introTween = gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.05,
      })

      const title = titleRef.current
      if (!title) return

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      gsap.set(title, { transformOrigin: '50% 50%' })

      const scrollTween = gsap.to(title, {
        scale: isMobile ? 0.78 : 0.6,
        y: isMobile ? -70 : -120,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => {
        introTween.kill()
        scrollTween.scrollTrigger?.kill()
        scrollTween.kill()
      }
    },
    { scope: sectionRef },
  )

  useLayoutEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero relative flex h-screen items-center justify-center overflow-hidden"
    >
      <div
        ref={overlayRef}
        className="pointer-events-none relative z-10 flex h-full w-full flex-col px-8 will-change-transform"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        <div className="pt-8">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: 'var(--text-secondary)' }}
          >
            PORTFÓLIO — 2026
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1
            ref={titleRef}
            className="hero-title font-display text-[clamp(4rem,10vw,10rem)] font-extrabold leading-[0.9] tracking-[-0.02em] will-change-transform"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            Eduardo <span style={{ color: 'var(--primary)' }}>Mattos</span>
          </h1>
          <p
            className="section-item mt-5 text-sm md:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Crio interfaces modernas, rápidas e{' '}
            <span style={{ color: 'var(--primary)' }}>prontas para vender</span>.
          </p>
          <p
            className="mt-3 text-xs uppercase tracking-[0.22em] md:text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Brasil — Frontend & IA
          </p>
        </div>

        <div className="pb-10 text-center">
          <div className="scroll-cue text-xs uppercase tracking-[0.35em] opacity-60">
            ↓ scroll
          </div>
        </div>
      </div>
    </section>
  )
}
