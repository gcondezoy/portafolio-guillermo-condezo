import Reveal from './Reveal'
import { ClipText } from './TextReveal'

const STEPS = [
  {
    title: 'Descubrimiento',
    body: 'Entiendo el negocio, sus clientes y qué tiene que lograr la web antes de escribir una línea de código.',
  },
  {
    title: 'Diseño',
    body: 'Dirección visual propia para cada marca. Tipografía, color y layout se deciden a medida, no en una plantilla.',
  },
  {
    title: 'Desarrollo',
    body: 'Código limpio y componentes reutilizables. Animaciones que suman y rendimiento cuidado desde el inicio.',
  },
  {
    title: 'Lanzamiento',
    body: 'Deploy en Vercel, SEO técnico y Search Console. La web queda en producción, lista para crecer.',
  },
]

export default function Process() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 md:py-32">
      <div className="max-w-3xl">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          <ClipText>Un proceso claro,</ClipText>
          <ClipText delay={0.08} className="text-fog">de la idea al estreno.</ClipText>
        </h2>
      </div>

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} as="li" delay={i * 0.08} className="group">
            <div className="relative border-t border-line pt-6 transition-colors duration-300">
              <span className="absolute -top-px left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              <span className="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
