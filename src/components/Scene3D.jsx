import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import { gsap, useGSAP } from '../gsap.js'

const PRIMARY = '#ff5a1f'

// Scroll-driven pose: GSAP tweens it, three reads it every frame.
const pose = { x: 0, y: 0, scale: 1, spin: 0, distort: 0.45 }

function Blob() {
  const groupRef = useRef(null)
  const shellRef = useRef(null)
  const matRef = useRef(null)

  useFrame((state, dt) => {
    const g = groupRef.current
    const { pointer } = state
    g.position.x += (pose.x + pointer.x * 0.35 - g.position.x) * 0.05
    g.position.y += (pose.y + pointer.y * 0.25 - g.position.y) * 0.05
    g.scale.setScalar(pose.scale)
    g.rotation.y += dt * 0.12
    g.rotation.x += (pose.spin + pointer.y * 0.4 - g.rotation.x) * 0.05
    shellRef.current.rotation.y -= dt * 0.08
    shellRef.current.rotation.z += dt * 0.04
    matRef.current.distort = pose.distort
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.25, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color={PRIMARY}
          emissive="#2a0800"
          roughness={0.18}
          metalness={0.5}
          distort={0.3}
          speed={1.8}
        />
      </mesh>
      <mesh ref={shellRef} scale={1.6}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial color={PRIMARY} wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

function Dust({ count }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 9
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      arr.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p) - 4], i * 3)
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.02
    ref.current.rotation.x = pose.spin * 0.15
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#f2f2f2" transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}

export default function Scene3D() {
  const isMobile = window.matchMedia('(max-width: 899px)').matches

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, ({ conditions }) => {
      const d = conditions.desktop
      // one keyframe per section; each segment tweens from the previous keyframe
      const keys = [
        { x: 0, y: d ? 0 : 0.6, scale: d ? 1 : 0.7, spin: 0, distort: 0.45 },
        { trigger: '#sobre', x: d ? 2.4 : 0, y: d ? 0.2 : 1.6, scale: d ? 0.75 : 0.45, spin: 1.2, distort: 0.55 },
        { trigger: '#projetos', x: d ? -2.8 : 0, y: d ? -1 : 1.8, scale: 0.4, spin: 2.4, distort: 0.2 },
        { trigger: '#contato', x: 0, y: d ? -0.2 : 0.4, scale: d ? 1.15 : 0.75, spin: 3.6, distort: 0.45 },
      ]
      gsap.set(pose, keys[0])
      keys.slice(1).forEach(({ trigger, ...to }, i) => {
        const { trigger: _, ...from } = keys[i]
        gsap.fromTo(pose, from, {
          ...to,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger, start: 'top bottom', end: 'top top', scrub: 1.2 },
        })
      })
    })
  })

  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-4, -2, 2]} intensity={30} color={PRIMARY} />
        <Blob />
        <Dust count={isMobile ? 500 : 1400} />
      </Canvas>
    </div>
  )
}
