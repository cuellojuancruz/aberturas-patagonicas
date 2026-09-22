import { MessageCircle, MapPin, Clock } from 'lucide-react'
import Seo from '../lib/seo.jsx'
import { site, direccionMapsUrl } from '../data/site.js'
import { promesa } from '../data/servicios.js'
import { linkWhatsApp } from '../lib/whatsapp.js'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import CtaFinal from '../components/sections/CtaFinal.jsx'
import fotoTaller from '../assets/trabajos/taller.jpg'

/**
 * Nosotros. Estado: fase 6.
 *
 * Falta de verdad: años de trayectoria — sigue pendiente del cliente, ver
 * "Pendiente del cliente" en el README. No se inventa aca. Direccion,
 * horarios y la foto del taller ya estan confirmados.
 */
export default function Nosotros() {
  return (
    <>
      <Seo title="Nosotros" description={site.descripcion} path="/nosotros" />

      <div className="pt-[72px]">
        <Section eyebrow="Quiénes somos" titulo="Carpintería de aluminio en la Patagonia">
          <div className="flex flex-col gap-4">
            <p className="max-w-[62ch] text-[1.08rem] leading-relaxed text-ink-soft">
              {site.descripcion}
            </p>
            <p className="max-w-[62ch] text-[1.02rem] leading-relaxed text-ink-soft">
              {promesa} El contacto directo es {site.referente}.
            </p>
          </div>

          <div className="mt-8">
            <Button href={linkWhatsApp()} icon={MessageCircle} variant="ghost">
              Escribinos por WhatsApp
            </Button>
          </div>
        </Section>

        <TrustBar />

        <Section tono="sand" eyebrow="El taller" titulo="De donde sale cada obra">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <img
              src={fotoTaller}
              alt="Taller de Aberturas Patagónicas: perfiles de aluminio, vidrios y herramientas de corte"
              loading="lazy"
              width={1086}
              height={1448}
              className="aspect-[3/4] w-full rounded-card border border-line object-cover"
            />

            <div className="flex flex-col gap-5">
              <a
                href={direccionMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-card border border-line bg-white p-5 transition-colors hover:border-wheat-deep"
              >
                <MapPin size={18} className="mt-0.5 flex-none text-wheat-deep" aria-hidden="true" />
                <span>
                  <span className="block text-[0.95rem] text-charcoal">{site.direccion.texto}</span>
                  <span className="mt-0.5 block text-[0.8rem] text-ink-mute">Ver en el mapa</span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-card border border-line bg-white p-5">
                <Clock size={18} className="mt-0.5 flex-none text-wheat-deep" aria-hidden="true" />
                <dl className="flex flex-col gap-1">
                  {site.horarios.map((h) => (
                    <div key={h.dias} className="flex items-baseline gap-2 text-[0.9rem]">
                      <dt className="text-charcoal">{h.dias}:</dt>
                      <dd className="tabular text-ink-soft">{h.texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Section>

        <CtaFinal />
      </div>
    </>
  )
}
