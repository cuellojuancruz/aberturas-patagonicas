import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import cx from '../../lib/cx.js'
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js'

/**
 * Grilla de fotos + visor modal. Mismo estandar de accesibilidad que
 * Sidebar.jsx: foco atrapado, Escape cierra, el foco vuelve a la miniatura
 * que abrio el modal, scroll del body bloqueado, `inert` cuando esta cerrado.
 *
 * No renderiza nada si no hay fotos: la ficha maneja el placeholder
 * "Fotos pendientes" ella misma.
 */
export default function Lightbox({ fotos }) {
  const [indice, setIndice] = useState(null)
  const abierto = indice !== null

  const panelRef = useRef(null)
  const cerrarRef = useRef(null)
  const focoPrevio = useRef(null)

  useLockBodyScroll(abierto)

  const abrir = (i) => {
    focoPrevio.current = document.activeElement
    setIndice(i)
  }
  const cerrar = () => setIndice(null)
  const siguiente = () => setIndice((i) => (i + 1) % fotos.length)
  const anterior = () => setIndice((i) => (i - 1 + fotos.length) % fotos.length)

  useEffect(() => {
    if (!abierto) return

    cerrarRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        cerrar()
        return
      }
      if (e.key === 'ArrowRight') siguiente()
      else if (e.key === 'ArrowLeft') anterior()

      if (e.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll('button')
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
    // Deliberadamente sin `indice`: siguiente/anterior actualizan estado via
    // funcion, asi que no hace falta re-suscribir el listener en cada foto —
    // si se agrega, el cleanup devuelve el foco a la miniatura en cada
    // cambio de foto en lugar de solo al cerrar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto])

  if (fotos.length === 0) return null

  const foto = abierto ? fotos[indice] : null

  return (
    <>
      {/* Con una sola foto no tiene sentido la grilla de miniaturas: queda
          una celda chica perdida en una columna pensada para varias. Ahí va
          grande, a todo el ancho. */}
      <div className={fotos.length > 1 ? 'grid grid-cols-2 gap-3 sm:grid-cols-3' : undefined}>
        {fotos.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => abrir(i)}
            aria-label={`Ver foto ampliada: ${f.alt}`}
            className={cx(
              'aspect-[4/3] w-full overflow-hidden rounded-card border border-line',
              fotos.length === 1 && 'block',
            )}
          >
            <img
              src={f.src}
              alt={f.alt}
              loading={i === 0 ? undefined : 'lazy'}
              width={600}
              height={450}
              className="h-full w-full object-cover transition-transform duration-200 ease-brand hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={foto ? `Foto ${indice + 1} de ${fotos.length}: ${foto.alt}` : undefined}
        inert={!abierto || undefined}
        onClick={cerrar}
        className={cx(
          'fixed inset-0 z-50 flex items-center justify-center bg-charcoal/92 p-4',
          'transition-opacity duration-200 ease-brand',
          abierto ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <button
          ref={cerrarRef}
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-field text-on-dark hover:bg-on-dark/10 sm:right-5 sm:top-5"
        >
          <X size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        {fotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                anterior()
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-field text-on-dark hover:bg-on-dark/10 sm:left-4"
            >
              <ChevronLeft size={26} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                siguiente()
              }}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-field text-on-dark hover:bg-on-dark/10 sm:right-4"
            >
              <ChevronRight size={26} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        )}

        {foto && (
          <img
            src={foto.src}
            alt={foto.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-card object-contain"
          />
        )}

        {foto && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[0.72rem] text-on-dark-soft">
            {indice + 1} / {fotos.length}
          </p>
        )}
      </div>
    </>
  )
}
