import React, { useRef } from 'react'
import { gsap } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const numberRef = useRef(null)

  useGSAP(
    () => {
      const entryTween = gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )

      const contentTween = gsap.fromTo(
        contentRef.current,
        { x: 32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )

      const numberTween = gsap.fromTo(
        numberRef.current,
        { y: 12 },
        {
          y: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )

      return () => {
        ;[entryTween, contentTween, numberTween].forEach((tween) => {
          tween.scrollTrigger?.kill()
          tween.kill()
        })
      }
    },
    { scope: sectionRef },
  )

  const skills = [
    'React',
    'Tailwind CSS',
    'JavaScript',
    'Vite',
    'UI/UX',
    'Landing Pages',
    'SaaS',
    'IA aplicada ao desenvolvimento',
    'Frontend moderno',
  ]

  return (
    <section
      ref={sectionRef}
      className="section"
    >
      <div className="section-inner">
        <div className="about-content">
          <div className="select-none">
            <div
              ref={numberRef}
              className="font-display text-[5.5rem] font-extrabold leading-none opacity-[0.14] md:text-[8rem]"
              style={{ color: 'var(--primary)' }}
            >
              02
            </div>
          </div>

          <div ref={contentRef} className="section-item will-change-transform">
            <p
              className="max-w-2xl text-sm leading-[1.9] md:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              Sou desenvolvedor frontend focado em criar landing pages e
              interfaces para SaaS com visual moderno, boa performance e
              experiência clara. Uso IA para acelerar entregas sem abrir mão de
              qualidade, organização e manutenção.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-4 py-1 text-xs md:text-sm"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
