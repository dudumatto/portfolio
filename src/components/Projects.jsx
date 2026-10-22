import { useRef } from 'react'
import { gsap, useGSAP } from '../gsap.js'

const projects = [
  {
    title: 'CollabResearch',
    type: 'Plataforma web full stack',
    url: 'https://collab-research.vercel.app/',
    image: '/projects/collab.png',
    description:
      'Plataforma que conecta alunos e orientadores de iniciação científica: busca de projetos, inscrição online, chat, feedbacks, acompanhamento de progresso e gestão de documentos em um só lugar.',
    tags: ['React', 'Spring Boot', 'JPA / Hibernate', 'JWT', 'API REST'],
  },
  {
    title: 'Duhelo Usinagem',
    type: 'Landing page institucional',
    url: 'https://www.duhelousinagem.com.br/',
    image: '/projects/duhelo.png',
    description:
      'Landing page para empresa de usinagem em Santa Bárbara d’Oeste - SP, com identidade inspirada em desenho técnico, SEO local e captação de orçamentos direto pelo WhatsApp.',
    tags: ['Landing Page', 'SEO local', 'UI / UX', 'Conversão'],
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // desktop: pinned horizontal scroll
      mm.add('(min-width: 900px)', () => {
        const track = trackRef.current
        const distance = () => track.scrollWidth - window.innerWidth

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray('.project').forEach((card) => {
          const inView = { trigger: card, containerAnimation: scroll, scrub: true }
          gsap.fromTo(
            card.querySelector('.project-media'),
            { clipPath: 'inset(12% 12% 12% 12% round 28px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              ease: 'none',
              scrollTrigger: { ...inView, start: 'left right', end: 'left 30%' },
            },
          )
          gsap.from(card.querySelectorAll('.project-info > *'), {
            y: 40,
            opacity: 0,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: { ...inView, start: 'left 85%', end: 'left 35%' },
          })
        })
      })

      // mobile: plain vertical reveals
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.project').forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="projetos" ref={sectionRef} className="projects">
      <div ref={trackRef} className="projects-track">
        <div className="panel panel-intro">
          <p className="label">
            <span>02</span> Projetos
          </p>
          <h2 className="projects-title">
            Projetos
            <br />
            <em>no ar.</em>
          </h2>
          <p className="projects-sub">
            Sites reais, publicados e em uso. Clique para visitar.
            <span className="projects-hint" aria-hidden="true">
              Role →
            </span>
          </p>
        </div>

        {projects.map((p, i) => (
          <article key={p.title} className="panel project">
            <div className="project-info">
              <span className="project-index">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p className="project-type">{p.type}</p>
              <p className="project-desc">{p.description}</p>
              <ul className="project-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic">
                Visitar site ↗
              </a>
            </div>

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-media"
              aria-label={`Abrir ${p.title} em nova aba`}
            >
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>{new URL(p.url).hostname}</span>
              </div>
              <div className="project-shot">
                <img src={p.image} alt={`Página inicial do ${p.title}`} loading="lazy" />
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
