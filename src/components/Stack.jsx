import Reveal from './Reveal'
import { stack } from '../content/profile'

export default function Stack() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
      <Reveal className="flex flex-col items-center gap-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Herramientas del día a día
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
          {stack.map((t) => (
            <li key={t.slug}>
              <img
                src={`https://cdn.simpleicons.org/${t.slug}/f3f1ea`}
                alt={t.name}
                title={t.name}
                width={30}
                height={30}
                loading="lazy"
                className="h-7 w-7 opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-8 sm:w-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
