import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'

// Fuentes self-hosted: sin request a Google, sin salto de layout.
// Solo los pesos que usa el sistema de diseno (ver blueprint, seccion 04).
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/800.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto-mono/400.css'

import './styles/index.css'

export const createRoot = ViteReactSSG({ routes })
