# Publicar la presentación en el servidor web (junto a WordPress)

Guía para el área de TI / administración del sitio web. La presentación es un conjunto de **archivos estáticos** (HTML, JS, CSS, imágenes y un Excel). No necesita base de datos, PHP ni plugins, y no se instala dentro de WordPress.

## 1. Subir la carpeta
1. Por **SFTP/FTP** o el **administrador de archivos** del hosting (cPanel, Plesk), cree una carpeta pública, por ejemplo:
   `public_html/presentaciones/cartera-2026-11/`
2. Suba **todo el contenido** de esta carpeta respetando la estructura (incluida la subcarpeta `assets/` y el archivo oculto `.htaccess`).
   - Si el cliente FTP no muestra archivos ocultos, active «mostrar archivos ocultos» para subir `.htaccess`.
3. Dirección resultante: `https://SU-SITIO/presentaciones/cartera-2026-11/` (abre `index.html`).

**No usar** la Biblioteca de medios de WordPress ni pegar el HTML en una página: WordPress rechaza archivos `.html`/`.js`, aplana carpetas y elimina scripts.

WordPress no interfiere: sus reglas de reescritura solo actúan sobre direcciones que no existen como archivo o carpeta.

## 2. Qué hace el `.htaccess` incluido (Apache)
- Desactiva el listado de archivos y usa `index.html` como entrada.
- Sirve `.xlsx` con el tipo correcto.
- `noindex`: la presentación no aparece en buscadores.
- Caché: HTML, JS y Excel **sin caché** (los cambios se ven al recargar); imágenes y estilos con caché de 7 días.
- Bloquea la descarga de archivos internos (`.md`, `exportar-datos.html`, respaldos del Excel).
- Incluye la **protección con usuario y contraseña**, que debe activarse (ver punto 4).

## 3. Revisar en el sitio
| Punto | Qué verificar |
|---|---|
| **Caché del sitio / CDN** (WP Rocket, LiteSpeed Cache, W3 Total Cache, Cloudflare…) | Excluir la ruta `/presentaciones/` de la caché. En Cloudflare: regla «Bypass cache» para esa ruta. |
| **Plugins de seguridad** (Wordfence, iThemes/Solid Security, Sucuri) | Que no bloqueen la descarga de `.xlsx` ni de `.js` en esa ruta. |
| **Política de seguridad (CSP)** | Si el sitio envía `Content-Security-Policy`, para esta ruta se necesita: `script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'`. La presentación no usa recursos externos ni scripts en línea. |
| **HTTPS** | Usar la dirección con `https://` (pantalla completa y sincronización de ventanas funcionan mejor). |
| **Hosting gestionado** (p. ej. WordPress.com) | Confirmar que se permite subir carpetas propias por SFTP fuera de WordPress. |

## 4. Proteger el acceso con contraseña (OBLIGATORIO · decisión de PROINVERSIÓN)
Las **notas del presentador** (preguntas y respuestas sugeridas) viajan dentro de `contenido.js`/`datos.xlsx`, y el Excel tiene columnas internas (Responsable, Comentarios). Sin contraseña, cualquiera con el enlace podría descargarlos. Se protege **toda la carpeta**.

**Opción A · cPanel (recomendada, sin tocar archivos)**
1. cPanel → **Archivos → Privacidad del directorio** (*Directory Privacy*).
2. Navegar hasta la carpeta de la presentación (p. ej. `public_html/presentaciones/cartera-2026-11`) → **Editar**.
3. Marcar **«Proteger con contraseña este directorio»**, escribir un nombre (p. ej. «Presentacion PROINVERSION») → **Guardar**.
4. En «Crear usuario»: usuario y contraseña segura (12+ caracteres) → **Guardar**.
5. No descomentar el bloque `AuthType` del `.htaccess`: cPanel añade sus propias líneas.

**Opción B · manual (Plesk, VPS, servidor propio)**
1. Por SSH: `htpasswd -c -B /ruta/fuera/de/public_html/.htpasswd-presentaciones USUARIO` (pide la contraseña; `-B` = cifrado bcrypt).
   - Plesk: *Sitios web y dominios → Directorios protegidos con contraseña* hace lo mismo desde la interfaz.
2. En el `.htaccess` de la carpeta, quitar los `#` del bloque final y poner en `AuthUserFile` esa misma ruta.
3. Si el servidor es Nginx: usar las líneas `auth_basic` del punto 6.

**Comprobaciones**
- Solo con **HTTPS**: con http la contraseña viajaría sin cifrar.
- Abrir la dirección en una ventana de incógnito: debe pedir usuario y contraseña; tras ingresarlos, la presentación, el botón PDF y la lectura de `datos.xlsx` funcionan normalmente (el navegador recuerda el acceso durante la sesión).
- Probar `…/contenido.js` y `…/datos.xlsx` en incógnito **sin** credenciales: deben responder 401 (no autorizado).
- Antes de un evento: abrir la presentación e ingresar la contraseña **antes** de conectar el proyector, para que el cuadro de acceso no aparezca en la pantalla gigante.
- Entregar usuario y contraseña solo a presentadores y equipos técnicos, por un canal interno (no por el mismo correo que el enlace). Cambiarla si rota el personal.

## 5. Actualizar los datos
- Los equipos técnicos editan `datos.xlsx` (en SharePoint/OneDrive) y quien tenga acceso FTP **reemplaza `datos.xlsx`** en la carpeta del servidor. La presentación lo lee al recargar (F5).
- Alternativa sin FTP: en la vista del presentador, botón **«Cargar Excel»**.
- `contenido.js`, `datos.js` e imágenes solo cambian si DSI entrega una versión nueva de la presentación.

## 6. Si el servidor es Nginx (no Apache)
El `.htaccess` no aplica; agregar en la configuración del sitio:
```nginx
location /presentaciones/ {
    add_header X-Robots-Tag "noindex, nofollow";
    location ~* \.(html|js|xlsx)$ { add_header Cache-Control "no-cache, must-revalidate"; add_header X-Robots-Tag "noindex, nofollow"; }
    location ~* (\.md|exportar-datos\.html|datos-respaldo-.*\.xlsx)$ { deny all; }
    # Protección opcional:
    # auth_basic "Presentacion PROINVERSION";
    # auth_basic_user_file /etc/nginx/.htpasswd-presentaciones;
}
types { application/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsx; }
```

## 7. Prueba final (5 minutos)
1. Abrir `https://SU-SITIO/presentaciones/cartera-2026-11/` en incógnito → debe **pedir usuario y contraseña**; tras ingresarlos, portada con dos botones.
2. **Vista del presentador**: arriba debe decir «Datos: datos.xlsx · fecha».
3. «Abrir vista de audiencia» → avanzar con → y verificar que ambas ventanas se mueven juntas.
4. Botón **ES/EN** y botón **PDF** en la vista de audiencia.
5. Intentar abrir `…/REVISION-DATOS.md` → debe responder «Prohibido» (403).
