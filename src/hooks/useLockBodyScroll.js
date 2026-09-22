import { useEffect } from 'react'

/**
 * Bloquea el scroll del body mientras el drawer esta abierto.
 * Compensa el ancho de la barra de scroll para que el contenido no salte.
 */
export default function useLockBodyScroll(activo) {
  useEffect(() => {
    if (!activo) return

    const { overflow, paddingRight } = document.body.style
    const compensacion = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (compensacion > 0) document.body.style.paddingRight = `${compensacion}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [activo])
}
