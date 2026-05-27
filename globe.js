/* ═══════════════════════════════════════════════════════════
   3D GLOBE — Three.js Tennis Court Wireframe Globe
   ═══════════════════════════════════════════════════════════ */

(function initGlobe() {
  const canvas = document.getElementById('heroGlobe');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ── Scene & Camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 2.8;

  /* ── Resize helper ── */
  function resize() {
    const size = Math.min(canvas.parentElement.offsetWidth * 0.55, 620);
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Inner solid sphere ── */
  const innerMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.97, 48, 48),
    new THREE.MeshPhongMaterial({
      color: 0x0d2a0d,
      emissive: 0x0a1f0a,
      transparent: true,
      opacity: 0.85,
      shininess: 80,
    })
  );
  scene.add(innerMesh);

  /* ── Atmosphere glow sphere ── */
  const atmMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.08, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x3d8b3d,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    })
  );
  scene.add(atmMesh);

  /* ── Helper: create a lat/long circle ── */
  function makeCircle(radius, tilt, color, opacity) {
    const pts = [];
    const seg = 128;
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat  = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const line = new THREE.Line(geom, mat);
    line.rotation.x = tilt;
    return line;
  }

  /* ── Latitude lines ── */
  const latColors = [0x5cb85c, 0x3d8b3d, 0x2d6a2d];
  [-60, -35, -10, 10, 35, 60].forEach((deg, i) => {
    const rad    = (deg * Math.PI) / 180;
    const r      = Math.cos(rad);
    const y      = Math.sin(rad);
    const pts    = [];
    const color  = latColors[i % 3];
    const opacity = Math.abs(deg) < 20 ? 0.55 : 0.3;
    for (let j = 0; j <= 128; j++) {
      const a = (j / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat  = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    scene.add(new THREE.Line(geom, mat));
  });

  /* ── Equator (brighter) ── */
  scene.add(makeCircle(1, 0, 0x5cb85c, 0.7));

  /* ── Longitude lines ── */
  for (let i = 0; i < 12; i++) {
    const pts    = [];
    const angle  = (i / 12) * Math.PI;
    const opacity = (i % 3 === 0) ? 0.5 : 0.18;
    for (let j = 0; j <= 128; j++) {
      const phi   = (j / 128) * Math.PI * 2;
      const x     = Math.sin(phi) * Math.cos(angle);
      const y     = Math.cos(phi);
      const z     = Math.sin(phi) * Math.sin(angle);
      pts.push(new THREE.Vector3(x, y, z));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat  = new THREE.LineBasicMaterial({ color: 0x2d6a2d, transparent: true, opacity });
    scene.add(new THREE.Line(geom, mat));
  }

  /* ── Tropic rings ── */
  scene.add(makeCircle(Math.cos(23.5 * Math.PI / 180),  23.5 * Math.PI / 180,  0x5cb85c, 0.45));
  scene.add(makeCircle(Math.cos(23.5 * Math.PI / 180), -23.5 * Math.PI / 180, 0x5cb85c, 0.45));

  /* ── Glowing dot particles scattered on surface ── */
  const dotGeo  = new THREE.BufferGeometry();
  const dotCount = 120;
  const positions = new Float32Array(dotCount * 3);
  for (let i = 0; i < dotCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 1.01;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dotMat = new THREE.PointsMaterial({
    color: 0x5cb85c,
    size: 0.018,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(dotGeo, dotMat));

  /* ── Outer halo ring ── */
  const haloGeo = new THREE.TorusGeometry(1.15, 0.008, 4, 200);
  const haloMat = new THREE.MeshBasicMaterial({ color: 0x5cb85c, transparent: true, opacity: 0.25 });
  const halo    = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = Math.PI / 2;
  scene.add(halo);

  const halo2    = halo.clone();
  halo2.rotation.set(Math.PI / 3, 0, Math.PI / 6);
  scene.add(halo2);

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const pLight = new THREE.PointLight(0x5cb85c, 1.5, 6);
  pLight.position.set(2, 2, 2);
  scene.add(pLight);

  const pLight2 = new THREE.PointLight(0x3d8b3d, 1, 5);
  pLight2.position.set(-2, -1, 1);
  scene.add(pLight2);

  /* ── Group for tilt ── */
  const group = new THREE.Group();
  group.rotation.x = 0.25;
  scene.children.forEach(c => group.add(c));
  scene.children.length = 0;
  scene.add(group);

  /* ── Mouse interaction ── */
  let targetRotY = 0;
  let targetRotX = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ── Animate ── */
  let autoRotY = 0;
  function animate() {
    requestAnimationFrame(animate);
    autoRotY += 0.003;
    targetRotY  += (mouseX * 0.4  - targetRotY)  * 0.04;
    targetRotX  += (mouseY * 0.15 - targetRotX)  * 0.04;
    group.rotation.y = autoRotY + targetRotY;
    group.rotation.x = 0.25 + targetRotX;
    halo.rotation.z  += 0.004;
    halo2.rotation.z -= 0.003;
    renderer.render(scene, camera);
  }
  animate();
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

    const depth  = 6;
    const layers = Array.from({ length: 8 }, (_, i) => {
      const d = (i + 1) * depth * 0.13;
      const alpha = 0.55 - i * 0.06;
      return `${d * dx}px ${d * dy}px 0 rgba(30,90,30,${alpha})`;
    });
    layers.push(`${dx * 4}px ${dy * 4}px 30px rgba(0,0,0,0.5)`);
    title.style.textShadow = layers.join(', ');
  }, { passive: true });

  /* Reset on leave */
  document.addEventListener('mouseleave', () => {
    title.style.textShadow = '';
  });
})();
