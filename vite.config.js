import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // vite-react-ssg: genera un .html estático por ruta en el build.
  // Sin esto el sitio sirve un <div id="root"> vacío y se pierde el SEO local,
  // que es el canal principal del negocio. Ver blueprint, seccion 07.
  ssgOptions: {
    formatting: 'minify',
    dirStyle: 'nested',
    // El wildcard (`path: '*'`) no se prerenderiza solo por no tener
    // getStaticPaths. Se agrega /404 a mano para tener un 404.html real
    // (scripts/postbuild.mjs lo copia a la raiz de dist/ despues).
    includedRoutes: (paths) => [...paths, '/404'],
  },
})
