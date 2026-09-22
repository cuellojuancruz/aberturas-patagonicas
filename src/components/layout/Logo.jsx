import cx from '../../lib/cx.js'
import logoClaro from '../../assets/logo/logo-claro.jpeg'
import logoVectorizado from '../../assets/logo/LogoVectorizado.svg'

/**
 * Logo real (la casita con el monograma AP) para fondos claros — es el
 * unico archivo que mando el cliente por ahora, un JPEG con fondo blanco/gris
 * casi solido, no transparente.
 *
 * TODO(cliente): pedir una version en fondo transparente (idealmente SVG) en
 * tono claro para usar sobre el hero oscuro y el footer. Hasta que llegue,
 * `onDark` sigue mostrando el wordmark tipografiado: el JPEG con fondo claro
 * se veria como un rectangulo gris pegado sobre el charcoal.
 */
export default function Logo({ onDark = false, className }) {
  if (!onDark) {
    return (
      <img
        src={logoVectorizado}
        alt="Aberturas Patagónicas"
        className={cx('h-11 w-auto object-contain', className)}
      />
    )
  }

  return (
    <span className={cx('flex flex-col leading-none', className)}>
      <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.015em] text-on-dark">
        Aberturas
      </span>
      <span className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.34em] text-wheat">
        Patagónicas
      </span>
    </span>
  )
}
