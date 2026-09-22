import { Layers } from 'lucide-react'
import { vidrios, lineasAluminio, lineasNota } from '../../data/materiales.js'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'

/** Materiales: los 4 tipos de vidrio y las lineas de aluminio del PDF comercial. */
export default function Materiales() {
  return (
    <Section
      tono="sand"
      eyebrow="Materiales"
      titulo="Vidrios y líneas de aluminio"
      bajada="Elegimos el vidrio y la línea de aluminio según lo que pida cada obra, no al revés."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vidrios.map((v, i) => (
          <Reveal key={v.tipo} delay={i * 70} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
                <Layers size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="text-[1rem] tracking-[-0.008em]">{v.tipo}</h3>
              <p className="text-[0.86rem] leading-relaxed text-ink-soft">{v.detalle}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 md:mt-14">
        <h3 className="text-[0.95rem] tracking-[-0.008em] text-charcoal">Líneas de aluminio</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {lineasAluminio.map((linea) => (
            <li
              key={linea}
              className="rounded-field border border-line-strong bg-white px-3.5 py-1.5 text-[0.82rem] text-charcoal"
            >
              {linea}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[54ch] text-[0.86rem] leading-relaxed text-ink-soft">
          {lineasNota}
        </p>
      </div>
    </Section>
  )
}
