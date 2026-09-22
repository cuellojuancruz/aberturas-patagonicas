import { Link } from 'react-router-dom'
import cx from '../../lib/cx.js'

/**
 * Boton del sistema. Renderiza <Link>, <a> o <button> segun las props,
 * pero siempre se ve igual: no hay dos estilos de boton en el sitio.
 *
 *   <Button to="/contacto">Pedí tu presupuesto</Button>
 *   <Button href={linkWhatsApp()} variant="ghost">WhatsApp</Button>
 *   <Button type="submit" loading={enviando}>Enviar</Button>
 *
 * Variantes:
 *   primary   wheat de fondo, texto charcoal — 6.0:1, cumple AA
 *   dark      charcoal de fondo, texto ivory
 *   ghost     borde, sin relleno; sobre fondo claro
 *   ghostDark borde claro; sobre bandas oscuras
 */
const variantes = {
  primary: 'bg-wheat text-charcoal hover:bg-[#b9995a] active:bg-[#ab8c50]',
  dark: 'bg-charcoal text-on-dark hover:bg-[#413f3c] active:bg-[#4b4844]',
  ghost:
    'border border-line-strong text-charcoal hover:bg-sand/50 active:bg-sand',
  ghostDark:
    'border border-on-dark-soft/50 text-on-dark hover:bg-on-dark/10 active:bg-on-dark/15',
}

const tamanos = {
  sm: 'text-[0.78rem] px-4 py-2 gap-1.5',
  md: 'text-[0.82rem] px-6 py-3 gap-2',
  lg: 'text-[0.88rem] px-8 py-4 gap-2.5',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  full = false,
  loading = false,
  className,
  icon: Icon,
  ...props
}) {
  const clases = cx(
    'inline-flex items-center justify-center rounded-field font-sans font-medium',
    'uppercase tracking-[0.14em] whitespace-nowrap',
    'transition-colors duration-200 ease-brand',
    'disabled:opacity-50 disabled:pointer-events-none',
    // Area tactil minima de 44px en mobile.
    'min-h-[44px]',
    variantes[variant] || variantes.primary,
    tamanos[size] || tamanos.md,
    full && 'w-full',
    className,
  )

  const contenido = (
    <>
      {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {contenido}
      </Link>
    )
  }

  if (href) {
    const externo = href.startsWith('http')
    return (
      <a
        href={href}
        className={clases}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {contenido}
      </a>
    )
  }

  return (
    <button className={clases} disabled={loading || props.disabled} {...props}>
      {loading ? 'Enviando…' : contenido}
    </button>
  )
}
