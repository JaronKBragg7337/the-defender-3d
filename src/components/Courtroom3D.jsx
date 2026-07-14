import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, RoundedBox, Text } from '@react-three/drei'

function Juror({ position, mood, index }) {
  const juror = useRef()
  const color = mood > 72 ? '#4ade80' : mood > 55 ? '#fbbf24' : mood > 38 ? '#fb923c' : '#f87171'
  useFrame(({ clock }) => {
    if (juror.current) juror.current.rotation.y = Math.sin(clock.elapsedTime * 0.8 + index) * 0.12
  })
  return <group ref={juror} position={position}><mesh position={[0, 0.56, 0]}><sphereGeometry args={[0.17, 20, 20]} /><meshStandardMaterial color="#f5d0c5" roughness={0.8} /></mesh><mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.18, 0.24, 0.4, 12]} /><meshStandardMaterial color="#18212f" roughness={0.9} /></mesh><mesh position={[0, 0.56, -0.18]}><circleGeometry args={[0.07, 20]} /><meshBasicMaterial color={color} /></mesh></group>
}

function CourtroomScene({ juryOpinion }) {
  const gavel = useRef()
  useFrame(({ clock }) => { if (gavel.current) gavel.current.rotation.z = 0.75 + Math.sin(clock.elapsedTime * 1.4) * 0.05 })
  const jurors = [[-0.8, 0, -1.7], [0.2, 0, -1.7], [-0.8, 0, -0.7], [0.2, 0, -0.7], [-0.8, 0, 0.3], [0.2, 0, 0.3]]
  return <>
    <color attach="background" args={['#18181b']} />
    <fog attach="fog" args={['#18181b', 9, 22]} />
    <ambientLight intensity={0.4} color="#f5e8d3" />
    <directionalLight position={[8, 12, 6]} intensity={1.25} color="#fffbeb" castShadow />
    <pointLight position={[-6, 4, -4]} intensity={0.7} color="#fcd34d" />
    <pointLight position={[7, 3, -1]} intensity={0.5} color={juryOpinion > 55 ? '#4ade80' : '#f87171'} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[22, 18]} /><meshStandardMaterial color="#38261c" roughness={0.85} /></mesh>
    <RoundedBox args={[18, 9, 0.6]} radius={0.08} position={[0, 4.4, -8.5]}><meshStandardMaterial color="#211711" roughness={0.9} /></RoundedBox>
    <group position={[0, 0, -5.8]}><RoundedBox args={[7.5, 2.25, 3.2]} radius={0.1} position={[0, 1.1, 0]}><meshStandardMaterial color="#4a3728" roughness={0.7} /></RoundedBox><RoundedBox args={[7.5, 2.8, 0.6]} radius={0.08} position={[0, 3.05, -1.1]}><meshStandardMaterial color="#332217" roughness={0.8} /></RoundedBox><Text position={[0, 3.1, -0.76]} fontSize={0.28} color="#f4c66b" anchorX="center">SUPERIOR COURT</Text></group>
    <group position={[7.1, 0.1, -1.8]}><RoundedBox args={[3.7, 1.1, 6.2]} radius={0.08} position={[0, 0.55, 0]}><meshStandardMaterial color="#4a3728" roughness={0.75} /></RoundedBox>{jurors.map((position, index) => <Juror key={index} position={position} mood={juryOpinion} index={index} />)}<Text position={[0, 1.35, 2.85]} fontSize={0.16} color="#f4c66b" anchorX="center">JURY</Text></group>
    <group position={[-6.2, 0, 2.7]}><RoundedBox args={[2.8, 1.2, 1.4]} radius={0.08} position={[0, 0.6, 0]}><meshStandardMaterial color="#3f2a1f" roughness={0.7} /></RoundedBox><Text position={[0, 1.65, 0]} fontSize={0.16} color="#6ee7b7" anchorX="center">DEFENSE</Text></group>
    <group position={[6.2, 0, 2.7]}><RoundedBox args={[2.8, 1.2, 1.4]} radius={0.08} position={[0, 0.6, 0]}><meshStandardMaterial color="#3f2a1f" roughness={0.7} /></RoundedBox><Text position={[0, 1.65, 0]} fontSize={0.16} color="#fca5a5" anchorX="center">STATE</Text></group>
    <group position={[0, 0, 1.2]}><mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.85, 1.05, 1.5, 6]} /><meshStandardMaterial color="#4a3728" roughness={0.65} /></mesh><Text position={[0, 1.85, 0]} fontSize={0.15} color="#fcd34d" anchorX="center">WITNESS</Text></group>
    <group ref={gavel} position={[-1.8, 2.55, -5.2]}><mesh rotation={[0.3, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 1.45, 8]} /><meshStandardMaterial color="#78350f" /></mesh><mesh position={[0.64, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.22, 0.22, 0.65, 12]} /><meshStandardMaterial color="#451a03" /></mesh></group>
    <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={17} blur={2.5} far={8} />
    <OrbitControls enablePan={false} minDistance={8} maxDistance={18} maxPolarAngle={Math.PI * 0.72} minPolarAngle={Math.PI * 0.28} target={[0, 2.8, -1]} />
  </>
}

export default function Courtroom3D({ juryOpinion = 50 }) {
  return <div className="relative h-[340px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"><Canvas shadows camera={{ position: [0, 8.5, 13], fov: 48 }} dpr={[1, 2]}><CourtroomScene juryOpinion={juryOpinion} /></Canvas><div className="pointer-events-none absolute bottom-4 left-4 flex gap-2 text-[10px] font-mono tracking-[2px]"><span className="rounded-full border border-zinc-700 bg-zinc-950/80 px-3 py-1.5 text-zinc-300">LIVE COURTROOM</span><span className="rounded-full border border-amber-900/70 bg-zinc-950/80 px-3 py-1.5 text-amber-400">JURY: {juryOpinion}%</span></div></div>
}
