import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

// Aura de fondo que transiciona de color según el avance del scroll.
// Cada capa es un glow radial fijo cuya OPACIDAD sube/baja (compositor GPU,
// sin repaint por frame). Se cruzan para dar una transición continua.
// Paleta anclada a la marca: teal en las puntas, tonos de proyecto en el medio.
const LAYERS = [
  { color: 'rgba(31, 211, 163, 0.28)', pos: '82% 6%', range: [0, 0.16], op: [1, 0] },
  { color: 'rgba(224, 179, 82, 0.22)', pos: '10% 22%', range: [0.08, 0.24, 0.4], op: [0, 1, 0] },
  { color: 'rgba(96, 150, 214, 0.28)', pos: '86% 42%', range: [0.32, 0.48, 0.64], op: [0, 1, 0] },
  { color: 'rgba(209, 123, 143, 0.22)', pos: '8% 66%', range: [0.56, 0.7, 0.84], op: [0, 1, 0] },
  { color: 'rgba(31, 211, 163, 0.28)', pos: '80% 94%', range: [0.78, 0.94], op: [0, 1] },
]

function Layer({ color, pos, range, op, progress }) {
  const opacity = useTransform(progress, range, op)
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        opacity,
        background: `radial-gradient(64% 58% at ${pos}, ${color}, transparent 72%)`,
      }}
    />
  )
}

export default function ScrollAura() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Con movimiento reducido: un solo glow teal estático, sin transición.
  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(58% 52% at 82% 8%, rgba(31,211,163,0.16), transparent 72%)' }}
      />
    )
  }

  return (
    <>
      {LAYERS.map((l, i) => (
        <Layer key={i} {...l} progress={scrollYProgress} />
      ))}
    </>
  )
}
