/* ============================================================
   Three.js Flower Garden Scene — Dani's Birthday
   
   Procedural pink flowers floating in 3D space with depth,
   mouse parallax, and scroll-reactive movement.
   Protagonist visual element.
   ============================================================ */

import * as THREE from 'three';
import { prefersReducedMotion } from './motion.js';

let scene, camera, renderer, flowers = [], petals = [];
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
let scrollY = 0;
let animationId = null;
let isVisible = true;
let isMobile = false;

const COLORS = {
  pinkLight: 0xFDE8F0,
  pink: 0xF8C8DC,
  pinkDark: 0xD46A9A,
  lilac: 0xD9C7F2,
  cream: 0xFFF7F4,
  white: 0xFFFFFF,
};

const CONFIG = {
  flowerCount: 12,
  petalCount: 30,
  mobileFlowerCount: 6,
  mobilePetalCount: 12,
  mouseInfluence: 0.02,
  scrollInfluence: 0.001,
  floatSpeed: 0.3,
  maxPixelRatio: 2,
};

/* --- Flower geometry helpers ----------------------------- */

function createPetalShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.3, 0.3, 0.5, 0.8, 0, 1.2);
  shape.bezierCurveTo(-0.5, 0.8, -0.3, 0.3, 0, 0);
  return shape;
}

function createFlowerGroup(radius = 0.4) {
  const group = new THREE.Group();
  const petalShape = createPetalShape();

  const petalGeometry = new THREE.ShapeGeometry(petalShape);
  const petalCount = 5;

  // Random pink tone
  const colorIndex = Math.random();
  let color;
  if (colorIndex < 0.3) color = COLORS.pinkLight;
  else if (colorIndex < 0.6) color = COLORS.pink;
  else if (colorIndex < 0.85) color = COLORS.pinkDark;
  else color = COLORS.lilac;

  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7 + Math.random() * 0.3,
  });

  for (let i = 0; i < petalCount; i++) {
    const petal = new THREE.Mesh(petalGeometry, material.clone());
    const angle = (i / petalCount) * Math.PI * 2;
    petal.rotation.z = angle;
    petal.scale.setScalar(radius * (0.8 + Math.random() * 0.4));
    group.add(petal);
  }

  // Center
  const centerGeo = new THREE.SphereGeometry(radius * 0.3, 8, 8);
  const centerMat = new THREE.MeshBasicMaterial({
    color: COLORS.cream,
    transparent: true,
    opacity: 0.8,
  });
  const center = new THREE.Mesh(centerGeo, centerMat);
  center.position.z = 0.05;
  group.add(center);

  return group;
}

function createSinglePetal(scale = 1) {
  const shape = createPetalShape();
  const geo = new THREE.ShapeGeometry(shape);

  const colors = [COLORS.pinkLight, COLORS.pink, COLORS.pinkDark, COLORS.lilac];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const mat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.4 + Math.random() * 0.4,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.setScalar(scale * (0.15 + Math.random() * 0.2));
  return mesh;
}

/* --- Scene setup ----------------------------------------- */

export function initScene3D() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('scene-container');
  if (!container) return;

  isMobile = window.innerWidth < 768;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 8;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.maxPixelRatio));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create flowers
  const flowerCount = isMobile ? CONFIG.mobileFlowerCount : CONFIG.flowerCount;
  for (let i = 0; i < flowerCount; i++) {
    const flower = createFlowerGroup(0.3 + Math.random() * 0.3);
    flower.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 6 - 2
    );
    flower.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    // Store animation data
    flower.userData = {
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.2 + Math.random() * 0.4,
      floatAmp: 0.3 + Math.random() * 0.5,
      rotSpeed: 0.1 + Math.random() * 0.3,
      originalY: flower.position.y,
    };

    flowers.push(flower);
    scene.add(flower);
  }

  // Create floating petals
  const petalCount = isMobile ? CONFIG.mobilePetalCount : CONFIG.petalCount;
  for (let i = 0; i < petalCount; i++) {
    const petal = createSinglePetal();
    petal.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8 - 1
    );
    petal.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    petal.userData = {
      fallSpeed: 0.005 + Math.random() * 0.01,
      swaySpeed: 0.5 + Math.random() * 1.5,
      swayAmp: 0.02 + Math.random() * 0.04,
      rotSpeed: 0.01 + Math.random() * 0.03,
      originalX: petal.position.x,
    };
    petals.push(petal);
    scene.add(petal);
  }

  // Event listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  // Visibility observer
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) animate();
    },
    { threshold: 0 }
  );
  observer.observe(container);

  // Start animation
  animate();
}

function onMouseMove(e) {
  mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
}

function onScroll() {
  scrollY = window.scrollY;
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* --- Animation loop -------------------------------------- */

function animate() {
  if (!isVisible) {
    animationId = null;
    return;
  }

  animationId = requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  // Smooth mouse follow
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;

  // Animate flowers
  flowers.forEach(flower => {
    const d = flower.userData;
    // Gentle floating
    flower.position.y = d.originalY +
      Math.sin(time * d.floatSpeed + d.floatOffset) * d.floatAmp;

    // Slow rotation
    flower.rotation.x += d.rotSpeed * 0.005;
    flower.rotation.y += d.rotSpeed * 0.003;

    // Mouse parallax (based on depth)
    const depth = (flower.position.z + 5) / 10;
    flower.position.x += mouse.x * CONFIG.mouseInfluence * depth;
  });

  // Animate petals
  petals.forEach(petal => {
    const d = petal.userData;

    // Fall slowly
    petal.position.y -= d.fallSpeed;

    // Sway horizontally
    petal.position.x = d.originalX +
      Math.sin(time * d.swaySpeed) * d.swayAmp * 3;

    // Spin
    petal.rotation.x += d.rotSpeed;
    petal.rotation.z += d.rotSpeed * 0.7;

    // Reset when below screen
    if (petal.position.y < -8) {
      petal.position.y = 8;
      petal.position.x = (Math.random() - 0.5) * 20;
      d.originalX = petal.position.x;
    }
  });

  // Camera subtle reaction to mouse
  camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
  camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
  camera.lookAt(0, 0, 0);

  // Scroll effect — push scene back slightly
  const scrollOffset = scrollY * CONFIG.scrollInfluence;
  camera.position.z = 8 + scrollOffset * 0.5;

  renderer.render(scene, camera);
}

/** Clean up — call if needed */
export function destroyScene3D() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
  }
  flowers = [];
  petals = [];
}
