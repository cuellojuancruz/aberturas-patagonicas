import Seo from '../lib/seo.jsx'
import { localBusiness, faqPage } from '../lib/schema.js'
import { site } from '../data/site.js'
import { faq } from '../data/faq.js'
import Hero from '../components/sections/Hero.jsx'
import TrustBar from '../components/sections/TrustBar.jsx'
import ServiciosGrid from '../components/sections/ServiciosGrid.jsx'
import TrabajosDestacados from '../components/sections/TrabajosDestacados.jsx'
import ComoTrabajamos from '../components/sections/ComoTrabajamos.jsx'
import Materiales from '../components/sections/Materiales.jsx'
import PruebaSocial from '../components/sections/PruebaSocial.jsx'
import Faq from '../components/sections/Faq.jsx'
import CtaFinal from '../components/sections/CtaFinal.jsx'

/** Home. Estado: fase 3 completa — las 8 secciones del blueprint. */
export default function Home() {
  return (
    <>
      <Seo
        description={`${site.rubro} en ${site.zonaTexto}. Fabricación e instalación de ventanas, puertas, cerramientos y mamparas de aluminio a medida.`}
        path="/"
        jsonLd={[localBusiness(), faqPage(faq)]}
      />

      <Hero />
      <TrustBar />
      <ServiciosGrid />
      <TrabajosDestacados />
      <ComoTrabajamos />
      <Materiales />
      <PruebaSocial />
      <Faq />
      <CtaFinal />
    </>
  )
}
