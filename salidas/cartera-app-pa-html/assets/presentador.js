/* =========================================================================
   PROINVERSIÓN · Vista del PRESENTADOR (monitor de retorno / laptop)
   ========================================================================= */
(function () {
  'use strict';
  const P0 = window.PINV;
  (P0.cargarDatos ? P0.cargarDatos(window.DECK) : Promise.resolve()).then(principal, principal);
  function principal() {
  const P = window.PINV, DECK = window.DECK;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const st = { i: 0, step: 0, lang: DECK.idiomaInicial || 'es', black: false, ui: {}, t: 0 };
  let built = P.build(DECK, st.lang);
  let audWin = null, lastPing = 0;

  const UI = {
    es: { msg: 'Mensaje clave', guion: 'Guion', cifras: 'Cifras para recordar', q: 'Preguntas probables', puente: 'Puente a la siguiente escena', ctl: 'Controles en pantalla',
      next: 'SIGUIENTE ESCENA', nextStep: 'SIGUIENTE PASO', end: 'FIN DE LA PRESENTACIÓN', open: 'Abrir vista de audiencia', reopen: 'Traer vista de audiencia',
      connOk: 'Vista de audiencia conectada', connNo: 'Vista de audiencia: sin conexión', black: 'Pantalla negra', blackOn: 'Mostrar pantalla',
      start: 'Iniciar', pause: 'Pausar', resume: 'Reanudar', reset: 'Reiniciar', ontime: 'A tiempo', late: 'Atrasado', early: 'Adelantado',
      scene: 'Escena', of: 'de', step: 'paso', noNotes: 'Sin notas para esta escena.', all: 'Todos', sort: 'Ordenar por monto', backup: 'respaldo' },
    en: { msg: 'Key message', guion: 'Talking points', cifras: 'Figures to remember', q: 'Likely questions', puente: 'Bridge to next scene', ctl: 'On-screen controls',
      next: 'NEXT SCENE', nextStep: 'NEXT STEP', end: 'END OF PRESENTATION', open: 'Open audience view', reopen: 'Bring audience view',
      connOk: 'Audience view connected', connNo: 'Audience view: not connected', black: 'Black screen', blackOn: 'Show screen',
      start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset', ontime: 'On time', late: 'Behind', early: 'Ahead',
      scene: 'Scene', of: 'of', step: 'step', noNotes: 'No notes for this scene.', all: 'All', sort: 'Sort by amount', backup: 'backup' }
  };
  const u = () => UI[st.lang];

  /* ---------- Sincronización ---------- */
  const sync = P.Sync(DECK.id, (m) => {
    if (m.role === 'audiencia') lastPing = Date.now();
    if (m.t === 'state') { if ((m.st.t || 0) >= st.t) { Object.assign(st, m.st); onState(false); } }
    else if (m.t === 'hello') publish();
    else if (m.t === 'ui') { st.ui[m.sid] = m.u; previews(); renderControls(); }
  });
  function publish() { sync.send({ t: 'state', role: 'presentador', st: { i: st.i, step: st.step, lang: st.lang, black: st.black, ui: st.ui, t: st.t } }); }
  function go(ns) {
    if (!ns) return;
    const langChanged = ns.lang && ns.lang !== st.lang;
    Object.assign(st, ns); st.t = Date.now();
    if (langChanged) built = P.build(DECK, st.lang);
    publish(); onState(true);
  }

  /* ---------- Previsualizaciones ---------- */
  const fCur = $('#fCur'), fNext = $('#fNext');
  const ready = { cur: false, next: false };
  fCur.addEventListener('load', () => { ready.cur = true; previews(); });
  fNext.addEventListener('load', () => { ready.next = true; previews(); });
  function previews() {
    const n = P.nav.next(st, built);
    if (ready.cur) fCur.contentWindow.postMessage({ pinvPreview: true, i: st.i, step: st.step, lang: st.lang, ui: st.ui }, '*');
    if (ready.next) {
      if (n) fNext.contentWindow.postMessage({ pinvPreview: true, i: n.i, step: n.step, lang: st.lang, ui: st.ui, final: false }, '*');
    }
    $('#nextLbl').textContent = !n ? u().end : n.i === st.i ? u().nextStep : u().next;
    $('#nextName').textContent = n ? title(built[n.i].s) : '';
    $('.pv-next .frame').style.visibility = n ? 'visible' : 'hidden';
  }
  const title = (s) => P.T(s.titulo || s.titulo2 || s.kicker || s.id);

  /* ---------- Notas ---------- */
  function renderNotes() {
    const s = built[st.i].s; const n = (s.notas && (s.notas[st.lang] || s.notas.es)) || null;
    $('#lMsg').textContent = u().msg; $('#lGuion').textContent = u().guion; $('#lCifras').textContent = u().cifras; $('#lQ').textContent = u().q; $('#lPuente').textContent = u().puente; $('#lCtl').textContent = u().ctl;
    if (!n) { $('#nMsg').innerHTML = `<span class="empty">${u().noNotes}</span>`; $('#nGuion').innerHTML = ''; $('#nCifras').innerHTML = ''; $('#nQ').innerHTML = ''; $('#bQ').hidden = true; $('#bPuente').hidden = true; return; }
    $('#nMsg').textContent = n.msj || '';
    $('#nGuion').innerHTML = (n.guion || []).map((g) => `<li>${P.esc(g)}</li>`).join('');
    $('#nCifras').innerHTML = (n.cifras || []).map((c) => `<span>${P.esc(c).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</span>`).join('');
    $('#bQ').hidden = !(n.preguntas && n.preguntas.length);
    $('#nQ').innerHTML = (n.preguntas || []).map(([q, a]) => `<details class="qa"><summary>${P.esc(q)}</summary><p>${P.esc(a)}</p></details>`).join('');
    $('#bPuente').hidden = !n.puente; $('#nPuente').textContent = n.puente || '';
    $('#notes').scrollTop = 0;
  }
  function renderControls() {
    const b = built[st.i], r = P.R[b.s.tipo];
    if (!r || !r.controles) { $('#bCtl').hidden = true; return; }
    P.setLang(st.lang);
    const c = r.controles(b.s), cur = st.ui[b.s.id] || {};
    let h = '';
    if (c.grupos.length > 1) h += `<div class="ctl-row">${c.grupos.map((g, k) => `<button data-k="g" data-v="${k}" class="${(+cur.g || 0) === k ? 'on' : ''}">${P.esc(g)}</button>`).join('')}</div>`;
    h += `<div class="ctl-row"><button data-k="f" data-v="*" class="${!cur.f || cur.f === '*' ? 'on' : ''}">${u().all}</button>${c.sectores.map((k) => `<button data-k="f" data-v="${k}" class="${cur.f === k ? 'on' : ''}">${P.esc(P.T(P.sec(k)))}</button>`).join('')}</div>`;
    h += `<div class="ctl-row"><button data-k="o" data-v="toggle" class="${cur.o === 'monto' ? 'on' : ''}">${u().sort}</button></div>`;
    $('#nCtl').innerHTML = h; $('#bCtl').hidden = false;
  }
  $('#nCtl').addEventListener('click', (e) => {
    const bt = e.target.closest('button'); if (!bt) return;
    const id = built[st.i].s.id, cur = Object.assign({}, st.ui[id] || {});
    if (bt.dataset.k === 'o') cur.o = cur.o === 'monto' ? 'orden' : 'monto';
    else if (bt.dataset.k === 'g') { cur.g = +bt.dataset.v; cur.f = '*'; }
    else cur.f = bt.dataset.v;
    st.ui[id] = cur; sync.send({ t: 'ui', sid: id, u: cur }); st.t = Date.now(); publish();
    renderControls(); previews();
  });

  /* ---------- Mapa de escenas ---------- */
  function renderMap() {
    const caps = DECK.capitulos;
    $('#map').innerHTML = caps.map((c) => {
      const items = built.filter((b) => b.s.capitulo === c.id);
      if (!items.length) return '';
      return `<div class="ch" data-c="${c.id}"><span>${P.esc(P.T(c))}</span><div class="sc">${items.map((b) => `<button data-i="${b.i}" class="${b.s.respaldo ? 'resp' : ''}" title="${P.esc((b.i + 1) + '. ' + title(b.s) + (b.s.respaldo ? ' (' + u().backup + ')' : '') + ' · ' + (b.s.min || 0) + ' min')}">${b.i + 1}</button>`).join('')}</div></div>`;
    }).join('');
  }
  $('#map').addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) go({ i: +b.dataset.i, step: 0 }); });
  function updateMap() {
    $$('#map button').forEach((b) => { const i = +b.dataset.i; b.classList.toggle('cur', i === st.i); b.classList.toggle('done', i < st.i); });
    const cur = built[st.i].s.capitulo;
    $$('#map .ch').forEach((c) => c.classList.toggle('cur', c.dataset.c === cur));
    const btn = $(`#map button[data-i="${st.i}"]`); if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  /* ---------- Estado → interfaz ---------- */
  let lastScene = -1, lastLang = null;
  function onState(local) {
    P.setLang(st.lang);
    if (st.lang !== lastLang) { built = P.build(DECK, st.lang); renderMap(); lastLang = st.lang; lastScene = -1; applyLangUI(); }
    const b = built[st.i];
    if (st.i !== lastScene) { sceneChanged(lastScene, st.i); renderNotes(); renderControls(); lastScene = st.i; }
    $('#curName').textContent = `${st.i + 1}. ${title(b.s)}`;
    $('#stepInfo').innerHTML = b.max > 0 ? Array.from({ length: b.max + 1 }, (_, k) => `<i class="${k <= st.step ? 'on' : ''}"></i>`).join('') : '';
    const cap = P.chapterOf(DECK, b.s);
    $('#where').textContent = `${u().scene} ${st.i + 1} ${u().of} ${built.length} · ${P.T(cap)}${b.s.respaldo ? ' · ' + u().backup : ''}`;
    $$('#lang button').forEach((x) => x.classList.toggle('on', x.dataset.l === st.lang));
    $('#black').classList.toggle('on', st.black);
    $('#black').textContent = st.black ? u().blackOn : u().black;
    updateMap(); previews();
    if (local && !timer.run && !timer.started && st.i > 0) timerStart();
  }
  function applyLangUI() {
    document.documentElement.lang = st.lang;
    $('#deckTitle').textContent = P.T(DECK.titulo);
    $('#openAud').textContent = audWin && !audWin.closed ? u().reopen : u().open;
    $('#tPlay').textContent = timer.run ? u().pause : timer.started ? u().resume : u().start;
    $('#tReset').textContent = u().reset;
    $$('.t-main small')[0].textContent = st.lang === 'es' ? 'Tiempo transcurrido' : 'Elapsed time';
    const sm = $$('.t-grid small'); sm[0].textContent = st.lang === 'es' ? 'Objetivo' : 'Target'; sm[1].textContent = st.lang === 'es' ? 'Restante' : 'Remaining'; sm[2].textContent = st.lang === 'es' ? 'En esta escena' : 'This scene';
  }

  /* ---------- Cronómetro y ritmo ---------- */
  const timer = { run: false, started: false, acc: 0, t0: 0, sceneAcc: 0, sceneT0: 0 };
  const target = (DECK.duracionMin || 30) * 60;
  const plan = built.map((b) => (b.s.respaldo ? 0 : (b.s.min || 0) * 60));
  const now = () => performance.now() / 1000;
  const elapsed = () => timer.acc + (timer.run ? now() - timer.t0 : 0);
  const sceneEl = () => timer.sceneAcc + (timer.run ? now() - timer.sceneT0 : 0);
  function timerStart() { if (timer.run) return; timer.run = true; timer.started = true; timer.t0 = now(); timer.sceneT0 = now(); applyLangUI(); }
  function timerPause() { if (!timer.run) return; timer.acc = elapsed(); timer.sceneAcc = sceneEl(); timer.run = false; applyLangUI(); }
  function sceneChanged() { timer.sceneAcc = 0; timer.sceneT0 = now(); }
  $('#tPlay').addEventListener('click', () => (timer.run ? timerPause() : timerStart()));
  $('#tReset').addEventListener('click', () => { Object.assign(timer, { run: false, started: false, acc: 0, sceneAcc: 0 }); applyLangUI(); tick(); });
  const mmss = (s) => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(x).padStart(2, '0'); };
  function tick() {
    const e = elapsed(), se = sceneEl();
    $('#tElapsed').textContent = mmss(e);
    $('#tTarget').textContent = mmss(target);
    $('#tLeft').textContent = (e > target ? '−' : '') + mmss(Math.abs(target - e));
    const ps = plan[st.i] || 0;
    $('#tScene').textContent = mmss(se) + (ps ? ' / ' + mmss(ps) : '');
    const bar = $('#tSceneBar'); bar.style.width = ps ? Math.min(100, (se / ps) * 100) + '%' : '0%'; bar.classList.toggle('over', ps && se > ps);
    const before = plan.slice(0, st.i).reduce((a, b) => a + b, 0);
    const expected = before + Math.min(se, ps);
    const d = e - expected, pace = $('#pace');
    pace.className = 't-pace';
    if (!timer.started) pace.innerHTML = '<span>—</span>';
    else if (d > 45) { pace.classList.add('late'); pace.innerHTML = `<span>${u().late} +${mmss(d)}</span>`; }
    else if (d < -45) { pace.classList.add('early'); pace.innerHTML = `<span>${u().early} ${mmss(-d)}</span>`; }
    else { pace.classList.add('ok'); pace.innerHTML = `<span>${u().ontime}</span>`; }
    const c = new Date(); $('#clock').textContent = String(c.getHours()).padStart(2, '0') + ':' + String(c.getMinutes()).padStart(2, '0');
    const ok = Date.now() - lastPing < 5000;
    $('#conn').classList.toggle('ok', ok); $('#conn span').textContent = ok ? u().connOk : u().connNo;
  }
  setInterval(tick, 500);

  /* ---------- Abrir vista de audiencia (en la 2.ª pantalla si es posible) ---------- */
  async function openAudience() {
    if (audWin && !audWin.closed) { audWin.focus(); return; }
    let feat = 'popup=yes,width=1280,height=720';
    try {
      if ('getScreenDetails' in window) {
        const sd = await window.getScreenDetails();
        const ext = sd.screens.find((s) => s !== sd.currentScreen) || null;
        if (ext) feat = `popup=yes,left=${ext.availLeft},top=${ext.availTop},width=${ext.availWidth},height=${ext.availHeight}`;
      }
    } catch (e) { /* permiso denegado: se abre como ventana normal */ }
    audWin = window.open('audiencia.html?lang=' + st.lang + '&escena=' + (st.i + 1), 'pinv_aud_' + DECK.id, feat);
    if (audWin) { sync.addPeer(audWin); setTimeout(publish, 900); setTimeout(publish, 2500); }
    applyLangUI();
  }
  $('#openAud').addEventListener('click', () => { openAudience(); });

  /* ---------- Controles ---------- */
  const next = () => go(P.nav.next(st, built));
  const prev = () => go(P.nav.prev(st, built));
  $('#next').addEventListener('click', next); $('#prev').addEventListener('click', prev);
  $$('#lang button').forEach((b) => b.addEventListener('click', () => { if (b.dataset.l !== st.lang) go({ lang: b.dataset.l }); }));
  $('#black').addEventListener('click', () => go({ black: !st.black }));
  let fs = parseFloat(localStorage.getItem('pinv-fs') || '21');
  const setFs = (v) => { fs = Math.max(15, Math.min(34, v)); document.documentElement.style.setProperty('--fs', fs + 'px'); try { localStorage.setItem('pinv-fs', fs); } catch (e) {} };
  setFs(fs);
  $('#fsMinus').addEventListener('click', () => setFs(fs - 2)); $('#fsPlus').addEventListener('click', () => setFs(fs + 2));
  addEventListener('keydown', (e) => {
    if (e.target.closest('input,textarea')) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown', 'n'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp', 'p'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'l' || k === 'L') go({ lang: st.lang === 'es' ? 'en' : 'es' });
    else if (k === 'b' || k === 'B' || k === '.') go({ black: !st.black });
    else if (k === 'Home') go({ i: 0, step: 0 });
    else if (k === 't' || k === 'T') (timer.run ? timerPause() : timerStart());
  });

  /* ---------- Ayuda inicial ---------- */
  const help = $('#help');
  const noHelp = new URLSearchParams(location.search).has('qa');
  try { if (!noHelp && !sessionStorage.getItem('pinv-help')) help.classList.add('on'); } catch (e) { if (!noHelp) help.classList.add('on'); }
  const qEsc = parseInt(new URLSearchParams(location.search).get('escena'), 10);
  if (qEsc > 1) setTimeout(() => go({ i: Math.min(built.length, qEsc) - 1, step: 0 }), 50);
  $('#helpOk').addEventListener('click', () => { help.classList.remove('on'); try { sessionStorage.setItem('pinv-help', 1); } catch (e) {} });

  /* ---------- Origen de los datos (Excel) ---------- */
  const dEl = $('#datos');
  function pintarDatos() {
    if (!dEl || !P.datos) return;
    const d = P.datos, n = d.avisos.length;
    let fecha = '';
    if (d.fecha) { const f = new Date(d.fecha); if (!isNaN(f)) fecha = ' · ' + f.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + f.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }); }
    dEl.textContent = 'Datos: ' + d.fuente + fecha + (n ? ' · ⚠ ' + n + (n === 1 ? ' aviso' : ' avisos') : '');
    dEl.className = 'datos-badge' + (n ? ' warn' : d.fuente === 'contenido.js' ? '' : ' ok');
    dEl.title = n ? d.avisos.join('\n') : (d.fuente === 'contenido.js' ? 'Sin Excel de datos: se usa el contenido original.' : 'Cifras cargadas desde el Excel de datos.');
    dEl.onclick = n ? () => alert('Avisos al leer los datos:\n\n• ' + d.avisos.join('\n• ')) : null;
  }
  pintarDatos();

  /* «Cargar Excel»: elegir datos.xlsx (OneDrive, USB, carpeta local). Actualiza ambas vistas al instante y queda recordado en este navegador. */
  const inp = $('#excelInput');
  $('#cargarExcel').addEventListener('click', () => inp.click());
  inp.addEventListener('change', async () => {
    const archivo = inp.files && inp.files[0]; inp.value = ''; if (!archivo) return;
    const btn = $('#cargarExcel'); btn.disabled = true; btn.textContent = 'Leyendo…';
    try {
      const pack = await P.leerExcelElegido(archivo);
      const d = P.aplicarHojas(DECK, pack.hojas, pack.nombre + ' (cargado)', pack.fecha);
      const recordado = P.recordarExcel(DECK, pack);
      built = P.build(DECK, st.lang); renderMap(); lastScene = -1;
      if (st.i >= built.length) st.i = built.length - 1;
      onState(false); pintarDatos();
      sync.send({ t: 'datos', pack });
      [fCur, fNext].forEach((fr) => { try { fr.contentWindow.postMessage({ pinvDatos: pack }, '*'); } catch (e) {} });
      setTimeout(previews, 400);
      const n = d.avisos.length;
      alert('Excel cargado: ' + archivo.name + '\n\nLas cifras se actualizaron en la vista del presentador y en la de la audiencia.' + (recordado ? '\nQuedará recordado en este navegador para las próximas aperturas.' : '') + (n ? '\n\n⚠ ' + n + (n === 1 ? ' aviso' : ' avisos') + ':\n• ' + d.avisos.slice(0, 8).join('\n• ') + (n > 8 ? '\n…' : '') : ''));
    } catch (e) { alert('No se pudo cargar el Excel: ' + e.message); }
    finally { btn.disabled = false; btn.textContent = 'Cargar Excel'; }
  });
  /* ---------- Arranque ---------- */
  onState(false); tick();
  sync.send({ t: 'hello', role: 'presentador' });
  }
})();
