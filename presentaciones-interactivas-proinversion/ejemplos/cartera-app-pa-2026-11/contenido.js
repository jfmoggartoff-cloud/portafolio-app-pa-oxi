/* =========================================================================
   CONTENIDO · Perú: Portafolio de Inversiones (APP, PA y OxI) · noviembre 2026
   Fuente de verdad de cifras: versión en ESPAÑOL del PPT (01.11.26 CARTERA APP y PA).
   Terminología en inglés: versión ENG del PPT + glosario institucional.
   Para actualizar textos, cifras o notas: edite este archivo (no requiere tocar el motor).
   ========================================================================= */
window.DECK = {
  id: 'cartera-app-pa-2026-11',
  titulo: { es: 'Perú: Portafolio de Inversiones · APP, PA y OxI', en: 'Peru: Investment Portfolio · PPP, PA & OxI' },
  idiomaInicial: 'es',
  duracionMin: 35,
  capitulos: [
    { id: 'apertura', es: 'Apertura', en: 'Opening' },
    { id: 'agencia', es: 'La agencia', en: 'The agency' },
    { id: 'trayectoria', es: 'Trayectoria', en: 'Track record' },
    { id: 'resultados', es: 'Resultados recientes', en: 'Recent results' },
    { id: 'portafolio', es: 'Portafolio 2026–2030', en: '2026–2030 Portfolio' },
    { id: 'potenciales', es: 'Proyectos potenciales', en: 'Potential projects' },
    { id: 'adendas', es: 'Adendas 2026', en: '2026 Addenda' },
    { id: 'energia', es: 'Energía y minería', en: 'Energy & mining' },
    { id: 'oxi', es: 'Obras por Impuestos', en: 'Works for Taxes' },
    { id: 'cierre', es: 'Cierre', en: 'Closing' }
  ],
  /* Controles de consistencia que se muestran en la hoja "Control" del Excel de datos.
     calc: cómo se calcula desde las hojas · decl: ruta de la cifra declarada (hoja Cifras) · tol: tolerancia relativa · regla 'minimo': lo calculado debe ser ≥ lo declarado */
  controles: [
    { c: 'Portafolio 2026–2030: n.º de proyectos', calc: { cantidad: true, listas: ['nov-dic-lista', 'p2027-lista', 'p2028-lista', 'p2029-lista'], pestana: 'Proyectos', excluirEtiqueta: 'DI' }, decl: 'corredores.proy' },
    { c: 'Portafolio 2026–2030: n.º de adendas', calc: { cantidad: true, listas: ['nov-dic-lista', 'p2027-adendas'], pestana: 'Adendas' }, decl: 'corredores.ad' },
    { c: 'Portafolio 2026–2030: USD millones', calc: { listas: ['nov-dic-lista', 'p2027-lista', 'p2027-adendas', 'p2028-lista', 'p2029-lista'], excluirEtiqueta: 'DI' }, decl: 'corredores.usd', tol: 0.05 },
    { c: 'Nov–dic 2026: n.º de proyectos (sin DI)', calc: { cantidad: true, listas: ['nov-dic-lista'], pestana: 'Proyectos', excluirEtiqueta: 'DI' }, decl: 'nov-dic.proy' },
    { c: 'Nov–dic 2026: USD millones ("más de")', calc: { listas: ['nov-dic-lista'] }, decl: 'nov-dic.usd', regla: 'minimo' },
    { c: '2027: n.º de proyectos', calc: { cantidad: true, listas: ['p2027-lista'] }, decl: 'p2027.proy' },
    { c: '2027: USD millones (proyectos + adendas)', calc: { listas: ['p2027-lista', 'p2027-adendas'] }, decl: 'p2027.usd', tol: 0.05 },
    { c: '2028–2030: n.º de proyectos', calc: { cantidad: true, listas: ['p2028-lista', 'p2029-lista'] }, decl: 'p2028-2030.proy' },
    { c: '2028–2030: USD millones', calc: { listas: ['p2028-lista', 'p2029-lista'] }, decl: 'p2028-2030.usd', tol: 0.05 },
    { c: 'Resultados: USD adjudicados 2023–2026 (cifra destacada)', calc: { serieSector: 'resultados', desde: 2023, hasta: 2026 }, decl: 'resultados.destacado.v' },
    { c: 'Adjudicados 2023 = resultados 2023', calc: { serieSector: 'resultados', desde: 2023, hasta: 2023 }, decl: 'adjudicados.anios.0.usd' },
    { c: 'Adjudicados 2024 = resultados 2024', calc: { serieSector: 'resultados', desde: 2024, hasta: 2024 }, decl: 'adjudicados.anios.1.usd' },
    { c: 'Adjudicados 2025 = resultados 2025', calc: { serieSector: 'resultados', desde: 2025, hasta: 2025 }, decl: 'adjudicados.anios.2.usd' },
    { c: 'Adjudicados 2026 = resultados 2026', calc: { serieSector: 'resultados', desde: 2026, hasta: 2026 }, decl: 'adjudicados.anios.3.usd' },
    { c: 'Avances 2026: total = resultados 2026', calc: { serieSector: 'resultados', desde: 2026, hasta: 2026 }, decl: 'avances-2026.total' },
    { c: 'OxI: intervenciones acumuladas (serie anual vs. portada de cifras)', calc: { serieAnual: 'oxi-historia', campo: 'Cantidad' }, decl: 'confianza.cols.2.num' },
    { c: 'OxI: monto acumulado (serie anual vs. por función)', calc: { serieAnual: 'oxi-historia', campo: 'Monto' }, declCalc: { distribucion: 'oxi-historia' } },
    { c: 'Potenciales identificados: n.º de proyectos', calc: { rutas: ['pot-identificados.cards.0.n', 'pot-identificados.cards.1.n', 'pot-identificados.cards.2.n'] }, decl: 'pot-identificados.proy' },
    { c: 'Potenciales identificados: USD millones', calc: { rutas: ['pot-identificados.cards.0.usd', 'pot-identificados.cards.1.usd', 'pot-identificados.cards.2.usd'] }, decl: 'pot-identificados.usd', tol: 0.05 }
  ],
  escenas: [
    /* ======================= APERTURA ======================= */
    {
      id: 'portada', capitulo: 'apertura', tipo: 'portada', min: 1,
      img: 'hero.jpg', logos: ['logo-mef.png', 'logo-proinversion-blanco.png'],
      kicker: { es: 'Agencia de Promoción de la Inversión Privada', en: 'Private Investment Promotion Agency' },
      titulo1: { es: 'Perú', en: 'Peru' }, titulo2: { es: 'Portafolio de Inversiones', en: 'Investment Portfolio' },
      chips: [{ es: 'Asociaciones Público Privadas', en: 'Public-Private Partnerships' }, { es: 'Proyectos en Activos', en: 'Projects in Assets' }, { es: 'Obras por Impuestos', en: 'Works for Taxes' }],
      fecha: { es: 'Actualizado al 5 de noviembre de 2026 · Fuente: PROINVERSIÓN', en: 'Updated November 5, 2026 · Source: PROINVERSIÓN' },
      notas: {
        es: { msj: 'El Perú tiene una cartera concreta, priorizada y con fechas: hoy les mostramos dónde invertir y cuándo.',
          guion: ['Saludo protocolar a las autoridades presentes y a los inversionistas.', 'Presentar a PROINVERSIÓN como la agencia que estructura y adjudica la inversión privada en infraestructura y servicios públicos.', 'Anunciar el recorrido: quiénes somos, lo que ya logramos, la cartera 2026–2030 y las oportunidades inmediatas.'],
          cifras: ['Cartera 2026–2030: **USD 42 mil millones**', '**87 proyectos + 9 adendas**'],
          puente: 'Empecemos por los tres instrumentos con los que trabajamos.' },
        en: { msj: 'Peru has a concrete, prioritized and scheduled portfolio: today we show you where and when to invest.',
          guion: ['Protocol greeting to the authorities and investors present.', 'Introduce PROINVERSIÓN as the agency that structures and awards private investment in infrastructure and public services.', 'Announce the journey: who we are, what we have achieved, the 2026–2030 portfolio and the immediate opportunities.'],
          cifras: ['2026–2030 portfolio: **USD 42 billion**', '**87 projects + 9 addenda**'],
          puente: 'Let us start with the three instruments we work with.' }
      }
    },

    /* ======================= LA AGENCIA ======================= */
    {
      id: 'mecanismos', capitulo: 'agencia', tipo: 'mecanismos', min: 2, transicion: 'subir',
      titulo: { es: 'PROINVERSIÓN impulsa la inversión privada a través de', en: 'PROINVERSIÓN drives private investment through' },
      tres: [
        { img: 'mec-app.jpg', sigla: { es: 'APP', en: 'PPP' }, nombre: { es: 'Asociaciones Público Privadas', en: 'Public-Private Partnerships' } },
        { img: 'mec-pa.jpg', sigla: 'PA', nombre: { es: 'Proyectos en Activos', en: 'Projects in Assets' } },
        { img: 'mec-oxi.jpg', sigla: 'OxI', nombre: { es: 'Obras por Impuestos', en: 'Works for Taxes' } }
      ],
      pilares: [
        { icono: 'brecha', titulo: { es: 'Cierre de brechas', en: 'Closing infrastructure gaps' }, texto: { es: 'La cartera se concentra en infraestructura de transporte, electricidad, saneamiento, educación y salud.', en: 'The portfolio focuses on transport, electricity, sanitation, education and health infrastructure.' } },
        { icono: 'peru', titulo: { es: 'Gobernanza', en: 'Governance' }, texto: { es: 'Impulsamos APP 5.0: un modelo de gobernanza integral que concibe la inversión como una ejecución de ciclo completo entre APP, OxI y PA.', en: 'We promote PPP 5.0: a comprehensive governance model that treats investment as full-lifecycle delivery across PPPs, OxI and PA.' } }
      ],
      notas: {
        es: { msj: 'Tres instrumentos complementarios, un solo objetivo: cerrar brechas con inversión privada.',
          guion: ['APP: el privado diseña, financia, construye y opera infraestructura pública con niveles de servicio.', 'PA: ponemos en valor activos del Estado (terrenos, inmuebles) mediante inversión privada.', 'OxI: las empresas adelantan su impuesto a la renta ejecutando obras públicas.', '(Clic) Cierre de brechas y (clic) gobernanza APP 5.0: la inversión se gestiona de principio a fin.'],
          cifras: ['Sectores foco: transporte, electricidad, saneamiento, educación y salud'],
          preguntas: [['¿Qué es APP 5.0?', 'Es el modelo de gobernanza que integra APP, OxI y PA como un ciclo completo de ejecución, con digitalización, adaptabilidad financiera y resiliencia climática y social.'], ['¿Qué diferencia una APP de un Proyecto en Activos?', 'En la APP el privado provee infraestructura o servicios públicos bajo un contrato de largo plazo; en los PA se aprovechan activos del Estado para que el privado invierta en ellos.']],
          puente: '¿Y qué resultados han dado estos instrumentos? Veamos las cifras.' },
        en: { msj: 'Three complementary instruments, one goal: closing gaps through private investment.',
          guion: ['PPP: the private partner designs, finances, builds and operates public infrastructure under service-level standards.', 'PA: we unlock State assets (land, real estate) through private investment.', 'OxI: companies prepay their income tax by delivering public works.', '(Click) Closing gaps and (click) PPP 5.0 governance: investment managed end to end.'],
          cifras: ['Focus sectors: transport, electricity, sanitation, education and health'],
          preguntas: [['What is PPP 5.0?', 'It is the governance model that integrates PPPs, OxI and PA as a full delivery cycle, with digitalization, financial adaptability and climate and social resilience.'], ['How does a PPP differ from a Project in Assets?', 'In a PPP the private partner provides public infrastructure or services under a long-term contract; in PA, State assets are leveraged so that private parties invest in them.']],
          puente: 'So what have these instruments delivered? Let us look at the figures.' }
      }
    },

    /* ======================= TRAYECTORIA ======================= */
    {
      id: 'confianza', capitulo: 'trayectoria', tipo: 'cifras', min: 1.5, transicion: 'zoom',
      titulo: { es: 'Confianza de los inversionistas', en: 'Investor confidence' },
      cols: [
        { img: 'bg-montana.jpg', periodo: '2002–2026', icono: 'acuerdo', titulo: { es: 'Asociaciones Público Privadas', en: 'Public-Private Partnerships' }, num: 153, label: { es: 'proyectos APP', en: 'PPP projects' }, monto: { es: 'USD 42.2 mil millones', en: 'USD 42.2 billion' } },
        { img: 'bg-torres.jpg', periodo: '2002–2026', icono: 'inmuebles', titulo: { es: 'Proyectos en Activos', en: 'Projects in Assets' }, num: 108, label: { es: 'proyectos en activos', en: 'asset projects' }, monto: { es: 'USD 12.3 mil millones', en: 'USD 12.3 billion' } },
        { img: 'mec-oxi.jpg', periodo: '2009–2026', icono: 'institucion', titulo: { es: 'Obras por Impuestos', en: 'Works for Taxes' }, num: 1855, label: { es: 'intervenciones adjudicadas', en: 'awarded interventions' }, monto: { es: 'S/ 27.8 mil millones', en: 'S/ 27.8 billion' } }
      ],
      notas: {
        es: { msj: 'Más de dos décadas de contratos cumplidos respaldan cada proyecto que hoy ofrecemos.',
          guion: ['153 APP por USD 42.2 mil millones desde 2002.', '(Clic) 108 Proyectos en Activos por USD 12.3 mil millones.', '(Clic) 1 855 intervenciones de Obras por Impuestos por S/ 27.8 mil millones desde 2009.'],
          cifras: ['**153** APP · **USD 42.2 mil millones**', '**108** PA · **USD 12.3 mil millones**', '**1 855** OxI · **S/ 27.8 mil millones**'],
          preguntas: [['¿Las cifras son acumuladas?', 'Sí: son acumuladas desde 2002 (APP y PA) y desde 2009 (OxI) hasta 2026.']],
          puente: '¿Qué significan estos montos en la vida de las personas?' },
        en: { msj: 'More than two decades of delivered contracts back every project we offer today.',
          guion: ['153 PPPs worth USD 42.2 billion since 2002.', '(Click) 108 Projects in Assets worth USD 12.3 billion.', '(Click) 1,855 Works-for-Taxes interventions worth S/ 27.8 billion since 2009.'],
          cifras: ['**153** PPPs · **USD 42.2 billion**', '**108** PA · **USD 12.3 billion**', '**1,855** OxI · **S/ 27.8 billion**'],
          preguntas: [['Are these cumulative figures?', 'Yes: cumulative since 2002 (PPP and PA) and since 2009 (OxI) through 2026.']],
          puente: 'What do these amounts mean for people\'s lives?' }
      }
    },
    {
      id: 'impacto-transporte', capitulo: 'trayectoria', tipo: 'impacto', min: 1.5, transicion: 'profundidad',
      img: 'bg-puerto-atardecer.jpg',
      titulo: { es: 'Impacto de las APP adjudicadas', en: 'Impact of awarded PPPs' }, sub: { es: 'Conectividad y transporte', en: 'Connectivity and transport' },
      items: [
        { icono: 'puertos', cant: 9, que: { es: 'puertos', en: 'ports' }, usd: 3571, pre: '+', num: 65, suf: { es: 'millones de toneladas', en: 'million tons' }, txt: { es: 'de carga atendida en 2025', en: 'of cargo handled in 2025' } },
        { icono: 'vial', cant: 18, que: { es: 'carreteras', en: 'roads' }, usd: 7845, pre: '+', num: 7, suf: { es: 'mil km', en: 'thousand km' }, txt: { es: 'de vías intervenidas', en: 'of roads improved' } },
        { icono: 'aeropuertos', cant: 17, que: { es: 'aeropuertos regionales', en: 'regional airports' }, usd: 1324, pre: '+', num: 13, suf: { es: 'millones de pasajeros', en: 'million passengers' }, txt: { es: 'atendidos en 2025', en: 'served in 2025' } },
        { icono: 'ferroviario', cant: 3, que: { es: 'líneas de metro y ferrocarril', en: 'metro and rail lines' }, usd: 5880, num: 600, suf: { es: 'mil usuarios', en: 'thousand users' }, txt: { es: 'al día (2 líneas de metro y 1 ferrocarril)', en: 'per day (2 metro lines and 1 railway)' } }
      ],
      notas: {
        es: { msj: 'Las APP ya mueven al país: carga, pasajeros y vías en servicio todos los días.',
          guion: ['Puertos: más de 65 millones de toneladas de carga atendida en 2025.', '(Clic) Carreteras: más de 7 mil km intervenidos.', '(Clic) 17 aeropuertos regionales: más de 13 millones de pasajeros en 2025.', '(Clic) Metro y ferrocarril: 600 mil usuarios al día.'],
          cifras: ['9 puertos · **USD 3571 millones**', '18 carreteras · **USD 7845 millones**', '17 aeropuertos · **USD 1324 millones**', 'Metro y tren · **USD 5880 millones**'],
          puente: 'Y el impacto va más allá del transporte: energía, agua y salud.' },
        en: { msj: 'PPPs already keep the country moving: cargo, passengers and roads in service every day.',
          guion: ['Ports: over 65 million tons of cargo handled in 2025.', '(Click) Roads: over 7 thousand km improved.', '(Click) 17 regional airports: over 13 million passengers in 2025.', '(Click) Metro and rail: 600 thousand users per day.'],
          cifras: ['9 ports · **USD 3,571 million**', '18 roads · **USD 7,845 million**', '17 airports · **USD 1,324 million**', 'Metro & rail · **USD 5,880 million**'],
          puente: 'And the impact goes beyond transport: energy, water and health.' }
      }
    },
    {
      id: 'impacto-servicios', capitulo: 'trayectoria', tipo: 'impacto', min: 1.5, transicion: 'empuje',
      img: 'g3-torre.jpg',
      titulo: { es: 'Impacto de las APP adjudicadas', en: 'Impact of awarded PPPs' }, sub: { es: 'Energía, agua y salud', en: 'Energy, water and health' },
      items: [
        { icono: 'transmision', cant: 63, que: { es: 'líneas de transmisión', en: 'transmission lines' }, usd: 5601, pre: '+', num: 3400, suf: { es: 'km', en: 'km' }, txt: { es: 'de líneas de transmisión de 500 kV', en: 'of 500 kV transmission lines' } },
        { icono: 'electricidad', cant: 14, que: { es: 'centrales de generación', en: 'power plants' }, usd: 4903, num: 7370, suf: { es: 'GWh', en: 'GWh' }, txt: { es: 'de energía generada en 2025', en: 'of energy generated in 2025' } },
        { icono: 'agua', cant: 3, que: { es: 'PTAR en Lima y Callao', en: 'WWTPs in Lima and Callao' }, usd: 514, pre: '+', num: 90, suf: { es: '%', en: '%' }, txt: { es: 'del caudal tratado', en: 'of wastewater treated' } },
        { icono: 'salud', cant: 5, que: { es: 'hospitales de alta complejidad', en: 'high-complexity hospitals' }, usd: 2124, pre: '+', num: 9, suf: { es: 'millones', en: 'million' }, txt: { es: 'de beneficiarios', en: 'beneficiaries' } }
      ],
      notas: {
        es: { msj: 'Energía que llega, agua que se trata y hospitales que atienden: eso es una APP bien hecha.',
          guion: ['Más de 3400 km de líneas de transmisión de 500 kV.', '(Clic) 7370 GWh de energía generada en 2025.', '(Clic) Más del 90 % del caudal tratado con 3 PTAR en Lima y Callao.', '(Clic) 5 hospitales de alta complejidad para más de 9 millones de beneficiarios.'],
          cifras: ['63 líneas · **USD 5601 millones**', '14 centrales · **USD 4903 millones**', '3 PTAR · **USD 514 millones**', '5 hospitales · **USD 2124 millones**'],
          puente: 'Este impacto es fruto de un modelo que ha evolucionado durante cinco generaciones.' },
        en: { msj: 'Power delivered, water treated and hospitals serving patients: that is a well-executed PPP.',
          guion: ['Over 3,400 km of 500 kV transmission lines.', '(Click) 7,370 GWh of energy generated in 2025.', '(Click) Over 90% of wastewater treated by 3 WWTPs in Lima and Callao.', '(Click) 5 high-complexity hospitals serving over 9 million beneficiaries.'],
          cifras: ['63 lines · **USD 5,601 million**', '14 plants · **USD 4,903 million**', '3 WWTPs · **USD 514 million**', '5 hospitals · **USD 2,124 million**'],
          puente: 'This impact is the result of a model that has evolved over five generations.' }
      }
    },
    {
      id: 'evolucion', capitulo: 'trayectoria', tipo: 'evolucion', min: 1.5, transicion: 'profundidad',
      titulo: { es: 'Proyectos emblemáticos: la evolución de las APP', en: 'Emblematic projects: how PPPs have evolved' },
      etapas: [
        { v: 'APP 1.0', img: 'app1.jpg', proyecto: { es: 'Aeropuerto Internacional Jorge Chávez', en: 'Jorge Chávez International Airport' }, etapa: { es: 'Etapa de infraestructura básica y servicios públicos.', en: 'Basic infrastructure and public utilities stage.' } },
        { v: 'APP 2.0', img: 'app2.jpg', proyecto: { es: 'IIRSA Tramos 2, 3 y 4', en: 'IIRSA Sections 2, 3 and 4' }, etapa: { es: 'Etapa de expansión y diversificación de sectores.', en: 'Expansion and sector diversification stage.' } },
        { v: 'APP 3.0', img: 'app3.jpg', proyecto: { es: 'Línea 2 del Metro de Lima', en: 'Lima Metro Line 2' }, etapa: { es: 'Etapa de fortalecimiento y optimización de procesos.', en: 'Process strengthening and optimization stage.' } },
        { v: 'APP 4.0', img: 'app4.jpg', proyecto: { es: 'Puerto de Salaverry', en: 'Salaverry Port' }, etapa: { es: 'Etapa de innovación, sostenibilidad y participación social.', en: 'Innovation, sustainability and social participation stage.' } },
        { v: 'APP 5.0', img: 'app5.jpg', proyecto: { es: 'Anillo Vial Periférico · Ferrocarril Huancayo–Huancavelica', en: 'Peripheral Ring Road · Huancayo–Huancavelica Railway' }, etapa: { es: 'Etapa de digitalización avanzada, adaptabilidad financiera y resiliencia climática y social.', en: 'Advanced digitalization, financial adaptability and climate and social resilience stage.' } }
      ],
      notas: {
        es: { msj: 'Cada generación de APP aprendió de la anterior; hoy estamos en APP 5.0.',
          guion: ['APP 1.0: el Aeropuerto Jorge Chávez, infraestructura básica.', '(Clic) APP 2.0: IIRSA, expansión a nuevos sectores.', '(Clic) APP 3.0: Línea 2 del Metro, procesos más sólidos.', '(Clic) APP 4.0: Puerto Salaverry, sostenibilidad y participación social.', '(Clic) APP 5.0: Anillo Vial Periférico y Ferrocarril Huancayo–Huancavelica, digitalización y resiliencia.'],
          cifras: ['5 generaciones de APP', 'También puede hacer clic en cada panel para resaltarlo'],
          puente: 'Junto a las APP, el Perú ofrece mecanismos que protegen y aceleran la inversión.' },
        en: { msj: 'Each PPP generation learned from the previous one; today we are at PPP 5.0.',
          guion: ['PPP 1.0: Jorge Chávez Airport, basic infrastructure.', '(Click) PPP 2.0: IIRSA, expansion into new sectors.', '(Click) PPP 3.0: Metro Line 2, stronger processes.', '(Click) PPP 4.0: Salaverry Port, sustainability and social participation.', '(Click) PPP 5.0: Peripheral Ring Road and Huancayo–Huancavelica Railway, digitalization and resilience.'],
          cifras: ['5 PPP generations', 'You can also click each panel to highlight it'],
          puente: 'Alongside PPPs, Peru offers mechanisms that protect and accelerate investment.' }
      }
    },
    {
      id: 'promocion', capitulo: 'trayectoria', tipo: 'cifras', min: 1, transicion: 'zoom',
      titulo: { es: 'Mecanismos de promoción de la inversión', en: 'Investment promotion mechanisms' },
      nota: { es: '* Información a junio de 2026.', en: '* Information as of June 2026.' },
      cols: [
        { img: 'rera.jpg', periodo: '1998–2026*', icono: 'monto', titulo: { es: 'Recuperación Anticipada del IGV (RERA)', en: 'Early VAT Recovery Regime (RERA)' }, num: 289, label: { es: 'contratos', en: 'contracts' }, monto: { es: 'más de USD 64 mil millones', en: 'over USD 64 billion' } },
        { img: 'cej.jpg', periodo: '1993–2026*', icono: 'acuerdo', titulo: { es: 'Convenios de Estabilidad Jurídica (CEJ)', en: 'Legal Stability Agreements (LSA)' }, num: 740, label: { es: 'convenios', en: 'agreements' }, monto: { es: 'más de USD 37 mil millones', en: 'over USD 37 billion' } }
      ],
      notas: {
        es: { msj: 'Reglas estables y liquidez temprana: dos garantías que el inversionista valora.',
          guion: ['RERA: 289 contratos por más de USD 64 mil millones desde 1998.', '(Clic) CEJ: 740 convenios por más de USD 37 mil millones desde 1993.'],
          cifras: ['RERA **289** contratos · **+USD 64 mil millones**', 'CEJ **740** convenios · **+USD 37 mil millones**', 'Datos a junio de 2026'],
          preguntas: [['¿Qué es el RERA?', 'Es el régimen que permite recuperar anticipadamente el IGV pagado en la etapa preproductiva del proyecto, mejorando su flujo de caja.'], ['¿Qué garantiza un CEJ?', 'La estabilidad del régimen legal aplicable a la inversión (por ejemplo, el régimen tributario vigente al suscribir el convenio) durante su vigencia.']],
          puente: 'Con esta base, veamos lo que se ha adjudicado en los últimos cuatro años.' },
        en: { msj: 'Stable rules and early liquidity: two guarantees investors value.',
          guion: ['RERA: 289 contracts worth over USD 64 billion since 1998.', '(Click) LSA: 740 agreements worth over USD 37 billion since 1993.'],
          cifras: ['RERA **289** contracts · **over USD 64 billion**', 'LSA **740** agreements · **over USD 37 billion**', 'Data as of June 2026'],
          preguntas: [['What is RERA?', 'A regime that allows early recovery of the VAT paid during the pre-operational stage, improving project cash flow.'], ['What does an LSA guarantee?', 'Stability of the legal regime applicable to the investment (e.g., the tax regime in force when the agreement is signed) for its term.']],
          puente: 'On this foundation, let us look at what has been awarded over the last four years.' }
      }
    },

    /* ======================= RESULTADOS RECIENTES ======================= */
    {
      id: 'adjudicados', capitulo: 'resultados', tipo: 'anios', min: 1.5, transicion: 'subir',
      titulo: { es: 'Proyectos APP y PA adjudicados 2023–2026', en: 'PPP and PA projects awarded 2023–2026' },
      anios: [
        { anio: 2023, proy: 14, ad: 0, usd: 2332, paises: ['es', 'vn', 'us', 'co', 'br'], img: 'hito-2023.jpg', emblema: { es: 'Hospitales de EsSalud de Piura y Chimbote', en: 'EsSalud Hospitals in Piura and Chimbote' }, emblemaUsd: 323 },
        { anio: 2024, proy: 15, ad: 1, usd: 8956, paises: ['cn', 'pe', 'es', 'ar', 'ec', 'br', 'fr'], img: 'hito-2024.jpg', emblema: { es: 'Anillo Vial Periférico', en: 'Peripheral Ring Road' }, emblemaUsd: 3396 },
        { anio: 2025, proy: 9, ad: 1, usd: 4756, paises: ['es', 'ec', 'br', 'pe', 'cn', 'pt', 'us'], img: 'hito-2025.jpg', emblema: { es: 'Longitudinal de la Sierra Tramo 4', en: 'Longitudinal de la Sierra Highway – Section 4' }, emblemaUsd: 1582 },
        { anio: 2026, proy: 8, ad: 2, usd: 3144, paises: ['es', 'pe', 'mx', 'fr'], img: 'hito-2026.jpg', emblema: { es: 'Adenda Torre Trecca', en: 'Torre Trecca Addendum' }, emblemaUsd: 1201 }
      ],
      notas: {
        es: { msj: 'Inversionistas de 12 países ya apostaron por el Perú en los últimos cuatro años.',
          guion: ['2023: 14 proyectos por USD 2332 millones.', '(Clic) 2024: el año récord, 15 proyectos y 1 adenda por USD 8956 millones, con el Anillo Vial Periférico.', '(Clic) 2025: 9 proyectos y 1 adenda por USD 4756 millones.', '(Clic) 2026: 8 proyectos y 2 adendas por USD 3144 millones, a la fecha.'],
          cifras: ['2024 · **USD 8956 millones** (récord)', 'Anillo Vial Periférico · **USD 3396 millones**', 'Países: España, China, Brasil, Ecuador, Francia, EE. UU., México, Portugal, Argentina, Colombia, Vietnam y Perú'],
          preguntas: [['¿2026 ya cerró?', 'No: la cifra de 2026 corresponde a lo adjudicado a la fecha; la cartera de noviembre y diciembre se presenta más adelante.']],
          puente: 'Pongamos estas adjudicaciones en perspectiva desde 2019.' },
        en: { msj: 'Investors from 12 countries have bet on Peru over the last four years.',
          guion: ['2023: 14 projects worth USD 2,332 million.', '(Click) 2024: the record year, 15 projects and 1 addendum worth USD 8,956 million, including the Peripheral Ring Road.', '(Click) 2025: 9 projects and 1 addendum worth USD 4,756 million.', '(Click) 2026: 8 projects and 2 addenda worth USD 3,144 million to date.'],
          cifras: ['2024 · **USD 8,956 million** (record)', 'Peripheral Ring Road · **USD 3,396 million**', 'Countries: Spain, China, Brazil, Ecuador, France, US, Mexico, Portugal, Argentina, Colombia, Vietnam and Peru'],
          preguntas: [['Is 2026 closed?', 'No: the 2026 figure reflects awards to date; the November–December pipeline is presented later.']],
          puente: 'Let us put these awards in perspective since 2019.' }
      }
    },
    {
      id: 'resultados', capitulo: 'resultados', tipo: 'apiladas', min: 1.5, transicion: 'fundido',
      titulo: { es: 'Resultados APP y PA 2019–2026', en: 'PPP and PA results 2019–2026' }, sub: { es: 'USD millones, por sector', en: 'USD million, by sector' },
      destacado: { v: 19188, t: { es: 'adjudicados en los últimos 46 meses (2023–2026)', en: 'awarded in the last 46 months (2023–2026)' } },
      resaltar: [2023, 2024, 2025, 2026],
      anios: [
        { anio: 2019, total: 209, seg: [['electricidad', 209]] },
        { anio: 2020, total: 39, seg: [['electricidad', 39]] },
        { anio: 2021, total: 47, seg: [['electricidad', 47]] },
        { anio: 2022, total: 98, seg: [['electricidad', 39], ['educacion', 59]] },
        { anio: 2023, total: 2332, seg: [['electricidad', 1369], ['telecom', 640], ['salud', 323]] },
        { anio: 2024, total: 8956, seg: [['electricidad', 897], ['transportes', 4366], ['mineria', 3693]] },
        { anio: 2025, total: 4756, seg: [['agua', 280], ['salud', 284], ['transportes', 2655], ['educacion', 323], ['inmuebles', 1214]] },
        { anio: 2026, total: 3144, seg: [['salud', 1518], ['transportes', 475], ['electricidad', 339], ['agua', 123], ['educacion', 584], ['inmuebles', 105]] }
      ],
      nota: { es: '* No incluye proyectos caducados ni paralizados. En proyectos eléctricos se consideran montos referenciales. Incluye los montos de las adendas firmadas con la colaboración de PROINVERSIÓN.', en: '* Excludes expired or stalled projects. Reference amounts are used for electricity projects. Includes amendments signed in collaboration with PROINVERSIÓN.' },
      notas: {
        es: { msj: 'Pasamos de USD 209 millones en 2019 a USD 19 188 millones adjudicados en los últimos 46 meses.',
          guion: ['Entre 2019 y 2022 las adjudicaciones no superaron los USD 210 millones anuales.', 'Desde 2023 el salto es estructural: 2024 alcanzó USD 8956 millones.', '(Clic) En total, USD 19 188 millones en los últimos 46 meses.', 'Pase el cursor sobre cada barra para ver el detalle por sector.'],
          cifras: ['**USD 19 188 millones** en 46 meses', '2024: **USD 8956 millones**', '2019: USD 209 millones'],
          puente: '¿Qué se ha logrado específicamente en 2026?' },
        en: { msj: 'From USD 209 million in 2019 to USD 19,188 million awarded in the last 46 months.',
          guion: ['Between 2019 and 2022 annual awards did not exceed USD 210 million.', 'Since 2023 the leap is structural: 2024 reached USD 8,956 million.', '(Click) In total, USD 19,188 million in the last 46 months.', 'Hover over each bar to see the breakdown by sector.'],
          cifras: ['**USD 19,188 million** in 46 months', '2024: **USD 8,956 million**', '2019: USD 209 million'],
          puente: 'What specifically has been achieved in 2026?' }
      }
    },
    {
      id: 'avances-2026', capitulo: 'resultados', tipo: 'avances', min: 1.5, transicion: 'subir',
      titulo: { es: 'Avances 2026', en: '2026 progress' }, total: 3144,
      grupos: [
        { icono: 'check', n: 8, t: { es: 'proyectos adjudicados', en: 'projects awarded' }, items: [
          ['salud', { es: 'Gestión del Instituto Nacional de Salud del Niño – San Borja', en: 'Management of the National Children\'s Health Institute – San Borja' }, 317],
          ['transmision', { es: 'Grupo 1 del Plan de Transmisión 2025–2034', en: 'Group 1 of the 2025–2034 Transmission Plan' }, 339],
          ['agua', { es: 'PTAR Cajamarca', en: 'Cajamarca WWTP' }, 123],
          ['educacion', { es: 'CER Lima Metropolitana (colegios en riesgo)', en: 'CER Metropolitan Lima (at-risk schools)' }, 584],
          ['inmuebles', { es: 'Centro de Convenciones de Lima', en: 'Lima Convention Center' }, 105]] },
        { icono: 'documento', n: 2, t: { es: 'adendas firmadas', en: 'addenda signed' }, items: [
          ['salud', { es: 'Adenda Torre Trecca', en: 'Torre Trecca Addendum' }, 1201],
          ['aeropuertos', { es: 'Adenda del Segundo Grupo de Aeropuertos', en: 'Second Airport Group Addendum' }, 475]] },
        { icono: 'acuerdo', n: 5, t: { es: 'hitos de firma de contrato', en: 'contract-signing milestones' }, items: [
          ['inmuebles', { es: 'Parque Industrial de Ancón', en: 'Ancón Industrial Park' }, 1214],
          ['puertos', { es: 'Terminal Portuario de San Juan de Marcona', en: 'San Juan de Marcona Port Terminal' }, 405],
          ['salud', { es: 'O&M del Nuevo Hospital de Emergencias Villa El Salvador', en: 'O&M of the New Villa El Salvador Emergency Hospital' }, 284],
          ['transmision', { es: 'Grupo 1 del Plan de Transmisión 2025–2034', en: 'Group 1 of the 2025–2034 Transmission Plan' }, 339],
          ['agua', { es: 'PTAR Puerto Maldonado', en: 'Puerto Maldonado WWTP' }, 150]] }
      ],
      notas: {
        es: { msj: '2026 suma USD 3144 millones entre adjudicaciones y adendas, y cinco contratos ya firmados.',
          guion: ['8 proyectos adjudicados: salud, transmisión, saneamiento, educación e inmuebles.', '(Clic) 2 adendas firmadas: Torre Trecca y Segundo Grupo de Aeropuertos.', '(Clic) 5 hitos de firma de contrato, con el Parque Industrial de Ancón como el mayor.'],
          cifras: ['Total 2026: **USD 3144 millones**', 'Adenda Torre Trecca: **USD 1201 millones**', 'Parque Industrial de Ancón: **USD 1214 millones**'],
          preguntas: [['¿Por qué el Grupo 1 aparece dos veces?', 'Porque se adjudicó y además cumplió el hito de firma de contrato en 2026.']],
          puente: 'Ahora, lo más importante: lo que viene. El portafolio 2026–2030.' },
        en: { msj: '2026 adds up to USD 3,144 million in awards and addenda, plus five contracts already signed.',
          guion: ['8 projects awarded: health, transmission, sanitation, education and real estate.', '(Click) 2 addenda signed: Torre Trecca and the Second Airport Group.', '(Click) 5 contract-signing milestones, the largest being the Ancón Industrial Park.'],
          cifras: ['2026 total: **USD 3,144 million**', 'Torre Trecca Addendum: **USD 1,201 million**', 'Ancón Industrial Park: **USD 1,214 million**'],
          preguntas: [['Why does Group 1 appear twice?', 'Because it was awarded and also reached the contract-signing milestone in 2026.']],
          puente: 'Now the most important part: what lies ahead. The 2026–2030 portfolio.' }
      }
    },
    {
      id: 'ejecucion', capitulo: 'resultados', tipo: 'ejecucion', min: 2, respaldo: true,
      titulo: { es: 'Ejecución contractual', en: 'Contract execution' }, sub: { es: 'Situación actual de proyectos en ejecución', en: 'Current status of projects under execution' },
      items: [
        { sigla: 'AVP', nombre: { es: 'Anillo Vial Periférico', en: 'Peripheral Ring Road' }, fase: { es: 'Gestión ambiental y legal', en: 'Environmental and legal management' }, bloques: [
          { t: { es: 'Gestión ambiental', en: 'Environmental management' }, l: [{ es: 'EIA del Tramo 3 en evaluación por SENACE, con informe de observaciones proyectado para noviembre.', en: 'Section 3 EIA under SENACE review, with the observations report expected in November.' }, { es: 'IGA Vizcachera en evaluación por la MML, con resolución proyectada para el 31/10/2026.', en: 'Vizcachera environmental instrument under review by the Lima Municipality, resolution expected 10/31/2026.' }] },
          { t: { es: 'Gestión legal', en: 'Legal management' }, l: [{ es: 'Adenda 1 en evaluación conjunta por la ampliación del plazo de liberación de interferencias de los Tramos I y III; se estima finalizar en abril de 2027.', en: 'Addendum 1 under joint evaluation due to the extended deadline for clearing interferences in Sections I and III; expected completion April 2027.' }, { es: 'La Primera Acta de Suspensión se reporta vigente hasta el 12/11/2026.', en: 'The First Suspension Record is reported in force until 11/12/2026.' }] }] },
        { sigla: 'FHH', nombre: { es: 'Ferrocarril Huancayo – Huancavelica', en: 'Huancayo – Huancavelica Railway' }, fase: { es: 'Gestión técnica e interferencias', en: 'Technical management and interferences' }, bloques: [
          { t: { es: 'Gestión técnica', en: 'Technical management' }, l: [{ es: 'EDI MR: COFEPERÚ presentó 38 notas técnicas (27 con avances en la metodología de subsanación de observaciones en controversia), en el marco del trato directo.', en: 'Rolling stock detailed engineering: COFEPERÚ submitted 38 technical notes (27 showing progress on the methodology to resolve disputed observations) within direct negotiations.' }, { es: 'EDI Obras: reuniones semanales con el concesionario para revisar avances y la metodología BIM.', en: 'Works detailed engineering: weekly meetings with the concessionaire to review progress and the BIM methodology.' }] },
          { t: { es: 'Liberación de interferencias', en: 'Interference clearance' }, l: [{ es: 'Acciones para la desocupación de áreas en Chilca, Huancán, Aguas Calientes, Cuenca y colindantes, con participación de alcaldes distritales.', en: 'Actions to vacate areas in Chilca, Huancán, Aguas Calientes, Cuenca and surroundings, with district mayors\' participation.' }, { es: 'En evaluación la propuesta técnico-económica del expediente de liberación de interferencias de titularidad de Electrocentro.', en: 'Technical-economic proposal for the Electrocentro interference-clearance file under evaluation.' }] }] },
        { sigla: 'HEVES', nombre: { es: 'Hospital de Emergencias Villa El Salvador', en: 'Villa El Salvador Emergency Hospital' }, fase: { es: 'Fase preoperativa', en: 'Pre-operational phase' }, bloques: [
          { t: { es: 'Mantenimiento y disponibilidad de activos existentes', en: 'Maintenance and availability of existing assets' }, l: [{ es: 'Se iniciaron la disponibilidad de equipamiento y el mantenimiento de la infraestructura (Consulta Externa, Administración, Farmacia y Residencia Médica).', en: 'Equipment availability and infrastructure maintenance have started (Outpatient, Administration, Pharmacy and Medical Residency units).' }, { es: 'Las partes consensúan la versión final del Contrato de Fideicomiso de Administración y Pagos.', en: 'The parties are agreeing on the final version of the Administration and Payment Trust Agreement.' }] }] }
      ],
      notas: {
        es: { msj: 'Escena de respaldo: úsela solo si preguntan por la ejecución de contratos emblemáticos.',
          guion: ['Esta escena no aparece en la secuencia normal; se abre desde el mapa de escenas del presentador.', 'Haga clic en cada tarjeta (o avance) para ampliarla.'],
          cifras: ['AVP · FHH · HEVES'],
          puente: 'Vuelva a la escena de la que vino desde el mapa de escenas.' },
        en: { msj: 'Backup scene: use it only if asked about the execution of flagship contracts.',
          guion: ['This scene is skipped in the normal sequence; open it from the presenter scene map.', 'Click each card (or advance) to expand it.'],
          cifras: ['AVP · FHH · HEVES'],
          puente: 'Return to the previous scene from the scene map.' }
      }
    },

    /* ======================= PORTAFOLIO 2026–2030 ======================= */
    {
      id: 'cap-portafolio', capitulo: 'portafolio', tipo: 'capitulo', min: 0.5,
      img: 'bg-gruas.jpg', num: '01',
      kicker: { es: 'Lo que viene', en: 'What lies ahead' }, titulo: { es: 'Portafolio 2026–2030', en: '2026–2030 Portfolio' },
      datos: [{ v: { es: 'USD 42 mil millones', en: 'USD 42 billion' }, l: { es: 'en inversión', en: 'in investment' } }, { v: '87', l: { es: 'proyectos', en: 'projects' } }, { v: '9', l: { es: 'adendas', en: 'addenda' } }],
      notas: {
        es: { msj: 'USD 42 mil millones en 87 proyectos y 9 adendas hasta 2030.', guion: ['Pausa breve. Deje que la cifra se lea.'], cifras: ['**USD 42 mil millones**', '**87** proyectos + **9** adendas'], puente: 'Veamos dónde está esa inversión en el territorio.' },
        en: { msj: 'USD 42 billion across 87 projects and 9 addenda through 2030.', guion: ['Brief pause. Let the figure sink in.'], cifras: ['**USD 42 billion**', '**87** projects + **9** addenda'], puente: 'Let us see where that investment sits across the country.' }
      }
    },
    {
      id: 'corredores', capitulo: 'portafolio', tipo: 'corredores', min: 1.5, transicion: 'zoom',
      titulo: { es: 'Portafolio 2026–2030', en: '2026–2030 Portfolio' },
      mapa: 'mapa-corredores.jpg', proy: 87, ad: 9, usd: 42000,
      panelTitulo: { es: 'Ejes logísticos', en: 'Logistics corridors' }, panelSub: { es: '% del portafolio', en: '% of portfolio' },
      leyenda: [{ k: 'mar', t: { es: 'Terminales portuarios marítimos', en: 'Maritime port terminals' } }, { k: 'flu', t: { es: 'Terminales portuarios fluviales', en: 'River port terminals' } }, { k: 'sis', t: { es: 'Sistema de transporte fluvial', en: 'River transport system' } }, { k: 'vial', t: { es: 'Infraestructura vial', en: 'Road infrastructure' } }],
      ejes: [
        { nombre: { es: 'Eje Norte', en: 'North corridor' }, c: '#1F77B4', pct: 43, trans: 'Paita – Yurimaguas – Santa Rosa', cost: 'Paita – Salaverry – Chancay', sect: ['agricultura', 'agua', 'electricidad', 'inmuebles', 'mineria', 'salud', 'telecom', 'transportes'] },
        { nombre: { es: 'Eje Centro', en: 'Central corridor' }, c: '#1E8A3A', pct: 32, trans: 'Callao/Chancay – Pucallpa', cost: 'Chancay – Callao – Pisco', sect: ['agricultura', 'agua', 'educacion', 'electricidad', 'hidrocarburos', 'inmuebles', 'salud', 'transportes'] },
        { nombre: { es: 'Eje Sur', en: 'South corridor' }, c: '#C00000', pct: 25, trans: 'Matarani/SJM/Ilo – Iñapari', cost: 'Pisco – Matarani – Tacna', sect: ['agricultura', 'agua', 'educacion', 'electricidad', 'hidrocarburos', 'telecom', 'transportes', 'turismo'] }
      ],
      notas: {
        es: { msj: 'La cartera articula el país en tres ejes logísticos que conectan puertos, carreteras y ríos.',
          guion: ['El mapa muestra puertos marítimos y fluviales, sistema fluvial e infraestructura vial.', '(Clic) Eje Norte: 43 % del portafolio, de Paita a Santa Rosa.', '(Clic) Eje Centro: 32 %, de Callao/Chancay a Pucallpa.', '(Clic) Eje Sur: 25 %, de Matarani, San Juan de Marcona e Ilo a Iñapari.'],
          cifras: ['Norte **43 %** · Centro **32 %** · Sur **25 %**', '**87** proyectos + **9** adendas · **USD 42 mil millones**'],
          preguntas: [['¿Qué incluye cada eje?', 'Un corredor transversal (costa–sierra–selva) y uno costero, con proyectos de varios sectores: transporte, agua, electricidad, salud, entre otros.']],
          puente: 'Recorramos la cartera en el tiempo, empezando por lo inmediato: noviembre y diciembre de 2026.' },
        en: { msj: 'The portfolio connects the country through three logistics corridors linking ports, roads and rivers.',
          guion: ['The map shows maritime and river ports, the river system and road infrastructure.', '(Click) North corridor: 43% of the portfolio, from Paita to Santa Rosa.', '(Click) Central corridor: 32%, from Callao/Chancay to Pucallpa.', '(Click) South corridor: 25%, from Matarani, San Juan de Marcona and Ilo to Iñapari.'],
          cifras: ['North **43%** · Central **32%** · South **25%**', '**87** projects + **9** addenda · **USD 42 billion**'],
          preguntas: [['What does each corridor include?', 'A transversal (coast–highlands–jungle) route and a coastal route, with projects across sectors: transport, water, electricity, health and others.']],
          puente: 'Let us walk through the portfolio over time, starting with the immediate: November and December 2026.' }
      }
    },
    {
      id: 'nov-dic', capitulo: 'portafolio', tipo: 'horizonte', min: 1, transicion: 'subir',
      titulo: { es: 'Portafolio nov–dic 2026', en: 'Nov–Dec 2026 portfolio' }, img: 'bg-gruas.jpg',
      proy: 8, proyLbl: { es: 'proyectos + 2 DI + 5 adendas', en: 'projects + 2 DI + 5 addenda' }, usd: 2000, usdPre: { es: 'más de', en: 'over' },
      regiones: { es: '15 regiones beneficiadas', en: '15 regions benefited' }, benef: { es: '5 millones de beneficiarios', en: '5 million beneficiaries' },
      barras: [
        { s: 'electricidad', v: 704, n: { es: '8 proyectos', en: '8 projects' } },
        { s: 'transportes', v: 463, n: { es: '1 declaratoria de interés', en: '1 declaration of interest' } },
        { s: 'agua', v: 200, n: { es: '1 declaratoria de interés', en: '1 declaration of interest' } }
      ],
      adendas: { t: { es: 'Adendas', en: 'Addenda' }, l: [['hidrocarburos', 663], ['mineria', 500], ['transportes', 269], ['salud', 20]] },
      fuentes: { barras: ['nov-dic-lista'], adendas: ['nov-dic-lista'] },
      notas: {
        es: { msj: 'En dos meses: más de USD 2 mil millones entre proyectos, declaratorias de interés y adendas.',
          guion: ['8 proyectos de transmisión eléctrica por USD 704 millones.', '(Clic) Las barras muestran el monto por sector: electricidad, transporte y saneamiento.', '(Clic) 5 adendas por USD 1453 millones: hidrocarburos, minería, transporte y salud.'],
          cifras: ['**+USD 2 mil millones**', '**15** regiones · **5 millones** de beneficiarios', 'Adendas **USD 1453 millones**'],
          preguntas: [['¿Qué es una Declaratoria de Interés (DI)?', 'Es el hito de una iniciativa privada en el que se publica el interés del Estado en el proyecto, abriendo la posibilidad a terceros interesados antes de la adjudicación.']],
          puente: 'Veamos el detalle, proyecto por proyecto.' },
        en: { msj: 'In two months: over USD 2 billion across projects, declarations of interest and addenda.',
          guion: ['8 power transmission projects worth USD 704 million.', '(Click) Bars show the amount by sector: electricity, transport and sanitation.', '(Click) 5 addenda worth USD 1,453 million: hydrocarbons, mining, transport and health.'],
          cifras: ['**Over USD 2 billion**', '**15** regions · **5 million** beneficiaries', 'Addenda **USD 1,453 million**'],
          preguntas: [['What is a Declaration of Interest (DI)?', 'The milestone of an unsolicited proposal at which the State\'s interest in the project is published, allowing third parties to come forward before the award.']],
          puente: 'Let us look at the detail, project by project.' }
      }
    },
    {
      id: 'nov-dic-lista', capitulo: 'portafolio', tipo: 'explorador', min: 1, transicion: 'zoom', filtro: 'sub',
      titulo: { es: 'Lista de proyectos nov–dic 2026', en: 'List of projects Nov–Dec 2026' },
      cols: ['q'], colQ: { es: 'Adjudicación', en: 'Award' }, meta: 1367,
      nota: { es: '* Monto del proyecto: suma simple a valor nominal del CAPEX y del OPEX de los primeros 10 años de operación, sin IGV, en USD. Solo CAPEX donde se indica. DI: Declaratoria de Interés (iniciativas privadas).', en: '* Project amount: simple nominal sum of CAPEX and the first 10 years of OPEX, excluding VAT, in USD. CAPEX only where indicated. DI: Declaration of Interest (unsolicited proposals).' },
      grupos: [
        { t: { es: 'Proyectos', en: 'Projects' }, meta: 1367, filas: [
          { n: '1–4', s: 'transmision', p: { es: 'Grupo 2 del Plan de Transmisión 2025–2034', en: 'Group 2 of the 2025–2034 Transmission Plan' }, tag: { es: 'Solo CAPEX', en: 'CAPEX only' }, e: 'PROINVERSIÓN', q: 'IV-26', m: 539 },
          { n: '5–8', s: 'transmision', p: { es: 'Grupo 3 del Plan de Transmisión 2025–2034', en: 'Group 3 of the 2025–2034 Transmission Plan' }, tag: { es: 'Solo CAPEX', en: 'CAPEX only' }, e: 'PROINVERSIÓN', q: 'IV-26', m: 166 },
          { n: '9', s: 'agua', p: { es: 'PTAR San Martín', en: 'San Martín WWTP' }, tag: 'DI', e: 'PROINVERSIÓN', q: 'IV-26', m: 200 },
          { n: '10', s: 'puertos', p: { es: 'Terminal Portuario de Chimbote', en: 'Chimbote Port Terminal' }, tag: 'DI', e: 'PROINVERSIÓN', q: 'IV-26', m: 463 }] },
        { t: { es: 'Adendas', en: 'Addenda' }, meta: 1453, filas: [
          { n: '1', s: 'hidrocarburos', p: { es: 'Adenda Cálidda', en: 'Cálidda Addendum' }, e: 'MINEM', m: 663 },
          { n: '2', s: 'puertos', p: { es: 'Adenda Terminal de Embarque de Concentrado de Minerales', en: 'Mineral Concentrate Shipping Terminal Addendum' }, e: 'MTC', m: 230 },
          { n: '3', s: 'ferroviario', p: { es: 'Adenda Ferrocarril del Centro', en: 'Central Railway Addendum' }, e: 'MTC', m: 39 },
          { n: '4', s: 'salud', p: { es: 'Adenda SALOG', en: 'SALOG Addendum' }, e: 'ESSALUD', m: 20 },
          { n: '5', s: 'mineria', p: { es: 'Adenda La Granja', en: 'La Granja Addendum' }, e: 'MINEM', m: 500 }] }
      ],
      notas: {
        es: { msj: 'Todo lo que se adjudica o firma en las próximas semanas, filtrable en vivo.',
          guion: ['Pestaña Proyectos: Grupos 2 y 3 de transmisión y las DI de PTAR San Martín y del Terminal Portuario de Chimbote, todos en el IV trimestre de 2026.', 'Pestaña Adendas: Cálidda, Terminal de Embarque, Ferrocarril del Centro, SALOG y La Granja.', 'Use los controles de esta vista para cambiar de pestaña, filtrar por sector u ordenar por monto.'],
          cifras: ['Meta proyectos: **USD 1367 millones**', 'Meta adendas: **USD 1453 millones**'],
          preguntas: [['¿Qué incluye el monto del proyecto?', 'CAPEX más el OPEX de los primeros 10 años de operación, sin IGV, a valor nominal en dólares. En los Grupos 2 y 3 se considera solo CAPEX.'], ['¿Qué es la EPTP?', 'La Entidad Pública Titular del Proyecto: la entidad del Estado responsable del proyecto y contraparte del contrato.']],
          puente: 'Pasemos al año con mayor número de proyectos: 2027.' },
        en: { msj: 'Everything to be awarded or signed in the coming weeks, filterable live.',
          guion: ['Projects tab: transmission Groups 2 and 3 and the DIs for San Martín WWTP and Chimbote Port Terminal, all in Q4 2026.', 'Addenda tab: Cálidda, Shipping Terminal, Central Railway, SALOG and La Granja.', 'Use the controls in this view to switch tabs, filter by sector or sort by amount.'],
          cifras: ['Projects goal: **USD 1,367 million**', 'Addenda goal: **USD 1,453 million**'],
          preguntas: [['What does the project amount include?', 'CAPEX plus the first 10 years of OPEX, excluding VAT, at nominal value in US dollars. Groups 2 and 3 include CAPEX only.'], ['What is the EPTP?', 'The public entity that owns the project: the State body responsible for it and counterparty to the contract.']],
          puente: 'Let us move to the year with the most projects: 2027.' }
      }
    },
    {
      id: 'p2027', capitulo: 'portafolio', tipo: 'horizonte', min: 1.5, transicion: 'empuje',
      titulo: { es: 'Portafolio 2027', en: '2027 portfolio' }, img: 'bg-carretera.jpg',
      proy: 30, proyLbl: { es: 'proyectos + 4 adendas', en: 'projects + 4 addenda' }, usd: 15000,
      regiones: { es: 'más de 17 regiones', en: '17+ regions' }, benef: { es: '7 millones de beneficiarios', en: '7 million beneficiaries' },
      barras: [
        { s: 'mineria', v: 2157, n: { es: '1 proyecto', en: '1 project' } },
        { s: 'agua', v: 1834, n: { es: '5 proyectos', en: '5 projects' } },
        { s: 'inmuebles', v: 1685, n: { es: '4 proyectos', en: '4 projects' } },
        { s: 'transportes', v: 1353, n: { es: '4 proyectos', en: '4 projects' } },
        { s: 'telecom', v: 706, n: { es: '3 proyectos', en: '3 projects' } },
        { s: 'agricultura', v: 660, n: { es: '2 proyectos', en: '2 projects' } },
        { s: 'salud', v: 603, n: { es: '1 proyecto', en: '1 project' } },
        { s: 'turismo', v: 492, n: { es: '2 proyectos', en: '2 projects' } },
        { s: 'electricidad', v: 482, n: { es: '6 proyectos', en: '6 projects' } },
        { s: 'educacion', v: 345, n: { es: '2 proyectos', en: '2 projects' } }
      ],
      adendas: { t: { es: 'Adendas', en: 'Addenda' }, l: [['transportes', 4283], ['agua', 29]] },
      fuentes: { barras: ['p2027-lista'], adendas: ['p2027-adendas'] },
      notas: {
        es: { msj: '2027 es el año de mayor diversidad: 10 sectores, 30 proyectos y USD 15 mil millones.',
          guion: ['30 proyectos y 4 adendas en más de 17 regiones.', '(Clic) Minería lidera con IEPA Sechura (USD 2157 millones), seguida de agua y saneamiento.', '(Clic) 4 adendas por USD 4312 millones, casi todas en transporte.'],
          cifras: ['**30** proyectos + **4** adendas', '**USD 15 mil millones**', 'Minería **USD 2157 millones**', 'Agua y saneamiento **USD 1834 millones**'],
          puente: 'Abramos la lista completa de 2027.' },
        en: { msj: '2027 is the most diverse year: 10 sectors, 30 projects and USD 15 billion.',
          guion: ['30 projects and 4 addenda across 17+ regions.', '(Click) Mining leads with IEPA Sechura (USD 2,157 million), followed by water and sanitation.', '(Click) 4 addenda worth USD 4,312 million, almost all in transport.'],
          cifras: ['**30** projects + **4** addenda', '**USD 15 billion**', 'Mining **USD 2,157 million**', 'Water & sanitation **USD 1,834 million**'],
          puente: 'Let us open the full 2027 list.' }
      }
    },
    {
      id: 'p2027-lista', capitulo: 'portafolio', tipo: 'explorador', min: 1, transicion: 'zoom',
      titulo: { es: 'Relación de proyectos 2027', en: 'List of projects 2027' },
      cols: ['ad', 'q'], colQ: { es: 'Adj. concurso', en: 'Tender award' }, meta: 10316,
      nota: { es: '* CAPEX + OPEX de los primeros 10 años, sin IGV, en USD. Adj. directa: hito de iniciativas privadas. PA: Proyecto en Activos. Montos referenciales según los estudios más actuales o el IMIAPP.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD. Direct award: unsolicited-proposal milestone. PA: Project in Assets. Reference amounts based on the latest studies or the IMIAPP.' },
      grupos: [{ t: { es: 'Proyectos', en: 'Projects' }, filas: [
        { n: '1', s: 'puertos', p: { es: 'Terminal Internacional de Chimbote', en: 'Chimbote International Port Terminal' }, e: 'PROINVERSIÓN', ad: 'I-27', q: 'III-27', m: 463 },
        { n: '2', s: 'agua', p: { es: 'PTAR San Martín', en: 'San Martín WWTP' }, e: 'PROINVERSIÓN', ad: 'I-27', q: 'III-27', m: 200 },
        { n: '3–7', s: 'transmision', p: { es: 'Grupo 4 del Plan de Transmisión 2025–2034', en: 'Group 4 of the 2025–2034 Transmission Plan' }, e: 'PROINVERSIÓN', q: 'I-27', m: 145 },
        { n: '8', s: 'agua', p: { es: 'Obras de Cabecera – Fase 1', en: 'Headworks – Phase 1' }, e: 'PROINVERSIÓN', q: 'II-27', m: 731 },
        { n: '9', s: 'educacion', p: { es: 'Colegios Cusco', en: 'Schools in Cusco' }, e: 'PROINVERSIÓN', ad: 'II-27', q: 'IV-27', m: 218 },
        { n: '10', s: 'inmuebles', p: { es: 'IPPA Parque 23', en: 'IPPA Park 23' }, tag: 'PA', e: 'MVCS', ad: 'I-27', q: 'III-27', m: 162 },
        { n: '11', s: 'agua', p: { es: 'Desaladora Ilo', en: 'Ilo Desalination Plant' }, e: 'PROINVERSIÓN', ad: 'IV-27', q: 'II-28', m: 232 },
        { n: '12', s: 'agua', p: { es: 'PTAR Huancayo', en: 'Huancayo WWTP' }, e: 'PROINVERSIÓN', ad: 'IV-27', q: 'II-28', m: 466 },
        { n: '13', s: 'vial', p: { es: 'Dv. Las Vegas – Mazamari – Pto. Ocopa', en: 'Dv. Las Vegas – Mazamari – Pto. Ocopa road' }, e: 'PROINVERSIÓN', q: 'IV-27', m: 353 },
        { n: '14', s: 'vial', p: { es: 'Atico – Dv. Quilca – Matarani – Ilo', en: 'Atico – Dv. Quilca – Matarani – Ilo road' }, e: 'PROINVERSIÓN', q: 'IV-27', m: 240 },
        { n: '15', s: 'turismo', p: { es: 'Teleférico Choquequirao', en: 'Choquequirao Cable Car' }, e: 'PROINVERSIÓN', q: 'II-27', m: 418 },
        { n: '16', s: 'generacion', p: { es: 'Central Fotovoltaica Las Joyas', en: 'Las Joyas Photovoltaic Plant' }, tag: 'PA', e: 'MINDEF', ad: 'III-27', q: 'I-28', m: 337 },
        { n: '17', s: 'educacion', p: { es: 'CER VMT', en: 'CER VMT (schools)' }, e: 'PROINVERSIÓN', ad: 'III-27', q: 'I-28', m: 128 },
        { n: '18', s: 'vial', p: { es: 'Carretera Empalme 1B – Buenos Aires – Canchaque', en: '1B Junction – Buenos Aires – Canchaque Highway' }, e: 'PROINVERSIÓN', q: 'IV-27', m: 297 },
        { n: '19', s: 'salud', p: { es: 'Hospital PNP', en: 'National Police (PNP) Hospital' }, e: 'PROINVERSIÓN', q: 'IV-27', m: 603 },
        { n: '20', s: 'irrigacion', p: { es: 'O&M Olmos', en: 'Olmos O&M' }, e: 'GORE Lambayeque', q: 'IV-27', m: 156 },
        { n: '21', s: 'inmuebles', p: { es: 'Centro Comercial El Pinar', en: 'El Pinar Shopping Center' }, tag: 'PA', e: 'GL Independencia', q: 'IV-27', m: 17 },
        { n: '22', s: 'mineria', p: { es: 'IEPA Sechura', en: 'IEPA Sechura' }, e: 'MINEM', q: 'IV-27', m: 2157 },
        { n: '23–24', s: 'telecom', p: { es: 'Red de comunicaciones de Loreto', en: 'Loreto Communications Network' }, e: 'MTC', q: 'IV-27', m: 595 },
        { n: '25', s: 'telecom', p: { es: 'Red de internet fijo – Madre de Dios', en: 'Fixed Internet Network – Madre de Dios' }, e: 'MTC', q: 'IV-27', m: 111 },
        { n: '26', s: 'irrigacion', p: { es: 'Afianzamiento hídrico de Pampas de Villacurí y Lanchas', en: 'Water supply reinforcement – Pampas de Villacurí and Lanchas' }, e: 'PROINVERSIÓN', ad: 'II-27', q: 'IV-27', m: 504 },
        { n: '27', s: 'inmuebles', p: { es: 'Parque Industrial Lambayeque', en: 'Lambayeque Industrial Park' }, e: 'GORE Lambayeque', q: 'IV-27', m: 1500 },
        { n: '28', s: 'inmuebles', p: { es: 'IPPA Estación Naval Paita', en: 'Paita Naval Station IPPA' }, e: 'MINDEF', ad: 'I-27', q: 'III-27', m: 6 },
        { n: '29', s: 'agua', p: { es: 'Desaladora Lima Norte', en: 'North Lima Desalination Plant' }, e: 'PROINVERSIÓN', ad: 'IV-27', q: 'III-28', m: 205 },
        { n: '30', s: 'turismo', p: { es: 'Teleférico Cerro Azoguini – Lago Titicaca', en: 'Azoguini Hill – Lake Titicaca Cable Car' }, e: 'MP Puno', q: 'IV-27', m: 73 }] }],
      notas: {
        es: { msj: '30 proyectos en 2027: elija el sector que le interesa y la lista responde.',
          guion: ['Sugerencia: filtre por "Agua y saneamiento" (5 proyectos) o "Inmuebles" (4) según el público.', 'Ordene por monto para destacar IEPA Sechura, Parque Industrial Lambayeque y Obras de Cabecera.', 'La columna "Adj. directa" aplica a iniciativas privadas.'],
          cifras: ['Meta 2027: **USD 10 316 millones**', 'IEPA Sechura **USD 2157 millones**', 'Parque Industrial Lambayeque **USD 1500 millones**'],
          preguntas: [['¿Qué es el IMIAPP?', 'El Informe Multianual de Inversiones en APP, que elabora cada sector; de él provienen montos referenciales de proyectos en formulación.']],
          puente: 'Además, 2027 incluye cuatro adendas relevantes.' },
        en: { msj: '30 projects in 2027: pick the sector you care about and the list responds.',
          guion: ['Tip: filter by "Water & sanitation" (5 projects) or "Real estate" (4) depending on the audience.', 'Sort by amount to highlight IEPA Sechura, Lambayeque Industrial Park and the Headworks.', 'The "Direct award" column applies to unsolicited proposals.'],
          cifras: ['2027 goal: **USD 10,316 million**', 'IEPA Sechura **USD 2,157 million**', 'Lambayeque Industrial Park **USD 1,500 million**'],
          preguntas: [['What is the IMIAPP?', 'The Multi-year PPP Investment Report prepared by each sector; reference amounts for projects under formulation come from it.']],
          puente: '2027 also includes four relevant addenda.' }
      }
    },
    {
      id: 'p2027-adendas', capitulo: 'portafolio', tipo: 'explorador', min: 0.5, transicion: 'empuje', filtro: 'sub',
      titulo: { es: 'Relación de adendas 2027', en: '2027 addenda' }, sub: { es: 'Hasta 4 adendas por más de USD 4300 millones', en: 'Up to 4 addenda worth over USD 4.3 billion' },
      colP: { es: 'Adenda', en: 'Addendum' }, meta: 4312,
      nota: { es: '* CAPEX + OPEX de los primeros 10 años, sin IGV, en USD.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD.' },
      grupos: [{ t: { es: 'Adendas', en: 'Addenda' }, filas: [
        { n: '1', s: 'ferroviario', p: { es: 'Adenda Línea 1 del Metro de Lima', en: 'Lima Metro Line 1 Addendum' }, e: 'MTC', m: 2684 },
        { n: '2', s: 'vial', p: { es: 'Adenda Red Vial 5', en: 'Road Network 5 Addendum' }, e: 'MTC', m: 333 },
        { n: '3', s: 'puertos', p: { es: 'Adenda Muelle Sur', en: 'South Pier Addendum' }, e: 'MTC', m: 1266 },
        { n: '4', s: 'agua', p: { es: 'Adenda PTAP Chillón', en: 'Chillón WTP Addendum' }, e: 'MVCS', m: 29 }] }],
      notas: {
        es: { msj: 'Las adendas 2027 suman USD 4312 millones; la Línea 1 del Metro concentra más del 60 %.',
          guion: ['Línea 1 del Metro de Lima: USD 2684 millones.', 'Muelle Sur: USD 1266 millones.', 'Red Vial 5 y PTAP Chillón completan la lista.'],
          cifras: ['Meta: **USD 4312 millones**', 'Línea 1: **USD 2684 millones**'],
          puente: 'Miremos ahora el horizonte 2028–2030.' },
        en: { msj: '2027 addenda total USD 4,312 million; Metro Line 1 accounts for over 60%.',
          guion: ['Lima Metro Line 1: USD 2,684 million.', 'South Pier: USD 1,266 million.', 'Road Network 5 and Chillón WTP complete the list.'],
          cifras: ['Goal: **USD 4,312 million**', 'Line 1: **USD 2,684 million**'],
          puente: 'Now let us look at the 2028–2030 horizon.' }
      }
    },
    {
      id: 'p2028-2030', capitulo: 'portafolio', tipo: 'horizonte', min: 1, transicion: 'empuje',
      titulo: { es: 'Portafolio 2028–2030', en: '2028–2030 portfolio' }, img: 'bg-refineria.jpg',
      proy: 49, proyLbl: { es: 'proyectos', en: 'projects' }, usd: 25000,
      regiones: { es: 'más de 23 regiones', en: '23+ regions' }, benef: { es: '22 millones de beneficiarios', en: '22 million beneficiaries' },
      fuentes: { barras: ['p2028-lista', 'p2029-lista'] },
      barras: [
        { s: 'transportes', v: 5910, n: { es: '21 proyectos', en: '21 projects' } },
        { s: 'agricultura', v: 5849, n: { es: '3 proyectos', en: '3 projects' } },
        { s: 'hidrocarburos', v: 4670, n: { es: '2 proyectos', en: '2 projects' } },
        { s: 'agua', v: 3793, n: { es: '11 proyectos', en: '11 projects' } },
        { s: 'salud', v: 3430, n: { es: '9 proyectos', en: '9 projects' } },
        { s: 'inmuebles', v: 767, n: { es: '1 proyecto', en: '1 project' } },
        { s: 'electricidad', v: 421, n: { es: '1 proyecto', en: '1 project' } },
        { s: 'educacion', v: 264, n: { es: '1 proyecto', en: '1 project' } }
      ],
      notas: {
        es: { msj: '49 proyectos por USD 25 mil millones que beneficiarán a 22 millones de peruanos.',
          guion: ['Transporte (21 proyectos) y agricultura e irrigación (Chinecas, Majes Siguas II y Chavimochic III) concentran casi la mitad.', '(Clic) Hidrocarburos: SITGAS y la masificación del gas en el sur.', 'Agua y saneamiento: 11 proyectos; salud: 9 hospitales y servicios.'],
          cifras: ['**49** proyectos · **USD 25 mil millones**', 'Transportes **USD 5910 millones**', 'Agricultura e irrigación **USD 5849 millones**'],
          puente: 'Veamos los proyectos de 2028.' },
        en: { msj: '49 projects worth USD 25 billion that will benefit 22 million Peruvians.',
          guion: ['Transport (21 projects) and agriculture & irrigation (Chinecas, Majes Siguas II and Chavimochic III) account for almost half.', '(Click) Hydrocarbons: SITGAS and natural gas expansion in the south.', 'Water & sanitation: 11 projects; health: 9 hospitals and services.'],
          cifras: ['**49** projects · **USD 25 billion**', 'Transportation **USD 5,910 million**', 'Agriculture & irrigation **USD 5,849 million**'],
          puente: 'Let us look at the 2028 projects.' }
      }
    },
    {
      id: 'p2028-lista', capitulo: 'portafolio', tipo: 'explorador', min: 1, transicion: 'zoom',
      titulo: { es: 'Relación de proyectos 2028', en: 'List of projects 2028' }, sub: { es: 'Hasta 26 proyectos por más de USD 10 300 millones', en: 'Up to 26 projects worth over USD 10.3 billion' },
      cols: ['ad', 'q'], colQ: { es: 'Adj. concurso', en: 'Tender award' }, meta: 10325, metaLbl: { es: 'Meta 2028', en: '2028 goal' },
      nota: { es: '* CAPEX + OPEX de los primeros 10 años, sin IGV, en USD. Adj. directa: hito de iniciativas privadas.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD. Direct award: unsolicited-proposal milestone.' },
      grupos: [{ t: { es: 'Proyectos', en: 'Projects' }, filas: [
        { n: '1', s: 'salud', p: { es: 'Hospital de Sullana', en: 'Sullana Hospital' }, e: 'GORE Piura', q: 'I-28', m: 280 },
        { n: '2', s: 'hidrocarburos', p: { es: 'Masificación del gas natural en Arequipa, Moquegua y Tacna', en: 'Natural gas distribution in Arequipa, Moquegua and Tacna' }, e: 'PROINVERSIÓN', q: 'I-28', m: 349 },
        { n: '3', s: 'salud', p: { es: 'Hospital Militar', en: 'Military Hospital' }, e: 'PROINVERSIÓN', ad: 'I-28', q: 'III-28', m: 806 },
        { n: '4', s: 'agua', p: { es: 'PTAR Trujillo', en: 'Trujillo WWTP' }, e: 'MVCS', ad: 'I-28', q: 'III-28', m: 809 },
        { n: '5', s: 'inmuebles', p: { es: 'Península artificial – Puerta del Pacífico', en: 'Artificial Peninsula – Gateway to the Pacific' }, e: 'MVCS', ad: 'I-28', q: 'III-28', m: 767 },
        { n: '6', s: 'agua', p: { es: 'PTAR Cañete', en: 'Cañete WWTP' }, e: 'PROINVERSIÓN', ad: 'I-28', q: 'III-28', m: 323 },
        { n: '7', s: 'salud', p: { es: 'GIRSE', en: 'GIRSE' }, e: 'PROINVERSIÓN', ad: 'I-28', q: 'III-28', m: 221 },
        { n: '8', s: 'distribucion', p: { es: 'IPA BESS', en: 'IPA BESS' }, e: 'PROINVERSIÓN', ad: 'I-28', q: 'III-28', m: 421 },
        { n: '9', s: 'salud', p: { es: 'Hospital de Iquitos', en: 'Iquitos Hospital' }, e: 'GORE Loreto', q: 'II-28', m: 135 },
        { n: '10', s: 'salud', p: { es: 'Hospital de Yurimaguas', en: 'Yurimaguas Hospital' }, e: 'GORE Loreto', q: 'II-28', m: 139 },
        { n: '11', s: 'salud', p: { es: 'Hospital Regional de Loreto', en: 'Loreto Regional Hospital' }, e: 'GORE Loreto', q: 'II-28', m: 292 },
        { n: '12', s: 'vial', p: { es: 'Zapallal – Ventanilla', en: 'Zapallal – Ventanilla road' }, e: 'PROINVERSIÓN', q: 'II-28', m: 88 },
        { n: '13', s: 'aeropuertos', p: { es: 'Tercer Grupo de Aeropuertos', en: 'Third Airport Group' }, e: 'PROINVERSIÓN', q: 'II-28', m: 619 },
        { n: '14', s: 'salud', p: { es: 'Hospital Unanue', en: 'Unanue Hospital' }, e: 'PROINVERSIÓN', q: 'III-28', m: 973 },
        { n: '15', s: 'agua', p: { es: 'Saneamiento Chanchamayo y Concepción', en: 'Chanchamayo and Concepción sanitation' }, e: 'PROINVERSIÓN', q: 'III-28', m: 190 },
        { n: '16', s: 'vial', p: { es: 'Vía de Evitamiento de Cusco', en: 'Cusco Bypass' }, e: 'PROINVERSIÓN', q: 'III-28', m: 941 },
        { n: '17', s: 'agua', p: { es: 'PTAP Cajamarca', en: 'Cajamarca WTP' }, e: 'PROINVERSIÓN', q: 'III-28', m: 921 },
        { n: '18', s: 'agua', p: { es: 'Agua y saneamiento Tumbes y Contralmirante Villar', en: 'Tumbes and Contralmirante Villar water & sanitation' }, e: 'PROINVERSIÓN', q: 'III-28', m: 653 },
        { n: '19', s: 'vial', p: { es: 'Pte. Carrizales (Casma) – Pariacoto', en: 'Carrizales Bridge (Casma) – Pariacoto road' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 106 },
        { n: '20', s: 'puertos', p: { es: 'Nuevos terminales portuarios de Loreto', en: 'New Loreto port terminals' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 205 },
        { n: '21', s: 'agua', p: { es: 'PTAR Iquitos', en: 'Iquitos WWTP' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 415 },
        { n: '22', s: 'vial', p: { es: 'Corredor Vial 6', en: 'Road Corridor 6' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 192 },
        { n: '23', s: 'vial', p: { es: 'Sicuani – Pucará – Calapuja', en: 'Sicuani – Pucará – Calapuja road' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 111 },
        { n: '24', s: 'vial', p: { es: 'Cusco – Pisac', en: 'Cusco – Pisac road' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 107 },
        { n: '25', s: 'vial', p: { es: 'Corredor Vial 7', en: 'Road Corridor 7' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 100 },
        { n: '26', s: 'vial', p: { es: 'Corredor Vial 4', en: 'Road Corridor 4' }, e: 'PROINVERSIÓN', q: 'IV-28', m: 163 }] }],
      notas: {
        es: { msj: '2028: año de la salud y el saneamiento, con 7 hospitales y 7 proyectos de agua.',
          guion: ['Filtre "Salud": Hospital Unanue (USD 973 millones), Hospital Militar (USD 806 millones) y tres hospitales en Loreto.', 'Filtre "Agua y saneamiento": PTAR Trujillo, PTAP Cajamarca, Tumbes, Cañete, Iquitos y Chanchamayo.', 'Transporte: Vía de Evitamiento de Cusco y Tercer Grupo de Aeropuertos.'],
          cifras: ['Meta 2028: **USD 10 325 millones**', 'Hospital Unanue **USD 973 millones**', 'Vía de Evitamiento de Cusco **USD 941 millones**'],
          puente: 'Y para cerrar el horizonte: 2029–2030.' },
        en: { msj: '2028: the year of health and sanitation, with 7 hospitals and 7 water projects.',
          guion: ['Filter "Health": Unanue Hospital (USD 973 million), Military Hospital (USD 806 million) and three hospitals in Loreto.', 'Filter "Water & sanitation": Trujillo WWTP, Cajamarca WTP, Tumbes, Cañete, Iquitos and Chanchamayo.', 'Transport: Cusco Bypass and the Third Airport Group.'],
          cifras: ['2028 goal: **USD 10,325 million**', 'Unanue Hospital **USD 973 million**', 'Cusco Bypass **USD 941 million**'],
          puente: 'And to complete the horizon: 2029–2030.' }
      }
    },
    {
      id: 'p2029-lista', capitulo: 'portafolio', tipo: 'explorador', min: 1, transicion: 'empuje',
      titulo: { es: 'Relación de proyectos 2029–2030', en: 'List of projects 2029–2030' }, sub: { es: 'Hasta 23 proyectos por más de USD 14 700 millones', en: 'Up to 23 projects worth over USD 14.7 billion' },
      cols: ['q'], colQ: { es: 'Adjudicación', en: 'Award' }, meta: 14778, metaLbl: { es: 'Meta 2029–2030', en: '2029–2030 goal' },
      nota: { es: '* CAPEX + OPEX de los primeros 10 años, sin IGV, en USD. Montos referenciales según los estudios más actuales o el IMIAPP.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD. Reference amounts based on the latest studies or the IMIAPP.' },
      grupos: [{ t: { es: 'Proyectos', en: 'Projects' }, filas: [
        { n: '1', s: 'irrigacion', p: { es: 'Chavimochic – Tercera Etapa', en: 'Chavimochic – Stage III' }, e: 'GORE La Libertad', q: '2029', m: 657 },
        { n: '2', s: 'agua', p: { es: 'Desaladora Lambayeque', en: 'Lambayeque Desalination Plant' }, e: 'PROINVERSIÓN', q: '2029', m: 54 },
        { n: '3', s: 'agua', p: { es: 'Saneamiento de Huara y Barranca', en: 'Huara and Barranca sanitation' }, e: 'PROINVERSIÓN', q: '2029', m: 80 },
        { n: '4', s: 'irrigacion', p: { es: 'Proyecto Chinecas', en: 'Chinecas Project' }, e: 'GORE Áncash', q: '2029', m: 4472 },
        { n: '5', s: 'agua', p: { es: 'Saneamiento Talara', en: 'Talara sanitation' }, e: 'PROINVERSIÓN', q: '2029', m: 180 },
        { n: '6', s: 'agua', p: { es: 'PTAR Lambayeque', en: 'Lambayeque WWTP' }, e: 'PROINVERSIÓN', q: '2029', m: 144 },
        { n: '7', s: 'irrigacion', p: { es: 'Majes Siguas – II Etapa', en: 'Majes Siguas – Stage II' }, e: 'MIDAGRI', q: '2029', m: 720 },
        { n: '8', s: 'agua', p: { es: 'Saneamiento San Ignacio', en: 'San Ignacio sanitation' }, e: 'PROINVERSIÓN', q: '2029', m: 25 },
        { n: '9', s: 'educacion', p: { es: 'Sayari', en: 'Sayari (schools)' }, e: 'PROINVERSIÓN', q: '2029', m: 264 },
        { n: '10', s: 'navegable', p: { es: 'Canal de Navegación Amazónico', en: 'Amazon Waterway' }, e: 'PROINVERSIÓN', q: '2029', m: 304 },
        { n: '11', s: 'puertos', p: { es: 'Nuevo Terminal Portuario Pucallpa', en: 'New Pucallpa Port Terminal' }, e: 'PROINVERSIÓN', q: '2029', m: 336 },
        { n: '12', s: 'puertos', p: { es: 'Terminal Portuario Almirante Miguel Grau de Tacna', en: 'Almirante Miguel Grau Port Terminal (Tacna)' }, e: 'PROINVERSIÓN', q: '2029', m: 400 },
        { n: '13', s: 'vial', p: { es: 'Santa – Pte. Chuquicara – Tauca – Dv. Sihuas', en: 'Santa – Chuquicara Bridge – Tauca – Dv. Sihuas road' }, e: 'PROINVERSIÓN', q: '2029', m: 757 },
        { n: '14', s: 'vial', p: { es: 'Kimbiri – Kepashiato', en: 'Kimbiri – Kepashiato road' }, e: 'PROINVERSIÓN', q: '2029', m: 169 },
        { n: '15', s: 'vial', p: { es: 'Pte. Los Maestros – Huaytará', en: 'Los Maestros Bridge – Huaytará road' }, e: 'PROINVERSIÓN', q: '2029', m: 161 },
        { n: '16', s: 'vial', p: { es: 'Pto. Yoyato – Cubantia', en: 'Pto. Yoyato – Cubantia road' }, e: 'PROINVERSIÓN', q: '2029', m: 93 },
        { n: '17', s: 'vial', p: { es: 'Dv. Urcos – Sicuani', en: 'Dv. Urcos – Sicuani road' }, e: 'PROINVERSIÓN', q: '2029', m: 123 },
        { n: '18', s: 'vial', p: { es: 'Corredor Vial 1', en: 'Road Corridor 1' }, e: 'PROINVERSIÓN', q: '2029', m: 112 },
        { n: '19', s: 'vial', p: { es: 'Dv. Chiguata – Santa Lucía – Mañazo', en: 'Dv. Chiguata – Santa Lucía – Mañazo road' }, e: 'PROINVERSIÓN', q: '2029', m: 732 },
        { n: '20', s: 'vial', p: { es: 'Corredor Vial 5', en: 'Road Corridor 5' }, e: 'PROINVERSIÓN', q: '2029', m: 91 },
        { n: '21', s: 'salud', p: { es: 'Hospital de Alta Complejidad de Lambayeque', en: 'Lambayeque High-Complexity Hospital' }, e: 'GORE Lambayeque', q: '2030', m: 398 },
        { n: '22', s: 'salud', p: { es: 'Hospital Regional Lambayeque', en: 'Lambayeque Regional Hospital' }, e: 'GORE Lambayeque', q: '2030', m: 186 },
        { n: '23', s: 'hidrocarburos', p: { es: 'SITGAS', en: 'SITGAS' }, e: 'MINEM', q: '2030', m: 4321 }] }],
      notas: {
        es: { msj: '2029–2030 concentra los megaproyectos: Chinecas y SITGAS superan USD 4 mil millones cada uno.',
          guion: ['Ordene por monto: Chinecas (USD 4472 millones) y SITGAS (USD 4321 millones) encabezan la lista.', 'Le siguen Santa – Chuquicara – Sihuas (USD 757 millones), Chiguata – Mañazo y Majes Siguas II.', 'Destaque la conectividad amazónica: Canal de Navegación Amazónico y Terminal Pucallpa.'],
          cifras: ['Meta 2029–2030: **USD 14 778 millones**', 'Chinecas **USD 4472 millones**', 'SITGAS **USD 4321 millones**'],
          puente: 'Más allá de la cartera priorizada, hay proyectos potenciales de gran escala.' },
        en: { msj: '2029–2030 concentrates the megaprojects: Chinecas and SITGAS each exceed USD 4 billion.',
          guion: ['Sort by amount: Chinecas (USD 4,472 million) and SITGAS (USD 4,321 million) top the list.', 'Next: Santa – Chuquicara – Sihuas (USD 757 million), Chiguata – Mañazo and Majes Siguas II.', 'Highlight Amazon connectivity: the Amazon Waterway and Pucallpa Port Terminal.'],
          cifras: ['2029–2030 goal: **USD 14,778 million**', 'Chinecas **USD 4,472 million**', 'SITGAS **USD 4,321 million**'],
          puente: 'Beyond the prioritized portfolio, there are large-scale potential projects.' }
      }
    },

    /* ======================= POTENCIALES ======================= */
    {
      id: 'cap-potenciales', capitulo: 'potenciales', tipo: 'capitulo', min: 0.3,
      img: 'pot-ferroviario.jpg', num: '02',
      kicker: { es: 'La siguiente ola', en: 'The next wave' }, titulo: { es: 'Proyectos potenciales', en: 'Potential projects' },
      notas: { es: { msj: 'La próxima generación de proyectos ya está identificada.', guion: ['Transición: de la cartera priorizada a las oportunidades en preparación.'], cifras: [], puente: 'Empecemos por transporte.' }, en: { msj: 'The next generation of projects has already been identified.', guion: ['Transition: from the prioritized portfolio to opportunities in preparation.'], cifras: [], puente: 'Let us start with transport.' } }
    },
    {
      id: 'pot-transporte', capitulo: 'potenciales', tipo: 'explorador', min: 1, transicion: 'zoom', filtro: 'sub',
      titulo: { es: 'Proyectos potenciales en transportes', en: 'Potential transport projects' },
      mapa: 'mapa-transportes.png', mapaTxt: { es: '14 regiones · 18 millones de beneficiados', en: '14 regions · 18 million beneficiaries' },
      colM: { es: 'Monto* (USD mill.)', en: 'Amount* (USD mill.)' }, meta: 35306, metaLbl: { es: 'Total', en: 'Total' },
      nota: { es: '* Monto de inversión referencial.', en: '* Reference investment amount.' },
      grupos: [{ t: { es: 'Proyectos', en: 'Projects' }, filas: [
        { n: '1', s: 'ferroviario', p: { es: 'Línea 3 del Metro de Lima', en: 'Lima Metro Line 3' }, m: 6932 },
        { n: '2', s: 'ferroviario', p: { es: 'Línea 4 del Metro de Lima', en: 'Lima Metro Line 4' }, m: 3710 },
        { n: '3', s: 'ferroviario', p: { es: 'Línea 7 del Metro de Lima', en: 'Lima Metro Line 7' }, m: 2671 },
        { n: '4', s: 'ferroviario', p: { es: 'Ferrocarril Lima – Ica', en: 'Lima – Ica Railway' }, m: 7210 },
        { n: '5', s: 'ferroviario', p: { es: 'Ferrocarril Andahuaylas – Marcona', en: 'Andahuaylas – Marcona Railway' }, m: 8986 },
        { n: '6', s: 'ferroviario', p: { es: 'Ferrocarril Lima – Barranca', en: 'Lima – Barranca Railway' }, m: 4393 },
        { n: '7', s: 'ferroviario', p: { es: 'Tren de Cusco a Chinchero', en: 'Cusco – Chinchero Train' }, m: 205 },
        { n: '8', s: 'navegable', p: { es: 'Navegación fluvial Yurimaguas – Santa Rosa', en: 'Yurimaguas – Santa Rosa river navigation' }, m: 92 },
        { n: '9', s: 'vial', p: { es: 'Corredor Sullana – Tumbes – Puente La Paz', en: 'Sullana – Tumbes – La Paz Bridge corridor' }, m: 305 },
        { n: '10', s: 'vial', p: { es: 'Corredor Pte. Reither – Villa Rica – Pto. Bermúdez – Von Humboldt / Pte. Paucartambo – Oxapampa', en: 'Reither Bridge – Villa Rica – Pto. Bermúdez – Von Humboldt / Paucartambo Bridge – Oxapampa corridor' }, m: 675 },
        { n: '11', s: 'vial', p: { es: 'Sistema Integral de Identificación Vehicular', en: 'Comprehensive Vehicle Identification System' }, m: 126 }] }],
      notas: {
        es: { msj: 'USD 35 mil millones en transporte potencial: el futuro del tren en el Perú.',
          guion: ['Siete proyectos ferroviarios: Líneas 3, 4 y 7 del Metro de Lima y los ferrocarriles Lima–Ica, Andahuaylas–Marcona y Lima–Barranca.', 'Filtre "Ferroviario" para mostrar la escala: el Andahuaylas–Marcona supera USD 8900 millones.', 'Montos referenciales.'],
          cifras: ['Total **USD 35 306 millones**', '**14** regiones · **18 millones** de beneficiados'],
          preguntas: [['¿Estos proyectos tienen fecha de adjudicación?', 'Aún no: son proyectos potenciales con montos referenciales; su programación depende de la maduración de los estudios.']],
          puente: 'Además, hemos identificado 12 proyectos adicionales por USD 27 mil millones.' },
        en: { msj: 'USD 35 billion in potential transport: the future of rail in Peru.',
          guion: ['Seven rail projects: Lima Metro Lines 3, 4 and 7 and the Lima–Ica, Andahuaylas–Marcona and Lima–Barranca railways.', 'Filter "Railways" to show the scale: Andahuaylas–Marcona exceeds USD 8.9 billion.', 'Reference amounts.'],
          cifras: ['Total **USD 35,306 million**', '**14** regions · **18 million** beneficiaries'],
          preguntas: [['Do these projects have award dates?', 'Not yet: they are potential projects with reference amounts; scheduling depends on the maturity of the studies.']],
          puente: 'We have also identified 12 additional projects worth USD 27 billion.' }
      }
    },
    {
      id: 'pot-identificados', capitulo: 'potenciales', tipo: 'potenciales', min: 1, transicion: 'subir',
      titulo: { es: 'Potenciales proyectos identificados', en: 'Potential projects identified' },
      proy: 12, usd: 27000, regiones: { es: '11 regiones beneficiadas', en: '11 regions benefited' }, benef: { es: '+7 millones de beneficiarios', en: '7M+ beneficiaries' },
      cards: [
        { s: 'ferroviario', img: 'pot-ferroviario.jpg', n: 4, usd: 24070, dest: { es: 'Líneas 5 y 6 del Metro de Lima', en: 'Lima Metro Lines 5 and 6' } },
        { s: 'puertos', img: 'pot-puertos.jpg', n: 5, usd: 1486, dest: { es: 'Terminal Portuario de Corío', en: 'Corío Port Terminal' } },
        { s: 'vial', img: 'pot-vial.jpg', n: 3, usd: 1360, dest: { es: 'Guadalupe – Ica – Nasca – Vista Alegre / Dv. Marcona – Chala – Atico', en: 'Guadalupe – Ica – Nasca – Vista Alegre / Dv. Marcona – Chala – Atico' } }
      ],
      notas: {
        es: { msj: '12 proyectos identificados por USD 27 mil millones, liderados por las Líneas 5 y 6 del Metro.',
          guion: ['(Clic) Ferroviario: 4 proyectos por USD 24 070 millones.', '(Clic) Puertos: 5 proyectos por USD 1486 millones, como el Terminal de Corío.', '(Clic) Vial: 3 proyectos por USD 1360 millones en la costa sur.'],
          cifras: ['**12** proyectos · **USD 27 mil millones**', 'Ferroviario **USD 24 070 millones**'],
          puente: 'Pasemos a las adendas que se firman este año.' },
        en: { msj: '12 identified projects worth USD 27 billion, led by Lima Metro Lines 5 and 6.',
          guion: ['(Click) Railways: 4 projects worth USD 24,070 million.', '(Click) Ports: 5 projects worth USD 1,486 million, such as the Corío Port Terminal.', '(Click) Roads: 3 projects worth USD 1,360 million on the southern coast.'],
          cifras: ['**12** projects · **USD 27 billion**', 'Railways **USD 24,070 million**'],
          puente: 'Let us move on to the addenda being signed this year.' }
      }
    },

    /* ======================= ADENDAS 2026 ======================= */
    {
      id: 'cap-adendas', capitulo: 'adendas', tipo: 'capitulo', min: 0.3,
      img: 'bg-adendas.jpg', blur: true, num: '03',
      kicker: { es: 'Contratos que mejoran', en: 'Contracts that improve' }, titulo: { es: 'Adendas 2026', en: '2026 Addenda' },
      notas: { es: { msj: 'Las adendas amplían servicios e inversión en contratos que ya funcionan.', guion: ['Tres adendas con firma prevista en el IV trimestre de 2026.'], cifras: [], puente: 'Primero, salud.' }, en: { msj: 'Addenda expand services and investment in contracts that already work.', guion: ['Three addenda scheduled for signing in Q4 2026.'], cifras: [], puente: 'First, health.' } }
    },
    {
      id: 'ad-salog', capitulo: 'adendas', tipo: 'adenda', min: 0.7, transicion: 'empuje',
      img: 'ad-salog.jpg', titulo: { es: 'SALOG: mejoras al servicio de Farmacia Vecina', en: 'SALOG: improving the "Farmacia Vecina" service' },
      kicker: { es: 'Salud · EsSalud · Mayor acceso a medicamentos', en: 'Health · EsSalud · Better access to medicines' },
      firmaLbl: { es: 'Firma de adenda', en: 'Addendum signing' }, firma: { es: 'IV trimestre 2026', en: 'Q4 2026' },
      usd: 20, usdTxt: { es: 'Monto de inversión', en: 'Investment amount' },
      benef: 500000, benefTxt: { es: 'asegurados atendidos por Farmacia Vecina en Lima y Callao (antes: 120 000)', en: 'insured patients served by Farmacia Vecina in Lima and Callao (previously 120,000)' },
      compTitulo: { es: 'Principales componentes', en: 'Main components' },
      comp: [{ es: 'Modernización tecnológica: plataforma integrada para la atención y seguimiento de pacientes crónicos.', en: 'Technology upgrade: integrated platform for the care and monitoring of chronic patients.' }, { es: 'Fortalecimiento de Farmacia Vecina: mayor cobertura y entrega completa y oportuna de medicamentos para crónicos.', en: 'Stronger Farmacia Vecina: broader coverage and complete, timely delivery of medicines for chronic patients.' }, { es: 'Opción de compra de medicamentos por SALOG, con lineamientos en la adenda.', en: 'Option for SALOG to procure medicines, under guidelines set in the addendum.' }],
      notas: {
        es: { msj: 'Con USD 20 millones, Farmacia Vecina pasa de 120 000 a 500 000 asegurados.',
          guion: ['Una adenda pequeña en monto, enorme en impacto social.', '(Clic) Cuadruplica la atención en Lima y Callao.', '(Clic) Moderniza la plataforma de atención a pacientes crónicos.'],
          cifras: ['**USD 20 millones**', '**120 000 → 500 000** asegurados'],
          puente: 'De la salud a la energía: gas natural para el sur andino y la Amazonía.' },
        en: { msj: 'With USD 20 million, Farmacia Vecina grows from 120,000 to 500,000 insured patients.',
          guion: ['A small addendum in amount, huge in social impact.', '(Click) It quadruples coverage in Lima and Callao.', '(Click) It modernizes the care platform for chronic patients.'],
          cifras: ['**USD 20 million**', '**120,000 → 500,000** insured patients'],
          puente: 'From health to energy: natural gas for the southern Andes and the Amazon.' }
      }
    },
    {
      id: 'ad-calidda', capitulo: 'adendas', tipo: 'adenda', min: 0.7, transicion: 'empuje', fotoDer: true,
      img: 'ad-calidda.jpg', titulo: { es: 'Adenda de Cálidda', en: 'Cálidda Addendum' },
      kicker: { es: 'Hidrocarburos · Distribución de gas natural en 7 regiones', en: 'Hydrocarbons · Natural gas distribution in 7 regions' },
      firmaLbl: { es: 'Firma de adenda', en: 'Addendum signing' }, firma: { es: 'IV trimestre 2026', en: 'Q4 2026' },
      usd: 663, usdTxt: { es: 'Adenda de proyecto autofinanciado que amplía el plazo de concesión por 10 años más (hasta 2043).', en: 'Self-financed project addendum extending the concession term by 10 more years (to 2043).' },
      benef: 150914, benefIcono: 'hogar', benefTxt: { es: 'potenciales hogares beneficiados', en: 'potential households benefited' },
      extra: { icono: 'region', v: { es: '7 regiones · 15 ciudades', en: '7 regions · 15 cities' }, t: { es: 'Apurímac, Ayacucho, Cusco, Huancavelica, Junín, Puno y Ucayali', en: 'Apurímac, Ayacucho, Cusco, Huancavelica, Junín, Puno and Ucayali' } },
      compTitulo: { es: 'Principales obras', en: 'Main works' },
      comp: [{ es: '2510 km de redes de distribución', en: '2,510 km of distribution networks' }, { es: '2 City Gate', en: '2 City Gates' }, { es: '9 plantas satelitales de regasificación', en: '9 satellite regasification plants' }],
      notas: {
        es: { msj: 'Gas natural para más de 150 mil hogares en 7 regiones, sin costo para el Estado.',
          guion: ['USD 663 millones autofinanciados; amplía la concesión hasta 2043.', '(Clic) 150 914 hogares potenciales en 15 ciudades de 7 regiones.', '(Clic) 2510 km de redes, 2 City Gate y 9 plantas de regasificación.'],
          cifras: ['**USD 663 millones**', '**150 914** hogares', '**2510 km** de redes'],
          preguntas: [['¿Por qué "autofinanciado"?', 'Porque la inversión se recupera con las tarifas del servicio, sin cofinanciamiento del Estado; la adenda amplía el plazo para hacerlo viable.']],
          puente: 'Y en logística minera, una adenda que moderniza un terminal clave.' },
        en: { msj: 'Natural gas for over 150 thousand households in 7 regions, at no cost to the State.',
          guion: ['USD 663 million, self-financed; extends the concession to 2043.', '(Click) 150,914 potential households in 15 cities across 7 regions.', '(Click) 2,510 km of networks, 2 City Gates and 9 regasification plants.'],
          cifras: ['**USD 663 million**', '**150,914** households', '**2,510 km** of networks'],
          preguntas: [['Why "self-financed"?', 'Because the investment is recovered through service tariffs, with no State co-financing; the addendum extends the term to make it viable.']],
          puente: 'And in mining logistics, an addendum that upgrades a key terminal.' }
      }
    },
    {
      id: 'ad-terminal', capitulo: 'adendas', tipo: 'adenda', min: 0.7, transicion: 'empuje',
      img: 'ad-terminal.jpg', titulo: { es: 'Adenda Terminal de Embarque de Concentrado de Minerales', en: 'Mineral Concentrate Shipping Terminal Addendum' },
      kicker: { es: 'Puertos · Logística minera', en: 'Ports · Mining logistics' },
      firmaLbl: { es: 'Firma de adenda', en: 'Addendum signing' }, firma: { es: 'IV trimestre 2026', en: 'Q4 2026' },
      usd: 230, usdTxt: { es: 'Monto de inversión estimado', en: 'Estimated investment amount' },
      benef: 1247227, benefTxt: { es: 'habitantes beneficiados', en: 'inhabitants benefited' },
      compTitulo: { es: 'Principales obras', en: 'Main works' },
      comp: [{ es: 'Reubicación de la faja transportadora', en: 'Relocation of the conveyor belt' }, { es: 'Sistema de descarga de hidrocarburos en el muelle existente de minerales', en: 'Hydrocarbon unloading system at the existing mineral pier' }, { es: 'Nuevo muelle de carga líquida a granel', en: 'New liquid bulk cargo pier' }],
      notas: {
        es: { msj: 'USD 230 millones para un terminal más eficiente que beneficia a 1.2 millones de habitantes.',
          guion: ['Inversión estimada de USD 230 millones.', '(Clic) 1 247 227 habitantes beneficiados.', '(Clic) Nuevo muelle de carga líquida y reubicación de la faja transportadora.'],
          cifras: ['**USD 230 millones**', '**1 247 227** habitantes'],
          puente: 'Ahora, energía y minería: el cronograma de 2026.' },
        en: { msj: 'USD 230 million for a more efficient terminal benefiting 1.2 million inhabitants.',
          guion: ['Estimated investment of USD 230 million.', '(Click) 1,247,227 inhabitants benefited.', '(Click) New liquid bulk pier and relocation of the conveyor belt.'],
          cifras: ['**USD 230 million**', '**1,247,227** inhabitants'],
          puente: 'Now, energy and mining: the 2026 schedule.' }
      }
    },

    /* ======================= ENERGÍA Y MINERÍA ======================= */
    {
      id: 'cap-energia', capitulo: 'energia', tipo: 'capitulo', min: 0.3,
      img: 'bg-energia.jpg', num: '04',
      kicker: { es: 'Transmisión eléctrica', en: 'Power transmission' }, titulo: { es: 'Energía y minería', en: 'Energy & mining' },
      datos: [{ v: { es: '+USD 700 millones', en: 'USD 700M+' }, l: { es: 'en 7 regiones', en: 'across 7 regions' } }],
      notas: { es: { msj: 'Más energía para el sur y el norte del país.', guion: ['Transición al bloque de energía.'], cifras: [], puente: 'Este es el cronograma.' }, en: { msj: 'More power for the south and north of the country.', guion: ['Transition to the energy block.'], cifras: [], puente: 'Here is the schedule.' } }
    },
    {
      id: 'energia-cronograma', capitulo: 'energia', tipo: 'cronograma', min: 0.8, transicion: 'subir',
      titulo: { es: 'Cronograma de APP · Energía y minería 2026', en: 'PPP schedule · Energy & mining 2026' },
      resumen: { es: 'Oportunidad de inversión por más de <strong>USD 700 millones</strong> en <strong>7 regiones</strong> en favor de más de <strong>3.1 millones</strong> de habitantes.', en: 'Investment opportunity of over <strong>USD 700 million</strong> in <strong>7 regions</strong>, benefiting over <strong>3.1 million</strong> people.' },
      mapa: 'mapa-energia.png',
      filas: [
        { tipo: { es: 'IE', en: 'SI' }, n: '1–4', p: { es: 'Grupo 2 del Plan de Transmisión 2025–2034', en: 'Group 2 of the 2025–2034 Transmission Plan' }, m: 539, nota: '2/', hitos: [{ t: { es: 'Convocatoria', en: 'Call for tenders' }, v: { es: 'Dic. 2025', en: 'Dec. 2025' }, ok: true }, { t: { es: 'Adjudicación por concurso', en: 'Award by tender' }, q: 'IV-26' }] },
        { tipo: { es: 'IE', en: 'SI' }, n: '5–8', p: { es: 'Grupo 3 del Plan de Transmisión 2025–2034', en: 'Group 3 of the 2025–2034 Transmission Plan' }, m: 166, nota: '2/', hitos: [{ t: { es: 'Convocatoria', en: 'Call for tenders' }, v: { es: 'Mar. 2026', en: 'Mar. 2026' }, ok: true }, { t: { es: 'Adjudicación por concurso', en: 'Award by tender' }, q: 'IV-26' }] }
      ],
      leyenda: { es: 'IE: iniciativa estatal · IP: iniciativa privada · 2/ Considera solo CAPEX', en: 'SI: State initiative · UP: unsolicited proposal · 2/ CAPEX only' },
      notas: {
        es: { msj: 'Dos concursos de transmisión, ya convocados, se adjudican este trimestre.',
          guion: ['Regiones: Piura, La Libertad, Lima, Ica, Cusco, Madre de Dios y Puno.', '(Clic) Grupo 2: USD 539 millones, convocado en diciembre de 2025.', '(Clic) Grupo 3: USD 166 millones, convocado en marzo de 2026.', 'Ambos se adjudican en el IV trimestre de 2026.'],
          cifras: ['**+USD 700 millones**', '**7** regiones · **3.1 millones** de habitantes'],
          puente: 'Veamos cada grupo en detalle.' },
        en: { msj: 'Two transmission tenders, already launched, will be awarded this quarter.',
          guion: ['Regions: Piura, La Libertad, Lima, Ica, Cusco, Madre de Dios and Puno.', '(Click) Group 2: USD 539 million, tender launched December 2025.', '(Click) Group 3: USD 166 million, tender launched March 2026.', 'Both will be awarded in Q4 2026.'],
          cifras: ['**Over USD 700 million**', '**7** regions · **3.1 million** people'],
          puente: 'Let us look at each group in detail.' }
      }
    },
    {
      id: 'g2', capitulo: 'energia', tipo: 'proyecto', min: 0.8, transicion: 'zoom',
      img: 'g2-bg.jpg', titulo: { es: 'Grupo 2 del Plan de Transmisión 2025–2034', en: 'Group 2 of the 2025–2034 Transmission Plan' },
      adj: { es: 'Adjudicación: IV trim. 2026 · Transacción', en: 'Award: Q4 2026 · Transaction' },
      montoLbl: { es: 'Monto del proyecto*', en: 'Project amount*' }, usd: 539,
      modalidad: { es: 'Iniciativa estatal autofinanciada por 30 años más el periodo de construcción.', en: 'Self-financed State initiative for 30 years plus the construction period.' },
      hab: 1.8, habTxt: { es: 'millones de habitantes beneficiados', en: 'million people benefited' },
      obrasTitulo: { es: 'Principales obras', en: 'Main works' },
      obras: [{ es: 'Enlace 220 kV Tintaya Nueva – Nueva San Gabán y subestaciones asociadas', en: '220 kV Tintaya Nueva – Nueva San Gabán link and associated substations' }, { es: 'Enlace 220 kV Nueva San Gabán – Puerto Maldonado (ITC)', en: '220 kV Nueva San Gabán – Puerto Maldonado link (ITC)' }, { es: 'Enlace 500 kV Colectora – Bicentenario – Chilca', en: '500 kV Colectora – Bicentenario – Chilca link' }, { es: 'Enlace 138 kV San Román – Yocara – Maravilla, Juliaca (ITC)', en: '138 kV San Román – Yocara – Maravilla link, Juliaca (ITC)' }],
      mapa: 'g2-mapa.jpg',
      nota: { es: '* CAPEX + OPEX de los primeros 10 años de operación, sin IGV, en USD. En proyectos en formulación, montos referenciales según los estudios más actuales o el IMIAPP.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD. For projects under formulation, reference amounts based on the latest studies or the IMIAPP.' },
      notas: {
        es: { msj: 'USD 539 millones para llevar energía confiable al sur, incluida Madre de Dios.',
          guion: ['Autofinanciado por 30 años más la construcción.', '1.8 millones de habitantes beneficiados.', '(Clic) Cuatro enlaces de 138 a 500 kV; (clic) el mapa muestra su trazo.'],
          cifras: ['**USD 539 millones**', '**1.8 millones** de habitantes', 'Adjudicación **IV trim. 2026**'],
          puente: 'El Grupo 3 refuerza el norte.' },
        en: { msj: 'USD 539 million to bring reliable power to the south, including Madre de Dios.',
          guion: ['Self-financed for 30 years plus construction.', '1.8 million people benefited.', '(Click) Four links from 138 to 500 kV; (click) the map shows their route.'],
          cifras: ['**USD 539 million**', '**1.8 million** people', 'Award **Q4 2026**'],
          puente: 'Group 3 strengthens the north.' }
      }
    },
    {
      id: 'g3', capitulo: 'energia', tipo: 'proyecto', min: 0.8, transicion: 'empuje',
      img: 'g3-torre.jpg', titulo: { es: 'Grupo 3 del Plan de Transmisión 2025–2034', en: 'Group 3 of the 2025–2034 Transmission Plan' },
      adj: { es: 'Adjudicación: IV trim. 2026 · Transacción', en: 'Award: Q4 2026 · Transaction' },
      montoLbl: { es: 'Monto del proyecto*', en: 'Project amount*' }, usd: 166,
      modalidad: { es: 'Iniciativa estatal autofinanciada por 30 años más el periodo de construcción.', en: 'Self-financed State initiative for 30 years plus the construction period.' },
      hab: 1.3, habTxt: { es: 'millones de habitantes beneficiados', en: 'million people benefited' },
      obrasTitulo: { es: 'Principales obras', en: 'Main works' },
      obras: [{ es: 'Enlace 138 kV Nueva Virú – Trujillo Sur (ITC)', en: '138 kV Nueva Virú – Trujillo Sur link (ITC)' }, { es: 'Nueva SE Moche 220/138 kV y enlaces asociados (ITC)', en: 'New Moche 220/138 kV substation and associated links (ITC)' }, { es: 'Enlace 220 kV Miguel Grau – Sullana (ITC)', en: '220 kV Miguel Grau – Sullana link (ITC)' }, { es: 'Enlace 220 kV Miguel Grau – Chulucanas (ITC)', en: '220 kV Miguel Grau – Chulucanas link (ITC)' }],
      mapa: 'g3-mapa.png',
      nota: { es: '* CAPEX + OPEX de los primeros 10 años de operación, sin IGV, en USD. En proyectos en formulación, montos referenciales según los estudios más actuales o el IMIAPP.', en: '* CAPEX + first 10 years of OPEX, excluding VAT, in USD. For projects under formulation, reference amounts based on the latest studies or the IMIAPP.' },
      notas: {
        es: { msj: 'USD 166 millones para fortalecer la red de La Libertad y Piura.',
          guion: ['1.3 millones de habitantes beneficiados.', '(Clic) Enlaces en Trujillo, Moche, Sullana y Chulucanas; (clic) mapa.'],
          cifras: ['**USD 166 millones**', '**1.3 millones** de habitantes'],
          puente: 'Cerramos con un instrumento que nació en el Perú: Obras por Impuestos.' },
        en: { msj: 'USD 166 million to strengthen the La Libertad and Piura grid.',
          guion: ['1.3 million people benefited.', '(Click) Links in Trujillo, Moche, Sullana and Chulucanas; (click) map.'],
          cifras: ['**USD 166 million**', '**1.3 million** people'],
          puente: 'We close with an instrument born in Peru: Works for Taxes.' }
      }
    },

    /* ======================= OBRAS POR IMPUESTOS ======================= */
    {
      id: 'cap-oxi', capitulo: 'oxi', tipo: 'capitulo', min: 0.3,
      img: 'bg-oxi.jpg', num: '05',
      kicker: { es: 'Innovación peruana', en: 'Peruvian innovation' }, titulo: { es: 'Obras por Impuestos', en: 'Works for Taxes' },
      datos: [{ v: { es: 'S/ 27 763 millones', en: 'S/ 27,763 million' }, l: '2009–2026' }, { v: { es: '1 855', en: '1,855' }, l: { es: 'intervenciones', en: 'interventions' } }],
      notas: { es: { msj: 'Las empresas pueden convertir su impuesto en obras para su comunidad.', guion: ['Transición al bloque OxI.'], cifras: [], puente: 'Estas son sus claves.' }, en: { msj: 'Companies can turn their taxes into works for their communities.', guion: ['Transition to the OxI block.'], cifras: [], puente: 'These are its key facts.' } }
    },
    {
      id: 'oxi-claves', capitulo: 'oxi', tipo: 'orbita', min: 1, transicion: 'zoom',
      titulo: { es: 'Obras por Impuestos en cifras', en: 'Works for Taxes in figures' }, logo: 'logo-oxi.png',
      nodos: [
        { icono: 'calendario', v: { es: '18 años', en: '18 years' }, t: { es: 'de trayectoria', en: 'track record' } },
        { icono: 'monto', v: { es: '+S/ 27 763 mill.', en: 'S/ 27,763M+' }, t: { es: 'de inversión', en: 'invested' } },
        { icono: 'mundo', v: { es: 'Replicado', en: 'Replicated' }, t: { es: 'a nivel internacional: Colombia', en: 'internationally: Colombia' } },
        { icono: 'descentralizar', v: '86 %', t: { es: 'del monto lo ejecutan gobiernos regionales y locales', en: 'of the amount executed by regional and local governments' } },
        { icono: 'usuarios', v: { es: '+29 millones', en: '29M+' }, t: { es: 'de beneficiarios', en: 'beneficiaries' } },
        { icono: 'institucion', v: { es: '1 855', en: '1,855' }, t: { es: 'intervenciones adjudicadas', en: 'awarded interventions' } },
        { icono: 'innovacion', v: { es: 'Innovación', en: 'Peruvian' }, t: { es: 'peruana', en: 'innovation' } }
      ],
      nota: { es: '* Al 3 de noviembre de 2026. Fuente: PROINVERSIÓN.', en: '* As of November 3, 2026. Source: PROINVERSIÓN.' },
      notas: {
        es: { msj: 'Un modelo peruano, ya replicado en Colombia, que descentraliza la inversión pública.',
          guion: ['18 años, más de S/ 27 763 millones y 1855 intervenciones.', '(Clic) El 86 % del monto lo ejecutan gobiernos regionales y locales.', 'Más de 29 millones de peruanos beneficiados.'],
          cifras: ['**S/ 27 763 millones**', '**1855** intervenciones', '**86 %** en GR y GL', '**+29 millones** de beneficiarios'],
          preguntas: [['¿Cómo funciona OxI?', 'Una empresa financia y ejecuta una obra pública priorizada por una entidad, y recupera la inversión mediante certificados que aplica contra su impuesto a la renta.']],
          puente: 'Veamos cómo ha crecido en el tiempo.' },
        en: { msj: 'A Peruvian model, already replicated in Colombia, that decentralizes public investment.',
          guion: ['18 years, over S/ 27,763 million and 1,855 interventions.', '(Click) 86% of the amount is executed by regional and local governments.', 'Over 29 million Peruvians benefited.'],
          cifras: ['**S/ 27,763 million**', '**1,855** interventions', '**86%** regional/local', '**29M+** beneficiaries'],
          preguntas: [['How does OxI work?', 'A company finances and delivers a public work prioritized by a public entity, and recovers the investment through certificates applied against its income tax.']],
          puente: 'Let us see how it has grown over time.' }
      }
    },
    {
      id: 'oxi-historia', capitulo: 'oxi', tipo: 'historia', min: 1, transicion: 'subir',
      titulo: { es: 'Evolución histórica OxI 2009–2026', en: 'Works for Taxes trend 2009–2026' },
      top: { big: { es: '+29 millones de peruanos', en: '29M+ Peruvians' }, txt: { es: 'beneficiados con 1 855 intervenciones por S/ 27 763 millones', en: 'benefited by 1,855 interventions worth S/ 27,763 million' },
        part: [{ v: 23, t: { es: 'gobiernos regionales', en: 'regional governments' } }, { v: 569, t: { es: 'municipalidades', en: 'municipalities' } }, { v: 12, t: { es: 'entidades del Gobierno Nacional', en: 'national government entities' } }, { v: 6, t: { es: 'universidades', en: 'universities' } }, { v: 693, t: { es: 'empresas', en: 'companies' } }] },
      serie: [[2009, 6, 2], [2010, 10, 4], [2011, 288, 7], [2012, 178, 18], [2013, 518, 32], [2014, 753, 76], [2015, 372, 40], [2016, 1049, 44], [2017, 1137, 60], [2018, 587, 43], [2019, 797, 24], [2020, 219, 17], [2021, 506, 38], [2022, 416, 47], [2023, 595, 22], [2024, 4410, 118], [2025, 5121, 477], [2026, 10801, 786]],
      donaTitulo: { es: 'Inversión por función 2009–2026', en: 'Investment by function 2009–2026' },
      funciones: [
        { t: { es: 'Transporte', en: 'Transport' }, v: 7626, c: '#00AC69' },
        { t: { es: 'Educación', en: 'Education' }, v: 5748, c: '#4E8FC5' },
        { t: { es: 'Salud', en: 'Health' }, v: 4041, c: '#234B66' },
        { t: { es: 'Orden público y seguridad', en: 'Public order & security' }, v: 2629, c: '#755C83' },
        { t: { es: 'Planeamiento y gestión', en: 'Planning & management' }, v: 2534, c: '#9C7E00' },
        { t: { es: 'Saneamiento', en: 'Sanitation' }, v: 2371, c: '#0070B7' },
        { t: { es: 'Otros sectores', en: 'Other sectors' }, v: 2814, c: '#8A8F98' }
      ],
      nota: { es: '* 2026: al 3 de noviembre. Fuente: PROINVERSIÓN.', en: '* 2026: as of November 3. Source: PROINVERSIÓN.' },
      notas: {
        es: { msj: 'OxI se multiplicó: 2026 ya supera S/ 10 800 millones, el doble que 2025.',
          guion: ['Participan 23 gobiernos regionales, 569 municipalidades y 693 empresas.', '(Clic) De S/ 6 millones en 2009 a S/ 10 801 millones en 2026.', '(Clic) Transporte, educación y salud concentran el 63 % de la inversión.'],
          cifras: ['2026: **S/ 10 801 millones** · **786** intervenciones', '2025: S/ 5121 millones', 'Transporte **27 %** · Educación **21 %** · Salud **15 %**'],
          puente: '¿Qué viene para OxI en lo que resta de 2026?' },
        en: { msj: 'OxI has multiplied: 2026 already exceeds S/ 10.8 billion, twice 2025.',
          guion: ['23 regional governments, 569 municipalities and 693 companies take part.', '(Click) From S/ 6 million in 2009 to S/ 10,801 million in 2026.', '(Click) Transport, education and health account for 63% of investment.'],
          cifras: ['2026: **S/ 10,801 million** · **786** interventions', '2025: S/ 5,121 million', 'Transport **27%** · Education **21%** · Health **15%**'],
          puente: 'What lies ahead for OxI in the rest of 2026?' }
      }
    },
    {
      id: 'oxi-2026', capitulo: 'oxi', tipo: 'zonas', min: 1, transicion: 'zoom',
      titulo: { es: '2026: cartera OxI', en: '2026: OxI portfolio' }, img: 'mec-oxi.jpg',
      proyeccion: { es: 'Se proyecta adjudicar <strong>más de S/ 11 000 millones</strong> a través de <strong>más de 800 intervenciones</strong> en OxI.', en: 'We expect to award <strong>over S/ 11 billion</strong> through <strong>more than 800 interventions</strong> under OxI.' },
      veces: 3.1, vecesTxt: { es: 'Las adjudicaciones acumuladas entre enero y octubre de 2026 superaron 3.1 veces el monto del mismo periodo de 2025.', en: 'Cumulative awards from January to October 2026 were 3.1 times the amount for the same period in 2025.' },
      subtitulo: { es: 'Principales intervenciones adjudicadas', en: 'Main interventions awarded' }, mapa: 'mapa-oxi.png',
      zonas: [
        { letra: 'A', c: '#E42312', zona: { es: 'Zona Norte', en: 'North' }, obra: { es: 'Mejoramiento y ampliación del Museo Tumbas Reales de Sipán – Lambayeque', en: 'Upgrade and expansion of the Royal Tombs of Sipán Museum – Lambayeque' }, v: 97 },
        { letra: 'B', c: '#9C8F89', zona: { es: 'Zona Centro', en: 'Center' }, obra: { es: 'Sede de la Superintendencia del Mercado de Valores', en: 'Headquarters of the Securities Market Superintendency (SMV)' }, v: 101 },
        { letra: 'C', c: '#7D838C', zona: { es: 'Zona Oriente', en: 'East' }, obra: { es: 'Maquinaria pesada de la DENAGER del GR Amazonas en C.P. Chachapoyas', en: 'Heavy machinery for the Amazonas Regional Government (DENAGER), Chachapoyas' }, v: 55 },
        { letra: 'D', c: '#A3161A', zona: { es: 'Zona Sur', en: 'South' }, obra: { es: 'Construcción de la vía regional La Joya – Tramo III', en: 'Construction of the La Joya regional road – Section III' }, v: 409 }
      ],
      nota: { es: '* Al 22 de octubre de 2026. Fuente: PROINVERSIÓN.', en: '* As of October 22, 2026. Source: PROINVERSIÓN.' },
      notas: {
        es: { msj: '2026 cerrará con más de S/ 11 000 millones en OxI: 3.1 veces más que el año pasado a la misma fecha.',
          guion: ['Proyección: más de 800 intervenciones.', '(Clic por zona) Norte: Museo Tumbas Reales de Sipán; Centro: sede de la SMV; Oriente: maquinaria para Amazonas; Sur: vía La Joya Tramo III.', 'Puede hacer clic en cada zona para resaltarla.'],
          cifras: ['**+S/ 11 000 millones**', '**3.1×** frente a 2025', 'La Joya **S/ 409 millones**'],
          puente: 'Cerremos con los accesos a toda la información.' },
        en: { msj: '2026 will close with over S/ 11 billion in OxI: 3.1 times last year at the same date.',
          guion: ['Projection: over 800 interventions.', '(Click per zone) North: Royal Tombs of Sipán Museum; Center: SMV headquarters; East: machinery for Amazonas; South: La Joya road Section III.', 'You can click each zone to highlight it.'],
          cifras: ['**Over S/ 11 billion**', '**3.1×** vs 2025', 'La Joya **S/ 409 million**'],
          puente: 'Let us close with access to all the information.' }
      }
    },

    /* ======================= CIERRE ======================= */
    {
      id: 'cierre', capitulo: 'cierre', tipo: 'cierre', min: 1, transicion: 'profundidad',
      img: 'cierre.jpg', titulo: { es: 'Gracias', en: 'Thank you' }, sub: { es: 'Invierta en el Perú con PROINVERSIÓN', en: 'Invest in Peru with PROINVERSIÓN' },
      qrs: [{ t: { es: 'Portafolio APP', en: 'PPP portfolio' }, img: 'qr-app.png' }, { t: { es: 'Cartera OxI en promoción', en: 'OxI portfolio' }, img: 'qr-oxi.png' }],
      notas: {
        es: { msj: 'Toda la cartera está disponible: escaneen los códigos y conversemos.',
          guion: ['Invite a escanear los códigos QR del portafolio APP y de la cartera OxI.', 'Abra la ronda de preguntas. Use la vista general (tecla O en la pantalla) o el mapa de escenas para volver a cualquier lámina.', 'Escena de respaldo disponible: Ejecución contractual (AVP, FHH, HEVES).'],
          cifras: ['**USD 42 mil millones** · **87** proyectos + **9** adendas', 'OxI 2026: **+S/ 11 000 millones**'],
          preguntas: [['¿Dónde encuentro las fichas de cada proyecto?', 'En el portafolio APP (código QR de la izquierda) y en la cartera OxI (código QR de la derecha).']] },
        en: { msj: 'The entire portfolio is available: scan the codes and let us talk.',
          guion: ['Invite the audience to scan the QR codes for the PPP portfolio and the OxI portfolio.', 'Open the Q&A. Use the overview (O key on the screen) or the scene map to jump back to any slide.', 'Backup scene available: Contract execution (AVP, FHH, HEVES).'],
          cifras: ['**USD 42 billion** · **87** projects + **9** addenda', 'OxI 2026: **over S/ 11 billion**'],
          preguntas: [['Where can I find each project\'s fact sheet?', 'In the PPP portfolio (left QR code) and the OxI portfolio (right QR code).']] }
      }
    }
  ]
};
