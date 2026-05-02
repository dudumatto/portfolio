import React, { useEffect, useMemo, useRef, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { initParticlesEngine } from '@tsparticles/react'
import { gsap } from '../gsap.js'
import { useGSAP } from '@gsap/react'

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    let mounted = true

    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      if (mounted) setReady(true)
    })

    return () => {
      mounted = false
    }
  }, [])

  useGSAP(
    () => {
      const el = innerRef.current
      if (!el) return

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      if (isMobile) return

      const tween = gsap.to(el, {
        y: 60,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: document.querySelector('.hero') || document.body,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: wrapperRef },
  )

  const options = useMemo(() => {
    const isMobile =
      typeof window !== 'undefined'
        ? window.matchMedia('(max-width: 767px)').matches
        : false

    let particleColor = ['rgba(163, 163, 163, 0.65)', 'rgba(255, 90, 31, 0.55)']
    let linkColor = 'rgba(242, 242, 242, 0.15)'

    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement)
      const textSecondary = style.getPropertyValue('--text-secondary').trim()
      const primary = style.getPropertyValue('--primary').trim()

      if (textSecondary && primary) {
        particleColor = [textSecondary, primary]
      }
    }

    return {
      fpsLimit: 60,
      detectRetina: true,
      background: {
        color: { value: 'transparent' },
      },
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: isMobile ? 12 : 42,
          density: { enable: true, area: 1300 },
        },
        color: { value: particleColor },
        shape: { type: 'circle' },
        links: {
          enable: true,
          color: linkColor,
          distance: 135,
          opacity: 0.14,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.28 : 0.38,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        opacity: {
          value: { min: 0.18, max: 0.38 },
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: !isMobile, mode: 'repulse' },
          onClick: { enable: !isMobile, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 90, duration: 0.2 },
          push: { quantity: 1 },
        },
      },
    }
  }, [])

  if (!ready) return null

  return (
    <div
      ref={wrapperRef}
      className="particles-background background-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
      >
        <Particles
          id="tsparticles"
          options={options}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
