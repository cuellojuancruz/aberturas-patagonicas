/**
 * Alzado tecnico decorativo: marco, travesano y lineas de cota.
 *
 * No es adorno generico — el mundo visual de la marca son planos acotados
 * ("75MM W X 50MM H ALUMINUM FRAME", "6MM THK. TEMPERED GLASS"), que es lo
 * que aparece de fondo en todo el material comercial. Traerlo al hero
 * refuerza el caracter "precisa, confiable" sin necesitar una foto.
 *
 * Se reemplaza por la foto de obra real cuando el cliente entregue el material.
 */
export default function PlanoDecorativo({ className }) {
  return (
    <svg
      viewBox="0 0 420 520"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {/* Marco exterior */}
        <rect x="70" y="70" width="280" height="380" />
        {/* Marco interior (perfil) */}
        <rect x="82" y="82" width="256" height="356" />

        {/* Travesano central */}
        <line x1="210" y1="82" x2="210" y2="438" />
        <rect x="198" y="82" width="24" height="356" />

        {/* Hojas */}
        <rect x="94" y="94" width="92" height="332" strokeDasharray="4 4" opacity="0.55" />
        <rect x="234" y="94" width="92" height="332" strokeDasharray="4 4" opacity="0.55" />

        {/* Sentido de apertura */}
        <path d="M186 94 L 140 260 L 186 426" opacity="0.4" />
        <path d="M234 94 L 280 260 L 234 426" opacity="0.4" />

        {/* Manijas */}
        <line x1="190" y1="248" x2="190" y2="272" strokeWidth="3" />
        <line x1="230" y1="248" x2="230" y2="272" strokeWidth="3" />

        {/* --- Cota horizontal superior --- */}
        <line x1="70" y1="44" x2="350" y2="44" />
        <line x1="70" y1="36" x2="70" y2="52" />
        <line x1="350" y1="36" x2="350" y2="52" />

        {/* --- Cota vertical derecha --- */}
        <line x1="382" y1="70" x2="382" y2="450" />
        <line x1="374" y1="70" x2="390" y2="70" />
        <line x1="374" y1="450" x2="390" y2="450" />

        {/* Linea de referencia al vidrio */}
        <line x1="326" y1="180" x2="368" y2="150" opacity="0.6" />
      </g>

      <g
        fill="currentColor"
        fontFamily="'Roboto Mono', ui-monospace, monospace"
        fontSize="13"
        letterSpacing="1.4"
        opacity="0.85"
      >
        <text x="192" y="34" textAnchor="middle">
          1170
        </text>
        <text
          x="404"
          y="260"
          textAnchor="middle"
          transform="rotate(-90 404 260)"
        >
          1422
        </text>
        <text x="70" y="486" fontSize="11" opacity="0.7">
          FRONT ELEV.
        </text>
        <text x="70" y="504" fontSize="11" opacity="0.7">
          ALUMINIUM FRAME · DVH
        </text>
      </g>
    </svg>
  )
}
