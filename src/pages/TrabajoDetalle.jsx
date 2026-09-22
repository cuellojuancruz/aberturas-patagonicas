import { useParams, Link } from 'react-router-dom'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import Seo from '../lib/seo.jsx'
import { getTrabajo } from '../data/trabajos.js'
import { familias } from '../data/servicios.js'
import { linkWhatsApp, mensajeObra } from '../lib/whatsapp.js'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import Lightbox from '../components/ui/Lightbox.jsx'
import NotFound from './NotFound.jsx'

/**
 * Ficha de obra. Es lo que convence al profesional y lo que Google indexa
 * por long tail ("ventana corrediza DVH Trelew"), asi que la ficha tecnica
 * es contenido, no decoracion.
 *
 * Esta ruta se prerenderiza una vez por obra gracias al getStaticPaths
 * declarado en src/routes.jsx.
 */
export default function TrabajoDetalle() {
  const { slug } = useParams()
  const trabajo = getTrabajo(slug)

  if (!trabajo) return <NotFound />

  const familia = familias.find((f) => f.id === trabajo.familia)

  const ficha = [
    ['Tipo', familia?.titulo || '—'],
    ['Localidad', trabajo.localidad],
    ['Año', trabajo.anio],
    ['Línea de aluminio', trabajo.linea],
    ['Vidrio', trabajo.vidrio],
  ].filter(([, v]) => v !== 'A confirmar')

  const ubicacion =
    trabajo.localidad !== 'A confirmar' || trabajo.anio !== 'A confirmar'
      ? `${trabajo.localidad} · ${trabajo.anio}`
      : undefined

  return (
    <>
      <Seo
        title={trabajo.titulo}
        description={trabajo.resumen}
        path={`/trabajos/${trabajo.slug}`}
      />

      <div className="pt-[72px]">
        <Section eyebrow={ubicacion} titulo={trabajo.titulo}>
          <Link
            to="/trabajos"
            className="mb-8 inline-flex items-center gap-2 font-sans text-[0.74rem] font-medium uppercase tracking-[0.16em] text-wheat-deep"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Todos los trabajos
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Fotos */}
            <div className="flex flex-col gap-4">
              {trabajo.fotos.length === 0 ? (
                <div className="flex aspect-[4/3] items-center justify-center rounded-card border border-dashed border-line-strong bg-sand/50">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-wheat-deep/70">
                    Fotos pendientes
                  </span>
                </div>
              ) : (
                <Lightbox fotos={trabajo.fotos} />
              )}
            </div>

            {/* Ficha tecnica */}
            <aside className="flex flex-col gap-6">
              <p className="text-[1rem] leading-relaxed text-ink-soft">{trabajo.resumen}</p>

              <dl className="rounded-card border border-line bg-white shadow-soft">
                {ficha.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex items-baseline justify-between gap-4 px-5 py-3.5 ${
                      i > 0 ? 'border-t border-line' : ''
                    }`}
                  >
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
                      {k}
                    </dt>
                    <dd className="tabular text-right text-[0.9rem] font-medium text-charcoal">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <Button
                href={linkWhatsApp(mensajeObra(trabajo.titulo))}
                icon={MessageCircle}
                full
              >
                Quiero algo parecido
              </Button>
            </aside>
          </div>
        </Section>
      </div>
    </>
  )
}
