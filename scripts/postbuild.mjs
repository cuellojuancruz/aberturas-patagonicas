import { existsSync, copyFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * Post-build: dos cosas que vite-react-ssg no hace solo.
 *
 * 1. 404.html en la raiz de dist/. vite-react-ssg ya prerenderiza /404 (ver
 *    `includedRoutes` en vite.config.js), pero lo deja en 404/index.html.
 *    Netlify, Vercel y GitHub Pages buscan un 404.html plano en la raiz.
 *
 * 2. sitemap.xml. robots.txt promete uno — sin este script quedaba roto.
 *    Se genera escaneando los `index.html` que ya escribio el build, no
 *    importando src/data/trabajos.js: ese modulo importa imagenes (.jpg)
 *    para que Vite las procese, y Node no sabe cargar eso fuera de Vite
 *    (ERR_UNKNOWN_FILE_EXTENSION). Escanear dist/ evita ese acoplamiento
 *    para siempre, sea lo que sea que trabajos.js importe a futuro.
 *
 * No importa src/data/site.js aca porque ese modulo lee import.meta.env,
 * que no existe fuera de Vite. Por eso VITE_SITE_URL se lee de nuevo de
 * process.env — hay que correr este script con `--env-file-if-exists=.env`.
 */
const dist = fileURLToPath(new URL('../dist/', import.meta.url))

const notFoundSrc = `${dist}404/index.html`
const notFoundDest = `${dist}404.html`
if (existsSync(notFoundSrc)) {
  copyFileSync(notFoundSrc, notFoundDest)
  console.log('[postbuild] 404.html copiado a la raíz de dist/')
} else {
  console.warn('[postbuild] no se encontró dist/404/index.html — revisar includedRoutes en vite.config.js')
}

const siteUrl = (process.env.VITE_SITE_URL || 'https://aberturaspatagonicas.com.ar').replace(/\/+$/, '')

// Toda pagina real termina en index.html (dirStyle: 'nested' en vite.config.js).
// 404/index.html no es una pagina de contenido: se excluye del sitemap.
const rutas = readdirSync(dist, { recursive: true, withFileTypes: true })
  .filter((e) => e.isFile() && e.name === 'index.html')
  .map((e) => {
    const relDir = `${e.parentPath ?? e.path}`.slice(dist.length).replace(/\\/g, '/')
    return relDir ? `/${relDir}` : '/'
  })
  .filter((ruta) => ruta !== '/404')
  .sort()

const urls = rutas.map((ruta) => `  <url><loc>${siteUrl}${ruta}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

writeFileSync(`${dist}sitemap.xml`, sitemap)
console.log(`[postbuild] sitemap.xml generado con ${rutas.length} rutas`)
