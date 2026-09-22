import Seo from '../lib/seo.jsx'
import { site } from '../data/site.js'
import ServiciosGrid from '../components/sections/ServiciosGrid.jsx'
import ServiciosDetalle from '../components/sections/ServiciosDetalle.jsx'
import CtaFinal from '../components/sections/CtaFinal.jsx'

export default function Servicios() {
  return (
    <>
      <Seo
        title="Servicios"
        description={`Ventanas, puertas, cerramientos, mamparas y colocación de vidrio y DVH en ${site.zonaTexto}. Fabricación e instalación propia.`}
        path="/servicios"
      />

      <div className="pt-[72px]">
        <ServiciosGrid />
        <ServiciosDetalle />
        <CtaFinal />
      </div>
    </>
  )
}
