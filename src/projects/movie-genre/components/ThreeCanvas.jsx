import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ─────────────────────────────────────────────────────────────────────────────
// Logo3D — tiny spinning icosahedron in the nav bar
// ─────────────────────────────────────────────────────────────────────────────
export function Logo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(40, 40);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // Mesh
    const geo = new THREE.IcosahedronGeometry(2.5, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00dbe9,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let rafId;
    const tick = () => {
      mesh.rotation.x += 0.015;
      mesh.rotation.y += 0.02;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-10 h-10 flex items-center justify-center" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Background3D — full-screen scroll-driven 3D scene
// ─────────────────────────────────────────────────────────────────────────────
export function Background3D({ scrollFraction }) {
  const mountRef  = useRef(null);
  const scrollRef = useRef(0);

  // Keep scroll ref in sync with prop
  useEffect(() => {
    scrollRef.current = scrollFraction;
  }, [scrollFraction]);

  // Main Three.js setup — runs once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x051424, 0.0018);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 180);

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0a1428, 3.0));

    const keyLight = new THREE.DirectionalLight(0x7df4ff, 3.5);
    keyLight.position.set(30, 40, 50);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff0060, 2.5);
    fillLight.position.set(-30, -20, 20);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 50, -50);
    scene.add(rimLight);

    // ── Texture & GLTF Loaders ────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();
    const posterUrls = [
      'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg', // Avengers Endgame (Marvel)
      'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', // Iron Man (Marvel)
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // The Dark Knight (DC)
      'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', // Joker (DC)
      'https://image.tmdb.org/t/p/w500/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg', // Vikram (Tamil)
      'https://image.tmdb.org/t/p/w500/wjbOlovDadOdPKkSAMohLCjbIsc.jpg', // Master (Tamil)
    ];

    // ── Master scene groups ───────────────────────────────────────────────
    const groups = [0, 1, 2, 3, 4].map(() => {
      const g = new THREE.Group();
      g.position.z = 20; // start pushed back; active group lerps to 90
      scene.add(g);
      return g;
    });
    const [g0, g1, g2, g3, g4] = groups;

    // ─────────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────
    // SCENE 0 — Combined GLB Movie Camera & Film Reel (right side)
    // ─────────────────────────────────────────────────────────────────────
    const combinedScene0Group = new THREE.Group();
    combinedScene0Group.position.set(22, 0, 0);
    g0.add(combinedScene0Group);

    // Film Reel setup — placed next to the camera
    const filmReelGroup  = new THREE.Group();
    const filmReelPlates = new THREE.Group();
    filmReelGroup.position.set(8, 0, 0); // Position to the right
    filmReelGroup.scale.set(0.5, 0.5, 0.5);
    combinedScene0Group.add(filmReelGroup);
    filmReelGroup.add(filmReelPlates);

    const mkMetal = (color = 0xe0e6ed) => new THREE.MeshStandardMaterial({
      color, metalness: 0.95, roughness: 0.15, transparent: true, opacity: 0,
    });

    const plateGeo = new THREE.CylinderGeometry(18, 18, 0.4, 64);
    [-1.2, 1.2].forEach(z => {
      const m = new THREE.Mesh(plateGeo, mkMetal());
      m.rotation.x = Math.PI / 2;
      m.position.z = z;
      filmReelPlates.add(m);
    });

    const punchGeo  = new THREE.CylinderGeometry(3, 3, 3, 32);
    const punchMat  = () => new THREE.MeshStandardMaterial({ color: 0x051424, roughness: 0.8, transparent: true, opacity: 0 });
    const punchAngles = [0, 1, 2, 3, 4].map(k => (k * Math.PI * 2) / 5);
    punchAngles.forEach(a => {
      const m = new THREE.Mesh(punchGeo, punchMat());
      m.position.set(Math.cos(a) * 9, Math.sin(a) * 9, 0);
      m.rotation.x = Math.PI / 2;
      filmReelPlates.add(m);
    });

    const coreGeo = new THREE.CylinderGeometry(4, 4, 2.4, 32);
    const coreMesh = new THREE.Mesh(coreGeo, mkMetal());
    coreMesh.rotation.x = Math.PI / 2;
    filmReelPlates.add(coreMesh);

    const rollGeo = new THREE.CylinderGeometry(14, 14, 2.1, 64);
    const rollMat = new THREE.MeshStandardMaterial({ color: 0x1f1408, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0 });
    const rollMesh = new THREE.Mesh(rollGeo, rollMat);
    rollMesh.rotation.x = Math.PI / 2;
    filmReelPlates.add(rollMesh);

    // Load user's movie camera model and add it to the combined group
    gltfLoader.load('/3d-movie-camera.glb', (gltf) => {
      const model = gltf.scene;
      
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = 14.5 / maxDim; // scaled to look great in viewport
      model.scale.set(targetScale, targetScale, targetScale);
      
      const center = box.getCenter(new THREE.Vector3());
      model.position.x = -center.x * targetScale;
      model.position.y = -center.y * targetScale;
      model.position.z = -center.z * targetScale;
      
      const cameraWrapper = new THREE.Group();
      cameraWrapper.position.set(-8, 0, 0); // Position to the left
      cameraWrapper.add(model);
      combinedScene0Group.add(cameraWrapper);
      combinedScene0Group.userData.cameraWrapper = cameraWrapper;
      
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            const prevMat = child.material;
            child.material = new THREE.MeshStandardMaterial({
              color: prevMat.color || 0xdddddd,
              map: prevMat.map || null,
              normalMap: prevMat.normalMap || null,
              roughnessMap: prevMat.roughnessMap || null,
              metalnessMap: prevMat.metalnessMap || null,
              roughness: prevMat.roughness !== undefined ? prevMat.roughness : 0.35,
              metalness: prevMat.metalness !== undefined ? prevMat.metalness : 0.8,
              transparent: true,
              opacity: 0,
            });
          }
        }
      });
    }, undefined, (err) => console.error('Failed to load movie camera:', err));

    // ─────────────────────────────────────────────────────────────────────
    // SCENE 1 — Movie Poster Deck + Holographic Scan Gate (left side)
    // ─────────────────────────────────────────────────────────────────────
    const posterDeckGroup = new THREE.Group();
    posterDeckGroup.position.set(-22, 0, 0);
    g1.add(posterDeckGroup);

    const cards = posterUrls.map((url, i) => {
      const tex  = loader.load(url);
      const mat  = new THREE.MeshStandardMaterial({
        map: tex, metalness: 0.2, roughness: 0.3,
        side: THREE.DoubleSide, transparent: true, opacity: 0,
      });
      const card = new THREE.Mesh(new THREE.PlaneGeometry(16, 24), mat);
      card.position.set((i - 2.5) * 8.5, 0, -i * 5);
      card.rotation.y = -0.15 * i;
      posterDeckGroup.add(card);
      return card;
    });

    // (Holographic scan gate and laser removed as requested)

    // ─────────────────────────────────────────────────────────────────────
    // SCENE 2 — RGB Channel Splitting (right side)
    // ─────────────────────────────────────────────────────────────────────
    const rgbSplitGroup = new THREE.Group();
    rgbSplitGroup.position.set(22, 0, 0);
    g2.add(rgbSplitGroup);

    const sharedTex  = loader.load(posterUrls[1]);
    const mkRGBMat   = (hex) => new THREE.MeshStandardMaterial({ map: sharedTex, color: hex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });

    const redCard   = new THREE.Mesh(new THREE.PlaneGeometry(16, 24), mkRGBMat(0xff4d4d));
    const greenCard = new THREE.Mesh(new THREE.PlaneGeometry(16, 24), mkRGBMat(0x4dff4d));
    const blueCard  = new THREE.Mesh(new THREE.PlaneGeometry(16, 24), mkRGBMat(0x4d4dff));
    redCard.position.set(-6, 0, -5);
    greenCard.position.set(0, 0, 0);
    blueCard.position.set(6, 0, 5);
    rgbSplitGroup.add(redCard, greenCard, blueCard);

    // Floating pixel particles
    const prepCount = 150;
    const prepPositions = new Float32Array(prepCount * 3);
    for (let i = 0; i < prepCount; i++) {
      prepPositions[i * 3]     = (Math.random() - 0.5) * 35;
      prepPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      prepPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const prepGeo = new THREE.BufferGeometry();
    prepGeo.setAttribute('position', new THREE.BufferAttribute(prepPositions, 3));
    const prepMat = new THREE.PointsMaterial({ color: 0x00dbe9, size: 0.6, transparent: true, opacity: 0 });
    rgbSplitGroup.add(new THREE.Points(prepGeo, prepMat));

    // ─────────────────────────────────────────────────────────────────────
    // SCENE 3 — Spline-Style Particles Brain Hologram (left side)
    // ─────────────────────────────────────────────────────────────────────
    const cnnGroup  = new THREE.Group();
    cnnGroup.position.set(-22, 0, 0);
    g3.add(cnnGroup);

    // Central core removed as requested

    // Procedural brain points generator
    function generateBrainPoints(count) {
      const points = [];
      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        if (rand < 0.70) {
          // Cerebrum: wrinkled ellipsoid
          const theta = Math.random() * Math.PI;
          const phi = Math.random() * Math.PI * 2;
          const rX = 12.0;
          const rY = 9.0;
          const rZ = 7.5;
          const foldNoise = 1.0 + 0.15 * Math.sin(theta * 8) * Math.cos(phi * 8) 
                                + 0.08 * Math.sin(theta * 20) * Math.sin(phi * 20);
          const dist = 0.5 + Math.random() * 0.5;
          const r = foldNoise * dist;
          let x = Math.sin(theta) * Math.cos(phi) * rX * r;
          let y = Math.cos(theta) * rY * r;
          let z = Math.sin(theta) * Math.sin(phi) * rZ * r;
          x += 2.0; // shift forward
          y += 3.0; // shift upward
          const fissureGap = 0.6;
          if (Math.abs(z) < fissureGap && Math.abs(x) > 3.0) {
            z += Math.sign(z || (Math.random() - 0.5)) * fissureGap;
          }
          points.push(new THREE.Vector3(x, y, z));
        } else if (rand < 0.90) {
          // Cerebellum: wrinkled lower back
          const theta = Math.random() * Math.PI;
          const phi = Math.random() * Math.PI * 2;
          const rX = 5.0;
          const rY = 4.0;
          const rZ = 4.5;
          const foldNoise = 1.0 + 0.1 * Math.sin(theta * 15) * Math.cos(phi * 15);
          const dist = 0.4 + Math.random() * 0.6;
          const r = foldNoise * dist;
          let x = Math.sin(theta) * Math.cos(phi) * rX * r;
          let y = Math.cos(theta) * rY * r;
          let z = Math.sin(theta) * Math.sin(phi) * rZ * r;
          x += -6.0;
          y += -4.0;
          z += (Math.random() - 0.5) * 1.5;
          points.push(new THREE.Vector3(x, y, z));
        } else {
          // Brainstem: stem at bottom
          const height = 7.0;
          const radius = 1.2;
          const yVal = -4.0 - Math.random() * height;
          const angle = Math.random() * Math.PI * 2;
          const currentRadius = radius * (1.0 - (yVal + 4.0) / -14.0);
          const dist = Math.random() * currentRadius;
          const xVal = -2.5 + Math.cos(angle) * dist;
          const zVal = Math.sin(angle) * dist;
          points.push(new THREE.Vector3(xVal, yVal, zVal));
        }
      }
      return points;
    }

    const brainPoints = generateBrainPoints(1200);
    const originalBrainPoints = brainPoints.map(p => p.clone());

    // 1. Nodes: Particle cloud with HSL custom colors
    const brainGeo = new THREE.BufferGeometry().setFromPoints(brainPoints);
    
    // Assign custom color gradient matching Spline Particles
    const brainColors = [];
    brainPoints.forEach((p) => {
      const color = new THREE.Color();
      if (p.x < -2.0) {
        // Back lobes/cerebellum: glowing magenta/pink
        color.setHSL(0.92 + Math.random() * 0.06, 0.95, 0.55);
      } else if (p.y > 4.0) {
        // Top cortex: glowing electric cyan
        color.setHSL(0.51 + Math.random() * 0.05, 1.0, 0.55);
      } else {
        // Core/Middle: deep blue/violet
        color.setHSL(0.60 + Math.random() * 0.05, 0.95, 0.50);
      }
      brainColors.push(color.r, color.g, color.b);
    });
    brainGeo.setAttribute('color', new THREE.Float32BufferAttribute(brainColors, 3));

    const brainNodeMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const brainNodePoints = new THREE.Points(brainGeo, brainNodeMat);
    cnnGroup.add(brainNodePoints);

    // 2. Synapses: Connecting lines with indices
    const connections = [];
    const maxDist = 5.0;
    const minDist = 1.5;
    for (let i = 0; i < brainPoints.length; i++) {
      let connCount = 0;
      for (let j = i + 1; j < brainPoints.length; j++) {
        // Connect only a subset to preserve line density & performance
        if (Math.random() > 0.35) continue;
        const d = brainPoints[i].distanceTo(brainPoints[j]);
        if (d > minDist && d < maxDist && connCount < 2) {
          connections.push({
            a: brainPoints[i],
            b: brainPoints[j],
            startIndex: i,
            endIndex: j
          });
          connCount++;
        }
      }
    }

    const linePoints = [];
    connections.forEach((conn) => {
      linePoints.push(conn.a, conn.b);
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x005577,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const brainLines = new THREE.LineSegments(lineGeo, lineMat);
    cnnGroup.add(brainLines);

    // 3. Glowing pulses flowing through synapses (120 pulses)
    const pulseData = [];
    const numPulses = 120;
    for (let i = 0; i < numPulses; i++) {
      if (connections.length === 0) break;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const pmat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.45 ? 0x00ffcc : 0xff0060, // cyan or hot coral pink
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      });
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), pmat);
      cnnGroup.add(pulse);
      pulseData.push({
        mesh: pulse,
        startIndex: conn.startIndex,
        endIndex: conn.endIndex,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.012,
        connectionList: connections
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // SCENE 4 — Evaluation: Poster + Bounding Box + Genre Probability Bars
    // ─────────────────────────────────────────────────────────────────────
    const evalGroup = new THREE.Group();
    evalGroup.position.set(22, 0, 0);
    g4.add(evalGroup);

    // Main poster
    const evalTex    = loader.load(posterUrls[2]);
    const evalPoster = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 21),
      new THREE.MeshStandardMaterial({ map: evalTex, roughness: 0.2, metalness: 0.3, transparent: true, opacity: 0 })
    );
    evalGroup.add(evalPoster);

    // 3D Wireframe bounding box
    const bboxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 6, 2));
    const bboxMat   = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0 });
    const bboxLine  = new THREE.LineSegments(bboxEdges, bboxMat);
    bboxLine.position.set(-1, 3, 1.5);
    evalGroup.add(bboxLine);

    // Genre probability bars
    const barDefs = [
      { val: 0.92, color: 0x00e5ff, y: 4 },
      { val: 0.81, color: 0xff0060, y: 0 },
      { val: 0.15, color: 0xffffff, y: -4 },
    ];
    barDefs.forEach(({ val, color, y }) => {
      const pos = new THREE.Vector3(12, y, 2);

      // Base (wireframe outline)
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x122131, roughness: 0.5, wireframe: true, transparent: true, opacity: 0 });
      const base    = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 1.2), baseMat);
      base.position.copy(pos);
      evalGroup.add(base);

      // Fill bar (starts at left edge — use geometry offset so scale anchor is left)
      const width   = 6 * val;
      const fillGeo = new THREE.BoxGeometry(width, 1.0, 1.0);
      fillGeo.translate(width / 2 - 3, 0, 0); // align left edge to x=-3 (centre-3)
      const fillMat = new THREE.MeshStandardMaterial({ color, roughness: 0.2, metalness: 0.7, transparent: true, opacity: 0 });
      const fill    = new THREE.Mesh(fillGeo, fillMat);
      fill.position.copy(pos);
      evalGroup.add(fill);
    });

    // ── Star field (always visible) ───────────────────────────────────────
    const starCount = 800;
    const starPos   = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 800;
    const starGeo  = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat  = new THREE.PointsMaterial({ color: 0xffffff, size: 0.45, transparent: true, opacity: 0.35, sizeAttenuation: true });
    scene.add(new THREE.Points(starGeo, starMat));

    // ─────────────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────────────

    /**
     * Returns 0-1 opacity for group `index` at current scroll fraction.
     * Uses a smooth sin-based windowing around the group's centre scroll position.
     */
    const getTargetOpacity = (scroll, index) => {
      const centers = [0.0, 0.25, 0.5, 0.75, 1.0];
      const dist    = Math.abs(scroll - centers[index]);
      const win     = (index === 0 || index === 4) ? 0.22 : 0.18; // end groups wider
      if (dist >= win) return 0;
      return Math.sin(((1 - dist / win) * Math.PI) / 2); // smooth ease
    };

    /**
     * Traverse a group and lerp every material's opacity toward `target`.
     * Each material type gets a balanced multiplier so the scene looks right.
     */
    const fadeGroup = (group, target) => {
      group.traverse((obj) => {
        // Skip objects without a single material (e.g. raw THREE.Group)
        if (!obj.isMesh && !obj.isLine && !obj.isLineSegments && !obj.isPoints) return;
        const mat = obj.material;
        if (!mat) return;

        // Ensure transparent flag is set (required for opacity < 1 to render)
        if (!mat.transparent) mat.transparent = true;

        // Lines/points are naturally dimmer — keep them readable but subtle
        let mult = 1.0;
        if (obj.isPoints)                              mult = 0.75;
        if (obj.isLine || obj.isLineSegments)          mult = 0.50;

        const current = mat.opacity ?? 0;
        mat.opacity   = THREE.MathUtils.lerp(current, target * mult, 0.08);
        obj.visible   = mat.opacity > 0.004; // cull when nearly invisible
      });
    };

    // ─────────────────────────────────────────────────────────────────────
    // Animation loop
    // ─────────────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId;
    let smoothScroll = 0;

    // Camera positions per scene (alternates left/right for text layout)
    const CAM_POSITIONS = [
      new THREE.Vector3(-10, 0, 165), // Scene 0 — film reel (right), text left
      new THREE.Vector3( 10, 0, 165), // Scene 1 — deck (left), text right
      new THREE.Vector3(-10, 0, 165), // Scene 2 — RGB (right), text left
      new THREE.Vector3( 10, 0, 165), // Scene 3 — CNN (left), text right
      new THREE.Vector3(-10, 0, 165), // Scene 4 — eval (right), text left
    ];
    const CAM_POS_MOBILE = CAM_POSITIONS.map(() => new THREE.Vector3(0, 0, 230));

    const tick = () => {
      const t      = clock.getElapsedTime();
      const targetScroll = Math.max(0, Math.min(1, scrollRef.current)); // clamp 0-1
      smoothScroll = THREE.MathUtils.lerp(smoothScroll, targetScroll, 0.05); // butter-smooth scroll
      
      // Procedural drift to replace mouse parallax
      const mx     = Math.sin(t * 0.4) * 3; 
      const my     = Math.cos(t * 0.3) * 3;
      const mob    = window.innerWidth <= 1024;

      // ── Scene 0: GLB Camera + Film Reel Combined ──────────────────────
      const targetX0 = mob ? 0 : 22;
      
      combinedScene0Group.position.y = Math.sin(t * 1.2) * 1.5 + my * 0.6;
      combinedScene0Group.position.x = THREE.MathUtils.lerp(combinedScene0Group.position.x, targetX0 + mx * 0.5, 0.06);

      const rotSpeed = t * 0.35;
      const tiltSpeed = Math.sin(t * 0.5) * 0.08;

      filmReelGroup.rotation.y = rotSpeed;
      filmReelGroup.rotation.x = tiltSpeed;

      if (combinedScene0Group.userData.cameraWrapper) {
        combinedScene0Group.userData.cameraWrapper.rotation.y = rotSpeed;
        combinedScene0Group.userData.cameraWrapper.rotation.x = tiltSpeed;
      }

      // ── Scene 1: Poster deck ─────────────────────────────────────────
      const targetX1 = mob ? 0 : -22;
      cards.forEach((card, idx) => {
        card.position.y = Math.sin(t * 0.8 + idx * 0.9) * 1.2;
        card.rotation.x = Math.cos(t * 0.5 + idx) * 0.04;
      });
      posterDeckGroup.position.x = THREE.MathUtils.lerp(posterDeckGroup.position.x, targetX1 + mx * 0.5, 0.06);
      posterDeckGroup.position.y = THREE.MathUtils.lerp(posterDeckGroup.position.y, my * 0.6, 0.06);

      // ── Scene 2: RGB splits ───────────────────────────────────────────
      const targetX2 = mob ? 0 : 22;
      redCard.position.y   = Math.sin(t * 1.1)       * 1.0;
      greenCard.position.y = Math.sin(t * 1.1 + 1.0) * 1.0;
      blueCard.position.y  = Math.sin(t * 1.1 + 2.0) * 1.0;
      rgbSplitGroup.position.x = THREE.MathUtils.lerp(rgbSplitGroup.position.x, targetX2 + mx * 0.5, 0.06);
      rgbSplitGroup.position.y = THREE.MathUtils.lerp(rgbSplitGroup.position.y, my * 0.6, 0.06);

      // ── Scene 3: Spline-style Brain Synapses & Swarm ──────────────────
      const targetX3 = mob ? 0 : -22;
      
      // Update swarming positions
      const positions = brainGeo.attributes.position.array;
      const linePositions = lineGeo.attributes.position.array;
      
      for (let i = 0; i < brainPoints.length; i++) {
        const orig = originalBrainPoints[i];
        const idx = i * 3;
        
        // Complex orbital swarming noise using multiple sine/cosine frequencies
        const dx = Math.sin(t * 1.5 + orig.x * 0.2 + orig.y * 0.1) * 0.22;
        const dy = Math.cos(t * 1.8 + orig.y * 0.2 + orig.z * 0.1) * 0.22;
        const dz = Math.sin(t * 1.3 + orig.z * 0.2 + orig.x * 0.1) * 0.22;
        
        positions[idx]     = orig.x + dx;
        positions[idx + 1] = orig.y + dy;
        positions[idx + 2] = orig.z + dz;
        
        // Update the Vector3 references
        brainPoints[i].set(orig.x + dx, orig.y + dy, orig.z + dz);
      }
      brainGeo.attributes.position.needsUpdate = true;
      
      // Update line segments positions
      let lIdx = 0;
      connections.forEach(conn => {
        linePositions[lIdx++] = conn.a.x;
        linePositions[lIdx++] = conn.a.y;
        linePositions[lIdx++] = conn.a.z;
        
        linePositions[lIdx++] = conn.b.x;
        linePositions[lIdx++] = conn.b.y;
        linePositions[lIdx++] = conn.b.z;
      });
      lineGeo.attributes.position.needsUpdate = true;

      // Animate pulses along swarming connections
      pulseData.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1.0) {
          p.progress = 0.0;
          if (p.connectionList.length > 0) {
            const newConn = p.connectionList[Math.floor(Math.random() * p.connectionList.length)];
            p.startIndex = newConn.startIndex;
            p.endIndex = newConn.endIndex;
          }
        }
        const startPoint = brainPoints[p.startIndex];
        const endPoint = brainPoints[p.endIndex];
        if (startPoint && endPoint) {
          p.mesh.position.lerpVectors(startPoint, endPoint, p.progress);
        }
      });

      cnnGroup.rotation.y = t * 0.15;
      cnnGroup.position.x = THREE.MathUtils.lerp(cnnGroup.position.x, targetX3 + mx * 0.5, 0.06);
      cnnGroup.position.y = THREE.MathUtils.lerp(cnnGroup.position.y, my * 0.6, 0.06);

      // ── Scene 4: Eval bbox pulse ──────────────────────────────────────
      const targetX4 = mob ? 0 : 22;
      bboxLine.scale.setScalar(1.0 + Math.sin(t * 3.5) * 0.04);
      evalGroup.position.x = THREE.MathUtils.lerp(evalGroup.position.x, targetX4 + mx * 0.5, 0.06);
      evalGroup.position.y = THREE.MathUtils.lerp(evalGroup.position.y, my * 0.6, 0.06);

      // ── Scroll-driven opacity for each scene group ────────────────────
      const opacities = groups.map((_, idx) => getTargetOpacity(smoothScroll, idx));
      groups.forEach((g, idx) => {
        fadeGroup(g, opacities[idx]);
        // Slide active group forward, inactive groups back (recede into background)
        const targetZ = opacities[idx] > 0.01 ? 90 : -200;
        g.position.z  = THREE.MathUtils.lerp(g.position.z, targetZ, 0.08);
        g.visible = opacities[idx] > 0.001; // completely disable drawing when inactive
      });

      // ── Camera — continuously interpolated between scene positions ────
      const segment  = smoothScroll * 4;              // maps 0-1 to 0-4
      const segIdx   = Math.min(3, Math.floor(segment)); // 0,1,2,3
      const segT     = segment - segIdx;         // 0-1 within this segment
      const camArr   = mob ? CAM_POS_MOBILE : CAM_POSITIONS;
      const targetCam = new THREE.Vector3().lerpVectors(camArr[segIdx], camArr[segIdx + 1], segT);

      camera.position.lerp(targetCam, 0.05);
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -my * 0.01, 0.05);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y,  mx * 0.01, 0.05);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    tick();

    // ── Resize handler ────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
