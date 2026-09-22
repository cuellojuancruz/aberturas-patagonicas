import { MessageCircle } from 'lucide-react'
import cx from '../../lib/cx.js'
import { linkWhatsApp } from '../../lib/whatsapp.js'
import useScrolled from '../../hooks/useScrolled.js'

/**
 * Boton flotante de WhatsApp. Aparece recien despues del hero para no tapar
 * el CTA principal. Es el canal que mas se usa en el rubro: no es decorativo.
 */
export default function WhatsAppFab({ mensaje }) {
  const visible = useScrolled(600)

  return (
    <a
      href={linkWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={cx(
        'fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center',
        'rounded-full bg-charcoal text-wheat shadow-lift',
        'transition-all duration-300 ease-brand',
        'hover:scale-105 hover:bg-[#413f3c]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}
