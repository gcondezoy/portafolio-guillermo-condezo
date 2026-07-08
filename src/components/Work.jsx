import { useCallback, useState } from 'react'
import Reveal from './Reveal'
import { ClipText } from './TextReveal'
import WorkIndex from './WorkIndex'
import ProjectModal from './ProjectModal'
import { projects } from '../content/projects'

export default function Work() {
  const [activeIdx, setActiveIdx] = useState(null)
  const active = activeIdx === null ? null : projects[activeIdx]
  const count = projects.length

  const open = useCallback((p) => setActiveIdx(projects.indexOf(p)), [])
  const close = useCallback(() => setActiveIdx(null), [])
  const prev = useCallback(() => setActiveIdx((i) => (i + count - 1) % count), [count])
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % count), [count])

  return (
    <section id="proyectos" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Trabajo seleccionado</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <ClipText>Seis clientes,</ClipText>
          <ClipText delay={0.08} className="text-fog">seis rubros distintos.</ClipText>
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-5 text-lg leading-relaxed text-fog">
            De una licorería con panel de control a una constructora de obras civiles. Cada proyecto
            conserva su propia identidad. Pasa el cursor por la lista para ver una vista previa y toca
            para abrir el caso.
          </p>
        </Reveal>
      </div>

      <WorkIndex onOpen={open} />

      <ProjectModal
        project={active}
        onClose={close}
        onPrev={prev}
        onNext={next}
        prevProject={activeIdx === null ? null : projects[(activeIdx + count - 1) % count]}
        nextProject={activeIdx === null ? null : projects[(activeIdx + 1) % count]}
      />
    </section>
  )
}
