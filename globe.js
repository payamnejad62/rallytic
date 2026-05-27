/* ═══════════════════════════════════════════════════════════
   3D GLOBE — Pure Canvas 2D (no dependencies)
   ═══════════════════════════════════════════════════════════ */
(function initGlobe() {
  const canvas = document.getElementById('heroGlobe');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const SIZE = 480;
  canvas.width  = SIZE;
  canvas.height = SIZE;

  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R  = SIZE * 0.38;

  let rotY = 0;
  let rotX = 0.3;
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0.3;
  let targetRotY = 0;

  /* ── Mouse influence ── */
  document.addEventListener('mousemove', e => {
    mouseX =  (e.clientX / window.innerWidth  - 0.5) * 0.6;
    mouseY =  (e.clientY / window.innerHeight - 0.5) * 0.25;
  }, { passive: true });

  /* ── 3D → 2D projection ── */
  function project(x, y, z) {
    /* apply rotX */
    const y1 =  y * Math.cos(rotX) - z * Math.sin(rotX);
    const z1 =  y * Math.sin(rotX) + z * Math.cos(rotX);
    /* apply rotY */
    const x2 =  x * Math.cos(rotY) + z1 * Math.sin(rotY);
    const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
    const fov  = 3.5;
    const scale = fov / (fov + z2 / R);
    return {
      sx: cx + x2 * scale,
      sy: cy + y1 * scale,
      z2,
      scale,
      visible: z2 > -R * 0.1,
    };
  }

  /* ── Draw a great circle (lat or lon) ── */
  function drawCircle(pts, alpha, color, width) {
    if (pts.length < 2) return;
    ctx.beginPath();
    let first = true;
    for (const p of pts) {
      const { sx, sy, visible } = project(p[0], p[1], p[2]);
      if (visible) {
        first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        first = false;
      } else {
        first = true;
      }
    }
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth   = width;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /* ── Build latitude ring points ── */
  function latRing(latDeg, segs = 120) {
    const lat = latDeg * Math.PI / 180;
    const r   = Math.cos(lat);
    const y   = Math.sin(lat) * R;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push([Math.cos(a) * r * R, y, Math.sin(a) * r * R]);
    }
    return pts;
  }

  /* ── Build longitude arc points ── */
  function lonArc(lonDeg, segs = 120) {
    const lon = lonDeg * Math.PI / 180;
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const lat = ((i / segs) - 0.5) * Math.PI;
      pts.push([
        Math.cos(lat) * Math.cos(lon) * R,
        Math.sin(lat) * R,
        Math.cos(lat) * Math.sin(lon) * R,
      ]);
    }
    return pts;
  }

  /* ── Glow gradient helper ── */
  function drawGlow(alpha) {
    const grad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
    grad.addColorStop(0, `rgba(45,140,45,${alpha * 0.18})`);
    grad.addColorStop(0.5, `rgba(30,100,30,${alpha * 0.08})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fill();
  }

  /* ── Draw inner solid sphere ── */
  function drawSphere() {
    const grad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.05, cx, cy, R);
    grad.addColorStop(0,   'rgba(30, 80, 30, 0.88)');
    grad.addColorStop(0.5, 'rgba(13, 40, 13, 0.82)');
    grad.addColorStop(1,   'rgba(5,  18,  5, 0.78)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ── Rim light ── */
  function drawRim() {
    const grad = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ── Specular highlight ── */
  function drawSpecular() {
    const grad = ctx.createRadialGradient(
      cx - R * 0.3, cy - R * 0.3, 0,
      cx - R * 0.3, cy - R * 0.3, R * 0.55
    );
    grad.addColorStop(0,   'rgba(255,255,255,0.13)');
    grad.addColorStop(0.4, 'rgba(92,184,92,0.05)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ── Surface dots ── */
  const dots = Array.from({ length: 90 }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    return [
      Math.sin(phi) * Math.cos(theta) * R,
      Math.cos(phi) * R,
      Math.sin(phi) * Math.sin(theta) * R,
    ];
  });

  function drawDots() {
    for (const d of dots) {
      const { sx, sy, visible, scale } = project(d[0], d[1], d[2]);
      if (!visible) continue;
      const r = Math.max(0.8, 1.8 * scale);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#5cb85c';
      ctx.globalAlpha = 0.65 * scale;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ── Outer halo rings ── */
  function drawHalo(tiltX, tiltZ, phase, alpha) {
    const segs = 160;
    ctx.beginPath();
    let first = true;
    for (let i = 0; i <= segs; i++) {
      const a  = (i / segs) * Math.PI * 2 + phase;
      const rx = R * 1.18;
      const ry = R * 0.08;
      /* tilt the ring */
      const x0 = Math.cos(a) * rx;
      const y0 = Math.sin(a) * ry;
      const z0 = Math.sin(a) * rx * Math.sin(tiltX);
      const x  = x0 * Math.cos(tiltZ) - y0 * Math.sin(tiltZ);
      const y  = x0 * Math.sin(tiltZ) + y0 * Math.cos(tiltZ);
      const z  = z0;

      const { sx, sy } = project(x, y, z);
      first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
      first = false;
    }
    ctx.strokeStyle = '#5cb85c';
    ctx.globalAlpha = alpha;
    ctx.lineWidth   = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /* ── Clipping mask to sphere ── */
  function clipToSphere() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
  }

  let haloPhase = 0;

  /* ── Main render loop ── */
  function draw() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    /* Smooth tracking */
    targetRotY += 0.0025;
    rotY += (targetRotY + mouseX - rotY) * 0.04;
    rotX += (0.3 + mouseY - rotX)        * 0.04;

    /* Background glow */
    drawGlow(1);

    /* Solid sphere */
    drawSphere();

    clipToSphere();

    /* Grid lines — back hemisphere first */
    const lats = [-60, -30, 0, 30, 60];
    for (const lat of lats) {
      const pts = latRing(lat);
      const alpha = lat === 0 ? 0.55 : 0.22;
      const color = lat === 0 ? '#5cb85c' : '#3d8b3d';
      drawCircle(pts, alpha, color, lat === 0 ? 1.2 : 0.7);
    }

    for (let lon = 0; lon < 360; lon += 30) {
      const pts = lonArc(lon);
      const alpha = lon % 90 === 0 ? 0.4 : 0.15;
      drawCircle(pts, alpha, '#2d6a2d', lon % 90 === 0 ? 0.9 : 0.5);
    }

    /* Surface dots */
    drawDots();

    /* Rim light */
    drawRim();

    /* Specular */
    drawSpecular();

    ctx.restore(); /* end clip */

    /* Halos (outside sphere) */
    haloPhase += 0.006;
    drawHalo(0.5,  0.2, haloPhase,       0.22);
    drawHalo(0.9, -0.3, haloPhase * 0.7, 0.15);

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ═══════════════════════════════════════════════════════════
   3D DEPTH TEXT — parallax layers on hero title
   ═══════════════════════════════════════════════════════════ */
(function init3DText() {
  const title = document.getElementById('heroTitle3d');
  if (!title) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    const layers = Array.from({ length: 7 }, (_, i) => {
      const d = (i + 1) * 0.85;
      const a = 0.55 - i * 0.07;
      return `${d * dx}px ${d * dy}px 0 rgba(25,80,25,${a.toFixed(2)})`;
    });
    layers.push(`${dx * 3}px ${dy * 3}px 28px rgba(0,0,0,0.5)`);
    title.style.textShadow = layers.join(', ');
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    title.style.textShadow = '';
  });
})();
