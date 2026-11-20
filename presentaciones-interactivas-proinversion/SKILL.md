---
name: presentaciones-interactivas-proinversion
description: Convierte presentaciones PowerPoint (.pptx) de PROINVERSIÓN en una presentación web interactiva y bilingüe (español/inglés) con dos vistas sincronizadas — audiencia (pantalla gigante/proyector, botón ES/EN siempre visible) y presentador (notas, cifras clave, preguntas probables, cronómetro con ritmo, escena siguiente) —, respetando imágenes, datos, colores y logos institucionales. Úsala cuando pidan "mejorar", "modernizar", "volver interactiva", "pasar a HTML" o "preparar para evento/reunión" una presentación de PROINVERSIÓN, cuando adjunten uno o dos PPTX (ES y EN) para un evento con autoridades o inversionistas, o cuando pidan actualizar notas, cifras o textos de una presentación HTML ya generada con esta skill.
---

# Presentaciones interactivas PROINVERSIÓN

Transforma un PPTX institucional en una **experiencia narrativa**: cifras que se animan, escenas que se construyen paso a paso con el clic del presentador, transiciones con significado y listas de proyectos filtrables en vivo. Público objetivo: **altos cargos, funcionarios públicos e inversionistas**. Todo funciona **sin internet** y se publica copiando una carpeta en los servidores de PROINVERSIÓN.

## Qué se entrega (una carpeta por presentación)

```
salidas/<nombre-presentacion>/
├── index.html          portada con accesos a ambas vistas
├── audiencia.html      vista para la pantalla gigante (botón ES | EN arriba a la derecha)
├── presentador.html    vista para la laptop / monitor de retorno (notas, tiempo, control)
├── contenido.js        contenido bilingüe, diseño narrativo y valores iniciales
├── datos.xlsx          FUENTE DE DATOS editable por los equipos técnicos (cifras, proyectos, series, notas, controles)
├── datos.js            copia de datos.xlsx para usar la presentación sin servidor (USB)
├── REVISION-DATOS.md   discrepancias encontradas y decisiones tomadas (para validación humana)
└── assets/             motor (JS/CSS) + img/ optimizadas
```

El motor vive en `motor/` y nunca se reescribe por presentación: solo se generan `contenido.js` e imágenes. Ejemplo completo y probado: `ejemplos/cartera-app-pa-2026-11/contenido.js` (37 escenas, todos los tipos de escena).

## Flujo de trabajo (seguir en orden)

Todos los scripts son PowerShell 5.1 sin dependencias (Windows + PowerPoint + Edge). Ejecutarlos con `powershell -ExecutionPolicy Bypass -File <script> ...`. Rutas relativas a esta carpeta de skill.

### 1. Recibir insumos y aclarar lo mínimo
- PPTX en español (**fuente de verdad de cifras**) y, si existe, PPTX en inglés (fuente de terminología).
- Notas: pueden venir en el PPTX, en un Word aparte o no existir.
- Contexto opcional: visión ya definida, duración, tipo de evento, público. Si no hay visión, **dedúcela del contenido** (ver `references/narrativa.md`).

### 2. Extraer
```
scripts/extraer_pptx.ps1 -Pptx "<ES.pptx>" -Out "<scratch>/es"
scripts/extraer_pptx.ps1 -Pptx "<EN.pptx>" -Out "<scratch>/en" -SinRender
```
Genera `contenido.md` (texto por forma, tablas, **datos de gráficos nativos**, notas), `imagenes.txt` y renders + hojas de contacto en `render/`. Mira las hojas de contacto para entender diseño, colores y qué es foto, mapa, ícono o gráfico-imagen.

### 3. Reconciliar datos (obligatorio, nunca omitir)
- Compara cifra por cifra ES vs EN. **Manda el español** (decisión institucional) salvo que el usuario indique otra cosa.
- Busca inconsistencias **internas** (p. ej. un total que no cuadra con su desglose, un gráfico cuyo dato almacenado difiere de su etiqueta). Usa el valor respaldado por el desglose o por el total oficial y **regístralo**.
- Escribe `REVISION-DATOS.md` en la carpeta de salida (tabla: diapositiva · ES · EN · valor usado · motivo) y menciónalo al entregar. Nunca corrijas en silencio.

### 4. Notas del presentador — CONSULTAR antes de construir
- Si `contenido.md` dice "con notas del orador: 0" y no hay Word de notas: **pregunta al usuario** si desea que elabores las notas a partir del contenido. No generes el HTML hasta tener respuesta.
- Si hay Word: léelo (skill `docx`) y mapea cada nota a su escena.
- Estructura y reglas en `references/notas-presentador.md`. **Las notas nunca introducen cifras que no estén en la presentación.**

### 5. Diseñar el guion narrativo (storyboard)
Antes de escribir `contenido.js`, define capítulos y escenas (tipo, transición, pasos, minutos). Reglas en `references/narrativa.md`:
- Una idea por escena; dividir láminas cargadas en 2–3 escenas que se sientan como un mismo discurso (transición `empuje` o `zoom` entre ellas).
- Tablas → `explorador` (filtrable) o barras (`horizonte`); series → `apiladas` / `historia`; cifras sueltas → `cifras` / `impacto`.
- Material de detalle para preguntas → escena con `respaldo: true` (fuera de la secuencia, accesible desde el presentador).

### 6. Imágenes
Presupuesto total: **≤ 8 MB** por presentación (el piloto pesa ~5.6 MB a partir de un PPTX de 73 MB).
```
. scripts/imagenes.ps1      # carga Save-Resized y Save-Recolored
Save-Resized -Src <media> -Dst <salida>/assets/img/x.jpg -MaxW 1920 -Quality 70    # fondos
Save-Resized -Src <media> -Dst ... -MaxW 900 -Quality 72                           # tarjetas
Save-Resized -Src <render.png> -Dst ...png -Crop @(x,y,w,h) -MaxW 900              # recortes de mapas
```
- Mapas o composiciones con texto: `scripts/renderizar_diapositiva.ps1` ocultando títulos/leyendas, luego recortar. Rehaz la leyenda en HTML para que sea bilingüe.
- Logos: blanco para fondos oscuros; gris (`Save-Recolored -Hex '#6D6E71' -KeepRed`) para fondos claros.
- Revisa que ninguna foto tenga marcas de agua o textos de terceros; si las tiene, recorta o elige otra.

### 7. Escribir `contenido.js`
Sigue `references/catalogo-escenas.md` (campos de cada tipo) y copia la forma del ejemplo. Reglas:
- Todo texto visible es `{ es: '...', en: '...' }`. Cifras según `references/estilo-cifras.md` (ojo: "mil millones" = "billion").
- Terminología según `references/glosario-institucional.md`; amplía el glosario con términos nuevos.
- Sectores con las claves del motor (`P.SECT`): un color por sector en toda la presentación.
- Montos siempre en **millones** en los datos; el motor formatea por idioma.

### 8. Ensamblar
```
scripts/ensamblar.ps1 -Salida "<ruta>/salidas/<nombre>" -Nueva     # -Nueva solo la primera vez
```

### 9. Control de calidad (obligatorio)
```
scripts/servidor.ps1 -Raiz "<ruta>/salidas" -Puerto 8765          # en segundo plano
scripts/capturar.ps1 -Url "http://localhost:8765/<nombre>/audiencia.html" -Total <N> -Lang es -Out <qa>
scripts/capturar.ps1 ... -Lang en -Out <qa>
scripts/hoja-contactos.ps1 -Dir <qa> -Patron 'es-*.png' -Prefijo hoja-es   (y en-*)
```
Revisa CADA hoja en ambos idiomas: texto desbordado o cortado, cifras partidas, listas que no caben, solapes, contraste, textos en el idioma equivocado. Prueba también `presentador.html?qa=1&escena=N` (captura con Edge headless) y la sincronización (dos pestañas). Corrige el motor solo si el problema es general; si es de una presentación, corrige `contenido.js`.

### 10. Excel de datos para los equipos técnicos
```
scripts/crear_excel_datos.ps1 -Salida "<ruta>/salidas/<nombre>"
scripts/excel_a_datos.ps1    -Salida "<ruta>/salidas/<nombre>"     # datos.js para uso sin servidor
```
- Antes, en `contenido.js`: agregar `fuentes` a cada escena `horizonte` y definir `controles` (totales declarados vs. detalle). Ver `references/datos-excel.md`.
- Abrir el Excel (solo lectura con COM) y verificar: hoja **Control** toda en OK, Proyectos sin observaciones, Sectores igual a las barras originales.
- Probar el ida y vuelta: cambiar un monto en una copia, recargar (http) y comprobar que cambian la lista, la barra del sector y la meta; luego restaurar.
- **Desde que el Excel se entrega, el Excel manda**: nunca regenerarlo con `-Forzar` sin consultar (se perderían cambios de los equipos).

### 11. PDF y publicación
- La vista de audiencia tiene el botón **PDF**: **A4 horizontal** (297 × 210 mm, `@page size: A4 landscape`), una escena por página escalada al ancho útil (márgenes de 10 mm, `zoom: 0.54528` — no usar `transform`, que hace que el navegador achique toda la página) y pie con título y n.º de página. Estado final, idioma activo; las listas con pestañas salen en una página por pestaña. Usa «Guardar como PDF» del navegador (texto seleccionable, nítido).
- PDF por consola (para adjuntar o QA): `scripts/generar_pdf.ps1 -Url "<carpeta>\audiencia.html" -Lang es -Pdf "<salida>.pdf"` (usar la ruta local: lee datos.js). Revisarlo con `scripts/pdf_a_imagenes.ps1` + `hoja-contactos.ps1`.
- En impresión, los velos sobre fotos usan degradados opacos con multiplicación (muchos visores de PDF ignoran degradados semitransparentes). Cualquier velo nuevo debe tener su equivalente `.print-scene` en `deck.css`.
- En el PDF las fotos de fondo se convierten en `<img>` reales (`.bg-foto`): las imágenes de fondo CSS de un contenedor oculto no se descargan a tiempo para el cuadro de impresión y salían en blanco. El botón espera a que todas las fotos estén cargadas (con tiempos máximos) antes de abrir la impresión. En tarjetas con esquinas redondeadas no usar multiplicación (sale en blanco): usar franja sólida semitransparente.
- Publicación en servidor (WordPress/Apache/Nginx): la carpeta lleva `.htaccess` y `PUBLICAR-EN-SERVIDOR.md` (guía para TI: subida por SFTP, caché, CSP, protección con contraseña, actualización del Excel). El HTML no usa scripts ni estilos en bloque en línea.
- `ensamblar.ps1` no crea carpetas nuevas sin `-Nueva` (evita recrear una carpeta renombrada por el usuario).

### 12. Entregar
Resume: escenas y capítulos, decisiones de datos (`REVISION-DATOS.md`), qué notas se elaboraron, cómo presentar y cómo publicar (`references/despliegue.md`). Ofrece abrir `index.html`.

## Actualizaciones posteriores
- Cifras, proyectos, series y notas: los equipos editan `datos.xlsx` en la carpeta publicada; la presentación lo lee al recargar. Si se abre desde OneDrive, USB o carpeta local: botón **«Cargar Excel»** en la vista del presentador (o `excel_a_datos.ps1` para regenerar `datos.js`).
- Si el usuario envía notas en Word o cifras por chat: cargarlas en `datos.xlsx` (no en contenido.js) para no desincronizar el Excel.
- Diseño, textos de títulos, imágenes o escenas nuevas: `contenido.js` (+ filas nuevas en el Excel si la escena tiene datos).
- Nuevo tipo de escena que valga para futuras presentaciones: agrégalo al motor (`motor/deck-core.js` + `motor/deck.css`), documéntalo en el catálogo y vuelve a ensamblar.

## Reglas de oro
1. **Fidelidad**: ninguna cifra, nombre de proyecto, fecha o logo se altera sin dejar constancia. Las mejoras son de forma, orden y énfasis, no de contenido.
2. **Bilingüe completo**: ningún texto visible queda solo en un idioma (salvo nombres propios). El botón ES/EN cambia todo, incluidas las notas.
3. **Una cifra protagonista por momento**: números grandes, unidades pequeñas, contexto en una línea.
4. **El presentador manda**: cada aparición importante es un paso (`data-step`), para que el orador marque el ritmo con el control remoto.
5. **Sin internet**: nada de CDN, fuentes web ni llamadas externas.
6. **Consulta antes de inventar**: notas ausentes, datos ambiguos o insumos contradictorios se preguntan.

## Referencias
- `references/catalogo-escenas.md` — tipos de escena, campos y cuándo usar cada uno.
- `references/narrativa.md` — arcos narrativos, transiciones y ritmo para altos cargos.
- `references/estilo-cifras.md` — formato de números, monedas y trimestres ES/EN.
- `references/glosario-institucional.md` — terminología ES↔EN de PROINVERSIÓN.
- `references/marca-proinversion.md` — colores, logos, motivo gráfico, tipografía.
- `references/notas-presentador.md` — estructura y redacción de notas.
- `references/despliegue.md` — publicación en servidores, uso en eventos, teclado y solución de problemas.
- `references/datos-excel.md` — Excel de datos: hojas, controles, formatos aceptados y flujo de actualización.
