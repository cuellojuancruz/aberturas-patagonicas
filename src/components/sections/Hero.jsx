import { MessageCircle } from 'lucide-react'
import { site } from '../../data/site.js'
import { promesa } from '../../data/servicios.js'
import { linkWhatsApp } from '../../lib/whatsapp.js'
import Button from '../ui/Button.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'
import PlanoDecorativo from './PlanoDecorativo.jsx'

/**
 * Hero. Es la tesis del sitio: la promesa de marca y el camino al presupuesto.
 *
 * TODO(fase de cierre): reemplazar PlanoDecorativo por la foto de obra
 * terminada a sangre, con overlay charcoal para sostener el contraste del
 * texto. El <picture> tiene que llevar width/height para no saltar el layout,
 * y ser la unica imagen SIN loading="lazy" del sitio (es el LCP).
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-charcoal text-on-dark">
      {/* Plano de fondo */}
      <PlanoDecorativo className="pointer-events-none absolute -right-16 top-1/2 h-[118%] -translate-y-1/2 text-wheat opacity-[0.13] md:right-4 lg:right-24" />

      {/* Regla dorada inferior: cierra la banda, como en la hoja de identidad */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-wheat" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-24 pt-32 md:px-8 md:pb-28 md:pt-36">
        <div className="flex max-w-[42rem] flex-col gap-7">
          <Eyebrow onDark>{site.zonaTexto}</Eyebrow>

          <h1 className="text-[clamp(2.6rem,7.5vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.028em]">
            {site.claim}
          </h1>

          <p className="max-w-[34ch] text-[1.15rem] leading-relaxed text-on-dark-soft md:text-[1.28rem]">
            {site.bajada}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button to="/contacto" size="lg">
              Pedí tu presupuesto
            </Button>
            <Button href={linkWhatsApp()} variant="ghostDark" size="lg" icon={MessageCircle}>
              WhatsApp
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-dark-soft/80">
            <span className="h-px w-8 bg-wheat" aria-hidden="true" />
            {promesa}
          </p>
        </div>
      </div>
    </section>
  )
}
