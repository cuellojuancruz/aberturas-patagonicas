import { site } from '../data/site.js'

/**
 * JSON-LD. Es lo que le permite a Google mostrar el negocio como ficha local
 * (telefono, zona, horarios) en vez de como un resultado azul mas.
 * Para este rubro rinde tanto como el sitio.
 */
export function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.nombre,
    description: site.descripcion,
    url: site.url,
    telephone: `+54${site.whatsapp.slice(2)}`,
    email: site.email,
    sameAs: [site.instagramUrl],
    areaServed: site.localidades.map((l) => ({
      '@type': 'City',
      name: l,
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.direccion.calle,
      addressLocality: site.direccion.localidad,
      postalCode: site.direccion.codigoPostal,
      addressRegion: 'Chubut',
      addressCountry: 'AR',
    },
    openingHoursSpecification: site.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schemaDias,
      opens: h.abre,
      closes: h.cierra,
    })),
  }
}

export function faqPage(preguntas) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  }
}
