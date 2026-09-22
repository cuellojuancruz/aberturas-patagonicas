import { MessageCircle } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Eyebrow from '../ui/Eyebrow.jsx'
import { linkWhatsApp } from '../../lib/whatsapp.js'

/**
 * Cierre de la home. El texto sale tal cual del PDF comercial: es la frase
 * con la que el cliente ya se presenta, y baja la barrera de "no se si tengo
 * lo que me van a pedir".
 */
export default function CtaFinal() {
  return (
    <section className="bg-charcoal text-on-dark">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6">
          <Eyebrow onDark>Presupuestos</Eyebrow>

          <h2 className="max-w-[16ch] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.025em]">
            ¿Tenés un proyecto para cotizar?
          </h2>

          <p className="max-w-[54ch] text-[1.05rem] leading-relaxed text-on-dark-soft">
            Podemos trabajar a partir de planos, planillas de carpinterías, medidas de obra o
            fotografías del espacio.
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Button to="/contacto" size="lg">
              Pedí tu presupuesto
            </Button>
            <Button href={linkWhatsApp()} variant="ghostDark" size="lg" icon={MessageCircle}>
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
