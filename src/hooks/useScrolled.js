import { useEffect, useState } from 'react'

/**
 * true cuando la pagina paso de `umbral` px de scroll.
 * Lo usa el Navbar para pasar de transparente a solido, y el FAB de WhatsApp
 * para aparecer despues del hero.
 *
 * SSG-safe: arranca en false y solo toca window dentro del efecto.
 */
export default function useScrolled(umbral = 80) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > umbral)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [umbral])

  return scrolled
}
