import { AppWindow, DoorOpen, Frame, Layers, MessageCircle, ArrowRight } from 'lucide-react'
import { familias } from '../../data/servicios.js'
import { linkWhatsApp, mensajeServicio } from '../../lib/whatsapp.js'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

const iconos = {
  ventanas: AppWindow,
  puertas: DoorOpen,
  cerramientos: Frame,
  vidrios: Layers,
}

/**
 * Desarrollo largo de cada familia (fase 6): el texto que pelea las
 * keywords locales ("ventanas de aluminio en Trelew", etc.), ademas del
 * resumen corto que ya vive en ServiciosGrid.
 */
export default function ServiciosDetalle() {
  return (
    <Section tono="sand" eyebrow="En detalle" titulo="Cada familia, explicada">
      <div className="flex flex-col gap-4">
        {familias.map((f, i) => {
          const Icono = iconos[f.id]
          return (
            <Reveal key={f.id} delay={i * 70}>
              <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-7 shadow-soft md:p-9">
                <div className="flex items-center gap-3">
                  {Icono && (
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
                      <Icono size={21} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  )}
                  <h3 className="text-[1.15rem] tracking-[-0.01em]">{f.titulo}</h3>
                </div>

                <p className="max-w-[68ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  {f.detalle}
                </p>

                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2 text-[0.85rem] text-ink-mute"
                    >
                      <span
                        className="mt-[0.45em] h-1 w-1 flex-none rounded-[1px] bg-wheat"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                  <Button href={linkWhatsApp(mensajeServicio(f.titulo))} icon={MessageCircle} size="sm">
                    Consultar por {f.titulo.toLowerCase()}
                  </Button>
                  <Button to={`/trabajos?familia=${f.id}`} variant="ghost" size="sm" icon={ArrowRight}>
                    Ver trabajos
                  </Button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
