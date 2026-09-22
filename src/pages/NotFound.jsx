import { MessageCircle } from 'lucide-react'
import Seo from '../lib/seo.jsx'
import { linkWhatsApp } from '../lib/whatsapp.js'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" noindex />

      <div className="pt-[72px]">
        <Section eyebrow="Error 404" titulo="Esta página no existe">
          <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-ink-soft">
            El link puede estar viejo o mal escrito. Estas salidas sí funcionan:
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/">Ir al inicio</Button>
            <Button to="/trabajos" variant="ghost">
              Ver trabajos
            </Button>
            <Button href={linkWhatsApp()} variant="ghost" icon={MessageCircle}>
              WhatsApp
            </Button>
          </div>
        </Section>
      </div>
    </>
  )
}
