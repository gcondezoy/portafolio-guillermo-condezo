import { motion, useScroll, useSpring } from 'motion/react'

// Barra de progreso de lectura. Feedback de navegación, no decoración.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-accent/40 via-accent to-accent/40"
      aria-hidden="true"
    />
  )
}
