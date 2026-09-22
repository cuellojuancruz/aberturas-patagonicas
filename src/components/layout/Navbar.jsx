import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import cx from '../../lib/cx.js'
import { navegacion } from '../../data/site.js'
import useScrolled from '../../hooks/useScrolled.js'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'
import Sidebar from './Sidebar.jsx'

/**
 * Navbar sticky.
 *
 * En la home arranca transparente sobre el hero oscuro (logo en version clara)
 * y a partir de 80px de scroll pasa a ivory con sombra. En el resto de las
 * paginas arranca solida, porque no hay hero oscuro debajo.
 */
export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()
  const scrolled = useScrolled(80)

  const enHome = pathname === '/'
  const transparente = enHome && !scrolled

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-brand',
          transparente ? 'bg-transparent' : 'bg-ivory/95 shadow-soft backdrop-blur-sm',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6 md:px-8">
          <NavLink to="/" aria-label={`${'Aberturas Patagónicas'} — inicio`}>
            <Logo onDark={transparente} />
          </NavLink>

          {/* Navegacion desktop */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {navegacion.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'font-sans text-[0.76rem] font-medium uppercase tracking-[0.16em]',
                    'transition-colors duration-200',
                    transparente
                      ? 'text-on-dark/85 hover:text-wheat'
                      : 'text-ink-soft hover:text-charcoal',
                    isActive && (transparente ? 'text-wheat' : 'text-charcoal'),
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapper, no className en el Button: "inline-flex" es parte de
                sus clases base y le gana a "hidden" en el cascade de
                Tailwind (orden alfabetico de utilidades), asi que ocultarlo
                directo con className="hidden sm:inline-flex" no funciona. */}
            <div className="hidden sm:block">
              <Button to="/contacto" size="sm">
                Pedí tu presupuesto
              </Button>
            </div>

            {/* Hamburguesa mobile */}
            <button
              type="button"
              onClick={() => setAbierto(true)}
              aria-expanded={abierto}
              aria-controls="menu-lateral"
              aria-label="Abrir menú"
              className={cx(
                'flex h-11 w-11 items-center justify-center rounded-field lg:hidden',
                'transition-colors duration-200',
                transparente
                  ? 'text-on-dark hover:bg-on-dark/10'
                  : 'text-charcoal hover:bg-sand/60',
              )}
            >
              <Menu size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Sidebar abierto={abierto} onCerrar={() => setAbierto(false)} />
    </>
  )
}
