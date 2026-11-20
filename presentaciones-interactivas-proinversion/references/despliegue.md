# Publicación, uso en eventos y solución de problemas

## Guía completa para TI
Cada presentación incluye `PUBLICAR-EN-SERVIDOR.md` (subida junto a WordPress, `.htaccess` para Apache, configuración Nginx, caché/CDN, CSP, protección con contraseña y prueba final). SharePoint y OneDrive en el navegador NO sirven para alojarla (no ejecutan HTML): usar servidor web o carpeta sincronizada.

## Publicar en los servidores de PROINVERSIÓN
- Copiar la carpeta completa `salidas/<nombre>/` a una ruta del servidor web interno, p. ej. `https://<servidor>/presentaciones/cartera-2026-11/`.
- Compartir con los trabajadores solo el enlace a `index.html`. Para actualizar textos, cifras o notas se reemplaza `contenido.js` (o imágenes en `assets/img/`): el enlace no cambia.
- No requiere base de datos, PHP ni internet externo: son archivos estáticos.
- Recomendado: servir con cabecera `Cache-Control: no-cache` para `contenido.js`, de modo que los cambios se vean al recargar.

## OneDrive
- **Carpeta sincronizada en la PC** (Explorador de archivos): funciona igual que una carpeta local; abrir `index.html` con doble clic. Antes de un evento: clic derecho en la carpeta → «Mantener siempre en este dispositivo» para no depender de internet.
- **OneDrive / SharePoint en el navegador**: NO sirve para presentar; no ejecutan páginas HTML (las descargan o las muestran como texto). Para un enlace web, publicar en un servidor.
- **Datos**: si el equipo actualiza `datos.xlsx` en OneDrive, en la vista del presentador pulsar **«Cargar Excel»** y elegir ese archivo. Se actualizan ambas vistas al instante y queda recordado en ese navegador (tiene prioridad sobre `datos.js` mientras sea más reciente).

## Uso sin servidor (USB o carpeta local)
- Funciona abriendo `index.html` con doble clic en Chrome o Edge.
- La sincronización entre ventanas funciona si la vista de audiencia se abre **desde** el botón "Abrir vista de audiencia" del presentador (o como otra pestaña del mismo navegador).

## Montaje en evento (pantalla gigante + monitor de retorno)
1. Laptop conectada al sistema de video en modo **Extender** (Win + P).
2. Abrir `presentador.html` en la laptop / monitor de retorno.
3. "Abrir vista de audiencia": si el navegador lo permite (permiso de "administración de ventanas" en Chrome/Edge), se abre directamente en la segunda pantalla; si no, arrastrarla.
4. En la ventana de audiencia: `F` o doble clic → pantalla completa.
5. El control remoto (clicker) envía `Av Pág / Re Pág` o flechas: funciona en cualquiera de las dos ventanas que tenga el foco.
6. Probar el idioma (`L`) y la pantalla negra (`B`) antes de iniciar.

## Reunión en sala (laptop + HDMI)
Igual que arriba; el monitor de la laptop muestra el presentador y la TV/proyector la audiencia.

## Teclado
| Tecla | Audiencia | Presentador |
|---|---|---|
| → · Av Pág · Espacio · Enter | siguiente paso / escena | igual |
| ← · Re Pág · Retroceso | anterior | igual |
| L | cambiar idioma ES/EN | igual (sincroniza) |
| B · . | pantalla negra | igual |
| F | pantalla completa | — |
| O / G | vista general de escenas | — |
| número + Enter | ir a la escena N | — |
| T | — | iniciar / pausar cronómetro |
| Inicio / Fin | primera / última escena | primera |

## Parámetros de URL
- `audiencia.html?lang=en` abre en inglés; `?escena=12` abre en la escena 12; `&paso=final` muestra todos los pasos.
- `?qa=1` desactiva animaciones (para capturas de control de calidad).
- `presentador.html?escena=5` abre el presentador en la escena 5.

## Solución de problemas
| Síntoma | Causa probable | Solución |
|---|---|---|
| El presentador dice "sin conexión" | la audiencia no está abierta o es otro navegador | abrirla desde el botón del presentador; usar el mismo navegador |
| La audiencia no avanza al pulsar en el presentador | ventanas en navegadores distintos o perfil privado | usar Chrome/Edge normal, misma sesión |
| La pantalla completa no se activa sola | los navegadores exigen un gesto del usuario | pulsar F o doble clic en la ventana de audiencia |
| Textos sin acentos o fuentes distintas en Mac | fuentes del sistema diferentes | aceptable; el diseño usa fuentes del sistema para funcionar sin internet |
| Animaciones lentas en equipos antiguos | GPU limitada | Windows → "Mostrar animaciones" desactivado: el motor respeta "reducir movimiento" |
