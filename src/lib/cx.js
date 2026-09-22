/** Une clases ignorando falsy. Evita traer clsx para 6 lineas. */
export default function cx(...args) {
  return args.filter(Boolean).join(' ')
}
