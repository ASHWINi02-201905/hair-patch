import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeLogo() {
  const g = new THREE.Group();
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xe8d3a8, metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.04 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x0e0e0e, metalness: 0.5, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.03 });
  const bronze = new THREE.MeshPhysicalMaterial({ color: 0xb8964f, metalness: 1, roughness: 0.2, clearcoat: 0.7 });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 5, 96).rotateX(Math.PI / 2), dark);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(29.6, 2, 24, 128), bronze);
  g.add(disc, ring);

  const H = new THREE.Shape();
  [[-22,-13],[-16,-13],[-16,-3],[-12,-3],[-12,-13],[-6,-13],[-6,13],[-12,13],[-12,3],[-16,3],[-16,13],[-22,13]]
    .forEach(([x, y], i) => i ? H.lineTo(x, y) : H.moveTo(x, y));
  H.closePath();
  const P = new THREE.Shape();
  P.moveTo(2, -13); P.lineTo(2, 13); P.lineTo(11, 13);
  P.absarc(11, 5.5, 7.5, Math.PI / 2, -Math.PI / 2, true);
  P.lineTo(8, -2); P.lineTo(8, -13); P.closePath();
  const hole = new THREE.Path();
  hole.moveTo(8, 9); hole.lineTo(11, 9);
  hole.absarc(11, 5.5, 3.5, Math.PI / 2, -Math.PI / 2, true);
  hole.lineTo(8, 2); hole.closePath();
  P.holes.push(hole);

  const opts = { depth: 5, bevelEnabled: true, bevelThickness: 1.2, bevelSize: 0.9, bevelSegments: 5, curveSegments: 24 };
  const letters = new THREE.Group();
  letters.add(new THREE.Mesh(new THREE.ExtrudeGeometry(H, opts), gold), new THREE.Mesh(new THREE.ExtrudeGeometry(P, opts), gold));
  letters.position.set(1.75, 1.5, 2.2);
  g.add(letters);

  const curve = new THREE.CatmullRomCurve3([[-15,-19.5],[-5,-22.8],[5,-22.8],[15,-19.5]].map(([x, y]) => new THREE.Vector3(x, y, 3.4)));
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.9, 14), gold));
  return g;
}

function mount(el) {
  try {
    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    const scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 1.1;
    const cam = new THREE.PerspectiveCamera(28, 1, 1, 500);
    cam.position.z = 128;
    const key = new THREE.DirectionalLight(0xfff6e6, 2.2); key.position.set(30, 40, 60);
    const glint = new THREE.PointLight(0xffffff, 9000, 0, 2); glint.position.set(0, 10, 45);
    scene.add(key, glint);
    const logo = makeLogo(); scene.add(logo);
    el.appendChild(canvas); el.classList.add("ready");

    let w = 0, h = 0, drag = null, ox = 0, oy = 0, vx = 0, vy = 0, visible = true;
    const fit = () => { w = el.clientWidth; h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    new ResizeObserver(fit).observe(el); fit();
    new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(el);
    if (el.dataset.interactive !== undefined) {
      el.style.touchAction = "none"; el.style.cursor = "grab";
      el.addEventListener("pointerdown", e => { drag = [e.clientX, e.clientY]; el.setPointerCapture(e.pointerId); el.style.cursor = "grabbing"; });
      el.addEventListener("pointermove", e => { if (!drag) return; vx = (e.clientX - drag[0]) * 0.012; vy = (e.clientY - drag[1]) * 0.012; ox += vx; oy = Math.max(-1, Math.min(1, oy + vy)); drag = [e.clientX, e.clientY]; });
      const end = () => { drag = null; el.style.cursor = "grab"; };
      el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
    }
    let hover = 0;
    el.addEventListener("pointerenter", () => { hover = 1; }); el.addEventListener("pointerleave", () => { hover = 0; });
    const clock = new THREE.Clock(); let spinExtra = 0;
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
      if (!drag) { ox += vx; oy += vy; vx *= 0.94; vy *= 0.94; oy *= 0.98; }
      spinExtra += hover * dt * 4;
      const sway = reduce ? 0 : 1;
      logo.rotation.y = ox + spinExtra + Math.sin(t * 0.7) * 0.55 * sway;
      logo.rotation.x = oy + Math.sin(t * 0.5) * 0.12 * sway;
      glint.position.x = Math.sin(t * 1.1) * 50; glint.position.y = 10 + Math.cos(t * 0.8) * 25;
      renderer.render(scene, cam);
    })();
  } catch (err) { console.warn("3D logo unavailable, showing flat logo.", err); }
}
document.querySelectorAll(".logo3d").forEach(mount);
