/* =========================================================================
   PROINVERSIÓN · Motor de presentaciones interactivas · núcleo compartido
   Lo usan audiencia.html y presentador.html. Sin dependencias externas.
   ========================================================================= */
(function () {
  'use strict';
  const P = (window.PINV = window.PINV || {});
  let LANG = 'es';
  P.setLang = (l) => { LANG = l === 'en' ? 'en' : 'es'; };
  P.lang = () => LANG;

  /* ---------- i18n ---------- */
  const T = (v) => {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v)) return v[LANG] != null ? v[LANG] : (v.es != null ? v.es : '');
    return String(v);
  };
  P.T = T;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  P.esc = esc;

  /* ---------- Cifras (ver references/estilo-cifras.md) ----------
     ES: miles con espacio duro solo desde 5 cifras (RAE): 3144 · 19 188 · decimal con punto (42.2), como en los PPT institucionales.
     EN: miles con coma siempre: 3,144 · 19,188 · decimal con punto. */
  function fmt(v, dec = 0, lang = LANG) {
    const neg = v < 0; v = Math.abs(Number(v));
    let [i, f] = v.toFixed(dec).split('.');
    if (lang === 'en') i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + (f ? i + '.' + f : i);
  }
  P.fmt = fmt;
  /* Montos expresados en MILLONES. unit:'M' (millones) | 'B' (mil millones / billion) */
  function money(v, o = {}, lang = LANG) {
    const sym = o.cur === 'PEN' ? 'S/' : (o.cur === 'USD$' ? 'US$' : 'USD');
    if (o.unit === 'B') return `${sym} ${fmt(v / 1000, o.dec != null ? o.dec : 1, lang)} ${lang === 'es' ? 'mil millones' : 'billion'}`;
    return `${sym} ${fmt(v, o.dec || 0, lang)} ${lang === 'es' ? 'millones' : 'million'}`;
  }
  P.money = money;
  /* Contador animable: el texto inicial ya es el valor final (accesible y robusto si falla JS) */
  const N = (v, dec = 0) => `<span class="num" data-to="${v}" data-dec="${dec}">${fmt(v, dec)}</span>`;
  P.N = N;
  /* Monto animable con unidad: "USD <num> millones" */
  function M(v, o = {}) {
    const sym = o.cur === 'PEN' ? 'S/' : 'USD';
    if (o.unit === 'B') return `<span class="money">${sym} ${N(v / 1000, o.dec != null ? o.dec : 1)} <span class="u">${LANG === 'es' ? 'mil millones' : 'billion'}</span></span>`;
    return `<span class="money">${sym} ${N(v, o.dec || 0)} <span class="u">${LANG === 'es' ? 'millones' : 'million'}</span></span>`;
  }
  P.M = M;
  /* Trimestres: 'IV-26' -> ES "IV trim. 2026" / EN "Q4 2026" */
  const ROM = { I: 1, II: 2, III: 3, IV: 4 };
  function quarter(q) {
    if (!q) return '';
    const m = /^(I{1,3}|IV)-(\d{2})$/.exec(q);
    if (!m) return String(q);
    return LANG === 'es' ? `${m[1]} trim. 20${m[2]}` : `Q${ROM[m[1]]} 20${m[2]}`;
  }
  P.quarter = quarter;

  /* ---------- Iconos (trazo, 24x24, heredan color) ---------- */
  const IC = {
    transporte: '<path d="M5 16V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10M5 16h14M6 16v3h2v-3M16 16v3h2v-3M5 10h14"/><circle cx="8.5" cy="13" r=".6"/><circle cx="15.5" cy="13" r=".6"/>',
    vial: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 10.5v3M12 17v3"/>',
    puertos: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 10h8M4 13a8 8 0 0 0 16 0"/>',
    aeropuertos: '<path d="M21 15.5v-1.7L13.5 9V4.5a1.5 1.5 0 0 0-3 0V9L3 13.8v1.7l7.5-2.4V18l-2 1.5V21l3.5-1 3.5 1v-1.5l-2-1.5v-4.9z"/>',
    ferroviario: '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M9 21l2-5M15 21l-2-5M8 21h8"/><circle cx="8.5" cy="13" r=".6"/><circle cx="15.5" cy="13" r=".6"/>',
    teleferico: '<path d="M2 4l20 6M12 7v3"/><rect x="6" y="10" width="12" height="9" rx="2"/><path d="M6 14h12M10 10v4M14 10v4"/>',
    navegable: '<path d="M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M5 14l1.5-4h11L19 14M9 10V7h6v3"/>',
    electricidad: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    transmision: '<path d="M12 2 7 22M12 2l5 20M8.6 15h6.8M9.8 10h4.4M5 6h14M7 22h10M9 6l6 9M15 6l-6 9"/>',
    agua: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    salud: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    educacion: '<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6"/>',
    mineria: '<path d="M4 21 13 12M15 4c-3.6.4-6.7 2.6-8 6 3.2-1.5 7-1.6 10.5-.3M15 4c2 2.3 3 5.4 2.5 8.7"/>',
    inmuebles: '<path d="M4 21V5l8-3v19M12 8l8 3v10M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
    telecom: '<path d="M12 12v9M8 21h8M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/><circle cx="12" cy="12" r="1.6"/>',
    agricultura: '<path d="M12 21v-9M12 12C12 7 8 4 3 4c0 5 4 8 9 8zM12 14c0-4 3-7 8-7 0 4-3 7-8 7z"/>',
    turismo: '<path d="M3 20l6-10 4 6 2-3 6 7z"/><circle cx="17" cy="6" r="2"/>',
    hidrocarburos: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-9-1 2-2 3-4 3 0-2-1-4-2-6-2 3-4 6-4 12a7 7 0 0 0 7 7z"/>',
    otros: '<circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/>',
    usuarios: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-1a7 7 0 0 1 14 0v1M16 3.5a4 4 0 0 1 0 7.5M22 21v-1a6 6 0 0 0-4-5.6"/>',
    region: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/>',
    monto: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7M3 11v4c0 1.7 2.7 3 6 3"/><ellipse cx="15" cy="15" rx="6" ry="3"/><path d="M9 15v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    mundo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    acuerdo: '<path d="M2 11l4-4 3 1.5L12 7l3 1.5L18 7l4 4M6 7l-4 4 6.5 6.5a1.5 1.5 0 0 0 2.1 0L18 10M9 14l2 2M11 12l2.5 2.5"/>',
    cohete: '<path d="M12 2c4 3 5 8 3 13H9C7 10 8 5 12 2zM9 15l-3 3 1-5M15 15l3 3-1-5M10 19l2 3 2-3"/><circle cx="12" cy="8.5" r="1.6"/>',
    objetivo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    documento: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/>',
    institucion: '<path d="M3 10 12 4l9 6M5 10v9M9.5 10v9M14.5 10v9M19 10v9M3 21h18"/>',
    grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    hogar: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5"/>',
    engranaje: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    brecha: '<path d="M3 17h6l2-4 2 8 2-12 2 8h4"/>',
    peru: '<path d="M7 3l5 2 3-1 2 4 3 2-1 4-3 2v4l-4 2-2-3-3-1-1-4-3-3 2-3z"/>',
    innovacion: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    descentralizar: '<circle cx="12" cy="12" r="2.5"/><circle cx="4" cy="5" r="1.8"/><circle cx="20" cy="5" r="1.8"/><circle cx="4" cy="19" r="1.8"/><circle cx="20" cy="19" r="1.8"/><path d="M5.5 6.3 10 10.3M18.5 6.3 14 10.3M5.5 17.7l4.5-4M18.5 17.7l-4.5-4"/>',
    pantalla: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
    expandir: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    pausa: '<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>',
    reiniciar: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>',
    izq: '<path d="M15 18l-6-6 6-6"/>',
    der: '<path d="M9 18l6-6-6-6"/>',
    lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    rejilla: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  };
  const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || IC.otros}</svg>`;
  P.icon = icon; P.ICONS = IC;

  /* ---------- Sectores: un color por sector en TODA la presentación ---------- */
  const SECT = {
    transportes: { c: '#00AC69', i: 'transporte', es: 'Transportes', en: 'Transportation' },
    vial: { c: '#00AC69', i: 'vial', es: 'Vial', en: 'Roads' },
    puertos: { c: '#00AC69', i: 'puertos', es: 'Puertos', en: 'Ports' },
    aeropuertos: { c: '#00AC69', i: 'aeropuertos', es: 'Aeropuertos', en: 'Airports' },
    ferroviario: { c: '#00AC69', i: 'ferroviario', es: 'Ferroviario', en: 'Railways' },
    teleferico: { c: '#00AC69', i: 'teleferico', es: 'Teleféricos', en: 'Cable cars' },
    navegable: { c: '#00AC69', i: 'navegable', es: 'Vías navegables', en: 'Waterways' },
    electricidad: { c: '#E8B800', i: 'electricidad', es: 'Electricidad', en: 'Electricity' },
    transmision: { c: '#E8B800', i: 'transmision', es: 'Transmisión eléctrica', en: 'Power transmission' },
    generacion: { c: '#E8B800', i: 'electricidad', es: 'Generación eléctrica', en: 'Power generation' },
    distribucion: { c: '#E8B800', i: 'electricidad', es: 'Distribución eléctrica', en: 'Power distribution' },
    agua: { c: '#0070B7', i: 'agua', es: 'Agua y saneamiento', en: 'Water & sanitation' },
    salud: { c: '#234B66', i: 'salud', es: 'Salud', en: 'Health' },
    educacion: { c: '#4E8FC5', i: 'educacion', es: 'Educación', en: 'Education' },
    inmuebles: { c: '#755C83', i: 'inmuebles', es: 'Inmuebles', en: 'Real estate' },
    mineria: { c: '#9C7E00', i: 'mineria', es: 'Minería', en: 'Mining' },
    telecom: { c: '#13A0D8', i: 'telecom', es: 'Telecomunicaciones', en: 'Telecommunications' },
    agricultura: { c: '#7FA33A', i: 'agricultura', es: 'Agricultura e irrigación', en: 'Agriculture & irrigation' },
    irrigacion: { c: '#7FA33A', i: 'agricultura', es: 'Irrigación', en: 'Irrigation' },
    hidrocarburos: { c: '#F08A24', i: 'hidrocarburos', es: 'Hidrocarburos', en: 'Hydrocarbons' },
    turismo: { c: '#C2185B', i: 'turismo', es: 'Turismo', en: 'Tourism' },
    otros: { c: '#8A8F98', i: 'otros', es: 'Otros', en: 'Other' }
  };
  /* Familia (para filtros): agrupa subsectores en un sector principal */
  const FAM = { vial: 'transportes', puertos: 'transportes', aeropuertos: 'transportes', ferroviario: 'transportes', teleferico: 'transportes', navegable: 'transportes',
    transmision: 'electricidad', generacion: 'electricidad', distribucion: 'electricidad', irrigacion: 'agricultura' };
  P.SECT = SECT; P.fam = (k) => FAM[k] || k;
  const sec = (k) => SECT[k] || SECT.otros;
  P.sec = sec;

  /* ---------- Banderas (SVG simplificadas, 3:2) ---------- */
  const star = (cx, cy, r, fill) => {
    let pts = [];
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.42 : r; pts.push((cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2)); }
    return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
  };
  const FL = {
    es: ['España', 'Spain', '<rect width="30" height="20" fill="#C60B1E"/><rect y="5" width="30" height="10" fill="#FFC400"/>'],
    vn: ['Vietnam', 'Vietnam', '<rect width="30" height="20" fill="#DA251D"/>' + star(15, 10.5, 6, '#FFFF00')],
    us: ['EE. UU.', 'United States', '<rect width="30" height="20" fill="#fff"/>' + [0, 2, 4, 6, 8, 10, 12].map((k) => `<rect y="${k * 1.54}" width="30" height="1.54" fill="#B22234"/>`).join('') + '<rect width="13" height="10.8" fill="#3C3B6E"/>'],
    co: ['Colombia', 'Colombia', '<rect width="30" height="20" fill="#FCD116"/><rect y="10" width="30" height="5" fill="#003893"/><rect y="15" width="30" height="5" fill="#CE1126"/>'],
    br: ['Brasil', 'Brazil', '<rect width="30" height="20" fill="#009C3B"/><polygon points="15,2.5 27.5,10 15,17.5 2.5,10" fill="#FFDF00"/><circle cx="15" cy="10" r="4.4" fill="#002776"/>'],
    cn: ['China', 'China', '<rect width="30" height="20" fill="#DE2910"/>' + star(6, 5.5, 3.6, '#FFDE00') + star(11.5, 2.5, 1, '#FFDE00') + star(13, 5, 1, '#FFDE00') + star(13, 8, 1, '#FFDE00') + star(11.5, 10.5, 1, '#FFDE00')],
    pe: ['Perú', 'Peru', '<rect width="30" height="20" fill="#fff"/><rect width="10" height="20" fill="#D91023"/><rect x="20" width="10" height="20" fill="#D91023"/>'],
    ar: ['Argentina', 'Argentina', '<rect width="30" height="20" fill="#74ACDF"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><circle cx="15" cy="10" r="2.2" fill="#F6B40E"/>'],
    ec: ['Ecuador', 'Ecuador', '<rect width="30" height="20" fill="#FFD100"/><rect y="10" width="30" height="5" fill="#0072CE"/><rect y="15" width="30" height="5" fill="#EF3340"/><circle cx="15" cy="10" r="2.6" fill="#7A5B2E"/>'],
    fr: ['Francia', 'France', '<rect width="30" height="20" fill="#fff"/><rect width="10" height="20" fill="#002395"/><rect x="20" width="10" height="20" fill="#ED2939"/>'],
    pt: ['Portugal', 'Portugal', '<rect width="30" height="20" fill="#FF0000"/><rect width="12" height="20" fill="#006600"/><circle cx="12" cy="10" r="3.6" fill="#FFCC00"/>'],
    mx: ['México', 'Mexico', '<rect width="30" height="20" fill="#fff"/><rect width="10" height="20" fill="#006847"/><rect x="20" width="10" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2.2" fill="#8C6B3F"/>']
  };
  P.flag = (c) => { const f = FL[c]; if (!f) return ''; const name = LANG === 'es' ? f[0] : f[1];
    return `<span class="flag" data-tip="${esc(name)}"><svg viewBox="0 0 30 20" aria-label="${esc(name)}">${f[2]}</svg><b>${esc(name)}</b></span>`; };

  /* ---------- Utilidades de plantilla ---------- */
  const A = (step = 0, anim = 'up', d = 0) => ` data-rv="${anim}" data-step="${step}" data-d="${d}"`;
  P.A = A;
  let IMG = 'assets/img/';
  P.setImgBase = (b) => { IMG = b; };
  const img = (p) => { try { return new URL(IMG + p, document.baseURI).href; } catch (e) { return IMG + p; } }; // ruta absoluta: válida también dentro de variables CSS
  /* La foto se pasa como variable: el CSS pinta velo + foto en UNA sola capa (sin hilos claros en los bordes al escalar) */
  const bg = (p, cls = '') => `<div class="bg ${cls}" style="--img:url('${img(p)}')"></div>`;
  const logo = (dark) => `<img class="logo-esq" alt="PROINVERSIÓN" src="${img(dark ? 'logo-proinversion-blanco.png' : 'logo-proinversion-gris.png')}">`;
  const head = (s, dark, extra = '') => `<header class="sc-head${dark ? ' dark' : ''}"${A(0, 'left')}><i class="slash"></i><div><h2>${T(s.titulo)}</h2>${s.sub ? `<p class="sub">${T(s.sub)}</p>` : ''}</div>${extra}</header>`;
  const nota = (s) => s.nota ? `<p class="fuente"${A(0, 'fade', 600)}>${T(s.nota)}</p>` : '';
  const L = (es, en) => (LANG === 'es' ? es : en);

  /* =========================================================================
     RENDERIZADORES DE ESCENA  (ver references/catalogo-escenas.md)
     Cada uno devuelve HTML. data-step = momento de aparición (clic del presentador).
     data-on = elemento "activo" exactamente en ese paso.
     ========================================================================= */
  const R = {};

  /* PORTADA */
  R.portada = { dark: true, html: (s) => `
    ${bg(s.img, 'kb')}<div class="veil veil-left"></div>
    <div class="portada-logos"${A(0, 'fade', 200)}>${(s.logos || []).map((l) => `<img src="${img(l)}" alt="">`).join('<i class="sep"></i>')}</div>
    <div class="portada-txt">
      <p class="kicker"${A(0, 'up', 300)}>${T(s.kicker)}</p>
      <h1${A(0, 'up', 450)}><span class="pais">${T(s.titulo1)}</span><span class="tt">${T(s.titulo2)}</span></h1>
      <div class="portada-chips"${A(0, 'up', 700)}>${(s.chips || []).map((c) => `<span>${T(c)}</span>`).join('')}</div>
      <p class="fecha"${A(0, 'fade', 1000)}>${icon('calendario')} ${T(s.fecha)}</p>
    </div>
    <i class="slash-xl"${A(0, 'wipe', 100)}></i>` };

  /* CAPÍTULO (separador) */
  R.capitulo = { dark: true, html: (s) => `
    ${bg(s.img, 'kb' + (s.blur ? ' blur' : ''))}<div class="veil veil-cap"></div>
    <div class="cap-num"${A(0, 'fade', 200)}>${s.num || ''}</div>
    <div class="cap-box">
      <i class="slash-cap"${A(0, 'wipe', 0)}></i>
      <p class="kicker"${A(0, 'up', 350)}>${T(s.kicker)}</p>
      <h1${A(0, 'up', 450)}>${T(s.titulo)}</h1>
      ${s.datos ? `<div class="cap-datos"${A(0, 'up', 750)}>${s.datos.map((d) => `<div><b>${T(d.v)}</b><span>${T(d.l)}</span></div>`).join('')}</div>` : ''}
    </div>${logo(true)}` };

  /* MECANISMOS: tres fotos + pilares */
  R.mecanismos = { dark: false, html: (s) => `
    ${head(s)}${logo(false)}
    <div class="mec-fotos">${s.tres.map((t, k) => `
      <figure class="mec-f"${A(0, 'rise', 150 + k * 180)}>${bg(t.img)}<figcaption><b>${T(t.sigla)}</b><span>${T(t.nombre)}</span></figcaption></figure>`).join('')}
    </div>
    <div class="mec-pilares">${s.pilares.map((p, k) => `
      <div class="pilar"${A(k + 1, 'up')}><span class="pilar-ic">${icon(p.icono)}</span><div><h3>${T(p.titulo)}</h3><p>${T(p.texto)}</p></div></div>`).join('')}
    </div>` };

  /* CIFRAS: columnas foto + número grande */
  R.cifras = { dark: true, html: (s) => `
    <div class="cif-cols n${s.cols.length}">${s.cols.map((c, k) => `
      <div class="cif-col"${A(k, 'rise')}>${bg(c.img, 'kb')}<div class="veil veil-bottom"></div>
        <div class="cif-in">
          <span class="chip-rojo">${T(c.periodo)}</span>
          <span class="cif-ic">${icon(c.icono)}</span>
          <h3>${T(c.titulo)}</h3>
          <div class="cif-card"><div class="big">${c.pre || ''}${N(c.num, c.dec || 0)}</div><p class="lab">${T(c.label)}</p><p class="mon">${T(c.monto)}</p></div>
        </div></div>`).join('')}
    </div>${head(s, true)}${logo(true)}${nota(s)}` };

  /* IMPACTO: mosaico de 4 resultados */
  R.impacto = { dark: true, html: (s) => `
    ${bg(s.img)}<div class="veil veil-full"></div>${head(s, true)}${logo(true)}
    <div class="imp-grid">${s.items.map((t, k) => `
      <div class="imp"${A(k, 'zoom')}>
        <div class="imp-top"><span class="imp-ic">${icon(t.icono)}</span><div><b>${N(t.cant)} ${T(t.que)}</b><span>${P.money(t.usd)}</span></div></div>
        <div class="imp-big">${t.pre || ''}${N(t.num, t.dec || 0)}${t.suf ? `<small>${T(t.suf)}</small>` : ''}</div>
        <p>${T(t.txt)}</p>
      </div>`).join('')}
    </div>` };

  /* EVOLUCIÓN APP 1.0 → 5.0: paneles que se expanden */
  R.evolucion = { dark: true, html: (s) => `
    <div class="evo">${s.etapas.map((e, k) => `
      <div class="evo-p" data-on="${k}" data-goto-step="${k}"${A(0, 'rise', 100 + k * 120)}>${bg(e.img)}<div class="veil veil-bottom"></div>
        <div class="evo-in"><span class="evo-v">${e.v}</span><h3>${T(e.proyecto)}</h3><p>${T(e.etapa)}</p></div>
      </div>`).join('')}
    </div>${head(s, true)}${logo(true)}
    <div class="evo-line"${A(0, 'fade', 800)}>${s.etapas.map((e, k) => `<i data-on="${k}"></i>`).join('')}</div>` };

  /* HITOS ANUALES: adjudicaciones por año con países inversionistas */
  R.anios = { dark: false, html: (s) => {
    const max = Math.max(...s.anios.map((a) => a.usd));
    return `${head(s)}${logo(false)}
    <div class="anios">${s.anios.map((a, k) => `
      <div class="anio"${A(k, 'up')}>
        <span class="chip-rojo big">${a.anio}</span>
        <p class="anio-cnt"><b>${N(a.proy)}</b> ${L('proyectos', 'projects')}${a.ad ? ` <span>+ <b>${N(a.ad)}</b> ${a.ad > 1 ? L('adendas', 'addenda') : L('adenda', 'addendum')}</span>` : ''}</p>
        <div class="anio-usd">USD ${N(a.usd)} <small>${L('millones', 'million')}</small></div>
        <div class="anio-bar"><i style="--w:${(a.usd / max * 100).toFixed(1)}%"></i></div>
        <p class="anio-lbl">${L('Inversionistas de', 'Investors from')}</p>
        <div class="flags">${a.paises.map(P.flag).join('')}</div>
        <figure class="anio-foto">${bg(a.img)}<figcaption><b>${T(a.emblema)}</b><span>${P.money(a.emblemaUsd)}</span></figcaption></figure>
      </div>`).join('')}
    </div>`; } };

  /* COLUMNAS APILADAS + línea de total (resultados 2019–2026) */
  R.apiladas = { dark: false, html: (s) => {
    const W = 1180, H = 640, pl = 40, pb = 60, pt = 60, cw = (W - pl) / s.anios.length, bw = cw * 0.56;
    const max = Math.max(...s.anios.map((a) => a.total)) * 1.08;
    const y = (v) => H - pb - (v / max) * (H - pb - pt);
    let bars = '', labels = '', pts = [];
    s.anios.forEach((a, k) => {
      const x = pl + k * cw + (cw - bw) / 2; let acc = 0;
      const hi = s.resaltar && s.resaltar.includes(a.anio);
      a.seg.forEach(([key, v], j) => {
        const y0 = y(acc), y1 = y(acc + v); acc += v; const h = y0 - y1;
        bars += `<rect class="bar" x="${x}" y="${y1}" width="${bw}" height="${Math.max(h, 1.5)}" rx="4" fill="${sec(key).c}" style="--d:${k * 140 + j * 70}ms" data-tip="${esc(a.anio + ' · ' + T(sec(key)) + ': ' + P.money(v))}"/>`;
        if (h > 34) bars += `<text class="seg-v" x="${x + bw / 2}" y="${y1 + h / 2 + 8}" style="--d:${k * 140 + 400}ms">${fmt(v)}</text>`;
      });
      pts.push([x + bw / 2, y(a.total)]);
      labels += `<text class="yr${hi ? ' hi' : ''}" x="${x + bw / 2}" y="${H - pb + 40}">${a.anio}</text>
        <g class="tot" style="--d:${900 + k * 120}ms"><rect x="${x + bw / 2 - 50}" y="${y(a.total) - 52}" width="100" height="36" rx="6"/><text x="${x + bw / 2}" y="${y(a.total) - 26}">${fmt(a.total)}</text></g>`;
    });
    const path = 'M' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
    const hiIdx = s.anios.map((a, k) => (s.resaltar || []).includes(a.anio) ? k : -1).filter((k) => k >= 0);
    const bx0 = pl + hiIdx[0] * cw + 6, bx1 = pl + (hiIdx[hiIdx.length - 1] + 1) * cw - 6;
    const used = [...new Set(s.anios.flatMap((a) => a.seg.map((z) => z[0])))];
    return `${head(s)}${logo(false)}
    <div class="ap-wrap">
      <div class="ap-side">
        <div class="ap-call"${A(1, 'left')}><span class="ap-medal">${icon('cohete')}</span><div><b>USD ${N(s.destacado.v)} <small>${L('millones', 'million')}</small></b><p>${T(s.destacado.t)}</p></div></div>
        <ul class="legend"${A(0, 'fade', 500)}>${used.map((k) => `<li><i style="background:${sec(k).c}"></i>${T(sec(k))}</li>`).join('')}<li><i class="ln"></i>${L('Total anual', 'Annual total')}</li></ul>
      </div>
      <svg class="chart ap" viewBox="0 0 ${W} ${H}"${A(0, 'fade', 100)}>
        <line x1="${pl}" x2="${W}" y1="${H - pb}" y2="${H - pb}" class="axis"/>
        <rect class="hi-band" x="${bx0}" y="${pt - 40}" width="${bx1 - bx0}" height="${H - pb - pt + 40}" rx="14"${A(1, 'fade')}/>
        ${bars}<path class="line" d="${path}" pathLength="1"/>${labels}
      </svg>
    </div>${nota(s)}`; } };

  /* AVANCES: grupos con listas y barras */
  R.avances = { dark: false, html: (s) => {
    const max = Math.max(...s.grupos.flatMap((g) => g.items.map((i) => i[2])));
    return `${head(s, false, `<div class="head-kpi"${A(0, 'left', 200)}>${icon('monto')}<b>${P.M(s.total)}</b></div>`)}${logo(false)}
    <div class="av">${s.grupos.map((g, k) => `
      <div class="av-g"${A(k, 'up')}>
        <div class="av-h"><span class="av-ic">${icon(g.icono)}</span><b>${N(g.n)}</b><span>${T(g.t)}</span></div>
        <ul>${g.items.map(([sk, nm, v]) => `<li><span class="dot" style="background:${sec(sk).c}">${icon(sec(sk).i)}</span><span class="nm">${T(nm)}</span><span class="hb"><i style="--w:${(v / max * 100).toFixed(1)}%;background:${sec(sk).c}"></i></span><b>${fmt(v)}</b></li>`).join('')}</ul>
      </div>`).join('')}
    </div><p class="unidad"${A(0, 'fade', 600)}>${L('Montos en USD millones', 'Amounts in USD million')}</p>`; } };

  /* EJECUCIÓN CONTRACTUAL: acordeón */
  R.ejecucion = { dark: false, html: (s) => `
    ${head(s)}${logo(false)}
    <div class="ej">${s.items.map((it, k) => `
      <div class="ej-c" data-on="${k}" data-goto-step="${k}"${A(0, 'up', k * 150)}>
        <div class="ej-h"><span class="ej-sig">${it.sigla}</span><div><b>${T(it.nombre)}</b><span>${T(it.fase)}</span></div></div>
        <div class="ej-b">${it.bloques.map((b) => `<h4>${T(b.t)}</h4><ul>${b.l.map((x) => `<li>${T(x)}</li>`).join('')}</ul>`).join('')}</div>
      </div>`).join('')}
    </div>` };

  /* MAPA DE CORREDORES LOGÍSTICOS */
  R.corredores = { dark: true, html: (s) => `
    <div class="cor-map"${A(0, 'zoom')}><img src="${img(s.mapa)}" alt=""></div>
    <div class="cor-leg"${A(0, 'fade', 900)}>${s.leyenda.map((l) => `<span><i class="lg-${l.k}"></i>${T(l.t)}</span>`).join('')}</div>
    <div class="cor-kpi"${A(0, 'up', 300)}><b>${N(s.proy)}</b> ${L('proyectos', 'projects')} <span>+ ${N(s.ad)} ${L('adendas', 'addenda')}</span><div class="cor-usd">${P.M(s.usd, { unit: 'B', dec: 0 })}</div></div>
    <div class="cor-panel">
      <h3${A(0, 'left', 300)}>${T(s.panelTitulo)}<small>${T(s.panelSub)}</small></h3>
      ${s.ejes.map((e, k) => {
        const C = 2 * Math.PI * 52;
        return `<div class="eje" data-on="${k + 1}"${A(k + 1, 'left')}>
          <svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="rt"/><circle cx="60" cy="60" r="52" class="rgv" stroke="${e.c}" style="stroke-dasharray:${C};--off:${(C * (1 - e.pct / 100)).toFixed(1)}"/><text x="60" y="70">${e.pct}%</text></svg>
          <div><h4 style="color:${e.c}">${T(e.nombre)}</h4><p><b>${L('Transversal', 'Transversal')}:</b> ${e.trans}</p><p><b>${L('Costero', 'Coastal')}:</b> ${e.cost}</p>
          <div class="sect-chips">${e.sect.map((k2) => `<span style="--c:${sec(k2).c}">${icon(sec(k2).i)}${T(sec(k2))}</span>`).join('')}</div></div></div>`;
      }).join('')}
    </div>${head(s, true)}` };

  /* HORIZONTE: resumen de cartera por periodo */
  R.horizonte = { dark: false, html: (s) => {
    const max = Math.max(...s.barras.map((b) => b.v));
    return `
    <aside class="hz-kpi">${bg(s.img, 'kb')}<div class="veil veil-full"></div>
      <div class="hz-in">
        <div class="hz-big"${A(0, 'up', 200)}>${icon('grafico')}<b>${N(s.proy)}</b></div>
        <p class="hz-lbl"${A(0, 'up', 300)}>${T(s.proyLbl)}</p>
        <div class="hz-usd"${A(0, 'up', 450)}>${s.usdPre ? `<small>${T(s.usdPre)}</small>` : ''}${P.M(s.usd, { unit: 'B', dec: 0 })}</div>
        <div class="hz-meta"${A(0, 'up', 600)}><span>${icon('region')}<b>${T(s.regiones)}</b></span><span>${icon('usuarios')}<b>${T(s.benef)}</b></span></div>
      </div></aside>
    ${head(s)}${logo(false)}
    <div class="hz-bars"${A(1, 'fade')}>${s.barras.map((b, k) => `
      <div class="hb-row" style="--d:${k * 90}ms" data-tip="${esc(T(sec(b.s)) + ': ' + P.money(b.v))}"><span class="hb-ic" style="color:${sec(b.s).c}">${icon(sec(b.s).i)}</span>
        <div class="hb-lbl"><b>${T(b.lbl || sec(b.s))}</b><span>${T(b.n)}</span></div>
        <div class="hb-track"><i style="--w:${(b.v / max * 100).toFixed(1)}%;background:${sec(b.s).c}"><em>${fmt(b.v)}</em></i></div></div>`).join('')}
      <p class="unidad">${L('USD millones', 'USD million')}</p>
    </div>
    ${s.adendas ? `<div class="hz-ad"${A(2, 'up')}><h4>${T(s.adendas.t)} · ${P.money(s.adendas.l.reduce((a, x) => a + x[1], 0))}</h4>${s.adendas.l.map(([k, v]) => `<div><span style="--c:${sec(k).c}">${icon(sec(k).i)}${T(sec(k))}</span><b>${fmt(v)}</b></div>`).join('')}</div>` : ''}`; } };

  /* EXPLORADOR de proyectos: filtros por sector, pestañas y orden (interactivo y sincronizado) */
  R.explorador = { dark: false,
    html: (s) => {
      const grupos = s.grupos;
      const key = (k) => (s.filtro === 'sub' ? k : P.fam(k));
      const all = grupos.flatMap((g, gi) => g.filas.map((f) => ({ ...f, gi })));
      const fams = [...new Set(all.map((f) => key(f.s)))];
      const max = Math.max(...all.map((f) => f.m));
      const row = (f) => `<li class="ex-r" data-g="${f.gi}" data-f="${key(f.s)}" data-m="${f.m}" data-q="${f.q || ''}" data-tip="${esc(T(f.p) + ' · ' + T(sec(f.s)) + ' · ' + P.money(f.m))}">
          <span class="ex-n">${f.n}</span>
          <span class="ex-s" style="--c:${sec(f.s).c}">${icon(sec(f.s).i)}</span>
          <span class="ex-p"><b>${T(f.p)}</b><small>${f.e || ''}${f.tag ? `<em>${T(f.tag)}</em>` : ''}</small></span>
          ${s.cols && s.cols.includes('ad') ? `<span class="ex-q">${f.ad ? P.quarter(f.ad) : '—'}</span>` : ''}
          ${s.cols && s.cols.includes('q') ? `<span class="ex-q hi">${f.q ? (/^\d{4}$/.test(f.q) ? f.q : P.quarter(f.q)) : '—'}</span>` : ''}
          <span class="ex-m"><i style="--w:${Math.max(2, f.m / max * 100).toFixed(1)}%;background:${sec(f.s).c}"></i><b>${fmt(f.m)}</b></span></li>`;
      return `${head(s)}${logo(false)}
      <div class="ex-main${s.sub ? ' con-sub' : ''}">
      <div class="ex-tools"${A(0, 'up', 150)}>
        ${grupos.length > 1 ? `<div class="ex-tabs">${grupos.map((g, gi) => `<button data-ui="g:${gi}">${T(g.t)} <small>${g.filas.length}</small></button>`).join('')}</div>` : ''}
        <div class="ex-chips"><button data-ui="f:*" class="on">${L('Todos', 'All')}</button>${fams.map((f) => `<button data-ui="f:${f}" style="--c:${sec(f).c}">${icon(sec(f).i)}${T(sec(f))}</button>`).join('')}</div>
        <button class="ex-sort" data-ui="o:toggle">${icon('grafico')}<span>${L('Ordenar por monto', 'Sort by amount')}</span></button>
      </div>
      <div class="ex-body${s.mapa ? ' con-mapa' : ''}">
        ${s.mapa ? `<div class="ex-mapa"${A(0, 'zoom', 300)}><img src="${img(s.mapa)}" alt="">${s.mapaTxt ? `<p>${T(s.mapaTxt)}</p>` : ''}</div>` : ''}
        <div class="ex-list-w"${A(0, 'fade', 300)}>
          <div class="ex-hdr"><span class="ex-n">N°</span><span class="ex-s"></span><span class="ex-p">${T(s.colP || { es: 'Proyecto', en: 'Project' })}</span>${s.cols && s.cols.includes('ad') ? `<span class="ex-q">${L('Adj. directa', 'Direct award')}</span>` : ''}${s.cols && s.cols.includes('q') ? `<span class="ex-q">${T(s.colQ || { es: 'Adjudicación', en: 'Award' })}</span>` : ''}<span class="ex-m">${T(s.colM || { es: 'Monto* (USD mill.)', en: 'Amount* (USD mill.)' })}</span></div>
          <ol class="ex-list${all.length > 14 ? ' dos' : ''}">${all.map(row).join('')}</ol>
        </div>
      </div>
      </div>
      <div class="ex-foot"${A(0, 'up', 450)}><span class="ex-count"></span><span class="ex-total"><small>${T(s.metaLbl || { es: 'Meta', en: 'Goal' })}</small> USD <b class="ex-sum">${fmt(s.meta)}</b> ${L('millones', 'million')}</span></div>
      ${nota(s)}`;
    },
    ui: (root, u, s) => {
      const g = u.g != null ? +u.g : 0, f = u.f || '*', o = u.o || 'orden';
      root.querySelectorAll('[data-ui^="g:"]').forEach((b) => b.classList.toggle('on', +b.dataset.ui.slice(2) === g));
      root.querySelectorAll('[data-ui^="f:"]').forEach((b) => b.classList.toggle('on', b.dataset.ui.slice(2) === f));
      const sb = root.querySelector('.ex-sort'); if (sb) sb.classList.toggle('on', o === 'monto');
      const list = root.querySelector('.ex-list'); if (!list) return;
      const rows = [...list.children];
      const multi = s.grupos.length > 1;
      // chips solo de sectores presentes en la pestaña activa
      const present = new Set(rows.filter((r) => !multi || +r.dataset.g === g).map((r) => r.dataset.f));
      root.querySelectorAll('[data-ui^="f:"]').forEach((b) => { const k = b.dataset.ui.slice(2); b.hidden = k !== '*' && !present.has(k); });
      let n = 0, sum = 0, tot = 0;
      rows.forEach((r) => {
        const inG = !multi || +r.dataset.g === g; if (inG) tot++;
        const vis = inG && (f === '*' || r.dataset.f === f);
        r.classList.toggle('off', !vis);
        if (vis) { n++; sum += +r.dataset.m; }
      });
      const sorted = rows.slice().sort((a, b) => o === 'monto' ? (+b.dataset.m - +a.dataset.m) : (rows.indexOf(a) - rows.indexOf(b)));
      sorted.forEach((r, k) => { r.style.order = o === 'monto' ? k : ''; });
      const visible = rows.filter((r) => !r.classList.contains('off')).length;
      list.classList.toggle('dos', visible > 14);
      const meta = multi ? s.grupos[g].meta : s.meta;
      const isAll = f === '*';
      const sumEl = root.querySelector('.ex-sum'); if (sumEl) sumEl.textContent = fmt(isAll && meta != null ? meta : sum);
      const lbl = root.querySelector('.ex-total small'); if (lbl) lbl.textContent = isAll ? T(s.metaLbl || { es: 'Meta', en: 'Goal' }) : L('Subtotal', 'Subtotal');
      const c = root.querySelector('.ex-count');
      if (c) c.innerHTML = isAll ? `<b>${tot}</b> ${L('registros', 'entries')}` : `${L('Mostrando', 'Showing')} <b>${n}</b> ${L('de', 'of')} ${tot} · <span style="color:${sec(f).c}">${T(sec(f))}</span>`;
    },
    controles: (s) => ({ grupos: s.grupos.map((g) => T(g.t)), sectores: [...new Set(s.grupos.flatMap((g) => g.filas.map((f) => (s.filtro === 'sub' ? f.s : P.fam(f.s)))))] })
  };

  /* POTENCIALES: KPIs + tarjetas foto */
  R.potenciales = { dark: false, html: (s) => `
    ${head(s)}${logo(false)}
    <div class="pt-kpis"${A(0, 'up', 200)}>
      <div>${icon('grafico')}<b>${N(s.proy)}</b><span>${L('proyectos', 'projects')}</span></div>
      <div>${icon('monto')}<b>${P.M(s.usd, { unit: 'B', dec: 0 })}</b></div>
      <div>${icon('region')}<b>${T(s.regiones)}</b></div>
      <div>${icon('usuarios')}<b>${T(s.benef)}</b></div>
    </div>
    <div class="pt-cards">${s.cards.map((c, k) => `
      <div class="pt-c"${A(k + 1, 'rise')}>${bg(c.img)}<span class="pt-tag" style="--c:${sec(c.s).c}">${icon(sec(c.s).i)}${T(c.t || sec(c.s))}</span>
        <div class="pt-body"><p class="pt-n"><b>${N(c.n)}</b> ${L('proyectos', 'projects')}</p><div class="pt-usd">${P.M(c.usd)}</div><p class="pt-dest">${icon('flecha')}${T(c.dest)}</p></div></div>`).join('')}
    </div>` };

  /* ADENDA destacada */
  R.adenda = { dark: false, html: (s) => `
    <div class="ad-foto${s.fotoDer ? ' der' : ''}"${A(0, 'reveal')}>${bg(s.img, 'kb')}</div>
    <div class="ad-txt${s.fotoDer ? ' izq' : ''}">
      <span class="ad-badge"${A(0, 'left', 300)}>${icon('calendario')}<span><small>${T(s.firmaLbl)}</small>${T(s.firma)}</span></span>
      <p class="kicker rojo"${A(0, 'up', 400)}>${T(s.kicker)}</p>
      <h2 class="ad-t"${A(0, 'up', 450)}>${T(s.titulo)}</h2>
      <div class="ad-kpis">
        <div class="ad-k"${A(0, 'up', 650)}><span>${icon('monto')}</span><div><b>${P.M(s.usd, { cur: 'USD' })}</b><p>${T(s.usdTxt)}</p></div></div>
        <div class="ad-k"${A(1, 'up')}><span>${icon(s.benefIcono || 'usuarios')}</span><div><b class="xl">${N(s.benef)}</b><p>${T(s.benefTxt)}</p></div></div>
        ${s.extra ? `<div class="ad-k"${A(1, 'up', 200)}><span>${icon(s.extra.icono)}</span><div><b>${T(s.extra.v)}</b><p>${T(s.extra.t)}</p></div></div>` : ''}
      </div>
      <div class="ad-comp"${A(2, 'up')}><h4>${icon('engranaje')}${T(s.compTitulo)}</h4><ul>${s.comp.map((c) => `<li>${T(c)}</li>`).join('')}</ul></div>
    </div>${logo(false)}` };

  /* CRONOGRAMA sectorial */
  R.cronograma = { dark: false, html: (s) => `
    ${head(s)}${logo(false)}
    <div class="cr-l">
      <div class="cr-card"${A(0, 'up', 200)}><span class="cr-ic">${icon('transmision')}</span><p>${T(s.resumen)}</p></div>
      <div class="cr-map"${A(0, 'zoom', 400)}><img src="${img(s.mapa)}" alt=""></div>
    </div>
    <div class="cr-r">${s.filas.map((f, k) => `
      <div class="cr-row"${A(k + 1, 'left')}>
        <div class="cr-h"><span class="cr-tag">${T(f.tipo)}</span><span class="cr-n">${f.n}</span><b>${T(f.p)}</b><em>${P.money(f.m)}${f.nota ? ' <sup>' + f.nota + '</sup>' : ''}</em></div>
        <div class="cr-tl">${f.hitos.map((h, j) => `<div class="cr-hito ${h.ok ? 'ok' : ''}"><i>${h.ok ? icon('check') : ''}</i><span>${T(h.t)}</span><b>${h.q ? P.quarter(h.q) : T(h.v)}</b></div>`).join('<span class="cr-sep"></span>')}</div>
      </div>`).join('')}
      <p class="cr-leg"${A(1, 'fade', 300)}>${T(s.leyenda)}</p>
    </div>${nota(s)}` };

  /* PROYECTO DE TRANSMISIÓN (foto + panel + mapa) */
  R.proyecto = { dark: true, html: (s) => `
    ${bg(s.img, 'kb')}<div class="veil veil-bottom2"></div>${head(s, true)}${logo(true)}
    <span class="pj-adj"${A(0, 'left', 300)}>${icon('calendario')}${T(s.adj)}</span>
    <div class="pj-panel"${A(0, 'up', 400)}>
      <div class="pj-k"><small>${T(s.montoLbl)}</small><b>${P.M(s.usd)}</b><p>${T(s.modalidad)}</p></div>
      <div class="pj-k"><span>${icon('usuarios')}</span><b class="xl">${N(s.hab, 1)}</b><p>${T(s.habTxt)}</p></div>
      <div class="pj-obras"${A(1, 'fade')}><h4>${T(s.obrasTitulo)}</h4><ul>${s.obras.map((o, k) => `<li style="--d:${k * 150}ms">${icon('transmision')}<span>${T(o)}</span></li>`).join('')}</ul></div>
    </div>
    <div class="pj-map"${A(2, 'zoom')}><img src="${img(s.mapa)}" alt=""></div>${nota(s)}` };

  /* OxI: claves en órbita */
  R.orbita = { dark: false, html: (s) => {
    const n = s.nodos.length;
    return `${head(s)}${logo(false)}
    <div class="orb">
      <svg class="orb-ring" viewBox="0 0 800 800"${A(0, 'fade')}><circle cx="400" cy="400" r="330" pathLength="1"/></svg>
      <div class="orb-center"${A(0, 'zoom', 200)}><img src="${img(s.logo)}" alt="Obras por Impuestos"></div>
      ${s.nodos.map((d, k) => {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / n, x = 50 + 41.25 * Math.cos(a), y = 50 + 41.25 * Math.sin(a), right = Math.cos(a) > 0.2, left = Math.cos(a) < -0.2;
        return `<div class="orb-n ${right ? 'r' : left ? 'l' : 'c'}" style="left:${x}%;top:${y}%"${A(k < Math.ceil(n / 2) ? 0 : 1, 'zoom', k < Math.ceil(n / 2) ? 400 + k * 200 : (k - Math.ceil(n / 2)) * 200)}>
          <span class="orb-ic">${icon(d.icono)}</span><div class="orb-t"><b>${T(d.v)}</b><span>${T(d.t)}</span></div></div>`;
      }).join('')}
    </div>${nota(s)}`; } };

  /* OxI: historia (columnas+línea) + dona por función */
  R.historia = { dark: false, html: (s) => {
    const W = 1000, H = 520, pl = 10, pb = 50, pt = 30, n = s.serie.length, cw = (W - pl) / n, bw = cw * 0.62;
    const max = Math.max(...s.serie.map((x) => x[1])) * 1.12, maxI = Math.max(...s.serie.map((x) => x[2])) * 1.35;
    const y = (v) => H - pb - (v / max) * (H - pb - pt), yi = (v) => H - pb - (v / maxI) * (H - pb - pt) - 10;
    let bars = '', pts = [], dots = '';
    s.serie.forEach(([yr, v, it], k) => {
      const x = pl + k * cw + (cw - bw) / 2;
      bars += `<rect class="bar" x="${x}" y="${y(v)}" width="${bw}" height="${H - pb - y(v)}" rx="3" fill="${k >= n - 3 ? '#E42312' : '#B81A0D'}" style="--d:${k * 60}ms" data-tip="${esc(yr + ': S/ ' + fmt(v) + ' ' + L('millones', 'million') + ' · ' + fmt(it) + ' ' + L('intervenciones', 'interventions'))}"/>
        <text class="bv" x="${x + bw / 2}" y="${y(v) - 8}" style="--d:${600 + k * 60}ms">${fmt(v)}</text>
        <text class="yr" x="${x + bw / 2}" y="${H - pb + 28}">${String(yr).slice(2)}${k === n - 1 ? '*' : ''}</text>`;
      pts.push([x + bw / 2, yi(it)]);
      dots += `<circle class="dot" cx="${x + bw / 2}" cy="${yi(it)}" r="5" style="--d:${1200 + k * 50}ms"/>`;
    });
    const path = 'M' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
    // dona
    const tot = s.funciones.reduce((a, f) => a + f.v, 0), R0 = 120, C = 2 * Math.PI * R0; let acc = 0;
    const segs = s.funciones.map((f, k) => { const len = (f.v / tot) * C; const g = `<circle class="dn-s" cx="160" cy="160" r="${R0}" stroke="${f.c}" style="stroke-dasharray:${len} ${C};--rot:${(acc / tot) * 360 - 90}deg;--d:${k * 120}ms" data-tip="${esc(T(f.t) + ': S/ ' + fmt(f.v) + ' ' + L('millones', 'million'))}"/>`; acc += f.v; return g; }).join('');
    return `${head(s)}${logo(false)}
    <div class="hi-top"${A(0, 'up', 200)}>
      <span class="hi-ic">${icon('usuarios')}</span>
      <div><p class="hi-big">${T(s.top.big)}</p><p>${T(s.top.txt)}</p></div>
      <div class="hi-part"><small>${L('Participan', 'Participants')}</small>${s.top.part.map((p) => `<span><b>${N(p.v)}</b> ${T(p.t)}</span>`).join('')}</div>
    </div>
    <div class="hi-charts">
      <div class="hi-c1"${A(1, 'fade')}><div class="hi-leg"><span><i class="sq"></i>${L('Monto de inversión (S/ millones)', 'Investment amount (S/ million)')}</span><span><i class="cr"></i>${L('N° de intervenciones', 'No. of interventions')}</span></div>
        <svg class="chart hi" viewBox="0 0 ${W} ${H}">${bars}<path class="line" d="${path}" pathLength="1"/>${dots}<line class="axis" x1="0" x2="${W}" y1="${H - pb}" y2="${H - pb}"/></svg></div>
      <div class="hi-c2"${A(2, 'fade')}><h4>${T(s.donaTitulo)}</h4><div class="dn"><svg viewBox="0 0 320 320">${segs}</svg><div class="dn-c"><b>S/ ${fmt(tot)}</b><span>${L('millones', 'million')}</span></div></div>
        <ul class="dn-leg">${s.funciones.map((f) => `<li><i style="background:${f.c}"></i><span>${T(f.t)}</span><b>${Math.round(f.v / tot * 100)}%</b></li>`).join('')}</ul></div>
    </div>${nota(s)}`; } };

  /* OxI: cartera con mapa por zonas */
  R.zonas = { dark: false, html: (s) => `
    <aside class="zn-l">${bg(s.img, 'kb')}<div class="veil veil-full"></div>
      <div class="zn-in"><p class="zn-proj"${A(0, 'up', 200)}>${T(s.proyeccion)}</p>
        <div class="zn-x"${A(0, 'up', 500)}><b>${N(s.veces, 1)}<small>×</small></b><p>${T(s.vecesTxt)}</p></div></div></aside>
    ${head(s)}${logo(false)}
    <div class="zn-r">
      <h3${A(0, 'fade', 300)}>${T(s.subtitulo)}</h3>
      <div class="zn-grid">
        <div class="zn-list">${s.zonas.map((z, k) => `
          <div class="zn" data-on="${k + 1}" data-goto-step="${k + 1}"${A(k + 1, 'left')}><span class="zn-l1" style="background:${z.c}">${z.letra}</span><div><h4>${T(z.zona)}</h4><p>${T(z.obra)}</p><b>S/ ${N(z.v)} ${L('millones', 'million')}</b></div></div>`).join('')}</div>
        <div class="zn-map"${A(0, 'zoom', 400)}><img src="${img(s.mapa)}" alt=""></div>
      </div>
    </div>${nota(s)}` };

  /* CIERRE */
  R.cierre = { dark: true, html: (s) => `
    ${bg(s.img, 'kb')}<div class="veil veil-cierre"></div>
    <div class="ci-band"${A(0, 'wipe')}></div>
    <img class="ci-logo" src="${img('logo-proinversion-blanco.png')}" alt="PROINVERSIÓN"${A(0, 'fade', 500)}>
    <div class="ci-qrs">${s.qrs.map((q, k) => `<div class="ci-qr"${A(0, 'up', 600 + k * 200)}><p>${T(q.t)}</p><img src="${img(q.img)}" alt=""></div>`).join('')}</div>
    <div class="ci-txt"><h1${A(0, 'up', 900)}>${T(s.titulo)}</h1><p${A(0, 'up', 1100)}>${T(s.sub)}</p></div>` };

  P.R = R;

  /* ---------- Construcción y navegación (compartida audiencia / presentador) ---------- */
  P.build = function (deck, lang) {
    const prev = LANG; P.setLang(lang || LANG);
    const out = deck.escenas.map((s, i) => {
      const r = R[s.tipo]; if (!r) throw new Error('Tipo de escena desconocido: ' + s.tipo);
      const html = r.html(s);
      let max = 0;
      html.replace(/data-(?:step|on)="(\d+)"/g, (_, d) => { max = Math.max(max, +d); return _; });
      return { i, s, html, max, dark: typeof r.dark === 'function' ? r.dark(s) : !!r.dark };
    });
    P.setLang(prev);
    return out;
  };
  P.nav = {
    next(st, built) {
      const cur = built[st.i];
      if (st.step < cur.max) return { i: st.i, step: st.step + 1 };
      for (let j = st.i + 1; j < built.length; j++) if (!built[j].s.respaldo) return { i: j, step: 0 };
      return null;
    },
    prev(st, built) {
      if (st.step > 0) return { i: st.i, step: st.step - 1 };
      for (let j = st.i - 1; j >= 0; j--) if (!built[j].s.respaldo) return { i: j, step: built[j].max };
      return null;
    }
  };
  P.chapterOf = (deck, s) => deck.capitulos.find((c) => c.id === s.capitulo) || { id: '', es: '', en: '' };

  /* ---------- Sincronización entre ventanas (sin servidor) ----------
     BroadcastChannel (mismo origen) + evento storage (file:// y http) + postMessage (ventana abierta por el presentador). */
  P.Sync = function (deckId, onMsg) {
    const me = Math.random().toString(36).slice(2, 10);
    let seq = 0; const seen = new Set(); const peers = new Set();
    const key = 'pinv-sync:' + deckId;
    const recv = (m) => {
      if (!m || m.__pinv !== deckId || m.from === me) return;
      const k = m.from + ':' + m.seq; if (seen.has(k)) return; seen.add(k);
      if (seen.size > 500) seen.clear();
      onMsg(m);
    };
    let bc = null;
    try { bc = new BroadcastChannel(key); bc.onmessage = (e) => recv(e.data); } catch (e) { bc = null; }
    window.addEventListener('storage', (e) => { if (e.key === key && e.newValue) { try { recv(JSON.parse(e.newValue)); } catch (_) {} } });
    window.addEventListener('message', (e) => recv(e.data));
    function send(m) {
      m.__pinv = deckId; m.from = me; m.seq = ++seq; m.ts = Date.now();
      if (bc) { try { bc.postMessage(m); } catch (e) {} }
      try { localStorage.setItem(key, JSON.stringify(m)); } catch (e) {}
      peers.forEach((w) => { try { if (w.closed) peers.delete(w); else w.postMessage(m, '*'); } catch (e) {} });
      if (window.opener && !window.opener.closed) { try { window.opener.postMessage(m, '*'); } catch (e) {} }
    }
    return { send, addPeer: (w) => peers.add(w), id: me };
  };
})();
