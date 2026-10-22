import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../gsap.js'

const services = [
  {
    title: 'Landing pages que convertem',
    text: 'Páginas rápidas, com SEO local e chamadas claras para transformar visita em contato no WhatsApp.',
  },
  {
    title: 'Sistemas web full stack',
    text: 'Do banco à interface: APIs REST com Spring Boot, autenticação JWT e frontend em React.',
  },
  {
    title: 'Interfaces com movimento',
    text: 'Animações com GSAP e cenas 3D com Three.js para experiências que ficam na memória.',
  },
  {
    title: 'IA no fluxo de trabalho',
    text: 'Uso IA para prototipar, revisar e acelerar entregas, sem abrir mão de código limpo.',
  },
]

const stack = [
  { group: 'Frontend', items: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'GSAP', 'Three.js'] },
  { group: 'Backend', items: ['Java', 'Spring Boot', 'JPA / Hibernate', 'JWT', 'APIs REST', 'SQL / Banco de dados'] },
  { group: 'Produto', items: ['UI / UX', 'SEO', 'Git', 'Vercel', 'IA aplicada'] },
]

const facts = [
  ['Nome', 'Eduardo Mattos'],
  ['Atuação', 'Desenvolvedor Full Stack'],
  ['Base', 'Brasil'],
  ['Status', 'Aberto a projetos'],
]

export default function About() {
  const sectionRef = useRef(null)
  const bioRef = useRef(null)

  useGSAP(
    () => {
      // bio "fills in" word by word as it scrolls through the viewport
      SplitText.create(bioRef.current, {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: bioRef.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
            },
          ),
      })

      gsap.from('.service', {
        y: 80,
        opacity: 0,
        rotateX: -25,
        transformOrigin: '50% 100%',
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services', start: 'top 85%', once: true },
      })

      gsap.from('.chip', {
        scale: 0.6,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.stack', start: 'top 85%', once: true },
      })

      // 3D tilt on service cards
      if (window.matchMedia('(pointer: fine)').matches) {
        gsap.utils.toArray('.service').forEach((card) => {
          const rx = gsap.quickTo(card, 'rotateX', { duration: 0.5 })
          const ry = gsap.quickTo(card, 'rotateY', { duration: 0.5 })
          card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect()
            card.style.setProperty('--mx', `${e.clientX - r.left}px`)
            card.style.setProperty('--my', `${e.clientY - r.top}px`)
            ry(((e.clientX - r.left) / r.width - 0.5) * 12)
            rx(-((e.clientY - r.top) / r.height - 0.5) * 12)
          })
          card.addEventListener('mouseleave', () => {
            rx(0)
            ry(0)
          })
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section id="sobre" ref={sectionRef} className="section about">
      <div className="section-inner">
        <p className="label reveal">
          <span>01</span> Sobre mim
        </p>

        <p ref={bioRef} className="about-bio">
          Sou o Eduardo, desenvolvedor <em>full stack</em>. Construo desde <em>landing pages</em> que geram clientes até
          plataformas completas com React no front e Java com Spring Boot no back,
          modelando <em>banco de dados</em> e sempre com foco em <em>performance</em>, detalhe e experiência.
        </p>

        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k} className="fact reveal">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="section-title split-lines">O que eu faço</h2>
        <div className="services">
          {services.map((s, i) => (
            <article key={s.title} className="service">
              <span className="service-index">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>

        <h2 className="section-title split-lines">Stack</h2>
        <div className="stack">
          {stack.map((g) => (
            <div key={g.group} className="stack-group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it} className="chip">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
