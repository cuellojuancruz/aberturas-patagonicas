import { AppWindow, DoorOpen, Frame, Layers, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { familias } from '../../data/servicios.js'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'

// Mapa explicito id -> icono. Mejor que resolver por string: se tree-shakea
// y si alguien agrega una familia sin icono, se ve en el codigo y no en runtime.
const iconos = {
  ventanas: AppWindow,
  puertas: DoorOpen,
  cerramientos: Frame,
  vidrios: Layers,
}

/**
 * Las 4 familias de servicios. Cada tarjeta linkea al filtro correspondiente
 * de la galeria, asi el usuario pasa de "que hacen" a "mostrame" sin volver atras.
 */
export default function ServiciosGrid() {
  return (
    <Section
      id="servicios"
      eyebrow="Qué hacemos"
      titulo="Aberturas y cerramientos de aluminio, a medida"
      bajada="Fabricamos según el vano, no al revés. Trabajamos con varias líneas de aluminio y todo tipo de vidrio, incluido DVH."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {familias.map((f, i) => {
          const Icono = iconos[f.id]
          return (
            <Reveal key={f.id} delay={i * 70}>
              <Link
                to={`/trabajos?familia=${f.id}`}
                className="group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-soft transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:border-wheat hover:shadow-lift"
              >
                {Icono && (
                  <span className="flex h-11 w-11 items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
                    <Icono size={21} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                )}

                <h3 className="text-[1.08rem] tracking-[-0.008em]">{f.titulo}</h3>

                <p className="text-[0.9rem] leading-relaxed text-ink-soft">{f.resumen}</p>

                <ul className="mt-1 flex flex-col gap-1.5">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2.5 text-[0.85rem] text-ink-mute"
                    >
                      <span
                        className="mt-[0.45em] h-1 w-1 flex-none rounded-[1px] bg-wheat"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto flex items-center gap-1.5 pt-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-wheat-deep">
                  Ver trabajos
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
