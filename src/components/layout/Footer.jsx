import { Link } from 'react-router-dom'
import { Phone, Mail, Instagram, MapPin } from 'lucide-react'
import { site, navegacion, direccionMapsUrl } from '../../data/site.js'
import { familias } from '../../data/servicios.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-on-dark">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div className="flex flex-col gap-4">
            <Logo onDark />
            <p className="max-w-[38ch] text-[0.92rem] leading-relaxed text-on-dark-soft">
              Fabricación e instalación de aberturas y cerramientos de aluminio a medida en{' '}
              {site.zonaTexto}.
            </p>
            <a
              href={direccionMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-on-dark-soft/70 transition-colors hover:text-wheat"
            >
              <MapPin size={13} aria-hidden="true" />
              {site.direccion.texto}
            </a>
          </div>

          {/* Navegacion */}
          <nav aria-label="Pie de página">
            <h2 className="mb-4 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-wheat">
              Navegación
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navegacion.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[0.92rem] text-on-dark-soft transition-colors hover:text-wheat"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contacto"
                  className="text-[0.92rem] text-on-dark-soft transition-colors hover:text-wheat"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h2 className="mb-4 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-wheat">
              Contacto
            </h2>
            <ul className="flex flex-col gap-2.5 text-[0.92rem] text-on-dark-soft">
              <li>
                <a
                  href={`tel:+54${site.whatsapp.slice(2)}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-wheat"
                >
                  <Phone size={14} aria-hidden="true" />
                  {site.telefonoDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-wheat"
                >
                  <Mail size={14} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-wheat"
                >
                  <Instagram size={14} aria-hidden="true" />@{site.instagram}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[0.85rem] text-on-dark-soft/80">{site.referente}</p>
          </div>
        </div>

        {/* Servicios como texto plano: SEO local barato y honesto */}
        <div className="mt-14 border-t border-on-dark/10 pt-8">
          <p className="text-[0.82rem] leading-relaxed text-on-dark-soft/70">
            {familias.flatMap((f) => f.items).join(' · ')}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-on-dark/10 pt-8 text-[0.78rem] text-on-dark-soft/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nombre}
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">{site.zonaTexto}</p>
        </div>
      </div>
    </footer>
  )
}
