import { diferenciales } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'

/**
 * Barra de confianza. Responde "¿me sirven a mi?" en tres segundos,
 * antes de que el usuario tenga que scrollear a buscar nada.
 */
export default function TrustBar() {
  return (
    <section className="border-b border-line bg-sand/40" aria-label="Por qué elegirnos">
      <div className="mx-auto grid max-w-[1200px] gap-px bg-line px-0 sm:grid-cols-2 lg:grid-cols-4">
        {diferenciales.map((d, i) => (
          <Reveal
            key={d.titulo}
            delay={i * 70}
            className="flex flex-col gap-1.5 bg-ivory px-6 py-8 md:px-8"
          >
            <p className="font-display text-[0.95rem] font-bold tracking-[-0.005em] text-charcoal">
              {d.titulo}
            </p>
            <p className="text-[0.86rem] leading-relaxed text-ink-soft">{d.detalle}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
