# NexoAI — landing page

Landing de una sola página para captar leads (empresarios colombianos) para NexoAI,
lista para publicar en **GitHub Pages**.

## Estructura
```
nexoai/
├── index.html
├── assets/
│   ├── style.css
│   └── script.js
└── README.md
```

## 1. Configura tu número de WhatsApp (obligatorio)
Abre `assets/script.js` y edita la primera línea:

```js
const WHATSAPP_NUMBER = "573000000000"; // tu número real, con indicativo, sin +
```

El formulario y el botón flotante abren WhatsApp con los datos del lead ya escritos,
listos para enviarte — así conviertes cada visita en una conversación real.

## 2. Publica en GitHub Pages
1. Crea un repositorio nuevo en GitHub (puede llamarse `nexoai` o `nexoai-landing`).
2. Sube estos 3 archivos/carpetas manteniendo la misma estructura.
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/root`.
5. Guarda. En un par de minutos tu web quedará publicada en:
   `https://tu-usuario.github.io/nexoai/`

## 3. Comparte en LinkedIn
- Usa esa URL en tu perfil, en publicaciones y en mensajes directos a empresarios.
- Al compartir el link, LinkedIn intentará leer la imagen de vista previa
  (`og-image.png`, referenciada en el `<head>`). Agrega una imagen 1200×630px
  con ese nombre dentro de `assets/` para que se vea bien al compartir
  (si no la agregas, simplemente no se mostrará miniatura — el resto funciona igual).

## 4. Opcional: guardar los leads en una base de datos real
Ahora mismo el formulario no tiene backend (GitHub Pages es estático), así que
envía cada lead directo a tu WhatsApp. Si más adelante quieres además guardarlos
en una hoja de cálculo o base de datos, puedes:
- Conectar el `<form>` a [Formspree](https://formspree.io) (gratis) agregando
  `action="https://formspree.io/f/tu-id"` y `method="POST"` al `<form id="leadForm">`,
  o
- Enviar los datos del formulario a un flujo de **n8n** con un webhook, ya que
  manejas esa herramienta — así cada lead entra directo a tu CRM o Airtable con
  el mismo lead scoring que ya construiste antes.

## Contenido y diseño
- Narrativa visual: la página "amanece" a medida que se hace scroll (medianoche
  en el hero → mediodía en el formulario → noche otra vez en el footer), representando
  que NexoAI trabaja las 24 horas.
- Sin dependencias externas de pago ni imágenes de stock: iconos en SVG inline,
  mockup de WhatsApp construido en CSS/JS puro.
- Tipografías: Bricolage Grotesque (títulos) + Inter (texto), vía Google Fonts.
- Todos los textos son editables directamente en `index.html`.
