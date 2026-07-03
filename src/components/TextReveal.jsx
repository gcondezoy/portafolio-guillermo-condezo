import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

// Máscara de revelado por línea, disparada al montar con initial/animate
// (el mismo mecanismo del eyebrow del hero, que sí funciona de forma fiable;
// whileInView no dispara para elementos ya visibles al montar en StrictMode).
export function ClipText({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: 140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Titular que aparece palabra por palabra.
export function WordReveal({ text, className = '', delay = 0, stagger = 0.05 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}
