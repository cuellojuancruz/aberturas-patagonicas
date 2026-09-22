import { MessageCircle, Ruler, FileText, Hammer, Wrench } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'

/**
 * Como trabajamos: el camino de la consulta al montaje, en 5 pasos.
 * Responde la duda tacita de "no se si tengo lo que me van a pedir" antes
 * de que el usuario llegue a Contacto (ver bajada de esa pagina).
 */
const pasos = [
  { icono: MessageCircle, titulo: 'Consulta', detalle: 'Nos contás qué necesitás, por WhatsApp o desde el formulario.' },
  { icono: Ruler, titulo: 'Medición', detalle: 'Trabajamos con planos, planillas, medidas de obra o fotos del espacio.' },
  { icono: FileText, titulo: 'Presupuesto', detalle: 'Te pasamos el costo según el vano, la línea de aluminio y el vidrio elegidos.' },
  { icono: Hammer, titulo: 'Fabricación', detalle: 'Fabricamos a medida, sin adaptar el proyecto a medidas estándar.' },
  { icono: Wrench, titulo: 'Instalación', detalle: 'Instalación propia: el mismo equipo que fabrica hace el montaje.' },
]

export default function ComoTrabajamos() {
  return (
    <Section
      eyebrow="Proceso"
      titulo="Cómo trabajamos"
      bajada="Fabricación e instalación propia, de la medición al montaje."
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pasos.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 70} as="li" className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-soft">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
                  <p.icono size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.72rem] text-ink-mute">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <h3 className="text-[1rem] tracking-[-0.008em]">{p.titulo}</h3>
              <p className="text-[0.86rem] leading-relaxed text-ink-soft">{p.detalle}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
