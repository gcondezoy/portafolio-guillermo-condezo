import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { profile } from '../content/profile'
import { projects } from '../content/projects'
import HeroGallery from './HeroGallery'
import { ClipText } from './TextReveal'
import Magnetic from './Magnetic'
import Diamond from './Diamond'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  // Última palabra del titular pegada al rombo para que nunca quede huérfano.
  const headlineWords = profile.headline[1].replace(/\.$/, '').split(' ')
  const headlineLast = headlineWords.pop()
  const fade = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE },
  })

  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 pt-28 pb-16 sm:px-8 lg:min-h-[100dvh] lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-0"
    >
      <div className="lg:col-span-7">
        <motion.p {...fade(0)} className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-fog">
          {profile.available && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          )}
          <span className="uppercase">{profile.availableText}</span>
          <span className="text-muted">·</span>
          <span className="uppercase">{profile.location}</span>
        </motion.p>

        <h1 className="font-display text-[15vw] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[5rem]">
          <ClipText delay={0.15}>{profile.headline[0]}</ClipText>
          <ClipText delay={0.28} className="text-fog">
            {headlineWords.join(' ')}{' '}
            <span className="whitespace-nowrap">
              {headlineLast}
              <Diamond size={12} className="ml-2.5 align-baseline" />
            </span>
          </ClipText>
        </h1>

        <motion.p {...fade(3)} className="mt-8 max-w-[46ch] text-lg leading-relaxed text-fog">
          {profile.intro}
        </motion.p>

        <motion.div {...fade(4)} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic
            href="#proyectos"
            strength={0.4}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink active:scale-[0.97]"
          >
            Ver proyectos
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Magnetic>
          <Magnetic
            href="#contacto"
            strength={0.3}
            className="group inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-medium text-ivory transition-colors hover:border-fog"
          >
            Conversemos
            <ArrowUpRight size={16} weight="bold" className="text-fog transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        className="hidden lg:col-span-5 lg:block"
      >
        <HeroGallery />
      </motion.div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:hidden [scrollbar-width:none]">
        {projects.map((p) => (
          <figure
            key={p.slug}
            className="w-[78vw] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="flex items-center gap-1.5 border-b border-line/70 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{p.name}</span>
            </div>
            <img
              src={p.shotSm}
              alt={p.name}
              width="720"
              height="450"
              loading="lazy"
              className="aspect-[1440/900] w-full object-cover object-top"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
