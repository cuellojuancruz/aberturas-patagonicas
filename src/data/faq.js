import { site } from './site.js'

/**
 * Preguntas frecuentes de la home. Todas las respuestas salen de datos ya
 * confirmados (site.js, servicios.js) — nada de plazos ni cifras inventadas.
 */
export const faq = [
  {
    pregunta: '¿Qué necesito para pedir un presupuesto?',
    respuesta:
      'Podés mandarnos planos, planillas de carpintería, medidas tomadas en obra o directamente fotos del espacio. Trabajamos a partir de lo que tengas.',
  },
  {
    pregunta: '¿Solo fabrican o también instalan?',
    respuesta:
      'Las dos cosas: fabricación e instalación propia, de la medición al montaje.',
  },
  {
    pregunta: '¿Trabajan con particulares y profesionales?',
    respuesta:
      'Sí. Trabajamos junto a clientes particulares y también con profesionales, adaptando cada solución a las características técnicas y estéticas del proyecto.',
  },
  {
    pregunta: '¿Qué tipos de vidrio usan?',
    respuesta: 'Float, laminado, templado y DVH (doble vidriado hermético), según lo que pida cada obra.',
  },
  {
    pregunta: '¿Puedo consultar sin compromiso?',
    respuesta: `Sí, escribinos por WhatsApp y te asesoramos antes de definir nada. Trabajamos en ${site.zonaTexto}.`,
  },
]
