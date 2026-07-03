import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { WordReveal } from './TextReveal'
import { WhatsappLogo, EnvelopeSimple, ArrowUpRight } from '@phosphor-icons/react'
import { profile } from '../content/profile'

const waMessage = encodeURIComponent(
  'Hola Guillermo, vi tu portafolio y quiero conversar sobre un proyecto web.',
)

export default function Contact() {
  const wa = `https://wa.me/${profile.whatsapp}?text=${waMessage}`
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent('Proyecto web')}`

  return (
    <section
      id="contacto"
      className="border-t border-line/70 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-28 text-center sm:px-8 md:py-40">
        <Reveal>
          {profile.available && (
            <p className="mb-8 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-fog">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availableText}
            </p>
          )}
          <h2 className="mx-auto max-w-[16ch] font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
            <WordReveal text="¿Tienes un proyecto en mente?" stagger={0.06} />
          </h2>
          <p className="mx-auto mt-7 max-w-[46ch] text-lg leading-relaxed text-fog">
            Cuéntame qué necesitas y te respondo con una propuesta. Suelo contestar el mismo día.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic
              href={wa}
              target="_blank"
              rel="noreferrer"
              strength={0.3}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-ink active:scale-[0.98] sm:w-auto"
            >
              <WhatsappLogo size={18} weight="fill" />
              Escríbeme por WhatsApp
              <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Magnetic>
            <Magnetic
              href={mail}
              strength={0.25}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-2 px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:border-fog sm:w-auto"
            >
              <EnvelopeSimple size={18} weight="regular" />
              Enviar correo
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
