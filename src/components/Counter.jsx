import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, animate } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

// Cuenta ascendente al entrar en vista. La animación vive en un useEffect con
// limpieza, así nunca queda congelada a media cuenta si el componente se
// re-monta (StrictMode / HMR).
export default function Counter({ value, pad = 2, duration = 1.6 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [go, setGo] = useState(false)
  const [display, setDisplay] = useState(reduce ? value : 0)

  // Respaldo: si ya está visible al montar, arranca (onViewportEnter no dispara
  // para elementos ya visibles al montar con StrictMode).
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect()
    if (r && r.top < window.innerHeight && r.bottom > 0) setGo(true)
  }, [])

  useEffect(() => {
    if (!go) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [go, value, reduce, duration])

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      onViewportEnter={() => setGo(true)}
      viewport={{ once: true, amount: 0.6 }}
    >
      {String(display).padStart(pad, '0')}
    </motion.span>
  )
}
