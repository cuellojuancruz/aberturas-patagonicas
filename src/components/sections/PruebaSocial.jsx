import { Instagram } from 'lucide-react'
import { site } from '../../data/site.js'
import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'

/**
 * Prueba social. Sin testimonios ni numeros inventados: el respaldo real
 * hoy es el Instagram donde se publica cada obra terminada. Cuando haya
 * resenas o citas de clientes reales, van aca.
 */
export default function PruebaSocial() {
  return (
    <Section tono="ivory">
      <Reveal className="flex flex-col items-start gap-6 rounded-panel border border-line bg-white p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-12">
        <div className="flex max-w-[46ch] flex-col gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
            <Instagram size={20} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h2 className="text-[1.4rem] tracking-[-0.015em]">Cada obra terminada, publicada</h2>
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">
            Subimos las fotos reales de cada trabajo a Instagram a medida que lo entregamos. Es la
            forma más directa de ver el resultado, no un render.
          </p>
        </div>

        <Button href={site.instagramUrl} icon={Instagram} size="lg" className="flex-none">
          Seguinos @{site.instagram}
        </Button>
      </Reveal>
    </Section>
  )
}
