import Reveal from './Reveal'
import { ClipText } from './TextReveal'
import { profile, services } from '../content/profile'

export default function About() {
  return (
    <section id="servicios" className="border-t border-line/70 bg-ink-2/30">
      <div className="mx-auto grid max-w-[1400px] scroll-mt-20 gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <ClipText>Del boceto al deploy,</ClipText>
            <ClipText delay={0.08} className="text-fog">sin plantillas.</ClipText>
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-fog">
              Soy {profile.name.split(' ')[0]}, desarrollador web en {profile.location}. Diseño y
              construyo sitios para negocios reales: rápidos, con buen SEO y pensados para
              vender. Cada proyecto arranca en blanco, no en una plantilla.
            </p>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">
              Trabajo el front-end de principio a fin y, cuando el negocio lo pide, también el
              backend y la base de datos.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-line/70 border-t border-line/70">
            {services.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-7 sm:grid-cols-[auto_1fr] sm:gap-x-10">
                  <span className="font-mono text-sm text-muted transition-colors group-hover:text-ivory">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-fog">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
