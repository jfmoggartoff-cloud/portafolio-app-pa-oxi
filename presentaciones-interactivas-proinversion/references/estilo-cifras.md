# Estilo de cifras (ES / EN)

El motor formatea automáticamente con `P.fmt`, `P.money`, `P.M`, `P.N` y `P.quarter`. En los datos, los montos van **siempre en millones** y como número (`3144`, no `'3 144'`).

## Separadores
| | Español | Inglés |
|---|---|---|
| Miles (≥ 5 cifras) | espacio duro: `19 188` | coma: `19,188` |
| Miles (4 cifras) | sin separador (RAE): `3144` | coma: `3,144` |
| Decimal | punto: `42.2` (uso institucional de PROINVERSIÓN) | punto: `42.2` |

## Escalas — la trampa principal
| Español | Inglés | Nunca |
|---|---|---|
| USD 3144 millones | USD 3,144 million | ~~3,144 millions~~ |
| USD 42.2 mil millones | USD 42.2 billion | ~~42.2 thousand million~~ |
| USD 1 billón (10¹²) | USD 1 trillion | ~~1 billion~~ |
| S/ 27 763 millones | S/ 27,763 million | |

- "millones" ↔ "million" (singular en inglés después de número).
- A partir de 1000 millones, en titulares usar **mil millones / billion** con 1 decimal; en tablas, millones sin decimales.

## Monedas
- Dólares: `USD` antes del número con espacio (`USD 539 millones`). En textos de adenda del PPT aparece `US$`; normalizar a `USD`.
- Soles: `S/` con espacio (`S/ 11 000 millones`).

## Porcentajes y multiplicadores
- ES: `43 %` (con espacio duro, norma RAE) en textos; en anillos/gráficos puede ir `43%`. EN: `43%`.
- Multiplicador: `3.1×` (signo ×, no la letra x).

## Trimestres y fechas
| Dato | Español | Inglés |
|---|---|---|
| `'IV-26'` | IV trim. 2026 | Q4 2026 |
| Mes abreviado | Dic. 2025 | Dec. 2025 |
| Fecha de corte | al 3 de noviembre de 2026 | as of November 3, 2026 |

## Prefijos
- "+65" = "más de 65". En inglés, en KPIs cortos usar `29M+`, `USD 700M+`; en frases, "over 29 million".
- Rangos de numeración de proyectos con raya: `1–4`, `23–24`.

## Notas al pie estándar
- Monto del proyecto: "CAPEX + OPEX de los primeros 10 años de operación, sin IGV, en USD" / "CAPEX + first 10 years of OPEX, excluding VAT, in USD".
