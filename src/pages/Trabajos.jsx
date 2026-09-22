import { Link, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import Seo from '../lib/seo.jsx'
import { site } from '../data/site.js'
import { trabajos, localidades } from '../data/trabajos.js'
import { familias } from '../data/servicios.js'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Chip from '../components/ui/Chip.jsx'

/**
 * Galeria de obras.
 *
 * Estado: fase 4. Filtros por familia (`?familia=`) y localidad
 * (`?localidad=`) via query string, asi que los links de ServiciosGrid
 * ("Ver trabajos" de cada familia) siguen funcionando tal cual.
 *
 * No hay pagina estatica por combinacion de filtro: solo /trabajos se
 * prerenderiza (ver getStaticPaths en routes.jsx). Filtrar es progressive
 * enhancement client-side sobre ese HTML, no una ruta nueva para SEO.
 *
 * Falta: el lightbox (ver Lightbox.jsx) se usa en la ficha de cada obra;
 * aca en la grilla no aplica hasta que haya fotos reales.
 */
export default function Trabajos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const familiaActiva = searchParams.get('familia') || 'todos'
  const localidadActiva = searchParams.get('localidad') || 'todas'

  const setFiltro = (clave, valor) => {
    const next = new URLSearchParams(searchParams)
    if (!valor || valor === 'todos' || valor === 'todas') next.delete(clave)
    else next.set(clave, valor)
    setSearchParams(next, { replace: true })
  }

  const filtrados = trabajos.filter(
    (t) =>
      (familiaActiva === 'todos' || t.familia === familiaActiva) &&
      (localidadActiva === 'todas' || t.localidad === localidadActiva),
  )

  const hayFiltros = familiaActiva !== 'todos' || localidadActiva !== 'todas'

  return (
    <>
      <Seo
        title="Trabajos"
        description={`Obras de aberturas y cerramientos de aluminio realizadas en ${site.zonaTexto}.`}
        path="/trabajos"
      />

      <div className="pt-[72px]">
        <Section
          eyebrow="Portfolio"
          titulo="Trabajos realizados"
          bajada="Obras de ventanas, cerramientos y mamparas en Rawson, Trelew y Puerto Madryn."
        >
          <div className="mb-10 flex flex-col gap-4 md:mb-14">
            <div className="flex flex-wrap gap-2">
              <Chip active={familiaActiva === 'todos'} onClick={() => setFiltro('familia', 'todos')}>
                Todas las familias
              </Chip>
              {familias.map((f) => (
                <Chip
                  key={f.id}
                  active={familiaActiva === f.id}
                  onClick={() => setFiltro('familia', f.id)}
                >
                  {f.titulo}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Chip
                active={localidadActiva === 'todas'}
                onClick={() => setFiltro('localidad', 'todas')}
              >
                Todas las localidades
              </Chip>
              {localidades.map((l) => (
                <Chip
                  key={l}
                  active={localidadActiva === l}
                  onClick={() => setFiltro('localidad', l)}
                >
                  {l}
                </Chip>
              ))}

              {hayFiltros && (
                <button
                  type="button"
                  onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
                  className="ml-1 inline-flex items-center gap-1 font-sans text-[0.78rem] font-medium text-wheat-deep hover:underline"
                >
                  <X size={14} aria-hidden="true" />
                  Quitar filtros
                </button>
              )}
            </div>
          </div>

          {filtrados.length === 0 ? (
            <p className="text-[0.95rem] text-ink-soft">
              No hay trabajos publicados con esa combinación todavía. Probá con otro filtro.
            </p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((t, i) => (
                <li key={t.slug}>
                  <Reveal delay={i * 70} className="h-full">
                    <Link
                      to={`/trabajos/${t.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      {t.fotos[0] ? (
                        <img
                          src={t.fotos[0].src}
                          alt={t.fotos[0].alt}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      ) : (
                        // Placeholder de marca: bloque en soft sand, nunca stock.
                        // Se ve intencional y deja obvio que falta la foto.
                        <div className="flex aspect-[4/3] items-center justify-center bg-sand/70">
                          <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-wheat-deep/70">
                            Foto pendiente
                          </span>
                        </div>
                      )}

                      <div className="flex flex-1 flex-col gap-2 p-5">
                        {(t.localidad !== 'A confirmar' || t.anio !== 'A confirmar') && (
                          <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-wheat-deep">
                            {t.localidad} · {t.anio}
                          </p>
                        )}
                        <h3 className="text-[1.02rem] tracking-[-0.008em]">{t.titulo}</h3>
                        <p className="text-[0.88rem] leading-relaxed text-ink-soft">{t.resumen}</p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </>
  )
}
