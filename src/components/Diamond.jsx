// El rombo teal del logo Kodea: único ornamento del sitio.
// size en píxeles; se alinea ópticamente con la línea de texto que acompaña.
export default function Diamond({ size = 8, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rotate-45 bg-accent ${className}`}
      style={{ width: size, height: size, borderRadius: Math.max(1, size / 6) }}
    />
  )
}
