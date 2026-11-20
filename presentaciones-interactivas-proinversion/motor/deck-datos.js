/* =========================================================================
   PROINVERSIÓN · Capa de datos: la presentación lee sus cifras desde datos.xlsx
   Prioridad: datos.xlsx (servido desde un servidor web) > datos.js (exportado del Excel para USB/sin servidor) > contenido.js
   Sin librerías externas: el .xlsx (un ZIP de XML) se descomprime con DecompressionStream del navegador.
   ========================================================================= */
(function () {
  'use strict';
  const P = (window.PINV = window.PINV || {});

  /* ---------- Lector mínimo de .xlsx ---------- */
  async function inflar(u8) {
    const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(s).arrayBuffer());
  }
  function abrirZip(buf) {
    const dv = new DataView(buf), u8 = new Uint8Array(buf), td = new TextDecoder();
    let e = buf.byteLength - 22;
    while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error('el archivo no es un libro de Excel válido (.xlsx)');
    const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true); const files = {};
    for (let i = 0; i < n; i++) {
      if (dv.getUint32(p, true) !== 0x02014b50) break;
      const metodo = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true);
      const nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      const nombre = td.decode(u8.subarray(p + 46, p + 46 + nl));
      const ini = off + 30 + dv.getUint16(off + 26, true) + dv.getUint16(off + 28, true);
      files[nombre] = { metodo, datos: u8.subarray(ini, ini + csize) };
      p += 46 + nl + xl + cl;
    }
    return { async texto(nombre) { const f = files[nombre]; if (!f) return null; return td.decode(f.metodo === 0 ? f.datos : await inflar(f.datos)); } };
  }
  const colIdx = (ref) => { let n = 0; for (const ch of ref.replace(/\d+/g, '')) n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; };
  P.leerXlsx = async function (buf) {
    const z = abrirZip(buf), dp = new DOMParser(), X = (s) => dp.parseFromString(s, 'application/xml');
    const wb = X(await z.texto('xl/workbook.xml'));
    const rels = X(await z.texto('xl/_rels/workbook.xml.rels'));
    const relMap = {}; [...rels.getElementsByTagName('Relationship')].forEach((r) => (relMap[r.getAttribute('Id')] = r.getAttribute('Target')));
    const ssx = await z.texto('xl/sharedStrings.xml');
    const ss = ssx ? [...X(ssx).getElementsByTagName('si')].map((si) => [...si.childNodes].filter((n) => n.nodeName === 't' || n.nodeName === 'r').map((n) => (n.nodeName === 't' ? n.textContent : [...n.getElementsByTagName('t')].map((t) => t.textContent).join(''))).join('')) : [];
    const hojas = {};
    for (const sh of wb.getElementsByTagName('sheet')) {
      const rid = sh.getAttribute('r:id') || sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
      let t = relMap[rid]; if (!t) continue;
      t = t.replace(/^\//, ''); if (!t.startsWith('xl/')) t = 'xl/' + t;
      const x = await z.texto(t); if (!x) continue;
      const filas = [];
      for (const r of X(x).getElementsByTagName('row')) {
        const fila = (filas[+r.getAttribute('r') - 1] = []);
        for (const c of r.getElementsByTagName('c')) {
          const ty = c.getAttribute('t'), v = c.getElementsByTagName('v')[0];
          let val = null;
          if (ty === 's') val = v ? ss[+v.textContent] : null;
          else if (ty === 'inlineStr') val = [...c.getElementsByTagName('t')].map((q) => q.textContent).join('');
          else if (ty === 'b') val = v ? v.textContent === '1' : null;
          else if (ty === 'str' || ty === 'e') val = v ? v.textContent : null;
          else val = v ? Number(v.textContent) : null;
          fila[colIdx(c.getAttribute('r'))] = val;
        }
      }
      hojas[sh.getAttribute('name')] = filas;
    }
    return hojas;
  };

  /* ---------- Utilidades ---------- */
  const vacio = (v) => v === null || v === undefined || String(v).trim() === '';
  const txt = (v) => (vacio(v) ? '' : String(v).trim());
  const num = (v) => { if (typeof v === 'number') return v; if (vacio(v)) return NaN; return Number(String(v).replace(/\s| /g, '').replace(/,/g, '')); };
  const bi = (es, en) => { es = txt(es); en = txt(en) || es; return es === en ? es : { es, en }; };
  const lineas = (v) => txt(v).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  function objetos(filas) {
    if (!filas || !filas.length) return [];
    const h = (filas[0] || []).map((x) => txt(x));
    const out = [];
    for (let i = 1; i < filas.length; i++) {
      const r = filas[i]; if (!r || !r.some((v) => !vacio(v))) continue;
      const o = { _fila: i + 1 }; h.forEach((k, j) => { if (k) o[k] = r[j] === undefined ? null : r[j]; }); out.push(o);
    }
    return out;
  }
  /* Trimestres: 'IV-2026', 'IV.T.26', 'IV trim. 2026', 'Q4 2026' -> 'IV-26'; los años quedan como '2029' */
  const ROM = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' };
  function normQ(v) {
    if (vacio(v)) return undefined;
    if (typeof v === 'number') return String(v);
    const s = txt(v); if (/^\d{4}$/.test(s)) return s; if (/^[-–—]$/.test(s)) return undefined;
    let m = /^(I{1,3}|IV)[\s.\-]*(?:T|TRIM\.?|Q)?[\s.\-]*(\d{2,4})$/i.exec(s);
    if (m) return m[1].toUpperCase() + '-' + m[2].slice(-2);
    m = /^Q([1-4])[\s.\-]*(\d{2,4})$/i.exec(s);
    if (m) return ROM[m[1]] + '-' + m[2].slice(-2);
    return s;
  }
  P.normQ = normQ;
  function claveSector(v, avisos, donde) {
    const s = txt(v).toLowerCase(); if (!s) return 'otros';
    for (const [k, d] of Object.entries(P.SECT)) if (k === s || d.es.toLowerCase() === s || d.en.toLowerCase() === s) return k;
    avisos.push(`${donde}: sector desconocido "${v}" (shown as "Otros")`); return 'otros';
  }
  const sinAcento = (s) => txt(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function fijar(raiz, ruta, valor) {
    const seg = ruta.split('.'); let o = raiz;
    for (let i = 0; i < seg.length - 1; i++) { const k = /^\d+$/.test(seg[i]) ? +seg[i] : seg[i]; if (o == null || !(k in Object(o))) return false; o = o[k]; }
    const k = seg[seg.length - 1]; if (o == null || typeof o !== 'object') return false; o[/^\d+$/.test(k) ? +k : k] = valor; return true;
  }
  function leer(raiz, ruta) { return ruta.split('.').reduce((o, k) => (o == null ? undefined : o[/^\d+$/.test(k) ? +k : k]), raiz); }

  /* ---------- Aplicar las hojas al contenido ---------- */
  P.aplicarTablas = function (deck, hojas, avisos) {
    const porId = {}; deck.escenas.forEach((s) => (porId[s.id] = s));
    const H = (n) => objetos(hojas[n]);
    const mostrar = (r) => !/^no$/i.test(txt(r['Mostrar']));

    // 1) Proyectos (listas filtrables y grupos de avances)
    const proy = H('Proyectos').filter(mostrar);
    const listas = {};
    proy.forEach((r) => { const l = txt(r['Lista']); if (l) (listas[l] = listas[l] || []).push(r); });
    Object.entries(listas).forEach(([id, filas]) => {
      const s = porId[id]; if (!s) { avisos.push(`Proyectos: la lista «${id}» no existe en la presentación`); return; }
      const pest = [...new Set(filas.map((r) => txt(r['Pestaña']) || 'Proyectos'))];
      if (s.tipo === 'explorador') {
        const viejos = s.grupos || [];
        s.grupos = pest.map((pn) => {
          const old = viejos.find((g) => sinAcento(typeof g.t === 'object' ? g.t.es : g.t) === sinAcento(pn));
          return {
            t: old ? old.t : (sinAcento(pn) === 'adendas' ? { es: 'Adendas', en: 'Addenda' } : sinAcento(pn) === 'proyectos' ? { es: 'Proyectos', en: 'Projects' } : pn),
            meta: old ? old.meta : undefined,
            filas: filas.filter((r) => (txt(r['Pestaña']) || 'Proyectos') === pn).map((r) => {
              const m = num(r['Monto (USD millones)']);
              if (isNaN(m)) avisos.push(`Proyectos fila ${r._fila}: monto no válido ("${r['Monto (USD millones)']}")`);
              if (!txt(r['Proyecto ES'])) avisos.push(`Proyectos fila ${r._fila}: falta el nombre del proyecto`);
              const tag = txt(r['Etiqueta ES']) ? bi(r['Etiqueta ES'], r['Etiqueta EN']) : undefined;
              return { n: txt(r['N°']), s: claveSector(r['Sector'], avisos, `Proyectos fila ${r._fila}`), p: bi(r['Proyecto ES'], r['Proyecto EN']), e: txt(r['EPTP']), ad: normQ(r['Adjudicación directa']), q: normQ(r['Adjudicación concurso / año']), m: isNaN(m) ? 0 : m, tag };
            })
          };
        });
      } else if (s.tipo === 'avances') {
        pest.forEach((pn) => {
          const g = s.grupos.find((x) => sinAcento(typeof x.t === 'object' ? x.t.es : x.t) === sinAcento(pn));
          if (!g) { avisos.push(`Proyectos: el grupo «${pn}» no existe en «${id}»`); return; }
          g.items = filas.filter((r) => txt(r['Pestaña']) === pn).map((r) => [claveSector(r['Sector'], avisos, `Proyectos fila ${r._fila}`), bi(r['Proyecto ES'], r['Proyecto EN']), num(r['Monto (USD millones)']) || 0]);
        });
      }
    });

    // 2) Resúmenes por sector (barras y adendas de las escenas de horizonte)
    const sec = H('Sectores').filter(mostrar);
    const porEsc = {}; sec.forEach((r) => { const e = txt(r['Escena']); if (e) (porEsc[e] = porEsc[e] || []).push(r); });
    Object.entries(porEsc).forEach(([id, filas]) => {
      const s = porId[id]; if (!s) { avisos.push(`Sectores: la escena «${id}» no existe`); return; }
      const fila = (r) => ({ s: claveSector(r['Sector'], avisos, `Sectores fila ${r._fila}`), v: num(r['Monto (USD millones)']) || 0, n: bi(r['Etiqueta ES'], r['Etiqueta EN']) });
      s.barras = filas.filter((r) => !/adenda/i.test(txt(r['Tipo']))).map(fila).filter((b) => b.v > 0).sort((a, b) => b.v - a.v);
      const ad = filas.filter((r) => /adenda/i.test(txt(r['Tipo']))).map(fila).filter((b) => b.v > 0).sort((a, b) => b.v - a.v);
      if (ad.length) s.adendas = { t: (s.adendas && s.adendas.t) || { es: 'Adendas', en: 'Addenda' }, l: ad.map((b) => [b.s, b.v]) };
      else delete s.adendas;
    });

    // 3) Series por sector (columnas apiladas)
    const sps = H('Series por sector'); const spsE = {};
    sps.forEach((r) => { const e = txt(r['Escena']); if (e) (spsE[e] = spsE[e] || []).push(r); });
    Object.entries(spsE).forEach(([id, filas]) => {
      const s = porId[id]; if (!s) return;
      const anios = {};
      filas.forEach((r) => { const a = num(r['Año']); const v = num(r['Monto (USD millones)']); if (isNaN(a) || isNaN(v) || v === 0) return; (anios[a] = anios[a] || []).push([claveSector(r['Sector'], avisos, `Series por sector fila ${r._fila}`), v]); });
      s.anios = Object.keys(anios).map(Number).sort((a, b) => a - b).map((a) => ({ anio: a, seg: anios[a], total: Math.round(anios[a].reduce((t, x) => t + x[1], 0)) }));
    });

    // 4) Series anuales y distribución (Obras por Impuestos)
    const sa = H('Series anuales'); const saE = {};
    sa.forEach((r) => { const e = txt(r['Escena']); if (e) (saE[e] = saE[e] || []).push(r); });
    Object.entries(saE).forEach(([id, filas]) => { const s = porId[id]; if (!s) return; s.serie = filas.map((r) => [num(r['Año']), num(r['Monto']) || 0, num(r['Cantidad']) || 0]).filter((x) => !isNaN(x[0])).sort((a, b) => a[0] - b[0]); });
    const di = H('Distribución'); const diE = {};
    di.forEach((r) => { const e = txt(r['Escena']); if (e) (diE[e] = diE[e] || []).push(r); });
    Object.entries(diE).forEach(([id, filas]) => { const s = porId[id]; if (!s) return; s.funciones = filas.map((r) => ({ t: bi(r['Categoría ES'], r['Categoría EN']), v: num(r['Monto']) || 0, c: txt(r['Color']) || '#8A8F98' })).filter((f) => f.v > 0); });

    // 5) Cifras y textos sueltos (al final: pueden apuntar a grupos reconstruidos arriba)
    H('Cifras').forEach((r) => {
      const ruta = txt(r['Ruta']); if (!ruta) return;
      const [id, ...resto] = ruta.split('.'); const raiz = id === '_deck' ? deck : porId[id];
      if (!raiz) { avisos.push(`Cifras fila ${r._fila}: la escena «${id}» no existe`); return; }
      const sub = resto.join('.'), tipo = sinAcento(r['Tipo']);
      let val;
      if (tipo.startsWith('texto')) { if (vacio(r['Texto ES'])) return; val = bi(r['Texto ES'], r['Texto EN']); }
      else if (tipo.startsWith('lista')) { val = txt(r['Texto ES']).split(/[,;\s]+/).map((x) => x.trim().toLowerCase()).filter(Boolean); }
      else { if (vacio(r['Valor'])) return; val = num(r['Valor']); if (isNaN(val)) { avisos.push(`Cifras fila ${r._fila}: "${r['Valor']}" no es un número`); return; } }
      if (leer(raiz, sub) === undefined && !/\.meta$/.test(sub)) { avisos.push(`Cifras fila ${r._fila}: no se encontró la ruta «${ruta}»`); return; }
      if (!fijar(raiz, sub, val)) avisos.push(`Cifras fila ${r._fila}: no se pudo actualizar «${ruta}»`);
    });

    // 6) Notas del presentador
    H('Notas').forEach((r) => {
      const s = porId[txt(r['Escena'])]; if (!s) return;
      const nota = (L) => {
        const n = { msj: txt(r['Mensaje ' + L]), guion: lineas(r['Guion ' + L]), cifras: lineas(r['Cifras ' + L]), preguntas: lineas(r['Preguntas ' + L]).map((l) => l.split('||').map((x) => x.trim())).map(([q, a]) => [q, a || '']), puente: txt(r['Puente ' + L]) };
        return n.msj || n.guion.length || n.cifras.length || n.preguntas.length || n.puente ? n : null;
      };
      const es = nota('ES'), en = nota('EN');
      if (es || en) s.notas = { es: es || en, en: en || es }; else delete s.notas;
    });
  };

  /* ---------- Carga ----------
     Orden de prioridad:
       1) datos.xlsx servido por http/https (servidor web)
       2) el Excel más reciente entre: el elegido con «Cargar Excel» (recordado en este navegador) y datos.js
       3) contenido.js
     Todo se aplica sobre una copia del contenido ORIGINAL (P.deckBase): recargar otro Excel no acumula cambios. */
  const CLAVE = (deck) => 'pinv-excel:' + deck.id;
  const fechaMs = (f) => { const d = f ? new Date(f) : null; return d && !isNaN(d) ? d.getTime() : 0; };
  P.datos = { fuente: 'contenido.js', fecha: null, avisos: [] };
  P.aplicarHojas = function (deck, hojas, fuente, fecha) {
    const avisos = [];
    if (!P.deckBase) P.deckBase = JSON.parse(JSON.stringify(deck));
    const copia = JSON.parse(JSON.stringify(P.deckBase));
    try { P.aplicarTablas(copia, hojas, avisos); Object.keys(copia).forEach((k) => (deck[k] = copia[k])); }
    catch (e) { avisos.push('No se pudieron aplicar los datos del Excel (' + e.message + '). Se muestra el contenido anterior.'); return (P.datos = { fuente: P.datos.fuente, fecha: P.datos.fecha, avisos }); }
    P.datos = { fuente, fecha, avisos };
    if (avisos.length && window.console) console.warn('[PROINVERSIÓN] Avisos de datos:\n- ' + avisos.join('\n- '));
    return P.datos;
  };
  P.leerExcelElegido = async function (archivo) {
    if (!('DecompressionStream' in window)) throw new Error('este navegador no puede leer Excel; use Chrome o Edge actualizados');
    const hojas = await P.leerXlsx(await archivo.arrayBuffer());
    if (!hojas['Cifras'] && !hojas['Proyectos']) throw new Error('el archivo no tiene las hojas del Excel de datos (Cifras, Proyectos…)');
    return { hojas, fecha: new Date(archivo.lastModified || Date.now()).toISOString(), nombre: archivo.name };
  };
  P.recordarExcel = function (deck, pack) { try { localStorage.setItem(CLAVE(deck), JSON.stringify(pack)); return true; } catch (e) { return false; } };
  P.olvidarExcel = function (deck) { try { localStorage.removeItem(CLAVE(deck)); } catch (e) {} };
  P.cargarDatos = async function (deck) {
    P.deckBase = JSON.parse(JSON.stringify(deck));
    const avisos = []; let hojas = null, fuente = 'contenido.js', fecha = null;
    if (/^https?:$/.test(location.protocol) && 'DecompressionStream' in window) {
      try {
        const r = await fetch('datos.xlsx', { cache: 'no-store' });
        if (r.ok) { hojas = await P.leerXlsx(await r.arrayBuffer()); fuente = 'datos.xlsx'; fecha = r.headers.get('Last-Modified'); }
      } catch (e) { avisos.push('No se pudo leer datos.xlsx del servidor (' + e.message + ').'); }
    }
    if (!hojas) {
      let local = null; try { local = JSON.parse(localStorage.getItem(CLAVE(deck)) || 'null'); } catch (e) {}
      const js = window.DATOS_EXCEL && window.DATOS_EXCEL.hojas ? window.DATOS_EXCEL : null;
      if (local && local.hojas && (!js || fechaMs(local.fecha) >= fechaMs(js.generado))) { hojas = local.hojas; fuente = (local.nombre || 'Excel') + ' (cargado)'; fecha = local.fecha; }
      else if (js) { hojas = js.hojas; fuente = 'datos.js'; fecha = js.generado || null; }
    }
    if (hojas) { P.aplicarHojas(deck, hojas, fuente, fecha); P.datos.avisos = avisos.concat(P.datos.avisos); }
    else P.datos = { fuente, fecha, avisos };
    return P.datos;
  };
})();