import fotoMampara from '../assets/trabajos/mampara-corrediza-medida.jpg'
import fotoPorton from '../assets/trabajos/porton-corredizo-acceso-peatonal.jpg'
import fotoVentana from '../assets/trabajos/ventana-abrir-simil-madera.jpg'
import fotoCerramiento from '../assets/trabajos/cerramiento-a-medida.jpg'

/**
 * ============================================================================
 * OBRAS — el shape esta CONGELADO, el contenido no.
 * ============================================================================
 *
 * Las primeras 4 fotos reales ya estan cargadas (fase de cierre, adelantada).
 * Localidad, año, línea de aluminio y vidrio de estas 4 obras puntuales
 * quedan en "A confirmar" a pedido del cliente: no se inventan.
 *
 * Para cargar una obra nueva:
 *   1. Poner la foto en src/assets/trabajos/<algo-descriptivo>.jpg
 *   2. Importarla arriba y referenciarla en `fotos`
 *   3. Completar la ficha tecnica
 * Nada mas. No hay que tocar ningun componente.
 *
 * Campos:
 *   slug      string   URL de la ficha. Unico. No cambiar despues de publicar.
 *   titulo    string   Como se llama la obra en la grilla.
 *   familia   string   id de src/data/servicios.js — alimenta el filtro.
 *   localidad string   Rawson | Trelew | Puerto Madryn | ... | 'A confirmar' — filtro + SEO local.
 *   anio      number | 'A confirmar'
 *   linea     string   Linea de aluminio usada en ESTA obra puntual — una de
 *                      src/data/materiales.js#lineasAluminio, o 'A confirmar'.
 *   vidrio    string   Float 4mm | Laminado | Templado 6mm | DVH ... | 'A confirmar'
 *   resumen   string   1-2 frases. Se usa como meta description de la ficha.
 *   destacado boolean  Aparece en la home (mostramos 6).
 *   fotos     array    { src, alt } — alt descriptivo real, es SEO ademas de a11y.
 */
export const trabajos = [
  {
    slug: 'ventana-abrir-simil-madera',
    titulo: 'Ventana de abrir símil madera',
    familia: 'ventanas',
    localidad: 'A confirmar',
    anio: 'A confirmar',
    linea: 'A confirmar',
    vidrio: 'A confirmar',
    resumen:
      'Fabricada en aluminio con acabado símil madera, combina la calidez visual de la madera con la resistencia y el bajo mantenimiento del aluminio. Su apertura practicable permite una ventilación cómoda y un cierre seguro.',
    destacado: true,
    fotos: [
      {
        src: fotoVentana,
        alt: 'Ventana de abrir de aluminio con acabado símil madera, hoja practicable abierta',
      },
    ],
  },
  {
    slug: 'porton-corredizo-acceso-peatonal',
    titulo: 'Portón corredizo con acceso peatonal',
    familia: 'puertas',
    localidad: 'A confirmar',
    anio: 'A confirmar',
    linea: 'A confirmar',
    vidrio: 'A confirmar',
    resumen:
      'Fabricado a medida en aluminio negro, con un diseño de perfiles verticales y puerta peatonal integrada. Una solución funcional y segura que acompaña la estética de la fachada.',
    destacado: true,
    fotos: [
      {
        src: fotoPorton,
        alt: 'Portón corredizo de aluminio negro con perfiles verticales y puerta peatonal integrada',
      },
    ],
  },
  {
    slug: 'mampara-corrediza-medida',
    titulo: 'Mampara corrediza a medida',
    familia: 'cerramientos',
    localidad: 'A confirmar',
    anio: 'A confirmar',
    linea: 'A confirmar',
    vidrio: 'A confirmar',
    resumen:
      'Fabricada en aluminio blanco con amplios paños de vidrio, su sistema corredizo permite aprovechar mejor el espacio y brinda una separación cómoda, luminosa y funcional para el baño.',
    destacado: true,
    fotos: [
      {
        src: fotoMampara,
        alt: 'Mampara corrediza de baño en aluminio blanco con amplios paños de vidrio',
      },
    ],
  },
  {
    slug: 'cerramiento-a-medida',
    titulo: 'Cerramiento a medida',
    familia: 'cerramientos',
    localidad: 'A confirmar',
    anio: 'A confirmar',
    linea: 'A confirmar',
    vidrio: 'A confirmar',
    resumen:
      'En aluminio blanco con amplios paños vidriados y puerta de acceso, diseñado para integrar los ambientes, proteger el espacio y aprovechar al máximo la luz natural.',
    destacado: true,
    fotos: [
      {
        src: fotoCerramiento,
        alt: 'Cerramiento de aluminio blanco con amplios paños vidriados y puerta de acceso',
      },
    ],
  },
]

/** Filtros de la galeria. Se derivan del contenido: no hay listas duplicadas. */
export const localidades = [...new Set(trabajos.map((t) => t.localidad))].sort()

export const destacados = trabajos.filter((t) => t.destacado).slice(0, 6)

export function getTrabajo(slug) {
  return trabajos.find((t) => t.slug === slug) || null
}
