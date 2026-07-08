import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { projects } from '../content/projects'

export default function WorkIndex({ onOpen }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(null)
  const displayRef = useRef(0)
  if (hovered !== null) displayRef.current = hovered
  const preview = projects[displayRef.current]

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.6 })
  const py = useSpring(my, { stiffness: 350, damping: 32, mass: 0.6 })

  const onMove = (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={() => setHovered(null)} className="relative mt-14">
      <ul className="border-t border-line/70">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line/70">
            <button
              type="button"
              onClick={() => onOpen(p)}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              style={{ '--accent': p.accent }}
              className={`group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left transition-opacity duration-300 md:gap-8 md:py-9 ${
                hovered !== null && hovered !== i ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* rombo de marca: aparece rotando al pasar el cursor */}
              <span className="flex items-center gap-3 md:gap-4">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 scale-0 bg-accent transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-100 group-focus-visible:rotate-45 group-focus-visible:scale-100"
                  style={{ borderRadius: 1 }}
                />
                <span className="font-mono text-xs text-muted md:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>

              <span className="flex min-w-0 items-center gap-4">
                <img
                  src={p.shotSm}
                  alt=""
                  width="720"
                  height="450"
                  loading="lazy"
                  className="h-11 w-[70px] shrink-0 rounded-md border border-line object-cover object-top md:hidden"
                />
                <span className="truncate font-display text-2xl font-semibold tracking-tight text-fog transition-all duration-500 group-hover:text-ivory md:text-4xl lg:text-5xl md:group-hover:translate-x-2">
                  {p.name}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-4 md:gap-8">
                <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted lg:inline">
                  {p.sector}
                </span>
                <span className="hidden font-mono text-xs text-muted sm:inline">{p.year}</span>
                <ArrowUpRight
                  size={22}
                  weight="bold"
                  className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ivory"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Vista previa que sigue al cursor (solo escritorio, puntero fino) */}
      {!reduce && (
        <motion.div
          style={{ x: px, y: py }}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          aria-hidden="true"
        >
          <motion.div
            initial={false}
            animate={{
              opacity: hovered !== null ? 1 : 0,
              scale: hovered !== null ? 1 : 0.92,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="-translate-y-1/2 translate-x-7 overflow-hidden rounded-xl bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            style={{ width: 340 }}
          >
            <div className="flex items-center gap-1.5 border-b border-line/80 px-3 py-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: preview.accent }} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {preview.name}
              </span>
            </div>
            <img
              src={preview.shotSm}
              alt=""
              width="720"
              height="450"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
