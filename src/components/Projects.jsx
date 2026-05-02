import React, { useMemo, useRef } from 'react'
import { gsap } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function Projects() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const projects = useMemo(
    () => [
      {
        id: 'p1',
        title: 'Landing Page para Negócios',
        tag: 'Frontend / Conversão',
        year: '2026',
        description:
          'Landing page moderna criada para apresentar serviços, aumentar autoridade e gerar contatos pelo WhatsApp.',
        link: '#',
      },
      {
        id: 'p2',
        title: 'Sistema Web Full Stack',
        tag: 'React / Backend',
        year: '2026',
        description:
          'Projeto web com frontend e backend, pensado para organizar dados e melhorar processos com uma interface simples e eficiente.',
        link: '#',
      },
      {
        id: 'p3',
        title: 'Portfólio Profissional',
        tag: 'UI / Personal Brand',
        year: '2026',
        description:
          'Portfólio pessoal com design moderno, animações suaves e foco em apresentar serviços e gerar oportunidades.',
        link: '#',
      },
    ],
    [],
  )

  useGSAP(
    () => {
      const entryTween = gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
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

      const targets = cardsRef.current.filter(Boolean)
      const cardsTween = gsap.fromTo(
        targets,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      )

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const floatTweens = isMobile
        ? []
        : targets.map((card) =>
            gsap.fromTo(
              card,
              { y: 10 },
              {
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  once: true,
                },
              },
            ),
          )

      return () => {
        ;[entryTween, cardsTween, ...floatTweens].forEach((tween) => {
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
      className="projects section"
    >
      <div className="section-inner">
        <div className="section-item mb-10">
          <h2 className="font-display text-3xl font-bold">Projetos</h2>
          <p
            className="mt-3 text-sm opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            Exemplos de entregas (placeholders) para apresentar meus serviços e
            o tipo de projeto que desenvolvo.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((p, index) => (
            <a
              className="section-item project-card group block rounded-lg px-4 py-5 sm:px-6 sm:py-6 transition-[box-shadow,border-color,transform] duration-300"
              key={p.id}
              href={p.link}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="font-display text-2xl font-bold">
                      {p.title}
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-xs opacity-90"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--primary)',
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div
                  className="text-sm opacity-80"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {p.year}
                </div>
              </div>

              <p
                className="mt-4 text-sm opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                {p.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
