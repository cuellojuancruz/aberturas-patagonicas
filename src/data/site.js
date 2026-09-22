/**
 * Datos del negocio. Fuente unica de verdad: si un telefono o un texto de marca
 * aparece hardcodeado en un componente, esta mal — va aca.
 *
 * TODO(confirmar con el cliente): falta el dominio definitivo (VITE_SITE_URL
 * sigue apuntando al placeholder hasta que se confirme y compre).
 */
export const site = {
  nombre: 'Aberturas Patagónicas',
  rubro: 'Carpintería de aluminio',

  // Mensajes de marca (hoja de identidad 01, seccion 04)
  claim: 'Aberturas hechas para durar.',
  bajada: 'Diseño, fabricación e instalación en toda la Patagonia.',
  descripcion:
    'Somos una carpintería de aluminio dedicada a la fabricación e instalación de aberturas y cerramientos a medida. Trabajamos junto a clientes particulares y profesionales, brindando asesoramiento para adaptar cada solución a las características técnicas y estéticas del proyecto.',

  // Contacto
  referente: 'Martín Paillalef',
  telefono: '2804363310',
  telefonoDisplay: '280 436-3310',
  // Formato wa.me: 54 (país) + 9 (móvil) + 280 (área) + número, sin 0 ni 15.
  whatsapp: '5492804363310',
  email: 'aberturaspatagonicasok@gmail.com',
  instagram: 'aberturaspatagonicas.rw',
  instagramUrl: 'https://www.instagram.com/aberturaspatagonicas.rw/',

  // Zona
  localidades: ['Rawson', 'Trelew', 'Puerto Madryn'],
  region: 'Chubut, Patagonia Argentina',
  zonaTexto: 'Rawson · Trelew · Puerto Madryn',

  // Taller. Requisito de LocalBusiness (JSON-LD, ver src/lib/schema.js) y del
  // perfil de Google Business.
  direccion: {
    calle: 'Roberto Payró 270',
    localidad: 'Rawson',
    codigoPostal: 'U9103',
    texto: 'Roberto Payró 270, Rawson, Chubut',
  },

  // `schemaDias` en formato que espera schema.org (OpeningHoursSpecification):
  // https://schema.org/DayOfWeek
  horarios: [
    {
      dias: 'Lunes a viernes',
      texto: '8 a 18 hs',
      schemaDias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      abre: '08:00',
      cierra: '18:00',
    },
    {
      dias: 'Sábados',
      texto: '9 a 13 hs',
      schemaDias: ['Saturday'],
      abre: '09:00',
      cierra: '13:00',
    },
  ],

  url: import.meta.env.VITE_SITE_URL || 'https://aberturaspatagonicas.com.ar',
}

/** Link directo a Google Maps con la direccion del taller. */
export const direccionMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.direccion.texto}, Argentina`,
)}`

/** Diferenciales del PDF comercial. Van en la barra de confianza de la home. */
export const diferenciales = [
  { titulo: 'Todo tipo de vidrio', detalle: 'Float, laminado, templado y DVH.' },
  { titulo: 'Varias líneas de aluminio', detalle: 'Se elige según la obra y el presupuesto.' },
  { titulo: 'A medida', detalle: 'Fabricamos según el vano, no al revés.' },
  { titulo: site.zonaTexto, detalle: 'Fabricación e instalación propia.' },
]

/** Navegacion principal. La usan Navbar y Sidebar — un solo lugar. */
export const navegacion = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajos', to: '/trabajos' },
  { label: 'Nosotros', to: '/nosotros' },
]
