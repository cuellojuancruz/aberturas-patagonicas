import cx from '../../lib/cx.js'

/**
 * Etiqueta chica sobre un titulo. Es el recurso que mas se repite en la
 * hoja de identidad ("01 · IDENTIDAD", "CARACTER DE MARCA").
 *
 * Ojo con el color: sobre fondo claro va wheat-deep, NUNCA wheat —
 * #C8AA6F sobre #F7F4ED da 2.0:1 y es ilegible. Sobre charcoal si va wheat.
 */
export default function Eyebrow({ children, onDark = false, className }) {
  return (
    <p
      className={cx(
        'font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em]',
        onDark ? 'text-wheat' : 'text-wheat-deep',
        className,
      )}
    >
      {children}
    </p>
  )
}
