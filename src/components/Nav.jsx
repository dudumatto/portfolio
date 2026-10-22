import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../gsap.js'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const navRef = useRef(null)
  const barRef = useRef(null)

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })

    // hide while scrolling down, show on scroll up
    ScrollTrigger.create({
      start: 'top -120',
      end: 'max',
      onUpdate: (self) => navRef.current.classList.toggle('nav-hidden', self.direction === 1),
      onLeaveBack: () => navRef.current.classList.remove('nav-hidden'),
    })
  })

  return (
    <header ref={navRef} className="nav">
      <div className="nav-progress">
        <i ref={barRef} />
      </div>
      <a href="#topo" className="nav-logo magnetic" aria-label="Voltar ao topo">
        EM<span>.</span>
      </a>
      <nav aria-label="Seções">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                <span data-text={l.label}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
