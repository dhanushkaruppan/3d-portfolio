import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ── Logo3D (navbar wireframe crystal) ─────────────────────────────────────────
export function Logo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(40, 40);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(4, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let id;
    const tick = () => {
      mesh.rotation.x += 0.012;
      mesh.rotation.y += 0.016;
      renderer.render(scene, camera);
      id = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(id);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
}

// ── Background3D (main scene) ─────────────────────────────────────────────────
export function Background3D({ scrollFraction, activeBlock, randomMode = false }) {
  const mountRef  = useRef(null);
  const scrollRef = useRef(scrollFraction);
  const blockRef  = useRef(activeBlock);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => { scrollRef.current = scrollFraction; }, [scrollFraction]);
  useEffect(() => { blockRef.current  = activeBlock;    }, [activeBlock]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog   = new THREE.FogExp2(0x000000, 0.0004);

    // ── Camera ────────────────────────────────────────────────────────────────
    // FOV 50, starts pulled back so drone is centred in frame
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.5, 1500);
    camera.position.set(0, 0, 220);

    // ── Studio Lighting ───────────────────────────────────────────────────────
    const keyLight = new THREE.DirectionalLight(0xffffff, 5.0);
    keyLight.position.set(-40, 80, 120);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00d4ff, 2.0);
    fillLight.position.set(80, 20, 80);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff0060, 2.5);
    rimLight.position.set(0, -40, -120);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x0a0a1a, 4.5));

    const accentPt = new THREE.PointLight(0x00e5ff, 10, 300);
    accentPt.position.set(0, 10, 100);
    scene.add(accentPt);

    // ── PBR upgrade helper ────────────────────────────────────────────────────
    const upgradePBR = (model, metalness = 0.85, roughness = 0.2) => {
      model.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = child.receiveShadow = true;
        const old = child.material;
        child.material = new THREE.MeshStandardMaterial({
          color:    old && old.color ? old.color.clone() : new THREE.Color(0x445566),
          map:      old && old.map   ? old.map           : null,
          metalness, roughness, envMapIntensity: 1.5,
          transparent: true,
          opacity: 0,
        });
      });
    };

    // ── Smooth group opacity fade ─────────────────────────────────────────────
    const fadeGroup = (group, target, speed = 0.045) => {
      group.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        if (!child.material.transparent) child.material.transparent = true;
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity ?? 1, target, speed);
        child.visible = child.material.opacity > 0.005;
      });
    };

    const loader  = new GLTFLoader();
    const rotors  = [];

    // ═══════════════════════════════════════════════════════════════════════════
    // DRONE  — always present, flies to a designated position for each scene
    // ═══════════════════════════════════════════════════════════════════════════
    const droneGroup = new THREE.Group();
    // Start centred-right on screen
    droneGroup.position.set(14, 4, 95);
    scene.add(droneGroup);

    loader.load('/3d-model.glb', (gltf) => {
      const m = gltf.scene;
      m.scale.set(22, 22, 22); // slightly smaller than before so it never clips
      m.traverse((c) => {
        if (!c.isMesh) return;
        c.castShadow = c.receiveShadow = true;
        if (c.material) {
          c.material.metalness       = Math.max(c.material.metalness  ?? 0, 0.75);
          c.material.roughness       = Math.min(c.material.roughness  ?? 1, 0.25);
          c.material.envMapIntensity = 1.8;
          c.material.needsUpdate     = true;
        }
        const n = c.name.toLowerCase();
        if (n.includes('prop') || n.includes('rotor') || n.includes('blade')) rotors.push(c);
      });
      if (rotors.length === 0)
        m.traverse((c) => { if (c.isMesh && c.position.length() > 1.5) rotors.push(c); });
      droneGroup.add(m);
    }, undefined, (e) => console.warn('Drone load error:', e));

    // ═══════════════════════════════════════════════════════════════════════════
    // REALISTIC LIDAR / THERMAL SCAN  (child of droneGroup)
    // Scenes 2, 3, 4 only — NO scan on scene 0 or 1
    // ═══════════════════════════════════════════════════════════════════════════
    const scanSystem = new THREE.Group();
    droneGroup.add(scanSystem);

    // Outer spread cone — shortened height to stay in-screen
    const outerConeGeo = new THREE.ConeGeometry(3.8, 14, 32, 1, true);
    outerConeGeo.translate(0, -7, 0);
    const outerConeMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scanSystem.add(new THREE.Mesh(outerConeGeo, outerConeMat));

    // Inner bright core
    const innerConeGeo = new THREE.ConeGeometry(0.7, 14, 16, 1, true);
    innerConeGeo.translate(0, -7, 0);
    const innerConeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scanSystem.add(new THREE.Mesh(innerConeGeo, innerConeMat));

    // 5 horizontal scan rings descending inside the cone
    const scanRings = [];
    for (let i = 0; i < 4; i++) {
      const ri = 0.10 + i * 0.72;
      const ro = ri + 0.20;
      const ringGeo = new THREE.RingGeometry(ri, ro, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88, transparent: true, opacity: 0,
        side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -(2.5 + i * 2.8); // compressed spacing
      scanSystem.add(ring);
      scanRings.push(ring);
    }

    // Terrain hit-spot + ripple
    const hitSpotMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const hitSpot = new THREE.Mesh(new THREE.CircleGeometry(3.0, 48), hitSpotMat);
    hitSpot.rotation.x = -Math.PI / 2;
    hitSpot.position.y = -14; // raised up (shorter cone)
    scanSystem.add(hitSpot);

    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88, transparent: true, opacity: 0,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const ripple = new THREE.Mesh(new THREE.RingGeometry(2.8, 3.5, 48), rippleMat);
    ripple.rotation.x = -Math.PI / 2;
    ripple.position.y = -14; // raised up (shorter cone)
    scanSystem.add(ripple);

    // Helpers
    const setScanColor = (hex) => {
      [outerConeMat, innerConeMat, hitSpotMat, rippleMat].forEach(m => m.color.setHex(hex));
      scanRings.forEach(r => r.material.color.setHex(hex));
    };
    const lerpScanOpacity = (outerO, innerO, ringO, hitO, spd = 0.06) => {
      outerConeMat.opacity = THREE.MathUtils.lerp(outerConeMat.opacity, outerO, spd);
      innerConeMat.opacity = THREE.MathUtils.lerp(innerConeMat.opacity, innerO, spd);
      hitSpotMat.opacity   = THREE.MathUtils.lerp(hitSpotMat.opacity,   hitO,   spd);
      scanRings.forEach(r => {
        r.material.opacity = THREE.MathUtils.lerp(r.material.opacity, ringO, spd);
      });
    };
    const hideScan = () => lerpScanOpacity(0, 0, 0, 0, 0.1);

    // ═══════════════════════════════════════════════════════════════════════════
    // SCENE 1 — Raspberry Pi
    // Logic: The Raspberry Pi is the brain INSIDE the drone.
    // Visually: Pi appears below/behind the drone with a data-link glow between them.
    // ═══════════════════════════════════════════════════════════════════════════
    const piGroup = new THREE.Group();
    // Pi sits below-left of the drone in scene 1 — LEFT side of screen
    piGroup.position.set(-14, -2, 92);
    scene.add(piGroup);

    loader.load('/3d-rasbperry.glb', (gltf) => {
      const m = gltf.scene;
      m.scale.set(5, 5, 5);      // compact so Pi + drone both fit in frame
      m.rotation.set(0.3, 0.8, 0.1);
      upgradePBR(m, 0.9, 0.15);
      piGroup.add(m);
    }, undefined, (e) => console.warn('Pi load error:', e));

    // Data-link connector line (drone → Pi)
    const linkMat  = new THREE.LineBasicMaterial({
      color: 0x00e5ff, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const linkGeo  = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),     // origin = drone world pos (updated each frame)
      new THREE.Vector3(0, 0, 0),
    ]);
    const dataLink = new THREE.Line(linkGeo, linkMat);
    scene.add(dataLink);

    // ═══════════════════════════════════════════════════════════════════════════
    // SCENE 2 — Corn Plant (Crop Health)
    // ═══════════════════════════════════════════════════════════════════════════
    const cornGroup = new THREE.Group();
    cornGroup.position.set(14, -6, 92);
    scene.add(cornGroup);

    loader.load('/3d-corn-plant.glb', (gltf) => {
      const m = gltf.scene;
      m.scale.set(9, 9, 9);
      upgradePBR(m, 0.15, 0.75);
      cornGroup.add(m);
    }, undefined, (e) => console.warn('Corn load error:', e));

    // ═══════════════════════════════════════════════════════════════════════════
    // SCENE 3 — Wooden House / Farm Terrain
    // ═══════════════════════════════════════════════════════════════════════════
    const houseGroup = new THREE.Group();
    houseGroup.position.set(-12, -7, 92);
    scene.add(houseGroup);

    loader.load('/3d-wooden-house.glb', (gltf) => {
      const m = gltf.scene;
      m.scale.set(10, 10, 10);
      upgradePBR(m, 0.35, 0.65);
      houseGroup.add(m);
    }, undefined, (e) => console.warn('House load error:', e));

    // ═══════════════════════════════════════════════════════════════════════════
    // SCENE 4 — Disease Plant (CNN Pest Detection)
    // ═══════════════════════════════════════════════════════════════════════════
    const diseaseGroup = new THREE.Group();
    diseaseGroup.position.set(14, -6, 92);
    scene.add(diseaseGroup);

    loader.load('/3d-plant-deceise.glb', (gltf) => {
      const m = gltf.scene;
      m.scale.set(8, 8, 8);
      upgradePBR(m, 0.15, 0.8);
      diseaseGroup.add(m);
    }, undefined, (e) => console.warn('Disease load error:', e));

    // ── Starfield ──────────────────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const N = 2000;
    const sp = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) sp[i] = (Math.random() - 0.5) * 1400;
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    scene.add(new THREE.Points(starGeo,
      new THREE.PointsMaterial({
        color: 0xffffff, size: 0.45, transparent: true, opacity: 0.4,
        sizeAttenuation: true, blending: THREE.AdditiveBlending,
      })
    ));

    // ── Drone flight targets per block ─────────────────────────────────────────
    // Scene 1: drone flies CLOSE to and above the Pi (they appear as a pair)
    const droneTargets = [
      new THREE.Vector3(14,   4, 95),   // Block 0: Hero  — centred-right
      new THREE.Vector3(-12,  2, 92),   // Block 1: Pi    — drone LEFT side, hovers above Pi (was 6)
      new THREE.Vector3(14,   3.5, 92),   // Block 2: Corn  — drone hovers above plant (right) (was 8)
      new THREE.Vector3(-12,  3.5, 92),   // Block 3: House — drone hovers above house (left) (was 8)
      new THREE.Vector3(14,   3.5, 92),   // Block 4: Disease plant (right) (was 8)
    ];

    // ── Accent colours ─────────────────────────────────────────────────────────
    const accentColors = [
      new THREE.Color(0x00e5ff),
      new THREE.Color(0x00e5ff),
      new THREE.Color(0x00ff88),
      new THREE.Color(0x00d4ff),
      new THREE.Color(0xff0060),
    ];

    // ── Camera targets ─────────────────────────────────────────────────────────
    const camPos  = new THREE.Vector3(0, 0, 220);
    const camRotY = { v: 0 };

    // ── Mouse ──────────────────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t      = clock.getElapsedTime();
      const block  = blockRef.current;
      const scroll = scrollRef.current;
      const mx     = mouseRef.current.x;
      const my     = mouseRef.current.y;
      const mobile = window.innerWidth <= 1024;
      const isRandom = randomMode.current || randomMode;

      // ── Rotor spin ────────────────────────────────────────────────────────
      rotors.forEach((r) => { r.rotation.y += 0.5; });

      // ── Drone flight + hover (smooth lerp) ───────────────────────────────
      if (isRandom) {
        const rx = Math.sin(t * 0.5) * 15;
        const ry = 2 + Math.sin(t * 0.7) * 6;
        const rz = 90 + Math.cos(t * 0.4) * 15;
        droneGroup.position.lerp(new THREE.Vector3(rx, ry, rz), 0.02);
      } else {
        const dt = droneTargets[block];
        const hoverY = dt.y + Math.sin(t * 1.2) * 0.6; // gentle float
        droneGroup.position.lerp(
          new THREE.Vector3(dt.x, hoverY, block === 0 ? dt.z + scroll * 10 : dt.z),
          0.04  // smooth
        );
      }
      // Mouse parallax tilt — gentle, Spline-style
      droneGroup.rotation.x = THREE.MathUtils.lerp(droneGroup.rotation.x, my * 0.14, 0.04);
      droneGroup.rotation.y = THREE.MathUtils.lerp(droneGroup.rotation.y, mx * 0.18 + t * 0.2, 0.04);
      droneGroup.rotation.z = THREE.MathUtils.lerp(droneGroup.rotation.z, -mx * 0.05, 0.04);

      // ── Scene 1: Pi + Drone combined animation ───────────────────────────
      // Pi fades in, drone is nearby — no scan.
      // The data-link line animates between the two as if transmitting telemetry.
      const piVisible = block === 1;
      fadeGroup(piGroup, piVisible ? 1 : 0);
      if (piVisible) {
        // Pi gently bobs in sync with the drone hover
        piGroup.position.y = -2 + Math.sin(t * 1.2 + 1.0) * 0.35;
        // Slow rotation toward drone
        piGroup.rotation.y = THREE.MathUtils.lerp(piGroup.rotation.y, mx * 0.12 + 0.5, 0.03);
        piGroup.rotation.x = THREE.MathUtils.lerp(piGroup.rotation.x, my * 0.08, 0.03);

        // Update data-link endpoints
        const droneWorldPos = new THREE.Vector3();
        droneGroup.getWorldPosition(droneWorldPos);
        const piWorldPos = new THREE.Vector3();
        piGroup.getWorldPosition(piWorldPos);
        const pts = linkGeo.attributes.position;
        pts.setXYZ(0, droneWorldPos.x, droneWorldPos.y, droneWorldPos.z);
        pts.setXYZ(1, piWorldPos.x,    piWorldPos.y,    piWorldPos.z);
        pts.needsUpdate = true;
        // Pulsing link opacity — data packets
        linkMat.opacity = 0.25 + 0.25 * Math.sin(t * 6.0);
      } else {
        linkMat.opacity = THREE.MathUtils.lerp(linkMat.opacity, 0, 0.1);
      }

      // ── Scan system (blocks 2, 3, 4 only) ───────────────────────────────
      // Animate rings: each pulses with a time offset (lidar sweep)
      scanRings.forEach((ring, i) => {
        if (ring.material.opacity > 0.01) {
          ring.material.opacity *= 0.92;
          ring.material.opacity += (0.5 + 0.5 * Math.sin(t * 3.5 - i * 0.6)) * ring.material.opacity * 0.08;
        }
        ring.rotation.z = t * (0.35 + i * 0.04);
      });
      // Ripple breathes
      const rp = 0.5 + 0.5 * Math.sin(t * 4.0);
      rippleMat.opacity = THREE.MathUtils.lerp(
        rippleMat.opacity, hitSpotMat.opacity > 0.01 ? rp * 0.5 : 0, 0.08
      );
      ripple.scale.x = ripple.scale.y = 1 + 0.2 * Math.sin(t * 4.0);

      if (block === 2) {
        setScanColor(0x00ff88); // Green — NDVI crop scan
        lerpScanOpacity(0.10, 0.38, 0.28, 0.09);
        scanSystem.rotation.y = t * 0.5;
      } else if (block === 3) {
        setScanColor(0x00e5ff); // Cyan — path mapping
        lerpScanOpacity(0.09, 0.32, 0.24, 0.08);
        scanSystem.rotation.y = -t * 0.4;
      } else if (block === 4) {
        setScanColor(0xff2255); // Red — CNN pest alert
        lerpScanOpacity(0.13, 0.46, 0.33, 0.11);
        scanSystem.rotation.y = t * 0.85;
      } else {
        // Blocks 0 & 1: no scan
        hideScan();
      }

      // ── Scene object visibility ───────────────────────────────────────────
      // Pi handled above; rest fade normally
      fadeGroup(cornGroup,    block === 2 ? 1 : 0);
      fadeGroup(houseGroup,   block === 3 ? 1 : 0);
      fadeGroup(diseaseGroup, block === 4 ? 1 : 0);

      // Slow elegant rotation + mouse parallax on each ground model
      const rotateMouse = (group, baseSpeed) => {
        group.rotation.y = THREE.MathUtils.lerp(
          group.rotation.y, group.rotation.y + baseSpeed * 0.016 + mx * 0.05, 0.04
        );
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, my * 0.08, 0.03);
      };
      rotateMouse(cornGroup,    0.10);
      rotateMouse(houseGroup,   0.08);
      rotateMouse(diseaseGroup, 0.10);

      // ── Accent light ──────────────────────────────────────────────────────
      accentPt.color.lerp(accentColors[block] || accentColors[0], 0.035);
      accentPt.intensity = 10 + Math.sin(t * 1.8) * 2;

      // ── Camera with mouse parallax ────────────────────────────────────────
      // All scenes use a comfortable zoom (z=155) so objects are fully in frame
      if (block === 0) {
        // Hero: drone centred-right, slight parallax
        camPos.set(mx * 1.5, my * 1.5 + (mobile ? 6 : 4), mobile ? 215 : 190);
        camRotY.v = 0;
      } else if (block === 1) {
        // Pi scene: camera pans LEFT (objects on left side)
        camPos.set(mx * 2 + (mobile ? 0 : -4), my * 1.5, mobile ? 148 : 128);
        camRotY.v = mobile ? 0 : -0.05 + mx * 0.02;
      } else if (block === 2) {
        // Corn: right side
        camPos.set(mx * 2 + (mobile ? 0 : 4), my * 1.5, mobile ? 146 : 126);
        camRotY.v = mobile ? 0 : 0.05 + mx * 0.02;
      } else if (block === 3) {
        // House: left side
        camPos.set(mx * 2 + (mobile ? 0 : -4), my * 1.5, mobile ? 146 : 126);
        camRotY.v = mobile ? 0 : -0.05 + mx * 0.02;
      } else if (block === 4) {
        // Disease: right side
        camPos.set(mx * 2 + (mobile ? 0 : 4), my * 1.5, mobile ? 146 : 126);
        camRotY.v = mobile ? 0 : 0.05 + mx * 0.02;
      }

      camera.position.lerp(camPos, 0.04);
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, my * -0.02,  0.04);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, camRotY.v,    0.04);

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [randomMode]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
