import { MessageCircle, Phone, Mail, Instagram, MapPin } from 'lucide-react'
import Seo from '../lib/seo.jsx'
import { site, direccionMapsUrl } from '../data/site.js'
import { linkWhatsApp } from '../lib/whatsapp.js'
import Section from '../components/ui/Section.jsx'
import Button from '../components/ui/Button.jsx'
import ContactoForm from '../components/sections/ContactoForm.jsx'

/** Contacto. Estado: fase 5 completa — datos directos + formulario a Web3Forms. */
export default function Contacto() {
  return (
    <>
      <Seo
        title="Contacto"
        description={`Pedí tu presupuesto de aberturas de aluminio en ${site.zonaTexto}. Trabajamos a partir de planos, planillas de carpinterías, medidas de obra o fotos del espacio.`}
        path="/contacto"
      />

      <div className="pt-[72px]">
        <Section
          eyebrow="Presupuestos"
          titulo="¿Tenés un proyecto para cotizar?"
          bajada="Podemos trabajar a partir de planos, planillas de carpinterías, medidas de obra o fotografías del espacio."
        >
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <ContactoForm />

            {/* Contacto directo */}
            <aside className="flex flex-col gap-5">
              <Button href={linkWhatsApp()} icon={MessageCircle} size="lg" full>
                Escribinos por WhatsApp
              </Button>

              <ul className="flex flex-col gap-px overflow-hidden rounded-card border border-line bg-line">
                <li className="bg-white">
                  <a
                    href={`tel:+54${site.whatsapp.slice(2)}`}
                    className="flex items-center gap-3 px-5 py-4 text-[0.92rem] text-charcoal transition-colors hover:bg-sand/40"
                  >
                    <Phone size={16} className="text-wheat-deep" aria-hidden="true" />
                    <span className="tabular">{site.telefonoDisplay}</span>
                  </a>
                </li>
                <li className="bg-white">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 break-all px-5 py-4 text-[0.92rem] text-charcoal transition-colors hover:bg-sand/40"
                  >
                    <Mail size={16} className="flex-none text-wheat-deep" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li className="bg-white">
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 text-[0.92rem] text-charcoal transition-colors hover:bg-sand/40"
                  >
                    <Instagram size={16} className="text-wheat-deep" aria-hidden="true" />@
                    {site.instagram}
                  </a>
                </li>
                <li className="bg-white">
                  <a
                    href={direccionMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 text-[0.92rem] text-charcoal transition-colors hover:bg-sand/40"
                  >
                    <MapPin size={16} className="flex-none text-wheat-deep" aria-hidden="true" />
                    {site.direccion.texto}
                  </a>
                </li>
              </ul>

              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
                  Horarios del taller
                </p>
                <dl className="mt-2 flex flex-col gap-1">
                  {site.horarios.map((h) => (
                    <div key={h.dias} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[0.88rem] text-charcoal">{h.dias}</dt>
                      <dd className="tabular text-[0.88rem] text-ink-soft">{h.texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-card border border-line bg-white p-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
                  Zona de cobertura
                </p>
                <p className="mt-1.5 text-[0.95rem] text-charcoal">{site.zonaTexto}</p>
                <p className="mt-0.5 text-[0.85rem] text-ink-soft">{site.region}</p>
              </div>
            </aside>
          </div>
        </Section>
      </div>
    </>
  )
}
