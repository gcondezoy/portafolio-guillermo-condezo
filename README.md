# Kodea · Portafolio

Portafolio de **Kodea**, el estudio de desarrollo web de Guillermo Condezo (Lima, Perú). Seis proyectos de cliente, todos en producción.

**En vivo:** https://portafolio-guillermo-condezo.vercel.app/

## Stack

- React 19 + Vite 8
- Tailwind CSS v4 (tokens de marca en `src/index.css`)
- Motion (animaciones y micro-interacciones)
- Phosphor Icons · fuentes self-hosted con Fontsource (Space Grotesk, Manrope, JetBrains Mono)

## Características

- Índice de proyectos editorial con vista previa que sigue al cursor
- Casos de estudio en modal con navegación entre proyectos (botones y flechas del teclado)
- Revelados de texto por máscara, botones magnéticos, contadores y barra de progreso de scroll
- Capturas reales de cada proyecto en WebP (dos tamaños por imagen)
- SEO: Open Graph + Twitter card, JSON-LD, sitemap, robots y canonical
- Accesibilidad: `prefers-reduced-motion`, foco visible, enlace para saltar al contenido

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # producción en dist/
```

## Contenido

Todo el contenido editable vive en dos archivos:

- `src/content/profile.js` — identidad, contacto, servicios y métricas
- `src/content/projects.js` — los proyectos (marca, capturas, highlights, enlaces)
