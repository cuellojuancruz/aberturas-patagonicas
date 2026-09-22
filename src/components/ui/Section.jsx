import cx from '../../lib/cx.js'
import Eyebrow from './Eyebrow.jsx'

/**
 * Envoltorio de seccion: contenedor, ritmo vertical y encabezado.
 * Todo el espaciado de secciones sale de aca — si una pagina define su
 * propio padding vertical, se rompe el ritmo del sitio.
 *
 * `tono`: ivory (default) | sand | dark
 */
const tonos = {
  ivory: 'bg-ivory text-charcoal',
  sand: 'bg-sand/45 text-charcoal',
  dark: 'bg-charcoal text-on-dark',
}

export default function Section({
  children,
  id,
  eyebrow,
  titulo,
  bajada,
  tono = 'ivory',
  ancho = 'normal',
  className,
}) {
  const oscuro = tono === 'dark'

  return (
    <section id={id} className={cx('py-16 md:py-24', tonos[tono], className)}>
      <div
        className={cx(
          'mx-auto px-6 md:px-8',
          ancho === 'ancho' ? 'max-w-[1320px]' : 'max-w-[1200px]',
        )}
      >
        {(eyebrow || titulo || bajada) && (
          <header className="mb-10 flex max-w-[68ch] flex-col gap-3 md:mb-14">
            {eyebrow && <Eyebrow onDark={oscuro}>{eyebrow}</Eyebrow>}
            {titulo && (
              <h2 className="text-[clamp(1.6rem,3.4vw,2.35rem)] tracking-[-0.018em]">
                {titulo}
              </h2>
            )}
            {bajada && (
              <p className={cx('text-[1.05rem]', oscuro ? 'text-on-dark-soft' : 'text-ink-soft')}>
                {bajada}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
