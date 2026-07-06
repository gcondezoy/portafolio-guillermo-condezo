import { GithubLogo, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'
import { profile } from '../content/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-xl bg-white px-4 py-3">
            <img src="/kodea-logo.png" alt="Kodea" className="h-7 w-auto" />
          </span>
          <p className="text-sm text-muted">
            {profile.role} · por {profile.name} · {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-fog transition-colors hover:border-fog hover:text-ivory"
          >
            <GithubLogo size={18} weight="regular" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Correo"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-fog transition-colors hover:border-fog hover:text-ivory"
          >
            <EnvelopeSimple size={18} weight="regular" />
          </a>
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-fog transition-colors hover:border-fog hover:text-ivory"
          >
            <WhatsappLogo size={18} weight="regular" />
          </a>
        </div>
      </div>
      <div className="border-t border-line/50">
        <p className="mx-auto max-w-[1400px] px-5 py-6 font-mono text-xs text-muted sm:px-8">
          © {year} {profile.brand}. Hecho con React, Vite y Tailwind.
        </p>
      </div>
    </footer>
  )
}
