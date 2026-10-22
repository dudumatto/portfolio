import { gsap, ScrollTrigger, SplitText, useGSAP } from './gsap.js'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Scene3D from './components/Scene3D.jsx'
import { useLenis } from './hooks/useLenis.js'

export default function App() {
  useLenis()

  // global reveals: headings split into masked lines, blocks fade up
  useGSAP(() => {
    gsap.utils.toArray('.split-lines').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      })
    })

    gsap.set('.reveal', { y: 48, opacity: 0 })
    ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }),
    })
  })

  return (
    <>
      <LoadingOverlay />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Contact />
      </main>
      {/* rendered last so its triggers measure after the projects pin spacer exists */}
      <Scene3D />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
