# Presentaciones interactivas · PROINVERSIÓN (DSI)

> **Repositorio PRIVADO.** Contiene notas del presentador, el Excel de datos con columnas internas y cifras pendientes de confirmar. No hacerlo público ni activar GitHub Pages.

Convierte presentaciones PowerPoint de PROINVERSIÓN en presentaciones web **interactivas y bilingües (ES/EN)** con dos vistas sincronizadas:

- **Audiencia** (pantalla gigante o proyector): escenas animadas, cifras protagonistas, listas filtrables, botón ES/EN y descarga en **PDF A4**.
- **Presentador** (laptop o monitor de retorno): escena actual y siguiente, notas, cifras clave, preguntas probables, cronómetro con ritmo y botón **«Cargar Excel»**.

Funciona sin internet y se publica copiando una carpeta en un servidor web.

## Contenido

```
presentaciones-interactivas-proinversion/   La skill de Claude (instrucciones + motor + herramientas)
├── SKILL.md                                 Flujo de trabajo completo
├── motor/                                   HTML, CSS y JS comunes a todas las presentaciones
├── scripts/                                 PowerShell: extraer PPTX, optimizar imágenes, ensamblar,
│                                            Excel de datos, PDF, capturas de control de calidad
├── references/                              Catálogo de escenas, narrativa, estilo de cifras,
│                                            glosario ES↔EN, marca, notas, despliegue, Excel
└── ejemplos/cartera-app-pa-2026-11/         contenido.js y revisión de datos del piloto

salidas/cartera-app-pa-html/                 Piloto: «Perú: Portafolio de Inversiones» (nov. 2026)
├── index.html · audiencia.html · presentador.html
├── contenido.js                             Contenido bilingüe, narrativa y notas
├── datos.xlsx                               Fuente de datos para los equipos técnicos
├── datos.js                                 Copia del Excel para uso sin servidor
├── REVISION-DATOS.md                        Diferencias ES/EN y cifras por confirmar
├── PUBLICAR-EN-SERVIDOR.md                  Guía para TI (WordPress/Apache/Nginx, contraseña)
├── .htaccess                                Configuración para Apache
└── assets/                                  Motor e imágenes optimizadas
```

## Ver el piloto
- Doble clic en `salidas/cartera-app-pa-html/index.html` (Chrome o Edge).
- Como en el servidor (lee `datos.xlsx` directamente):
  ```
  powershell -ExecutionPolicy Bypass -File presentaciones-interactivas-proinversion/scripts/servidor.ps1 -Raiz salidas -Puerto 8765
  ```
  y abrir `http://localhost:8765/cartera-app-pa-html/`.

## Requisitos para generar presentaciones
Windows con PowerShell 5.1, Microsoft PowerPoint y Excel (automatización COM) y Microsoft Edge o Google Chrome. No requiere Python ni Node.js.

## Actualizar los datos de una presentación
Los equipos técnicos editan `datos.xlsx` (cifras, proyectos, series y notas) y revisan la hoja **Control**. En el servidor basta reemplazar el archivo; desde una carpeta local o USB, usar **«Cargar Excel»** en la vista del presentador o `scripts/excel_a_datos.ps1`.

## No se versiona
Paquetes `.zip`/`.rar` (se regeneran), la carpeta `tarjetas-virtuales-proinversion/` (otro proyecto), la configuración local `.claude/` y respaldos del Excel. Ver `.gitignore`.
