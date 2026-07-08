import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  X,
  Check,
  ArrowUpRight,
  GithubLogo,
  Globe,
  Gauge,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectModal({ project, onClose, onPrev, onNext, prevProject, nextProject }) {
  const reduce = useReducedMotion()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose, onPrev, onNext])

  // Foco al botón de cerrar al abrir (accesibilidad de teclado).
  useEffect(() => {
    if (project) closeRef.current?.focus()
  }, [project])

  // Sin AnimatePresence: su animación de salida se colgaba (StrictMode) y
  // dejaba un modal zombi. Entrada animada, cierre con desmontaje directo.
  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-ink/80 p-4 backdrop-blur-md sm:p-6 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            style={{ '--accent': project.accent }}
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line-2 bg-ink-2"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="block h-1 w-full" style={{ backgroundColor: project.accent }} />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-line-2 bg-ink/70 text-ivory backdrop-blur transition-colors hover:bg-surface"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="border-b border-line/70">
              {/* key por proyecto: remonta y hace fade-in al navegar. Sin
                  AnimatePresence anidado (bloquea el exit del modal padre). */}
              <motion.img
                key={project.slug}
                src={project.shot}
                alt={`Captura de ${project.name}`}
                width="1440"
                height="900"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="aspect-[1440/900] w-full object-cover object-top"
              />
            </div>

            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                <span>{project.sector}</span>
                <span className="text-line-2">/</span>
                <span style={{ color: project.accent }}>{project.status}</span>
                <span className="text-line-2">/</span>
                <span>{project.year}</span>
              </div>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.name}
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-fog">{project.blurb}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Lo que resuelve</h4>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-fog">
                        <Check size={16} weight="bold" className="mt-0.5 shrink-0" style={{ color: project.accent }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-7">
                  {project.role && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Mi rol</h4>
                      <p className="mt-3 text-sm text-ivory">{project.role}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Stack</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fog">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {(project.live || project.admin || project.repo) && (
                <div className="mt-9 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
                    >
                      <Globe size={16} weight="bold" />
                      Ver web
                      <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {project.admin && (
                    <a
                      href={project.admin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-fog"
                    >
                      <Gauge size={16} weight="bold" />
                      Ver panel
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-fog"
                    >
                      <GithubLogo size={16} weight="bold" />
                      Código
                    </a>
                  )}
                </div>
              )}

              {prevProject && nextProject && (
                <div className="mt-9 flex items-center justify-between gap-4 border-t border-line/70 pt-5">
                  <button
                    type="button"
                    onClick={onPrev}
                    className="group inline-flex min-w-0 items-center gap-2 text-sm text-fog transition-colors hover:text-ivory"
                  >
                    <CaretLeft size={15} weight="bold" className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
                    <span className="truncate">{prevProject.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="group inline-flex min-w-0 items-center gap-2 text-sm text-fog transition-colors hover:text-ivory"
                  >
                    <span className="truncate">{nextProject.name}</span>
                    <CaretRight size={15} weight="bold" className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
  )
}
