# Marca PROINVERSIÓN en la web

Derivado de los PPT institucionales (nov. 2026). Si se recibe un manual de marca oficial, actualizar este archivo y `motor/deck.css` (`:root`).

## Colores
| Token | Hex | Uso |
|---|---|---|
| `--rojo` | `#E42312` | color dominante: bloques de título, chips de fecha, cifras de énfasis, barra de progreso |
| `--rojo2` | `#B81A0D` | textos rojos sobre fondo claro (mejor contraste) |
| `--gris` | `#EDEDED` | fondo de escenas claras (con degradado sutil a blanco) |
| `--tinta` | `#1B1F24` | texto principal |
| `--noche` | `#0A0F1A` | fondo de escenas oscuras |
| Azul institucional (tema PPT) | `#0E2841` | acentos oscuros |

Colores de sector: ver `catalogo-escenas.md`. Un sector = un color en toda la presentación (en los PPT originales el mismo sector cambiaba de color entre láminas; se unificó).

## Logos
- `logo-proinversion-blanco.png`: fondos oscuros y fotos.
- `logo-proinversion-gris.png`: fondos claros (generado recoloreando el blanco a `#6D6E71` y conservando la barra roja).
- `logo-mef.png`: solo en portada, a la izquierda del de PROINVERSIÓN, separados por una línea fina.
- `logo-oxi.png`: marca "PROINVERSIÓN | OBRAS POR IMPUESTOS" (se usa igual en EN).
- Posición: esquina superior derecha en escenas de contenido (el selector ES/EN queda encima, discreto).

## Motivo gráfico: la barra diagonal
La barra inclinada del logo es el elemento de identidad que se repite:
- junto a cada título (`.slash`),
- en el bloque de capítulo (paralelogramo rojo con corte diagonal),
- en la transición `cortina` (barrido rojo inclinado con línea blanca),
- en chips de año / periodo (corte diagonal a la derecha),
- como marca de agua muy tenue en escenas claras.
No usar subrayados de títulos ni franjas decorativas en bordes.

## Tipografía
Fuentes del sistema (sin descargas, funciona sin internet): "Segoe UI Variable Display" / "Segoe UI" en Windows, con alternativas del sistema en otros equipos. Títulos 50 px en mayúsculas, peso 800; cifras protagonistas 120–200 px, peso 900, con números tabulares.

## Fotografía
- Usar las fotos del PPT original; optimizar a ≤ 1920 px.
- Oscurecer con velos degradados cuando haya texto encima (nunca texto sobre foto sin velo).
- Retirar o recortar fotos con marcas de agua de terceros.
