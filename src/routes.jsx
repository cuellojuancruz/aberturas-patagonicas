import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'
import Trabajos from './pages/Trabajos.jsx'
import TrabajoDetalle from './pages/TrabajoDetalle.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import NotFound from './pages/NotFound.jsx'
import { trabajos } from './data/trabajos.js'

/**
 * Rutas del sitio.
 *
 * `getStaticPaths` es lo que hace que el build genere un HTML por cada obra
 * (/trabajos/ventana-corrediza-trelew/index.html, etc.). Sin eso las fichas
 * no se prerenderizan y se pierde el SEO long tail. Se alimenta de
 * src/data/trabajos.js, que por eso tiene que ser un modulo importable
 * desde Node y no un fetch.
 */
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <Servicios /> },
      { path: 'trabajos', element: <Trabajos /> },
      {
        path: 'trabajos/:slug',
        element: <TrabajoDetalle />,
        getStaticPaths: () => trabajos.map((t) => `trabajos/${t.slug}`),
      },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'contacto', element: <Contacto /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]
