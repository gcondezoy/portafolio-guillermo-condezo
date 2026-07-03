import { projects } from '../content/projects'

function Shot({ p }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-1.5 border-b border-line/70 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{p.name}</span>
      </div>
      <img
        src={p.shot}
        alt={p.name}
        loading="lazy"
        decoding="async"
        className="aspect-[1440/900] w-full object-cover object-top"
      />
    </figure>
  )
}

function Column({ items, drift }) {
  // Duplicamos la lista para que el bucle vertical sea continuo.
  const loop = [...items, ...items]
  return (
    <div className={`flex flex-col gap-5 ${drift}`}>
      {loop.map((p, i) => (
        <Shot key={`${p.slug}-${i}`} p={p} />
      ))}
    </div>
  )
}

export default function HeroGallery() {
  const colA = projects.filter((_, i) => i % 2 === 0)
  const colB = projects.filter((_, i) => i % 2 === 1)
  return (
    <div className="mask-fade-y relative grid h-[560px] grid-cols-2 gap-5 overflow-hidden">
      <Column items={colA} drift="drift-up" />
      <Column items={colB} drift="drift-down" />
    </div>
  )
}
