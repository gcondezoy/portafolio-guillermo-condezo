import { useState } from 'react'
import { profile } from '../content/profile'

// Muestra el logo de Kodea. El PNG oficial va en public/kodea-mark.png.
// Se apoya sobre una placa blanca para que el navy del logo resalte en el
// fondo oscuro. Si el archivo aún no existe, cae a una "K" de respaldo.
export default function Logo({ showText = true, size = 36, textClass = 'text-ivory' }) {
  const [err, setErr] = useState(false)
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="grid shrink-0 place-items-center overflow-hidden rounded-lg bg-white"
        style={{ height: size, width: size }}
      >
        {err ? (
          <span className="font-display font-bold text-ink" style={{ fontSize: size * 0.5 }}>
            K
          </span>
        ) : (
          <img
            src="/kodea-mark.png"
            alt={profile.brand}
            className="h-full w-full object-contain p-[3px]"
            onError={() => setErr(true)}
          />
        )}
      </span>
      {showText && (
        <span className={`font-display font-semibold tracking-tight ${textClass}`}>
          {profile.brand}
        </span>
      )}
    </span>
  )
}
