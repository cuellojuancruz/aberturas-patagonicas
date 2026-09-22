# Aberturas Patagónicas — sitio web

Carpintería de aluminio en Rawson, Trelew y Puerto Madryn.
React + Vite + Tailwind v4, con generación estática (SSG) por ruta.

---

## Arrancar

```bash
npm install
npm run dev
```

Abre en http://localhost:5173

Para que el formulario de contacto pueda enviar, copiá `.env.example` a `.env`
y completá `VITE_WEB3FORMS_KEY` con la access key del formulario en
[web3forms.com](https://web3forms.com) (el destinatario de los envíos se
configura en el dashboard de Web3Forms, en Form Settings — no en el código).

> **Nota:** `vite-react-ssg` todavía no soporta `react-router-dom@7` (le falta
> el subpath `react-router-dom/server` que usa para el prerenderizado), por
> eso el proyecto fija `react-router-dom` en `^6.30.6`. `.npmrc` tiene
> `legacy-peer-deps=true` porque `vite-react-ssg` declara ese peer como
> `^6.14.1` sin el rango `||^7` que en la practica ya soportaria.

### Scripts

| Comando             | Qué hace                                                        |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo (Vite normal, sin SSG).                   |
| `npm run build`     | Build con **SSG**: un `.html` estático por ruta. Es el de verdad. |
| `npm run build:spa` | Build SPA sin SSG. Solo como escape si el SSG falla.             |
| `npm run preview`   | Sirve `dist/` para revisar el build.                             |

### Cómo verificar que el SSG está funcionando

Después de `npm run build`, en `dist/` tiene que haber un HTML por ruta:

```
dist/index.html
dist/servicios/index.html
dist/trabajos/index.html
dist/trabajos/ventanas-corredizas-vivienda-trelew/index.html
dist/nosotros/index.html
dist/contacto/index.html
```

Y al abrir cualquiera con un editor de texto tenés que **ver el contenido en el
HTML**, no un `<div id="root"></div>` vacío. Eso es todo el punto: sin esto,
Google indexa peor y WhatsApp no arma el preview al compartir el link.

---

## Deploy

`dist/` es un sitio 100% estático — sirve en cualquier host estático, sin
servidor Node detrás.

**Netlify (más rápido para una preview):**
1. `npm run build`
2. Arrastrar la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop)

**Netlify / Vercel / Cloudflare Pages (conectado al repo):**
- Build command: `npm run build`
- Publish/output directory: `dist`
- Variables de entorno (imprescindibles, se leen en build-time):
  `VITE_WEB3FORMS_KEY` y `VITE_SITE_URL`

Ojo con `VITE_SITE_URL`: mientras no este el dominio definitivo, el JSON-LD,
las canonical URLs y el `sitemap.xml` van a apuntar a lo que tenga esa
variable en el momento del build. Sirve para mostrarle el sitio al cliente
en una URL de preview, pero hay que volver a buildear una vez que el dominio
este confirmado y cargado en `.env` / la config del host.

---

## Estructura

```
src/
├── data/          ← el "CMS". Contenido acá, nunca hardcodeado en componentes.
├── lib/           ← SEO, JSON-LD, links de WhatsApp, helpers.
├── hooks/
├── components/
│   ├── ui/        ← primitivos del sistema de diseño
│   ├── layout/    ← navbar, sidebar, footer, FAB
│   └── sections/  ← bloques de la home
├── pages/         ← una por ruta
├── routes.jsx     ← mapa de rutas + getStaticPaths del SSG
└── styles/index.css ← tokens de marca (@theme de Tailwind v4)
```

### Reglas que sostienen el proyecto

1. **Ningún color hardcodeado.** Todo sale de `src/styles/index.css`. En un
   componente se escribe `bg-charcoal`, `text-wheat-deep`, nunca un hex.
2. **`wheat` no se usa como texto sobre fondo claro.** #C8AA6F sobre #F7F4ED da
   2.0:1 y es ilegible. Para eso está `wheat-deep` (#7F6229, 5.2:1).
3. **Nada de `window` ni `document` durante el render.** Solo dentro de
   `useEffect`. Es lo que rompe el build de SSG.
4. **El contenido va en `src/data/`** como módulos importables desde Node. Si
   se mueve a un `fetch`, el SSG deja de poder generar las fichas de obra.
5. **Toda página renderiza un `<Seo/>`.** Sin eso queda con el title genérico.

---

## Estado

| Fase | Qué          | Estado                                                      |
| ---- | ------------ | ----------------------------------------------------------- |
| 1    | Setup + sistema de diseño | ✅                                              |
| 2    | Layout y navegación       | ✅ — navbar, sidebar, footer, FAB              |
| 3    | Home completa             | ✅ — trabajos destacados, proceso, materiales, prueba social, FAQ |
| 4    | Trabajos                  | ✅ — filtros por familia/localidad y lightbox en la ficha |
| 5    | Contacto                  | ✅ — formulario (react-hook-form + zod + Web3Forms), probado end-to-end |
| 6    | Servicios y Nosotros      | ✅ — desarrollo por familia en Servicios, Nosotros con lo confirmado (falta taller/dirección/horarios del cliente) |
| 7    | Pulido y producción       | ⏳ — código listo (ver abajo); faltan los insumos del cliente |

### Fase 7 — lo que ya está

- `/ui` (muestrario interno) borrado: `src/pages/UiKit.jsx` y su ruta en
  `src/routes.jsx` ya no existen.
- `sitemap.xml` se genera solo en cada `npm run build`
  (`scripts/postbuild.mjs`), a partir de `src/data/trabajos.js` — no hay que
  tocarlo a mano cuando se suma una obra.
- `404.html` real en la raíz de `dist/`, para que Netlify/Vercel/GitHub Pages
  lo sirvan en vez de su 404 genérico.
- `og:image` ya no apunta a un archivo que no existe (rompía el preview de
  WhatsApp/redes). Vuelve a aparecer solo cuando se pase `image` a `<Seo/>`.

Falta lo que solo puede resolver el cliente — ver la lista de abajo.

---

## Pendiente del cliente

- [x] Logo → integrado en `Logo.jsx` (JPEG recortado, `src/assets/logo/logo-claro.jpeg`)
- [ ] Versión del logo en fondo transparente y tono claro, para usar sobre el
      hero oscuro y el footer → hasta que llegue, esos lugares muestran el
      wordmark de texto (ver `Logo.jsx`)
- [x] Líneas de aluminio → `src/data/materiales.js#lineasAluminio` (Aluar,
      Módena, Módena 2, A30, A40), mostradas en la sección Materiales de la
      home. Falta todavía cuál se usó en cada obra puntual — ver el próximo
      ítem
- [x] Dirección y horarios del taller → `src/data/site.js`, ya alimentan el
      JSON-LD de `LocalBusiness` (requisito de Google Business Profile) y se
      muestran en Contacto, Nosotros y el footer
- [ ] Dominio → `.env` y `robots.txt`
- [ ] Fotos de obras + qué línea de aluminio se usó en cada una (diferido al
      cierre) → `src/assets/trabajos/` y el campo `linea` en
      `src/data/trabajos.js`. Cuando lleguen, tiene sentido sumar un filtro
      por línea en `/trabajos` igual al de familia/localidad
- [ ] Fotos del taller → `src/pages/Nosotros.jsx` (placeholder "Fotos del
      taller pendientes")
- [ ] Imagen para compartir en redes (1200×630) → pasarla como `image` a
      `<Seo/>` en cada página; sin esto no hay preview al compartir el link
