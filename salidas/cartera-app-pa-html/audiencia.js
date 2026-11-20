/* =========================================================================
   PROINVERSIÓN · Vista de AUDIENCIA (pantalla gigante / proyector)
   Escenario fijo 1920×1080 escalado a cualquier pantalla.
   ========================================================================= */
(function () {
  'use strict';
  const P = window.PINV, DECK = window.DECK;
  const qs = new URLSearchParams(location.search);
  const PREVIEW = qs.get('vista') === 'preview';
  const stage = document.getElementById('stage');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const QA = qs.has('qa') || qs.has('pdf'); // capturas de control de calidad y PDF por consola: sin animaciones
  if (QA) document.documentElement.classList.add('qa');
  const reduce = QA || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  let built = [];
  const st = { i: 0, step: 0, lang: qs.get('lang') || DECK.idiomaInicial || 'es', black: false, ui: {}, t: 0 };
  let busy = null;
  document.body.classList.toggle('preview', PREVIEW);

  /* ---------- Escalado ---------- */
  // Se mide el área visible real (clientWidth/Height): en celulares innerWidth puede venir "alejado" y recortar la escena.
  const TACTIL = !PREVIEW && window.matchMedia && matchMedia('(hover: none) and (pointer: coarse)').matches;
  function fit() {
    const de = document.documentElement;
    const W = de.clientWidth || innerWidth, H = de.clientHeight || innerHeight;
    const vertical = H > W * 1.05;
    // En celular vertical se deja aire abajo para la barra táctil, sin achicar la escena (ocupa todo el ancho)
    const k = Math.min(W / 1920, H / 1080);
    stage.style.transform = `translate(-50%,-50%) scale(${k})`;
    de.style.setProperty('--sh', Math.round(1080 * k) + 'px');
    document.body.classList.toggle('vertical', vertical);
  }
  addEventListener('resize', fit);
  addEventListener('orientationchange', () => setTimeout(fit, 120));
  if (window.visualViewport) visualViewport.addEventListener('resize', fit);
  fit();

  /* ---------- Render ---------- */
  const sceneEl = (i) => stage.children[i];
  function render() {
    P.setLang(st.lang);
    document.documentElement.lang = st.lang;
    built = P.build(DECK, st.lang);
    stage.innerHTML = built.map((b) => `<section class="scene t-${b.s.tipo} ${b.dark ? 'dark' : 'light'}" data-i="${b.i}" data-id="${b.s.id}" aria-hidden="true">${b.html}</section>`).join('') + '<div id="wipe"></div>';
    $$('[data-d]', stage).forEach((e) => e.style.setProperty('--d', e.dataset.d + 'ms'));
    built.forEach((b) => applyUI(b.i));
    document.title = P.T(DECK.titulo) + ' · PROINVERSIÓN';
    updateChrome();
  }

  /* ---------- Pasos y contadores ---------- */
  function countUp(el) {
    if (reduce || PREVIEW) return;
    const to = parseFloat(el.dataset.to), dec = +el.dataset.dec || 0;
    if (!isFinite(to)) return;
    const host = el.closest('[data-rv]');
    const delay = (host ? parseFloat(getComputedStyle(host).getPropertyValue('--d')) || 0 : 0) + 150;
    const dur = Math.min(2200, 1100 + Math.log10(Math.abs(to) + 1) * 250);
    el.textContent = P.fmt(0, dec);
    const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
      el.textContent = P.fmt(to * e, dec);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = P.fmt(to, dec);
    };
    requestAnimationFrame(tick);
  }
  function setStep(sec, k, animate) {
    if (!sec) return;
    if (!animate) stage.classList.add('instant');
    sec.dataset.s = k;
    $$('[data-rv]', sec).forEach((el) => {
      const want = +el.dataset.step <= k, has = el.classList.contains('in');
      if (want && !has) {
        el.classList.add('in');
        if (animate) $$('.num', el).filter((n) => n.closest('[data-rv]') === el).forEach(countUp);
      } else if (!want && has) el.classList.remove('in');
    });
    $$('[data-on]', sec).forEach((el) => el.classList.toggle('on', +el.dataset.on === k));
    if (!animate) { void sec.offsetWidth; requestAnimationFrame(() => stage.classList.remove('instant')); }
  }
  function resetScene(sec) { stage.classList.add('instant'); $$('[data-rv].in', sec).forEach((e) => e.classList.remove('in')); void sec.offsetWidth; stage.classList.remove('instant'); }

  /* ---------- Transiciones narrativas ---------- */
  const EASE = 'cubic-bezier(.65,0,.35,1)';
  function transition(oldEl, newEl, type, dir, done) {
    const fwd = dir >= 0;
    newEl.classList.add('active'); newEl.setAttribute('aria-hidden', 'false');
    if (oldEl) { oldEl.classList.add('leaving'); oldEl.setAttribute('aria-hidden', 'true'); }
    let closed = false;
    const finish = () => { if (closed) return; closed = true; if (oldEl) oldEl.classList.remove('active', 'leaving'); newEl.style.visibility = ''; stage.classList.remove('wiping'); done && done(); };
    if (!oldEl || reduce || PREVIEW) { finish(); return; }
    setTimeout(finish, 1700); // respaldo: si la ventana está en segundo plano el navegador pausa las animaciones
    const anim = (el, kf, o) => el.animate(kf, Object.assign({ duration: 800, easing: EASE, fill: 'both' }, o));
    let a, b;
    switch (type) {
      case 'cortina': { // barrido diagonal rojo de la marca
        const w = $('#wipe');
        stage.classList.add('wiping');
        newEl.style.visibility = 'hidden';
        const wa = anim(w, [{ transform: `translateX(${fwd ? '-130%' : '130%'}) skewX(-18deg)` }, { transform: 'translateX(0) skewX(-18deg)' }, { transform: `translateX(${fwd ? '130%' : '-130%'}) skewX(-18deg)` }], { duration: 1100, easing: 'cubic-bezier(.7,0,.3,1)' });
        setTimeout(() => { newEl.style.visibility = ''; oldEl.classList.remove('active'); }, 520);
        wa.finished.then(() => { wa.cancel(); finish(); });
        return;
      }
      case 'empuje':
        a = anim(oldEl, [{ transform: 'translateX(0)' }, { transform: `translateX(${fwd ? -100 : 100}%)` }], { duration: 900 });
        b = anim(newEl, [{ transform: `translateX(${fwd ? 100 : -100}%)` }, { transform: 'translateX(0)' }], { duration: 900 });
        break;
      case 'zoom':
        a = anim(oldEl, [{ transform: 'scale(1)', opacity: 1 }, { transform: `scale(${fwd ? 1.18 : 0.86})`, opacity: 0 }], { duration: 650 });
        b = anim(newEl, [{ transform: `scale(${fwd ? 0.9 : 1.12})`, opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 850, delay: 150 });
        break;
      case 'profundidad':
        a = anim(oldEl, [{ transform: 'scale(1)', opacity: 1, filter: 'blur(0)' }, { transform: 'scale(.88)', opacity: 0, filter: 'blur(8px)' }], { duration: 700 });
        b = anim(newEl, [{ transform: 'scale(1.06)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 900, delay: 200 });
        break;
      case 'subir':
        a = anim(oldEl, [{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${fwd ? -12 : 12}%)`, opacity: 0 }], { duration: 750 });
        b = anim(newEl, [{ transform: `translateY(${fwd ? 14 : -14}%)`, opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 900, delay: 100 });
        break;
      default: // fundido
        a = anim(oldEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 500 });
        b = anim(newEl, [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 750, delay: 150 });
    }
    Promise.all([a.finished, b.finished]).then(() => { a.cancel(); b.cancel(); finish(); });
  }

  function show(i, step, animate) {
    const oldI = st.i, oldEl = stage.querySelector('.scene.active'), newEl = sceneEl(i);
    if (!newEl) return;
    if (oldEl === newEl) { setStep(newEl, step, animate); return; }
    const s = built[i].s;
    const type = s.transicion || (s.tipo === 'capitulo' ? 'cortina' : 'fundido');
    resetScene(newEl);
    const dir = i >= oldI ? 1 : -1;
    if (busy) { clearTimeout(busy); }
    transition(animate ? oldEl : null, newEl, type, dir);
    if (!animate && oldEl) { oldEl.classList.remove('active', 'leaving'); oldEl.setAttribute('aria-hidden', 'true'); }
    const delay = !animate ? 0 : type === 'cortina' ? 650 : type === 'empuje' ? 380 : 260;
    if (delay) { setStep(newEl, -1, false); busy = setTimeout(() => setStep(newEl, step, true), delay); }
    else setStep(newEl, step, animate);
    prep(i + 1);
  }
  function prep(i) { $$('.scene.prep', stage).forEach((e) => e.classList.remove('prep')); const n = sceneEl(i); if (n && !n.classList.contains('active')) n.classList.add('prep'); }

  /* ---------- Estado ---------- */
  function apply(ns, animate = true) {
    let rer = false;
    if (ns.lang && ns.lang !== st.lang) { st.lang = ns.lang; rer = true; }
    if (ns.ui) st.ui = ns.ui;
    if (rer) {
      const keep = { i: ns.i != null ? ns.i : st.i, step: ns.step != null ? ns.step : st.step };
      stage.classList.add('swap');
      setTimeout(() => {
        render();
        const el = sceneEl(keep.i); el.classList.add('active'); el.setAttribute('aria-hidden', 'false');
        setStep(el, keep.step, false); prep(keep.i + 1);
        st.i = keep.i; st.step = keep.step;
        stage.classList.remove('swap'); updateChrome();
      }, PREVIEW ? 0 : 180);
    } else {
      if (ns.i != null && (ns.i !== st.i || ns.step !== st.step || !stage.querySelector('.scene.active'))) show(ns.i, ns.step, animate);
      if (ns.i != null) { st.i = ns.i; st.step = ns.step; }
      built.forEach((b) => applyUI(b.i));
    }
    if (ns.black != null) { st.black = ns.black; document.body.classList.toggle('black', st.black); }
    updateChrome();
  }
  function applyUI(i) {
    const b = built[i]; if (!b) return; const r = P.R[b.s.tipo];
    if (r && r.ui) { P.setLang(st.lang); r.ui(sceneEl(i), st.ui[b.s.id] || {}, b.s); }
  }

  /* ---------- Sincronización ---------- */
  let listo = false, previewPendiente = null; // true cuando los datos (Excel) ya se cargaron y se dibujó la presentación
  const sync = PREVIEW || qs.has('pdf') ? null : P.Sync(DECK.id, (m) => {
    if (!listo) return;
    if (m.t === 'state') { if ((m.st.t || 0) >= st.t) { st.t = m.st.t || 0; apply(m.st, true); } }
    else if (m.t === 'hello') publish();
    else if (m.t === 'datos' && m.pack) recibirDatos(m.pack);
    else if (m.t === 'ui') { st.ui[m.sid] = m.u; applyUI(built.findIndex((b) => b.s.id === m.sid)); }
  });
  function publish() { if (sync) sync.send({ t: 'state', role: 'audiencia', st: { i: st.i, step: st.step, lang: st.lang, black: st.black, ui: st.ui, t: st.t } }); }
  function go(ns) { if (!ns || !listo) return; st.t = Date.now(); apply(ns, true); publish(); }
  if (sync) setInterval(() => sync.send({ t: 'ping', role: 'audiencia', i: st.i, step: st.step }), 2000);

  /* ---------- Navegación ---------- */
  const next = () => go(P.nav.next(st, built));
  const prev = () => go(P.nav.prev(st, built));
  const goto = (i, step = 0) => go({ i: Math.max(0, Math.min(built.length - 1, i)), step });
  const toggleLang = () => go({ i: st.i, step: st.step, lang: st.lang === 'es' ? 'en' : 'es' });
  const toggleBlack = () => go({ i: st.i, step: st.step, black: !st.black });
  function fullscreen() {
    const d = document, de = d.documentElement;
    const pedir = de.requestFullscreen || de.webkitRequestFullscreen;
    if (!(d.fullscreenElement || d.webkitFullscreenElement)) {
      if (!pedir) return;                                   // iPhone: Safari no permite pantalla completa en páginas web
      Promise.resolve(pedir.call(de)).then(() => {
        // En celulares (Android) se fija la orientación horizontal mientras dure la pantalla completa
        if (TACTIL && screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {});
      }).catch(() => {});
    } else (d.exitFullscreen || d.webkitExitFullscreen || (() => {})).call(d);
  }

  /* Interacción dentro de escenas (filtros, pestañas, pasos clicables) */
  stage.addEventListener('click', (e) => {
    const u = e.target.closest('[data-ui]');
    if (u) {
      const sec = u.closest('.scene'); const b = built[+sec.dataset.i]; const id = b.s.id;
      const [k, v] = u.dataset.ui.split(':');
      const cur = Object.assign({}, st.ui[id] || {});
      if (k === 'o') cur.o = cur.o === 'monto' ? 'orden' : 'monto';
      else if (k === 'g') { cur.g = +v; cur.f = '*'; }
      else cur[k] = v;
      st.ui[id] = cur; applyUI(b.i);
      if (sync) sync.send({ t: 'ui', sid: id, u: cur });
      return;
    }
    const g = e.target.closest('[data-goto-step]');
    if (g) { const sec = g.closest('.scene'); go({ i: +sec.dataset.i, step: +g.dataset.gotoStep }); }
  });

  /* ---------- Teclado (compatible con presentadores/clickers) ---------- */
  let num = '';
  addEventListener('keydown', (e) => {
    if (PREVIEW || e.target.closest('input,textarea')) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown', 'n', 'N'].includes(k)) {
      if (k === 'Enter' && num) { goto(+num - 1); num = ''; e.preventDefault(); return; }
      e.preventDefault(); next();
    } else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp', 'p', 'P'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') goto(0);
    else if (k === 'End') goto(built.length - 1);
    else if (k === 'l' || k === 'L') toggleLang();
    else if (k === 'b' || k === 'B' || k === '.') toggleBlack();
    else if (k === 'f' || k === 'F' || k === 'F5') { e.preventDefault(); fullscreen(); }
    else if (k === 'o' || k === 'O' || k === 'g' || k === 'G') toggleOverview();
    else if (k === 'Escape') closeOverview();
    else if (/^\d$/.test(k)) { num += k; clearTimeout(window.__numT); window.__numT = setTimeout(() => (num = ''), 1500); }
  });
  /* ---------- Táctil: deslizar horizontalmente para avanzar/retroceder ---------- */
  let tx = null, ty = null, t0 = 0;
  addEventListener('touchstart', (e) => {
    if (e.touches.length > 1 || e.target.closest('.topbar,#navm,#overview,#prog')) { tx = null; return; }  // pellizco o controles: no es un deslizamiento
    tx = e.touches[0].clientX; ty = e.touches[0].clientY; t0 = Date.now();
  }, { passive: true });
  addEventListener('touchend', (e) => {
    if (tx == null || PREVIEW || document.body.classList.contains('ov-open')) { tx = null; return; }
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    const umbral = Math.max(40, Math.min(70, (document.documentElement.clientWidth || innerWidth) * 0.08));
    if (Math.abs(dx) > umbral && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - t0 < 900) (dx < 0 ? next : prev)();
    tx = null;
  }, { passive: true });
  addEventListener('touchcancel', () => { tx = null; }, { passive: true });

  /* ---------- Interfaz: idioma, progreso, pantalla completa ---------- */
  function updateChrome() {
    if (PREVIEW || !built.length) return;
    $$('#lang button').forEach((b) => b.classList.toggle('on', b.dataset.l === st.lang));
    const prog = $('#prog'); if (!prog) return;
    const caps = DECK.capitulos;
    if (!prog.dataset.ready || prog.dataset.lang !== st.lang) {
      prog.innerHTML = caps.map((c) => `<div class="pc" data-c="${c.id}"><i></i><span>${P.T(c)}</span></div>`).join('');
      prog.dataset.ready = 1; prog.dataset.lang = st.lang;
      $$('.pc', prog).forEach((el) => el.addEventListener('click', () => { const j = built.findIndex((b) => b.s.capitulo === el.dataset.c && !b.s.respaldo); if (j >= 0) goto(j); }));
    }
    const cur = built[st.i].s.capitulo;
    let passed = true;
    $$('.pc', prog).forEach((el) => {
      const isCur = el.dataset.c === cur; if (isCur) passed = false;
      const scenes = built.filter((b) => b.s.capitulo === el.dataset.c && !b.s.respaldo);
      const pos = scenes.findIndex((b) => b.i === st.i);
      el.classList.toggle('cur', isCur); el.classList.toggle('done', passed && !isCur);
      el.style.setProperty('--p', isCur ? ((pos + 1) / scenes.length * 100) + '%' : (passed ? '100%' : '0%'));
    });
    document.body.classList.toggle('on-dark', !!built[st.i].dark);
    const mc = $('#mcont'); if (mc) mc.textContent = (st.i + 1) + ' / ' + built.length;
    const gi = $('#girar span'); if (gi) gi.textContent = st.lang === 'es' ? 'Gire el teléfono para verla más grande' : 'Turn your phone sideways for a larger view';
  }
  if (!PREVIEW) {
    $$('#lang button').forEach((b) => b.addEventListener('click', () => { if (b.dataset.l !== st.lang) toggleLang(); }));
    $('#fs') && $('#fs').addEventListener('click', fullscreen);
    $('#ov') && $('#ov').addEventListener('click', toggleOverview);
    let idle; const wake = () => { document.body.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => document.body.classList.add('idle'), 2600); };
    addEventListener('mousemove', wake); addEventListener('touchstart', wake, { passive: true }); wake();
    $('#mprev') && $('#mprev').addEventListener('click', (e) => { e.stopPropagation(); prev(); wake(); });
    $('#mnext') && $('#mnext').addEventListener('click', (e) => { e.stopPropagation(); next(); wake(); });
    stage.addEventListener('dblclick', (e) => { if (!e.target.closest('[data-ui],[data-goto-step],button')) fullscreen(); });
  }

  /* ---------- Vista general (tecla O) ---------- */
  function toggleOverview() { document.body.classList.contains('ov-open') ? closeOverview() : openOverview(); }
  function openOverview() {
    const ov = $('#overview'); if (!ov) return;
    if (ov.dataset.lang !== st.lang) {
      ov.innerHTML = '<div class="ov-grid">' + built.map((b) => `<button class="ov-t${b.s.respaldo ? ' resp' : ''}" data-i="${b.i}"><div class="ov-s"><section class="scene active all-in t-${b.s.tipo} ${b.dark ? 'dark' : 'light'}">${b.html}</section></div><span>${b.i + 1}. ${P.esc(P.T(b.s.titulo || b.s.titulo2 || ''))}${b.s.respaldo ? ' · ' + (st.lang === 'es' ? 'respaldo' : 'backup') : ''}</span></button>`).join('') + '</div>';
      ov.dataset.lang = st.lang;
      $$('.ov-t', ov).forEach((t) => t.addEventListener('click', () => { closeOverview(); goto(+t.dataset.i); }));
    }
    $$('.ov-t', ov).forEach((t) => t.classList.toggle('cur', +t.dataset.i === st.i));
    document.body.classList.add('ov-open');
  }
  function closeOverview() { document.body.classList.remove('ov-open'); }

  /* ---------- Tooltip ---------- */
  const tip = $('#tip');
  if (tip) {
    stage.addEventListener('mousemove', (e) => {
      const t = e.target.closest('[data-tip]');
      if (!t) { tip.classList.remove('on'); return; }
      tip.textContent = t.dataset.tip; tip.classList.add('on');
      const x = Math.min(innerWidth - tip.offsetWidth - 12, e.clientX + 14), y = Math.max(8, e.clientY - tip.offsetHeight - 14);
      tip.style.transform = `translate(${x}px,${y}px)`;
    });
    stage.addEventListener('mouseleave', () => tip.classList.remove('on'));
  }

  /* ---------- Modo vista previa (iframes del presentador) ---------- */
  if (PREVIEW) {
    addEventListener('message', (e) => {
      const m = e.data; if (!m) return;
      if (m.pinvDatos) { if (listo) recibirDatos(m.pinvDatos); return; }
      if (!m.pinvPreview) return; if (!listo) { previewPendiente = m; return; } vistaPrevia(m);
    });
  }
  /* Datos nuevos enviados por el presentador («Cargar Excel»): se redibuja conservando la escena y el paso */
  function recibirDatos(pack) {
    P.aplicarHojas(DECK, pack.hojas, (pack.nombre || 'Excel') + ' (cargado)', pack.fecha);
    const keep = { i: Math.min(st.i, DECK.escenas.length - 1), step: st.step };
    stage.classList.add('instant');
    render();
    if (PREVIEW) { st.i = -1; stage.classList.remove('instant'); return; }
    const el = sceneEl(keep.i); el.classList.add('active'); el.setAttribute('aria-hidden', 'false');
    setStep(el, Math.min(keep.step, built[keep.i].max), false); prep(keep.i + 1);
    st.i = keep.i; st.step = Math.min(keep.step, built[keep.i].max);
    stage.classList.remove('instant'); updateChrome();
  }
  function vistaPrevia(m) {
    {
      if (m.ui) st.ui = m.ui;
      const step = m.final ? built.length && built[m.i] ? built[m.i].max : 0 : m.step;
      if (m.lang && m.lang !== st.lang) { st.lang = m.lang; render(); stage.querySelectorAll('.scene.active').forEach((x) => x.classList.remove('active')); st.i = -1; }
      const same = st.i === m.i;
      const el = sceneEl(m.i); if (!el) return;
      if (!same) { $$('.scene.active', stage).forEach((x) => x.classList.remove('active')); el.classList.add('active'); setStep(el, m.final ? built[m.i].max : step, false); }
      else setStep(el, m.final ? built[m.i].max : step, !m.final);
      st.i = m.i; st.step = step;
      built.forEach((b) => applyUI(b.i));
    }
  }

  /* ---------- PDF: una página por escena (estado final, idioma activo) ----------
     Se arma un contenedor #print con todas las escenas y se usa la impresión del navegador («Guardar como PDF»):
     texto seleccionable, vectores nítidos y sin librerías externas. */
  const SIN_ON = new Set(['corredores', 'zonas']);               // en estas escenas no se resalta ningún elemento
  function construirImpresion() {
    P.setLang(st.lang);
    let cont = document.getElementById('print');
    if (!cont) { cont = document.createElement('div'); cont.id = 'print'; document.body.appendChild(cont); }
    const paginas = [];
    built.forEach((b) => {
      const multi = b.s.tipo === 'explorador' && b.s.grupos.length > 1;
      (multi ? b.s.grupos.map((g, k) => ({ g: k, f: '*' })) : [{ f: '*' }]).forEach((u) => paginas.push({ b, u }));
    });
    // Página A4 horizontal: la escena 16:9 (1920×1080) se escala al ancho útil, con pie de página (título y número)
    const tit = P.esc(P.T(DECK.titulo)), tot = paginas.length;
    cont.innerHTML = paginas.map(({ b }, k) => `<div class="pg"><div class="lienzo"><section class="scene active print-scene t-${b.s.tipo} ${b.dark ? 'dark' : 'light'}">${b.html}</section></div><div class="pie"><span>PROINVERSIÓN · ${tit}</span><span>${k + 1} / ${tot}</span></div></div>`).join('');
    [...cont.querySelectorAll('.pg')].forEach((pg, k) => {
      const { b, u } = paginas[k], sec = pg.querySelector('section.scene');
      sec.querySelectorAll('[data-rv]').forEach((e) => { e.classList.add('in'); e.style.setProperty('--d', '0ms'); });
      if (!SIN_ON.has(b.s.tipo)) sec.querySelectorAll('[data-on]').forEach((e) => e.classList.add('on'));
      // Fotos de fondo → <img> reales dentro de cada .bg (se descargan aunque estén ocultas y se puede esperar su carga);
      // el velo de la foto pasa a una capa superior (::after) que oscurece por multiplicación.
      sec.querySelectorAll('.bg').forEach((bg) => {
        const m = /url\(['"]?([^'")]+)/.exec(bg.style.getPropertyValue('--img')); if (!m) return;
        const im = document.createElement('img'); im.className = 'bg-foto'; im.alt = ''; im.decoding = 'sync'; im.loading = 'eager'; im.src = m[1];
        bg.classList.add('solo-velo'); bg.appendChild(im);
      });
      const r = P.R[b.s.tipo]; if (r && r.ui) r.ui(sec, u, b.s);
    });
    return cont;
  }
  /* Las fotos de fondo de un contenedor oculto (display:none) no se descargan hasta imprimir, y el cuadro
     de impresión no las espera. Por eso las páginas se dibujan de verdad (detrás de una pantalla «Preparando PDF…»),
     y se espera a que cada foto esté descargada Y decodificada antes de llamar a print(). */
  function esperarImagenes(cont, ms = 20000) {
    const conTope = (p, t) => Promise.race([p, new Promise((ok) => setTimeout(ok, t))]);   // ninguna espera puede colgar la impresión
    const cargas = [...cont.querySelectorAll('img')].map((im) => new Promise((ok) => {
      const listo = () => conTope(im.decode ? im.decode().catch(() => {}) : Promise.resolve(), 3000).then(ok);
      if (im.complete && im.naturalWidth) listo(); else { im.addEventListener('load', listo, { once: true }); im.addEventListener('error', ok, { once: true }); }
    }));
    const dosCuadros = () => conTope(new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))), 200);
    return Promise.race([Promise.all(cargas), new Promise((ok) => setTimeout(ok, ms))]).then(dosCuadros).then(() => new Promise((ok) => setTimeout(ok, 400)));
  }
  const tituloOriginal = () => P.T(DECK.titulo) + ' · PROINVERSIÓN';
  function nombreArchivo() {
    const base = (P.T(DECK.titulo).split('·')[0] || 'Presentacion').trim().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
    return `PROINVERSION-${base}-${st.lang.toUpperCase()}`;
  }
  let imprimiendo = false;
  async function descargarPDF() {
    if (imprimiendo || !listo) return; imprimiendo = true;
    const aviso = $('#pdfAviso');
    if (aviso) { aviso.innerHTML = st.lang === 'es' ? '<b>Preparando el PDF…</b><span>Cargando las imágenes de las ' + built.length + ' escenas. Luego, en el cuadro que se abrirá, elija «Guardar como PDF».</span>' : '<b>Preparing the PDF…</b><span>Loading the images of all ' + built.length + ' scenes. Then, in the dialog, choose “Save as PDF”.</span>'; aviso.classList.add('on', 'cubre'); }
    const cont = construirImpresion();
    cont.classList.add('preparando');                 // dibujado (fuera de la vista): fuerza la descarga de las fotos de fondo
    await esperarImagenes(cont);
    document.title = nombreArchivo();                 // Chrome y Edge usan el título como nombre del archivo
    if (aviso) aviso.classList.remove('on', 'cubre');
    cont.classList.remove('preparando');             // las fotos ya están en memoria; la impresión usa su propio diseño por páginas
    window.print();
  }
  addEventListener('beforeprint', () => { if (!imprimiendo && listo) { construirImpresion(); document.title = nombreArchivo(); } });
  addEventListener('afterprint', () => { imprimiendo = false; document.title = tituloOriginal(); if (!qs.has('pdf')) { const c = document.getElementById('print'); if (c) { c.innerHTML = ''; c.classList.remove('preparando'); } } });
  if (!PREVIEW && $('#pdf')) $('#pdf').addEventListener('click', descargarPDF);

  /* ---------- Arranque (primero se cargan los datos del Excel, si existe) ---------- */
  (P.cargarDatos ? P.cargarDatos(DECK) : Promise.resolve()).then(iniciar, iniciar);
  function iniciar() {
  render();
  const startAt = Math.max(0, Math.min(built.length - 1, (parseInt(qs.get('escena'), 10) || 1) - 1));
  st.i = startAt;
  const pq = qs.get('paso');
  st.step = pq === 'final' ? built[startAt].max : Math.max(0, Math.min(built[startAt].max, parseInt(pq, 10) || 0));
  const first = sceneEl(startAt); first.classList.add('active'); first.setAttribute('aria-hidden', 'false');
  setStep(first, -1, false);
  setTimeout(() => setStep(first, st.step, !PREVIEW), PREVIEW ? 0 : 250);
  prep(startAt + 1);
  updateChrome();
  if (sync) sync.send({ t: 'hello', role: 'audiencia' });
  if (!PREVIEW) {
    const h = $('#hint');
    if (h && TACTIL) h.innerHTML = st.lang === 'es' ? '<span>Deslice ← → o use ‹ › para avanzar</span><span>ES / EN arriba</span>' : '<span>Swipe ← → or use ‹ › to move</span><span>ES / EN at the top</span>';
    if (h) { h.classList.add('on'); setTimeout(() => h.classList.remove('on'), 6000); }
    if (window.opener) document.body.classList.add('linked');
  }
  listo = true;
  if (qs.has('pdf')) { construirImpresion(); document.title = nombreArchivo(); }   // usado por scripts/generar_pdf.ps1
  if (sync) sync.send({ t: 'hello', role: 'audiencia' });
  if (previewPendiente) { vistaPrevia(previewPendiente); previewPendiente = null; }
  }
  window.PINV_AUD = { go, next, prev, goto, state: () => st };
})();
