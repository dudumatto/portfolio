import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function TorusKnotMesh({ apiRef }) {
  const meshRef = useRef(null)
  const colors = useMemo(() => {
    if (typeof window === 'undefined') {
      return { primary: '#FF5A1F' }
    }

    const style = getComputedStyle(document.documentElement)
    const primary = style.getPropertyValue('--primary').trim() || '#FF5A1F'
    return { primary }
  }, [])

  useImperativeHandle(apiRef, () => meshRef.current)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 200, 32]} />
      <meshStandardMaterial
        color={colors.primary}
        metalness={0.8}
        roughness={0.1}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}

const Scene3D = forwardRef(function Scene3D(_, ref) {
  const lightColors = useMemo(() => {
    if (typeof window === 'undefined') {
      return { primary: '#FF5A1F' }
    }

    const style = getComputedStyle(document.documentElement)
    const primary = style.getPropertyValue('--primary').trim() || '#FF5A1F'

    return { primary }
  }, [])

  return (
    <Canvas
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight
        position={[5, 5, 5]}
        intensity={1.4}
        color={lightColors.primary}
      />
      <TorusKnotMesh apiRef={ref} />
    </Canvas>
  )
})

export default Scene3D
