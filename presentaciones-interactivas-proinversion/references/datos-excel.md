# Excel de datos (`datos.xlsx`) — actualización por los equipos técnicos

## Idea
Cada presentación tiene un `datos.xlsx` en su carpeta. Es la **fuente de datos** que mantienen los equipos técnicos (cifras, listas de proyectos, series, notas). El diseño, las imágenes y la narrativa siguen en `contenido.js` y el motor.

```
Equipo técnico edita datos.xlsx ──► guarda en la carpeta publicada ──► F5 en la presentación
                                     (servidor)                         lee datos.xlsx directamente
USB / sin servidor:  excel_a_datos.ps1 ──► datos.js ──► la presentación lo usa si no puede leer el Excel
```

Prioridad de carga (`motor/deck-datos.js`): `datos.xlsx` (si la página se sirve por http/https) → el más reciente entre el Excel elegido con **«Cargar Excel»** (vista del presentador; se guarda en el navegador) y `datos.js` → `contenido.js`. Siempre se aplica sobre el contenido original (no se acumulan cambios).

**«Cargar Excel»** (vista del presentador): el usuario elige `datos.xlsx` desde OneDrive, una USB o cualquier carpeta. El navegador lo lee (permitido porque lo elige el usuario), lo aplica, lo envía a la vista de audiencia y a las vistas previas (mensaje `t:'datos'` / `pinvDatos`) y lo recuerda en `localStorage` (`pinv-excel:<id>`). Elimina la necesidad de ejecutar `excel_a_datos.ps1` en uso sin servidor.
Los datos se aplican sobre una copia: si el Excel tiene un error, la presentación **no se cae** (muestra el contenido anterior) y la vista del presentador muestra un aviso ⚠ con el detalle. La insignia "Datos: …" del presentador indica qué fuente se usó y su fecha.

## Crear el Excel (DSI / Claude)
```
scripts/ensamblar.ps1 -Salida <carpeta>
scripts/crear_excel_datos.ps1 -Salida <carpeta>          # no sobrescribe un datos.xlsx existente
scripts/crear_excel_datos.ps1 -Salida <carpeta> -Forzar  # regenera desde contenido.js (guarda respaldo)
scripts/excel_a_datos.ps1 -Salida <carpeta>              # genera datos.js (para USB)
```
Requiere Excel y Edge/Chrome. El script lee el contenido con `assets/exportar-datos.html` (Edge sin interfaz) y construye el libro con automatización de Excel.

**Importante:** una vez entregado el Excel a los equipos, **el Excel manda**. Si luego se cambia `contenido.js` (nuevas escenas, textos de diseño), NO usar `-Forzar` sin antes revisar con el usuario: se perderían los cambios de los equipos. Para escenas nuevas, agregar filas al Excel existente.

## Hojas
| Hoja | Qué contiene | Se aplica a |
|---|---|---|
| Instrucciones | guía para los equipos | — |
| Cifras | una fila por número o texto con cifras de cada escena. `Ruta` = dónde va (no editar). Tipo `Número` → columna Valor; `Texto` → Texto ES/EN; `Lista de códigos` → códigos separados por comas (banderas); `Calculado` → fórmula (metas = suma de Proyectos) | cualquier campo de cualquier escena; `_deck.titulo`, `_deck.duracionMin` |
| Proyectos | una fila por proyecto/adenda/ítem. `Lista` = id de la escena (`explorador` o `avances`); `Pestaña` = pestaña o grupo; `Cantidad` = proyectos que agrupa la fila; `Mostrar` = No para ocultar sin borrar. Columnas grises: Escena (referencia), Familia, Estado (validación) | escenas `explorador` (reconstruye `grupos`) y `avances` (reemplaza `items` de cada grupo) |
| Sectores | barras y adendas de las escenas `horizonte`. Monto, Cantidad y Etiquetas se calculan con SUMIFS desde Proyectos (por familia de sector, lista fuente y pestaña). Solo se edita "Texto fijo" | `barras` (ordenadas de mayor a menor) y `adendas` |
| Series por sector | Escena, Año, Sector, Monto | escenas `apiladas` (total = suma) |
| Series anuales | Escena, Año, Monto, Cantidad | escenas `historia` (`serie`) |
| Distribución | Escena, Categoría ES/EN, Monto, Color | escenas `historia` (`funciones`) |
| Notas | mensaje, guion, cifras, preguntas (`¿P? || R` por línea), puente — ES y EN. Líneas con Alt+Enter | `notas` de cada escena |
| Control | controles de consistencia definidos en `DECK.controles` + conteo de filas con observaciones | — |
| Catálogo | sectores, familias, listas, trimestres válidos (listas desplegables) | validaciones |

## Controles (`DECK.controles` en contenido.js)
```js
{ c: 'Texto del control', calc: {...}, decl: 'ruta.en.cifras', tol: 0.05, regla: 'minimo' }
```
`calc` admite: `{ listas:[ids], cantidad:true, pestana:'Proyectos'|'Adendas', excluirEtiqueta:'DI' }` (suma de montos o cantidades de Proyectos) · `{ serieSector:'id', desde, hasta }` · `{ serieAnual:'id', campo:'Monto'|'Cantidad' }` · `{ distribucion:'id' }` · `{ rutas:[...] }` (suma de cifras). En lugar de `decl` puede usarse `declCalc` con la misma sintaxis. Diseñar controles para cada total declarado que dependa de un detalle (totales de portafolio, n.º de proyectos, sumas de series).

## Escenas `horizonte`: de dónde salen las barras
Indicar en contenido.js `fuentes: { barras: ['lista-1', 'lista-2'], adendas: ['lista-adendas'] }` (máximo 2 listas por tipo). El exportador crea las filas de Sectores con esas fuentes.

## Formatos que acepta la lectura
- Montos: número (`1453`); se toleran espacios o comas de miles.
- Trimestres: `IV-2026`, `IV-26`, `IV.T.26`, `IV trim. 2026`, `Q4 2026` → se normalizan. Años: `2029`.
- Sectores: nombre en español o inglés del catálogo, o la clave.
- Texto EN vacío → se usa el texto ES.

## Publicación en el servidor
Copiar la carpeta completa (incluido `datos.xlsx`). El servidor debe entregar `.xlsx` (IIS y Apache lo hacen por defecto). Los equipos guardan el Excel en esa misma ruta (p. ej. carpeta compartida mapeada al sitio). La presentación pide el archivo sin caché en cada carga.
