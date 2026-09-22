/**
 * Vidrios y lineas de aluminio con los que trabajan (confirmado por el
 * cliente). La linea usada en cada obra puntual es un dato aparte — ver
 * el campo `linea` de src/data/trabajos.js, todavia pendiente por obra.
 */
export const vidrios = [
  {
    tipo: 'Float',
    detalle: 'Vidrio simple transparente. La opción estándar para aberturas comunes.',
  },
  {
    tipo: 'Laminado',
    detalle: 'Dos vidrios unidos por una lámina de seguridad: si se rompe, no salta en pedazos.',
  },
  {
    tipo: 'Templado',
    detalle: 'Tratado térmicamente para mayor resistencia. Se usa en mamparas y puertas.',
  },
  {
    tipo: 'DVH',
    detalle: 'Doble vidriado hermético: dos vidrios con cámara de aire, aísla del frío y el ruido.',
  },
]

export const lineasAluminio = ['Aluar', 'Módena', 'Módena 2', 'A30', 'A40']

export const lineasNota =
  'La línea se elige según la obra y el presupuesto, no al revés.'
