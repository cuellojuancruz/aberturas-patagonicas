import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFab from './WhatsAppFab.jsx'

/**
 * Estructura comun a todas las paginas.
 * El <main> lleva id="contenido" para el link de salto de teclado.
 */
export default function Layout() {
  const { pathname, hash } = useLocation()

  // Al navegar, volver arriba. Salvo que la URL traiga un ancla.
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-field focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[0.8rem] focus:uppercase focus:tracking-[0.14em] focus:text-on-dark"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
