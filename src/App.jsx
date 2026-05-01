import { useEffect } from 'react'
import { ScrollTrigger } from './gsap.js'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import SectionPhrase from './components/SectionPhrase.jsx'
import ParticlesBackground from './components/ParticlesBackground.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import { useLenis } from './hooks/useLenis.js'

export default function App() {
  useLenis()

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <LoadingOverlay />
      <ParticlesBackground />
      <main
        style={{
          background: 'transparent',
          color: 'var(--text)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Hero />
        <SectionPhrase
          phrase="Design limpo, código funcional e foco em resultado."
          sub="Landing pages, SaaS e interfaces criadas para parecerem profissionais desde o primeiro clique."
        />
        <About />
        <SectionPhrase phrase="Cada projeto, uma intenção." />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
