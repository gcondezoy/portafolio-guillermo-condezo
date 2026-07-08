# Design

## Theme

Oscuro navy de marca (no "dark mode genérico"): el sitio vive en el azul profundo del logo Kodea. Un solo tema, sin variante clara. El teal `#1fd3a3` es el único acento del marco; cada proyecto del portafolio aporta su propio color de marca puntual (línea, glow, checks).

## Color

Tokens en `src/index.css` bajo `@theme` (Tailwind v4):

- `--color-ink #080f26` fondo base · `--color-ink-2 #0b1533` superficies hundidas
- `--color-surface #0f1a3d` / `--color-surface-2 #14224c` tarjetas y placas
- `--color-line #223257` / `--color-line-2 #31426f` hairlines y bordes
- `--color-ivory #eef1fb` texto principal · `--color-fog #9fabce` secundario · `--color-muted` terciario/mono
- `--color-accent #1fd3a3` acento único del marco (CTAs, foco, selección, progreso)

Regla: gris nunca sobre color; los acentos por proyecto (`project.accent`) solo dentro de su tarjeta/modal/fila.

## Typography

- Display: **Bricolage Grotesque Variable** (títulos h1–h3, con carácter propio; sustituyó a Space Grotesk por ser reflejo de IA saturado)
- Texto: **Manrope Variable**
- Datos/etiquetas: **JetBrains Mono Variable**
- Tracking display: −0.02em (piso −0.04em). Titulares con revelado por máscara (y en píxeles, disparo al montar; ver gotcha de StrictMode en memoria del proyecto).

## Brand motif

El **rombo teal** del logo (cuadrado rotado 45°) es el único ornamento del sitio: bullet de servicios, marcador de hover en el índice de proyectos y remate del titular del hero. No introducir otros adornos (sin dots decorativos, sin barras laterales de color, sin gradientes).

## Components

- `Logo` — placa blanca + `kodea-mark.png`; wordmark en minúsculas como el logo.
- `WorkIndex` — índice editorial numerado (numeración = índice real, permitida) con vista previa que sigue al cursor (`useMotionValue`+`useSpring`); filas no activas se atenúan.
- `ProjectModal` — caso de estudio; SIN AnimatePresence (su exit se cuelga con StrictMode): entrada animada, cierre por desmontaje.
- `Reveal` (y/x + blur opcional), `ClipText`/`WordReveal`, `Magnetic`, `ScrollProgress`.
- `Process` — única otra numeración permitida (secuencia real de 4 pasos).

## Layout

Contenedor `max-w-[1400px]`; secciones `py-24 md:py-32`; hero `lg:min-h-[100dvh]` con galería a la deriva (único marquee). Familias de layout no se repiten entre secciones. Eyebrows uppercase: máximo el del hero (estado de disponibilidad, semántico).

## Motion

Motion (`motion/react`). Easing `[0.16,1,0.3,1]`, 150–900ms. Cada sección tiene un revelado acorde a su contenido (no el mismo fade-up uniforme). Todo respeta `prefers-reduced-motion`. Prohibido: `window.addEventListener('scroll')`, bounce/elastic, AnimatePresence con exit.

## Bans del proyecto

Franjas de métricas (big number + label), border+sombra ancha juntos en la misma tarjeta, eyebrows por sección, números de sección sin secuencia real, em-dash en texto visible, dots decorativos, gradiente en texto.
