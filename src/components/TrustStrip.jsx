import Reveal from './Reveal'
import Counter from './Counter'
import { stats } from '../content/profile'

export default function TrustStrip() {
  return (
    <section className="border-y border-line/70 bg-ink-2/40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <dl className="grid grid-cols-2 divide-line/60 md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="flex flex-col gap-1 py-8 md:items-center md:py-10"
            >
              <dt className="font-display text-4xl font-semibold tabular-nums md:text-5xl">
                <Counter value={s.value} />
                {s.suffix}
              </dt>
              <dd className="font-mono text-xs uppercase tracking-widest text-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
