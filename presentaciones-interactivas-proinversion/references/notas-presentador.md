# Notas del presentador

## Origen de las notas (en este orden)
1. Notas del orador dentro del PPTX (`NOTAS:` en `contenido.md` de la extracción).
2. Word entregado por el usuario (leer con la skill `docx`; mapear por número de lámina o por título).
3. **Elaboradas por Claude**: solo después de preguntar al usuario y recibir su conformidad.

Las notas van en el idioma de la presentación: notas ES cuando la presentación está en español y notas EN cuando está en inglés. El presentador ve el idioma activo.

## Estructura por escena

```js
notas: {
  es: {
    msj: 'Mensaje clave en una frase (lo que el público debe recordar).',
    guion: ['Punto 1 que se dice.', '(Clic) Punto 2 cuando aparece el siguiente elemento.'],
    cifras: ['**USD 42 mil millones**', '87 proyectos + 9 adendas'],   // **negrita** = cifra resaltada
    preguntas: [['¿Pregunta probable?', 'Respuesta sugerida basada en la presentación.']],
    puente: 'Frase para pasar a la siguiente escena.'
  },
  en: { ... misma estructura ... }
}
```

## Reglas de redacción
- **Mensaje clave**: ≤ 20 palabras, afirmativo, orientado al interés del público (impacto, oportunidad, certeza).
- **Guion**: 2–4 viñetas; marcar con "(Clic)" lo que coincide con un paso de la escena, para que el orador sincronice voz y pantalla.
- **Cifras para recordar**: solo cifras que están en la presentación, escritas con el estilo de `estilo-cifras.md`.
- **Preguntas probables**: pensar como un ministro, un gobernador o un inversionista (¿qué incluye el monto?, ¿cuándo se adjudica?, ¿quién es el titular?, ¿hay cofinanciamiento?). Responder **solo** con información de la presentación o definiciones institucionales estables (qué es una DI, qué es el RERA). Si la respuesta requiere datos que no están, escribir: "Ofrecer enviar el detalle por escrito".
- **Puente**: una frase que conecte con la siguiente escena; crea la sensación de historia continua.
- Separadores (`capitulo`): nota breve (mensaje + puente).
- Escenas de respaldo: indicar cuándo usarlas.
- Protocolo: en la portada, recordar el saludo a autoridades; si el usuario entrega la lista de autoridades presentes, incluirla.

## Actualizar notas después
Cuando el usuario envíe un Word con notas nuevas: reemplazar los campos de `notas` en `contenido.js` (mantener la estructura), traducir si llega en un solo idioma y avisar qué escenas cambiaron. No requiere reconstruir imágenes ni motor.
