import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../gsap.js'

const links = [
  { label: 'WhatsApp', value: '(19) 98311-1501', href: 'https://wa.me/5519983111501' },
  { label: 'GitHub', value: '@dudumatto', href: 'https://github.com/dudumatto' },
  {
    label: 'LinkedIn',
    value: 'Eduardo Mattos',
    href: 'https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpvSUD5DuQIm8hxiZv7EMPg%3D%3D',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useGSAP(
    () => {
      SplitText.create(headingRef.current, {
        type: 'words,chars',
        mask: 'chars',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 120,
            rotate: 12,
            stagger: 0.02,
            ease: 'none',
            scrollTrigger: { trigger: headingRef.current, start: 'top 90%', end: 'top 35%', scrub: 1 },
          }),
      })

      gsap.from('.contact-link', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 92%', once: true },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="contato" ref={sectionRef} className="section contact">
      <div className="section-inner">
        <p className="label reveal">
          <span>03</span> Contato
        </p>

        <h2 ref={headingRef} className="contact-heading">
          Vamos criar algo <em>incrível</em> juntos?
        </h2>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mattosdudu2009@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-email magnetic"
        >
          mattosdudu2009@gmail.com <span aria-hidden="true">↗</span>
        </a>

        <ul className="contact-links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span>{l.label}</span>
                <strong>{l.value}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        <span>© 2026 Eduardo Mattos</span>
        <span>Feito com React, GSAP e Three.js</span>
        <a href="#topo">Voltar ao topo ↑</a>
      </footer>
    </section>
  )
}
