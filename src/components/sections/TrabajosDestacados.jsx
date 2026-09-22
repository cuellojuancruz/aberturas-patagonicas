import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destacados } from '../../data/trabajos.js'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/**
 * Vidriera de obras en la home: 3-6 trabajos destacados (ver `destacado` en
 * src/data/trabajos.js) con link a la ficha, y un cierre hacia la galeria
 * completa. Mismo tratamiento de card que /trabajos — placeholder de marca
 * hasta que lleguen las fotos definitivas.
 */
export default function TrabajosDestacados() {
  if (destacados.length === 0) return null

  return (
    <Section
      tono="sand"
      eyebrow="Portfolio"
      titulo="Trabajos recientes"
      bajada="Una muestra de las obras que hicimos en Rawson, Trelew y Puerto Madryn."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destacados.map((t, i) => (
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

      <div className="mt-10 flex justify-center md:mt-14">
        <Button to="/trabajos" variant="ghost" icon={ArrowRight}>
          Ver todos los trabajos
        </Button>
      </div>
    </Section>
  )
}
