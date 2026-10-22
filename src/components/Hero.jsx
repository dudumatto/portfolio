import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../gsap.js'

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      const split = SplitText.create(titleRef.current, { type: 'words,chars', mask: 'chars', wordsClass: 'word', aria: 'none' })
      gsap.set(split.chars, { yPercent: 115 })
      gsap.set('.hero-fade', { y: 30, opacity: 0 })

      const play = contextSafe(() => {
        gsap
          .timeline({ onComplete: scrollOut })
          .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.045, ease: 'expo.out' })
          .to('.hero-fade', { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, '-=0.8')
      })

      // created after the intro so both never fight over the same chars
      const scrollOut = contextSafe(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
        tl.to(split.chars, { yPercent: -115, stagger: { each: 0.03, from: 'center' }, ease: 'none' })
          .to('.hero-fade', { y: -60, opacity: 0, stagger: 0.04, ease: 'none' }, 0)
      })

      window.addEventListener('intro-done', play, { once: true })
      return () => window.removeEventListener('intro-done', play)
    },
    { scope: sectionRef },
  )

  return (
    <section id="topo" ref={sectionRef} className="hero">
      <p className="eyebrow hero-fade">
        <span className="dot" /> Disponível para novos projetos
      </p>

      <h1 ref={titleRef} className="hero-title" aria-label="Eduardo Mattos">
        <span className="hero-line">Eduardo</span>
        <span className="hero-line accent">Mattos</span>
      </h1>

      <p className="hero-role hero-fade">
        Desenvolvedor <strong>Full Stack</strong> criando interfaces que se movem,
        sistemas que funcionam e sites que vendem.
      </p>

      <div className="hero-ctas hero-fade">
        <a href="#projetos" className="btn btn-primary magnetic">
          Ver projetos
        </a>
        <a href="#contato" className="btn btn-ghost magnetic">
          Falar comigo
        </a>
      </div>

      <div className="hero-foot hero-fade">
        <span>Brasil</span>
        <span className="scroll-cue">Role para explorar</span>
        <span>React · Spring Boot · Three.js</span>
      </div>
    </section>
  )
}
