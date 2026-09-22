import { forwardRef, useId } from 'react'
import cx from '../../lib/cx.js'

/**
 * Campo de formulario con label, ayuda y error. Se usa en la fase 5.
 * El error se anuncia con aria-describedby + role="alert": un error que solo
 * se ve en rojo no existe para quien usa lector de pantalla.
 *
 * Los mensajes explican que pasa y como arreglarlo, sin disculpas:
 * "Ingresá un número de WhatsApp con característica", no "Campo inválido".
 *
 * forwardRef porque react-hook-form registra el input via `ref`
 * (`<Field {...register('nombre')} />`) — sin esto React descarta el ref
 * en silencio y el formulario deja de leer el valor del campo.
 */
const Field = forwardRef(function Field(
  { label, as = 'input', error, ayuda, requerido = false, className, children, ...props },
  ref,
) {
  const id = useId()
  const errorId = `${id}-error`
  const ayudaId = `${id}-ayuda`
  const Tag = as

  const base = cx(
    'w-full rounded-field border bg-white px-4 py-3 font-sans text-[0.95rem] text-charcoal',
    'placeholder:text-ink-mute/70',
    'transition-colors duration-150',
    error ? 'border-[#9b4a3c]' : 'border-line-strong hover:border-wheat',
    as === 'textarea' && 'min-h-[132px] resize-y',
  )

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="font-sans text-[0.82rem] font-medium text-charcoal">
        {label}
        {requerido && (
          <span className="ml-1 text-wheat-deep" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Tag
        ref={ref}
        id={id}
        className={base}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={cx(error && errorId, ayuda && ayudaId) || undefined}
        aria-required={requerido || undefined}
        {...props}
      >
        {children}
      </Tag>

      {ayuda && !error && (
        <p id={ayudaId} className="text-[0.8rem] text-ink-mute">
          {ayuda}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-[0.8rem] font-medium text-[#9b4a3c]">
          {error}
        </p>
      )}
    </div>
  )
})

export default Field
