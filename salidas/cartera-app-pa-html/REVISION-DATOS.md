# Revisión de datos — Perú: Portafolio de Inversiones (nov. 2026)

Fuentes: `01.11.26 CARTERA APP y PA.pptx` (ES, **fuente de verdad**) y `01.11.2026 CARTERA APP y PA (ENG).pptx` (EN, terminología).
Regla aplicada: ante diferencias ES vs EN manda el español. Ante inconsistencias **dentro** del español se usó el valor respaldado por el desglose o el total, y se marca **CONFIRMAR**.

## Requieren confirmación del área responsable

| # | Lámina | Español | Inglés | Valor usado en el HTML | Motivo |
|---|---|---|---|---|---|
| 1 | 3 (Confianza) | 1860 OxI · S/ 27.9 mil millones | 1855 · S/ 27.7 billion | **1 855 · S/ 27.8 mil millones** | Las láminas 32–33 (ES) dicen 1,855 intervenciones y S/ 27,763 millones, y la serie anual suma exactamente eso. **CONFIRMAR** |
| 2 | 28 (Cronograma energía) | 3.2 millones de habitantes | 3.1 million | **3.1 millones** | Grupo 2 (1.8 M) + Grupo 3 (1.3 M) = 3.1 M. **CONFIRMAR** |
| 3 | 33 (Evolución OxI) | Etiqueta 2026: 10 801 · 786 intervenciones | igual | **10 801 · 786** | El dato guardado dentro del gráfico de PowerPoint es 10 368 y 773 (no actualizado). Las etiquetas visibles cuadran con los totales (S/ 27 763 millones; 1855). **CONFIRMAR y actualizar el gráfico fuente** |
| 4 | 8 (Resultados 2019–2026) | Segmentos 2025 de 323 y 284 | — | 323 = Educación · 284 = Salud | Los colores de esos segmentos no coinciden exactamente con la leyenda; se asignó el sector más probable (284 = O&M Hospital Villa El Salvador). **CONFIRMAR** |

## Diferencias ES vs EN resueltas con la versión en español

| Lámina | Dato | Español (usado) | Inglés (descartado) |
|---|---|---|---|
| 11 | Adendas nov–dic | USD 1453 millones: Hidrocarburos 663, Minería 500, Transportes 269, Salud 20 | USD 946 millones, con sectores cruzados (HEALTH 663, HYDROCARBONS 500, TRANSPORTS 262) |
| 14 | PTAR San Martín | 200 | 239 |
| 14 | Obras de Cabecera – Fase 1 | 731 | 780 |
| 14 | Teleférico Choquequirao | 418 | 412 |
| 14 | Central Fotovoltaica Las Joyas | 337 | 252 |
| 14 | Red de comunicaciones de Loreto | 595 | 312 |
| 14 | Red de internet fijo – Madre de Dios | 111 | 37 |
| 14 | Afianzamiento hídrico Villacurí y Lanchas | 504 | 314 |
| 14 | Teleférico Azoguini – Titicaca | 73 | 67 |
| 19 | Ejecución contractual (AVP, FHH) | texto de octubre–noviembre 2026 | texto anterior (otras gestiones y fechas) |
| 30 | Habitantes Grupo 3 | 1.3 millones | "One million" |
| 34 | Fecha de corte OxI 2026 | 22 de octubre de 2026 | 30 de septiembre de 2026 |
| 34 | Zona Oriente | Maquinaria pesada DENAGER del GR **Amazonas** (Chachapoyas) | GR **San Martín** |

## Diferencias menores (redondeo), sin cambios
- Lámina 14: la suma de filas da 10 317; la meta oficial es 10 316 (se muestra la meta). Al filtrar por sector se muestra el subtotal calculado.
- Lámina 17: la suma de filas da 10 326; meta oficial 10 325.
- Lámina 13: Educación 345 en el gráfico; las filas suman 346.
- Lámina 9: "8 proyectos adjudicados" con 5 filas (el Grupo 1 del Plan de Transmisión agrupa varios proyectos).

## Desde que existe el Excel de datos (datos.xlsx)
Las metas de cada lista y las barras por sector ahora se **calculan** sumando las filas de la hoja Proyectos, por lo que reflejan la suma exacta en lugar del redondeo del PPT: nov–dic proyectos 1368 (PPT 1367), adendas 1452 (1453), 2027 10 317 (10 316), 2028 10 326 (10 325), 2029–2030 14 779 (14 778), potenciales 35 305 (35 306), barra Educación 2027 346 (345), Agua 2028–2030 3794 (3793), Electricidad nov–dic 705 (704). Si se prefiere mostrar la cifra oficial redondeada, se puede escribir el valor en la hoja Cifras en lugar de la fórmula.

## Mejoras de forma aplicadas (sin cambiar datos)
- Un color por sector en toda la presentación (en el PPT, el mismo sector cambiaba de color entre láminas).
- Teleféricos de Choquequirao y Azoguini se agrupan como **Turismo**, igual que en el gráfico de la lámina 13.
- Láminas 4, 13–18 divididas en escenas de resumen + detalle; tablas convertidas en listas filtrables.
- La lámina 19 (Ejecución contractual) pasó a **escena de respaldo** (no aparece al avanzar; se abre desde el presentador si hay preguntas).
- Lámina 20: la foto original tenía marcas de terceros ("metrolima.pe", "Venezuela – Mercado Santa Anita"); se reemplazó por otra foto del mismo PPT.
- Erratas de la versión EN corregidas: "PPPS ANF", "Sanination", "Deslination", "Adendda"; "amendment/addendum" unificado como *addendum/addenda*.
- Notas del presentador: el PPT no traía notas; se elaboraron con autorización del usuario, solo con datos de la presentación.
