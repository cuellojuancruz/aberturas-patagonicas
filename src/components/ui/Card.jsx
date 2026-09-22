import { Link } from 'react-router-dom'
import cx from '../../lib/cx.js'

/**
 * Tarjeta base. Si recibe `to`, se vuelve clickeable entera y toma el
 * estado de elevacion en hover.
 */
export default function Card({ children, to, className, hover = false }) {
  const clases = cx(
    'flex flex-col gap-2 rounded-card border border-line bg-white p-5 shadow-soft',
    (hover || to) &&
      'transition-shadow transition-transform duration-200 ease-brand hover:-translate-y-0.5 hover:shadow-lift',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={clases}>
        {children}
      </Link>
    )
  }

  return <div className={clases}>{children}</div>
}
