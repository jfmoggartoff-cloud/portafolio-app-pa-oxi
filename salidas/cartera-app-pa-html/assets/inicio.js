/* Portada de accesos (index.html): título y fondo desde contenido.js */
(function () {
    var D = window.DECK || {}; var es = function (v) { return v && typeof v === 'object' ? (v.es || '') : (v || ''); };
    document.getElementById('t').textContent = es(D.titulo);
    var n = (D.escenas || []).filter(function (x) { return !x.respaldo; }).length;
    document.getElementById('s').textContent = n + ' escenas · ' + (D.duracionMin || '') + ' minutos aprox. · Español / English';
    document.title = es(D.titulo) + ' · PROINVERSIÓN';
    var p = (D.escenas || [])[0]; if (p && p.img) document.getElementById('bg').style.backgroundImage = "url('assets/img/" + p.img + "')";
  })();
