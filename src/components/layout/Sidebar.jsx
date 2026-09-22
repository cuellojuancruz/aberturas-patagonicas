import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X, Phone, Mail, Instagram, MessageCircle } from 'lucide-react'
import cx from '../../lib/cx.js'
import { navegacion, site } from '../../data/site.js'
import { linkWhatsApp } from '../../lib/whatsapp.js'
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js'
import Button from '../ui/Button.jsx'

/**
 * Drawer de navegacion mobile.
 *
 * Lo que casi siempre se saltea y rompe el uso con teclado, resuelto aca:
 *  - foco atrapado adentro mientras esta abierto
 *  - Escape cierra
 *  - al cerrar, el foco vuelve al boton que lo abrio
 *  - scroll del body bloqueado
 *  - aria-modal + role dialog para lectores de pantalla
 *  - `inert` cuando esta cerrado: fuera de pantalla no debe recibir foco,
 *    o el usuario de teclado "cae" dentro de un menu que no ve
 */
export default function Sidebar({ abierto, onCerrar }) {
  const panelRef = useRef(null)
  const cerrarRef = useRef(null)
  const focoPrevio = useRef(null)
  const { pathname } = useLocation()

  // El padre pasa una arrow nueva en cada render y el Navbar re-renderiza al
  // scrollear. Sin esta ref, el efecto de foco se re-ejecutaria todo el tiempo
  // y su cleanup devolveria el foco a la hamburguesa mientras el menu esta abierto.
  const cerrarRef2 = useRef(onCerrar)
  cerrarRef2.current = onCerrar

  useLockBodyScroll(abierto)

  // Cierra al navegar.
  useEffect(() => {
    if (abierto) cerrarRef2.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Foco: guardar, mover adentro, devolver al cerrar.
  useEffect(() => {
    if (!abierto) return

    focoPrevio.current = document.activeElement
    cerrarRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        cerrarRef2.current()
        return
      }

      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return

      const primero = focusables[0]
      const ultimo = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      focoPrevio.current?.focus?.()
    }
  }, [abierto])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCerrar}
        aria-hidden="true"
        className={cx(
          'fixed inset-0 z-50 bg-charcoal/60 transition-opacity duration-300 ease-brand lg:hidden',
          abierto ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id="menu-lateral"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!abierto || undefined}
        className={cx(
          'fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-[380px] flex-col',
          'bg-charcoal text-on-dark shadow-lift',
          'transition-transform duration-300 ease-brand lg:hidden',
          abierto ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-end px-5 py-4">
          <button
            ref={cerrarRef}
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="flex h-11 w-11 items-center justify-center rounded-field text-on-dark transition-colors hover:bg-on-dark/10"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6" aria-label="Principal (móvil)">
          {navegacion.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'border-b border-on-dark/10 py-4',
                  'font-display text-[1.35rem] font-bold tracking-[-0.01em]',
                  'transition-colors duration-200',
                  isActive ? 'text-wheat' : 'text-on-dark hover:text-wheat',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-5 px-6 pb-8 pt-8">
          <Button href={linkWhatsApp()} icon={MessageCircle} full>
            Escribinos por WhatsApp
          </Button>

          <ul className="flex flex-col gap-3 text-[0.88rem] text-on-dark-soft">
            <li>
              <a
                href={`tel:+54${site.whatsapp.slice(2)}`}
                className="flex items-center gap-3 transition-colors hover:text-wheat"
              >
                <Phone size={15} aria-hidden="true" />
                {site.telefonoDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-wheat"
              >
                <Mail size={15} aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-wheat"
              >
                <Instagram size={15} aria-hidden="true" />@{site.instagram}
              </a>
            </li>
          </ul>

          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-on-dark-soft/70">
            {site.zonaTexto}
          </p>
        </div>
      </div>
    </>
  )
}
