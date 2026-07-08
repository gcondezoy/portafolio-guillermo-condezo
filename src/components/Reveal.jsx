import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

export default function Reveal({ children, delay = 0, y = 24, x = 0, blur = false, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y, x, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}
