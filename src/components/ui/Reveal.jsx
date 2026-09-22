import { useEffect, useRef, useState } from 'react'

/**
 * Animacion de entrada al hacer scroll.
 *
 * Dos cuidados que importan:
 *  - SSG-safe: el IntersectionObserver vive dentro de useEffect, asi que el
 *    render en Node nunca toca window. Romper esto es la causa numero uno
 *    de que el build de SSG explote.
 *  - Degrada bien: el CSS solo esconde el contenido si el documento tiene la
 *    clase .js (la agrega el script inline de index.html). En el HTML estatico
 *    que ve Google, todo esta visible.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin soporte de observer, mostramos y listo.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'in' : 'pending'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}
