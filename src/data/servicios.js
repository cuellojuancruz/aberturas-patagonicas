/**
 * Los 10 servicios del PDF, agrupados en 4 familias.
 * Diez bullets sueltos no comunican; cuatro familias se leen de un vistazo
 * y cada una funciona ademas como filtro de la galeria (ver blueprint, 02).
 *
 * `id` es el valor que usa el filtro en /trabajos: no cambiarlo sin migrar
 * tambien el campo `familia` de src/data/trabajos.js.
 */
export const familias = [
  {
    id: 'ventanas',
    titulo: 'Ventanas',
    icono: 'AppWindow',
    resumen: 'Corredizas, de abrir, proyectantes u oscilobatientes, y paños fijos.',
    items: [
      'Ventanas corredizas',
      'Ventanas de abrir',
      'Ventanas proyectantes',
      'Ventanas oscilobatientes',
      'Paños fijos',
    ],
    detalle:
      'Fabricamos e instalamos ventanas de aluminio a medida en Rawson, Trelew y Puerto Madryn. El tipo de apertura se elige según el ambiente y el vano — corrediza para no perder espacio, proyectante u oscilobatiente para ventilar sin exponer el interior — y el vidrio va de float a DVH. El doble vidriado hermético suma aislación térmica y acústica, algo que se nota en la Patagonia.',
  },
  {
    id: 'puertas',
    titulo: 'Puertas y frentes',
    icono: 'DoorOpen',
    resumen: 'Puertas de aluminio para vivienda y frentes para local comercial.',
    items: ['Puertas de aluminio', 'Frentes comerciales', 'Portones corredizos'],
    detalle:
      'Puertas de aluminio para el acceso de una vivienda, frentes completos para locales comerciales y portones corredizos con acceso peatonal integrado, fabricados a medida del vano en Rawson, Trelew y Puerto Madryn. La línea de aluminio y el vidrio se definen según el uso: no es lo mismo una puerta de acceso que un frente vidriado de local con circulación constante.',
  },
  {
    id: 'cerramientos',
    titulo: 'Cerramientos',
    icono: 'Frame',
    resumen: 'Galerías, quinchos y mamparas de baño a medida.',
    items: ['Cerramientos de galerías', 'Cerramientos de quinchos', 'Mamparas'],
    detalle:
      'Cerramos galerías y quinchos con paños fijos y hojas corredizas, y resolvemos mamparas de baño con vidrio templado. Un cerramiento bien resuelto suma un ambiente cubierto sin perder luz natural, y se fabrica a medida del vano existente — no hace falta obra nueva.',
  },
  {
    id: 'vidrios',
    titulo: 'Vidrios y reformas',
    icono: 'Layers',
    resumen: 'Colocación de vidrio o DVH y recambio de aberturas existentes.',
    items: ['Colocación de vidrios', 'Colocación de DVH', 'Recambio de aberturas'],
    detalle:
      'Si ya tenés las aberturas y falta el vidrio, hacemos la colocación sobre marcos existentes, incluido el paso a DVH. También encaramos el recambio completo de aberturas viejas por aluminio nuevo — la opción cuando el marco original ya no da más, no solo el vidrio.',
  },
]

/**
 * "Fabricación e instalación" NO es un servicio mas de la lista: es la promesa
 * que envuelve a los cuatro. Vive en el hero y en la barra de confianza.
 */
export const promesa = 'Fabricación e instalación propia, de la medición al montaje.'
