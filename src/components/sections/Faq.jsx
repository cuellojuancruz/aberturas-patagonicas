import { ChevronDown } from 'lucide-react'
import { faq } from '../../data/faq.js'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'

/**
 * Preguntas frecuentes. <details>/<summary> nativo a proposito: el
 * acordeon queda accesible y funcional sin una linea de JS, y por lo tanto
 * sin nada que pueda romper el build de SSG.
 */
export default function Faq() {
  return (
    <Section
      tono="sand"
      eyebrow="Dudas frecuentes"
      titulo="Preguntas frecuentes"
      ancho="normal"
    >
      <div className="mx-auto flex max-w-[54rem] flex-col gap-3">
        {faq.map((f, i) => (
          <Reveal key={f.pregunta} delay={i * 60}>
            <details className="group rounded-card border border-line bg-white px-6 py-1 open:pb-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.98rem] font-medium tracking-[-0.006em] text-charcoal">
                {f.pregunta}
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="flex-none text-wheat-deep transition-transform duration-200 ease-brand group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[62ch] text-[0.9rem] leading-relaxed text-ink-soft">
                {f.respuesta}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
