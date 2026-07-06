import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'
import Magnetic from './Magnetic'
import Logo from './Logo'

const LINKS = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 16)
    if (open || reduce) {
      setHidden(false)
      return
    }
    setHidden(y > prev && y > 160)
  })

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? '-105%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line/60 bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-ink/30 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="Kodea, inicio">
          <Logo size={34} textClass="text-ivory text-[15px]" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm text-fog">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative transition-colors hover:text-ivory">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <Magnetic
            href="#contacto"
            strength={0.3}
            className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink active:scale-[0.97]"
          >
            Conversemos
            <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line-2 text-ivory md:hidden"
        >
          {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/60 bg-ink/95 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base text-fog transition-colors hover:bg-surface hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-sm font-medium text-ink"
              >
                Conversemos
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  )
}
