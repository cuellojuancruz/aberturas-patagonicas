import cx from '../../lib/cx.js'

/**
 * Boton toggle chico para filtros (no navega, no es el Button del sistema).
 */
export default function Chip({ children, active = false, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'inline-flex min-h-[38px] items-center rounded-field border px-4 py-1.5',
        'font-sans text-[0.8rem] font-medium transition-colors duration-200 ease-brand',
        active
          ? 'border-wheat bg-wheat text-charcoal'
          : 'border-line-strong bg-white text-ink-soft hover:border-wheat-deep hover:text-charcoal',
        className,
      )}
    >
      {children}
    </button>
  )
}
