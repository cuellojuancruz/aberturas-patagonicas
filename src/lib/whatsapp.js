import { site } from '../data/site.js'

/**
 * Arma el link de WhatsApp con un mensaje pre-armado.
 * El mensaje cambia segun donde este el usuario: desde la ficha de una obra
 * menciona esa obra, asi el cliente sabe de entrada de que le hablan.
 *
 * @param {string} [mensaje] texto a pre-cargar en el chat
 * @returns {string} URL de wa.me
 */
export function linkWhatsApp(mensaje) {
  const texto = mensaje || `Hola! Quería consultar por un presupuesto de aberturas.`
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`
}

/** Mensaje para la ficha de una obra. */
export function mensajeObra(titulo) {
  return `Hola! Vi "${titulo}" en la web y quería consultar por algo parecido.`
}

/** Mensaje para una familia de servicios. */
export function mensajeServicio(servicio) {
  return `Hola! Quería consultar por ${servicio.toLowerCase()}.`
}
