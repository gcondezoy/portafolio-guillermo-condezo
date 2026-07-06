import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, Check, ArrowUpRight, GithubLogo, Globe, Gauge } from '@phosphor-icons/react'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-ink/80 p-4 backdrop-blur-md sm:p-6 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="block h-1 w-full" style={{ backgroundColor: project.accent }} />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-line-2 bg-ink/70 text-ivory backdrop-blur transition-colors hover:bg-surface"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="border-b border-line/70">
              <img
                src={project.shot}
                alt={`Captura de ${project.name}`}
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
