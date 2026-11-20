# Catálogo de escenas

Cada escena de `DECK.escenas` tiene campos comunes y campos propios de su `tipo`. El ejemplo `ejemplos/cartera-app-pa-2026-11/contenido.js` usa todos los tipos.

## Estructura general de `contenido.js`

```js
window.DECK = {
  id: 'nombre-unico-sin-espacios',        // identifica el canal de sincronización (único por presentación)
  titulo: { es: '...', en: '...' },
  idiomaInicial: 'es',
  duracionMin: 30,                          // objetivo del cronómetro del presentador
  capitulos: [ { id: 'apertura', es: 'Apertura', en: 'Opening' }, ... ],   // barra de progreso y mapa de escenas
  escenas: [ ... ]
};
```

## Campos comunes a toda escena

| Campo | Uso |
|---|---|
| `id` | único, sin espacios (se usa para recordar filtros) |
| `capitulo` | id de un capítulo |
| `tipo` | uno de los tipos de abajo |
| `min` | minutos previstos (alimenta el semáforo de ritmo) |
| `transicion` | `cortina` (barrido rojo de marca; por defecto en `capitulo`), `fundido` (por defecto), `zoom`, `empuje`, `subir`, `profundidad` |
| `respaldo` | `true` = escena de respaldo: no aparece al avanzar; se abre desde el mapa del presentador |
| `titulo`, `sub` | encabezado (casi todos los tipos) |
| `nota` | fuente / nota al pie de la escena |
| `notas` | `{ es: {...}, en: {...} }` — ver `notas-presentador.md` |

Textos: `{ es, en }` o una cadena si es igual en ambos idiomas (nombres propios, siglas). Los textos de `resumen` y `proyeccion` aceptan `<strong>` para resaltar.

Pasos: `data-step` = clic en el que aparece un elemento. El motor calcula el número de pasos solo. Abajo se indica qué aparece en cada paso.

---

## `portada`
Imagen heroica, logos, título en dos niveles, chips de instrumentos y fecha.
Campos: `img`, `logos: [png...]`, `kicker`, `titulo1` (palabra grande, p. ej. "Perú"), `titulo2`, `chips: [texto]`, `fecha`.
Pasos: 0.

## `capitulo` (separador)
Foto a sangre, bloque rojo diagonal con título, número de capítulo en contorno y hasta 3 datos.
Campos: `img`, `blur` (opcional, para fotos de baja resolución), `num` ('01'), `kicker`, `titulo`, `datos: [{ v, l }]`.
Transición por defecto: `cortina`. Pasos: 0.

## `mecanismos`
Tres fotos con sigla grande + dos pilares rojos con ícono.
Campos: `tres: [{ img, sigla, nombre }]`, `pilares: [{ icono, titulo, texto }]`.
Pasos: 0 fotos · 1 pilar 1 · 2 pilar 2.

## `cifras`
2 o 3 columnas a pantalla completa, cada una con foto, periodo, ícono, título y una tarjeta con la cifra animada.
Campos: `cols: [{ img, periodo, icono, titulo, num, dec, pre, label, monto }]`, `nota`.
Pasos: una columna por paso.

## `impacto`
Mosaico de 4 tarjetas: cabecera roja (cantidad + qué + monto USD) y una cifra de impacto gigante.
Campos: `img` (fondo), `items: [{ icono, cant, que, usd, pre, num, dec, suf, txt }]` (máx. 4; si hay 8, dividir en dos escenas con `empuje`).
Pasos: una tarjeta por paso.

## `evolucion`
Paneles verticales (3–6) que se expanden uno por paso; clic en un panel lo activa. Ideal para etapas, generaciones, hitos.
Campos: `etapas: [{ v, img, proyecto, etapa }]`.
Pasos: un panel activo por paso.

## `anios`
Columnas por año: proyectos, adendas, monto con barra proporcional, banderas de países inversionistas y foto del proyecto emblemático.
Campos: `anios: [{ anio, proy, ad, usd, paises: ['es','cn',...], img, emblema, emblemaUsd }]`.
Banderas disponibles: es, vn, us, co, br, cn, pe, ar, ec, fr, pt, mx (añadir en `P.flag` si hace falta).
Pasos: un año por paso.

## `apiladas`
Columnas apiladas por sector + línea roja de total + banda de resalte + cifra destacada.
Campos: `anios: [{ anio, total, seg: [[sector, valor], ...] }]`, `resaltar: [años]`, `destacado: { v, t }`, `sub`, `nota`.
Pasos: 0 gráfico · 1 banda y cifra destacada. Información emergente al pasar el cursor.

## `avances`
Grupos (adjudicados, adendas, firmas...) con filas: ícono de sector, nombre, barra y monto. Total en el encabezado.
Campos: `total`, `grupos: [{ icono, n, t, items: [[sector, nombre, monto]] }]`.
Pasos: un grupo por paso.

## `ejecucion` (recomendado como `respaldo`)
Acordeón de tarjetas con bloques de estado (título + viñetas). Clic o paso expande cada tarjeta.
Campos: `items: [{ sigla, nombre, fase, bloques: [{ t, l: [texto] }] }]`.

## `corredores`
Mapa a la izquierda (imagen recortada sin textos) + panel de ejes con anillo de porcentaje y sectores.
Campos: `mapa`, `proy`, `ad`, `usd`, `panelTitulo`, `panelSub`, `leyenda: [{ k: mar|flu|sis|vial, t }]`, `ejes: [{ nombre, c, pct, trans, cost, sect: [sectores] }]`.
Pasos: 0 mapa y KPI · 1..n un eje por paso.

## `horizonte`
Resumen de un periodo de cartera: panel oscuro con KPIs (n.º de proyectos, USD, regiones, beneficiarios) + barras horizontales por sector + caja de adendas.
Campos: `img`, `proy`, `proyLbl`, `usd` (millones), `usdPre` ("más de"), `regiones`, `benef`, `barras: [{ s, v, n, lbl? }]`, `adendas: { t, l: [[sector, monto]] }` (opcional; el título muestra automáticamente el total), `fuentes: { barras: [listas], adendas: [listas] }` (listas `explorador` de las que el Excel calcula barras y adendas).
Pasos: 0 KPIs · 1 barras · 2 adendas.

## `explorador` (lista interactiva)
Lista de proyectos filtrable por sector, con pestañas (p. ej. Proyectos / Adendas) y orden por monto. Los filtros se sincronizan entre audiencia y presentador (el presentador tiene botones en "Controles en pantalla"). Con más de 14 filas se reparte en dos columnas.
Campos: `grupos: [{ t, meta?, filas: [{ n, s, p, e, ad?, q?, m, tag? }] }]`, `cols: ['ad','q']` (columnas de adjudicación directa / concurso o año), `colQ`, `colM`, `colP`, `meta`, `metaLbl`, `filtro: 'sub'` (filtra por subsector en vez de familia), `mapa` + `mapaTxt` (columna con mapa), `nota`.
`q` / `ad`: trimestre `'IV-26'` o año `'2029'`. `tag`: etiqueta corta ('DI', 'PA', 'Solo CAPEX').
Pasos: 0.

## `potenciales`
Fila de KPIs + 3 tarjetas foto (sector, n.º de proyectos, monto, proyecto destacado).
Campos: `proy`, `usd`, `regiones`, `benef`, `cards: [{ s, img, n, usd, dest, t? }]`.
Pasos: 0 KPIs · 1..3 tarjetas.

## `adenda` (proyecto destacado)
Foto a media pantalla + insignia de fecha + KPIs (monto, beneficiarios grande, dato extra) + componentes.
Campos: `img`, `fotoDer`, `firmaLbl`, `firma`, `kicker`, `titulo`, `usd`, `usdTxt`, `benef`, `benefIcono`, `benefTxt`, `extra: { icono, v, t }`, `compTitulo`, `comp: [texto]`.
Pasos: 0 título y monto · 1 beneficiarios · 2 componentes.

## `cronograma`
Tarjeta resumen + mapa + filas de proyectos con línea de hitos (cumplido ✓ / pendiente con pulso).
Campos: `resumen`, `mapa`, `filas: [{ tipo, n, p, m, nota, hitos: [{ t, v | q, ok }] }]`, `leyenda`.
Pasos: 0 resumen y mapa · 1..n filas.

## `proyecto` (ficha a pantalla completa)
Foto de fondo + insignia + panel blanco (monto, beneficiarios, obras) + tarjeta de mapa.
Campos: `img`, `adj`, `montoLbl`, `usd`, `modalidad`, `hab` (millones, 1 decimal), `habTxt`, `obrasTitulo`, `obras: [texto]`, `mapa`, `nota`.
Pasos: 0 panel · 1 obras · 2 mapa.

## `orbita`
Logo al centro y 5–7 datos alrededor de un anillo que se dibuja.
Campos: `logo`, `nodos: [{ icono, v, t }]`, `nota`.
Pasos: 0 primera mitad · 1 segunda mitad.

## `historia`
Banda superior (mensaje + participantes) + columnas con línea (monto y cantidad por año) + dona por categoría.
Campos: `top: { big, txt, part: [{ v, t }] }`, `serie: [[año, monto, cantidad]]`, `donaTitulo`, `funciones: [{ t, v, c }]`, `nota`.
Pasos: 0 banda · 1 columnas · 2 dona.

## `zonas`
Panel oscuro con proyección y multiplicador (p. ej. 3.1×) + lista de zonas con letra de color + mapa.
Campos: `img`, `proyeccion`, `veces`, `vecesTxt`, `subtitulo`, `mapa`, `zonas: [{ letra, c, zona, obra, v }]`, `nota`.
Pasos: 0 · 1..n una zona por paso (clic en una zona la resalta).

## `cierre`
Foto, banda roja, logo, códigos QR y agradecimiento.
Campos: `img`, `titulo`, `sub`, `qrs: [{ t, img }]`.

---

## Íconos disponibles (`icono`)
transporte, vial, puertos, aeropuertos, ferroviario, teleferico, navegable, electricidad, transmision, agua, salud, educacion, mineria, inmuebles, telecom, agricultura, turismo, hidrocarburos, otros, usuarios, region, monto, calendario, check, mundo, acuerdo, cohete, objetivo, documento, institucion, grafico, flecha, reloj, hogar, engranaje, brecha, peru, innovacion, descentralizar.

## Claves de sector (`s`) y color
Familia Transportes (#00AC69): transportes, vial, puertos, aeropuertos, ferroviario, teleferico, navegable · Electricidad (#E8B800): electricidad, transmision, generacion, distribucion · agua (#0070B7) · salud (#234B66) · educacion (#4E8FC5) · inmuebles (#755C83) · mineria (#9C7E00) · telecom (#13A0D8) · Agricultura (#7FA33A): agricultura, irrigacion · hidrocarburos (#F08A24) · turismo (#C2185B) · otros.

## Agregar un tipo nuevo
1. En `motor/deck-core.js`, añade `R.mitipo = { dark: bool, html: (s) => '...' }` usando `head()`, `A(paso, animación, retardo)`, `N()`/`P.M()` para cifras.
2. Estilos en `motor/deck.css` dentro del lienzo de 1920×1080 (márgenes laterales de 96 px).
3. Documenta aquí, prueba con `capturar.ps1` en ES y EN.
