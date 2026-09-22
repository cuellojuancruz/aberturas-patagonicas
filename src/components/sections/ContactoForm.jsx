import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, CircleAlert, MessageCircle } from 'lucide-react'
import { site } from '../../data/site.js'
import { familias } from '../../data/servicios.js'
import { estadosProyecto } from '../../data/contacto.js'
import { linkWhatsApp } from '../../lib/whatsapp.js'
import Field from '../ui/Field.jsx'
import Button from '../ui/Button.jsx'

/**
 * Formulario de contacto (fase 5): los 9 campos del blueprint, validados
 * con zod y enviados a Web3Forms desde el cliente. No hay backend propio.
 *
 * Envio con FormData (no JSON): es lo que exige la API de Web3Forms para
 * poder adjuntar el archivo en el mismo request, con el campo `attachment`.
 * https://docs.web3forms.com — confirmado antes de escribir esto, no supuesto.
 */
const schema = z.object({
  nombre: z.string().trim().min(2, 'Ingresá tu nombre completo.'),
  whatsapp: z.string().trim().min(8, 'Ingresá un número de WhatsApp con característica.'),
  email: z.string().trim().email('Ingresá un email válido.'),
  localidad: z.string().min(1, 'Elegí tu localidad.'),
  perfil: z.enum(['particular', 'profesional'], { message: 'Elegí una opción.' }),
  necesita: z.string().min(1, 'Elegí qué necesitás.'),
  estado: z.string().min(1, 'Elegí el estado del proyecto.'),
  mensaje: z.string().trim().min(10, 'Contanos un poco más — mínimo 10 caracteres.'),
})

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function ContactoForm() {
  const [envio, setEnvio] = useState('idle') // idle | exito | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', `Nueva consulta de ${data.nombre} — ${site.nombre}`)
    formData.append('from_name', site.nombre)
    formData.append('nombre', data.nombre)
    formData.append('whatsapp', data.whatsapp)
    formData.append('email', data.email)
    formData.append('localidad', data.localidad)
    formData.append('perfil', data.perfil === 'profesional' ? 'Profesional' : 'Particular')
    formData.append('necesita', data.necesita)
    formData.append('estado_proyecto', data.estado)
    formData.append('message', data.mensaje)

    const archivo = data.adjunto?.[0]
    if (archivo) formData.append('attachment', archivo)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('request failed')

      setEnvio('exito')
      reset()
    } catch {
      setEnvio('error')
    }
  }

  // Sin key configurada (clon local sin .env), no hay a donde mandar el
  // formulario. Mejor decirlo claro que fallar en silencio contra la API.
  if (!WEB3FORMS_KEY) {
    return (
      <div className="rounded-card border border-dashed border-line-strong bg-sand/25 p-8">
        <p className="max-w-[52ch] text-[0.92rem] leading-relaxed text-ink-soft">
          Falta configurar <code className="font-mono text-[0.85em]">VITE_WEB3FORMS_KEY</code> en{' '}
          <code className="font-mono text-[0.85em]">.env</code> para que el formulario pueda
          enviar. Mientras tanto, escribinos directo por WhatsApp o los medios de al lado.
        </p>
      </div>
    )
  }

  if (envio === 'exito') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-line bg-white p-8 shadow-soft">
        <span className="flex h-11 w-11 items-center justify-center rounded-field bg-sand/60 text-wheat-deep">
          <CheckCircle2 size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="text-[1.1rem] tracking-[-0.01em]">Recibimos tu consulta</h3>
        <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-ink-soft">
          Te vamos a responder a la brevedad. Si es urgente, escribinos por WhatsApp mientras
          tanto.
        </p>
        <Button href={linkWhatsApp()} icon={MessageCircle} variant="ghost">
          Escribinos por WhatsApp
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot: oculto para personas, visible para bots de formularios. */}
      <input
        type="checkbox"
        {...register('botcheck')}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre y apellido"
          requerido
          placeholder="Martín Paillalef"
          error={errors.nombre?.message}
          {...register('nombre')}
        />
        <Field
          label="WhatsApp"
          type="tel"
          requerido
          placeholder="280 436-3310"
          error={errors.whatsapp?.message}
          {...register('whatsapp')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          requerido
          placeholder="vos@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Field
          label="Localidad"
          as="select"
          requerido
          defaultValue=""
          error={errors.localidad?.message}
          {...register('localidad')}
        >
          <option value="" disabled>
            Elegí tu localidad
          </option>
          {site.localidades.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
          <option value="otra">Otra</option>
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-sans text-[0.82rem] font-medium text-charcoal">
          Sos particular o profesional
          <span className="ml-1 text-wheat-deep" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="flex gap-5">
          {[
            { value: 'particular', label: 'Particular' },
            { value: 'profesional', label: 'Profesional' },
          ].map((op) => (
            <label
              key={op.value}
              className="flex items-center gap-2 text-[0.92rem] text-charcoal"
            >
              <input
                type="radio"
                value={op.value}
                className="h-4 w-4 accent-wheat-deep"
                {...register('perfil')}
              />
              {op.label}
            </label>
          ))}
        </div>
        {errors.perfil && (
          <p role="alert" className="text-[0.8rem] font-medium text-[#9b4a3c]">
            {errors.perfil.message}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Qué necesitás"
          as="select"
          requerido
          defaultValue=""
          error={errors.necesita?.message}
          {...register('necesita')}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {familias.map((f) => (
            <option key={f.id} value={f.titulo}>
              {f.titulo}
            </option>
          ))}
          <option value="No estoy seguro">No estoy seguro, quiero consultar</option>
        </Field>

        <Field
          label="Estado del proyecto"
          as="select"
          requerido
          defaultValue=""
          error={errors.estado?.message}
          {...register('estado')}
        >
          <option value="" disabled>
            Elegí una opción
          </option>
          {estadosProyecto.map((e) => (
            <option key={e.value} value={e.label}>
              {e.label}
            </option>
          ))}
        </Field>
      </div>

      <Field
        label="Mensaje"
        as="textarea"
        requerido
        placeholder="Contanos qué necesitás: medidas, cantidad de aberturas, plazos…"
        error={errors.mensaje?.message}
        {...register('mensaje')}
      />

      <Field
        label="Adjuntar plano o foto (opcional)"
        type="file"
        accept="image/*,.pdf"
        ayuda="JPG, PNG o PDF. Hasta 5 MB."
        {...register('adjunto')}
      />

      {envio === 'error' && (
        <p className="flex items-start gap-2 text-[0.88rem] text-[#9b4a3c]" role="alert">
          <CircleAlert size={16} className="mt-0.5 flex-none" aria-hidden="true" />
          No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.
        </p>
      )}

      <Button type="submit" loading={isSubmitting} size="lg" className="mt-1">
        Enviar consulta
      </Button>
    </form>
  )
}
