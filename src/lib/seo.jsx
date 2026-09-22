import { Head } from 'vite-react-ssg'
import { site } from '../data/site.js'

/**
 * Meta por ruta. Usa el <Head/> propio de vite-react-ssg, que serializa los
 * tags dentro del HTML estatico de cada pagina durante el build — que es
 * justamente el punto de usar SSG. No hace falta react-helmet-async.
 *
 * Toda pagina tiene que renderizar un <Seo/>. Sin el, la ruta queda con el
 * title generico y Google la indexa como duplicada.
 */
export default function Seo({ title, description, path = '/', image, noindex = false, jsonLd }) {
  const titulo = title ? `${title} · ${site.nombre}` : `${site.nombre} · Aberturas de aluminio en ${site.zonaTexto}`
  const desc = description || site.descripcion
  const url = `${site.url}${path}`
  // Sin foto de marca todavia (pendiente del cliente, ver README). Mejor no
  // mandar og:image que mandarlo roto: un preview sin imagen es mejor que
  // uno que WhatsApp/redes intentan cargar y no existe.
  const og = image ? `${site.url}${image}` : null

  return (
    <Head>
      <title>{titulo}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.nombre} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {og && <meta property="og:image" content={og} />}
      <meta property="og:locale" content="es_AR" />

      <meta name="twitter:card" content={og ? 'summary_large_image' : 'summary'} />
      {og && <meta name="twitter:image" content={og} />}

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Head>
  )
}
