"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A 3D field of falling water droplets.
 *
 * Each droplet is a small teardrop rendered as two additive meshes — a bright
 * core and a soft blue glow — trailing a faint streak as it falls. When a
 * droplet reaches the "surface" near the bottom it spawns an expanding ripple
 * ring, then respawns up top. The whole rig parallaxes gently toward the
 * pointer. Everything scales down on small screens, pauses when off-screen or
 * when the tab is hidden, and is skipped entirely under reduced-motion.
 *
 * This is the plumbing counterpart to an electric "lightning field": instead of
 * bolts striking, water drips.
 */

type Drop = {
  core: THREE.Mesh;
  glow: THREE.Mesh;
  streak: THREE.Mesh;
  x: number;
  z: number;
  y: number;
  speed: number;
  scale: number;
  surface: number; // y at which it "lands"
};

type Ripple = {
  ring: THREE.Mesh;
  life: number;
  duration: number;
  x: number;
  z: number;
  scale: number;
};

const TOP = 5.4;

export default function DropletField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 640;
    const dropCount = isSmall ? 10 : 18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSmall,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const rig = new THREE.Group();
    scene.add(rig);

    // Shared geometries — cheap to reuse across every droplet.
    const dropGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const streakGeo = new THREE.CylinderGeometry(0.02, 0.05, 0.9, 6, 1, true);
    const ringGeo = new THREE.RingGeometry(0.5, 0.62, 40);

    const coreColor = new THREE.Color(0xddeeff);
    const glowColor = new THREE.Color(0x1e86e8);

    function surfaceFor() {
      // Vary where droplets "land" so ripples don't line up on one plane.
      return -3.6 - Math.random() * 1.2;
    }

    const drops: Drop[] = [];
    for (let i = 0; i < dropCount; i++) {
      const x = THREE.MathUtils.lerp(-6.5, 6.5, i / (dropCount - 1)) + (Math.random() - 0.5) * 1.4;
      const z = -3 + Math.random() * 4.5;
      const scale = THREE.MathUtils.mapLinear(z, -3, 1.5, 0.55, 1.15);

      const core = new THREE.Mesh(
        dropGeo,
        new THREE.MeshBasicMaterial({
          color: coreColor,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      // Teardrop: squash horizontally, stretch vertically.
      core.scale.set(scale * 0.8, scale * 1.5, scale * 0.8);

      const glow = new THREE.Mesh(
        dropGeo,
        new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      glow.scale.set(scale * 2.2, scale * 3.2, scale * 2.2);

      const streak = new THREE.Mesh(
        streakGeo,
        new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      streak.scale.set(scale, scale, scale);

      rig.add(glow, streak, core);

      drops.push({
        core,
        glow,
        streak,
        x,
        z,
        y: TOP + Math.random() * TOP * 2, // stagger start heights
        speed: (reduce ? 1.1 : 2.4) + Math.random() * 2.2,
        scale,
        surface: surfaceFor(),
      });
    }

    // Ripple pool — reused as droplets land.
    const ripples: Ripple[] = [];
    const RIPPLE_POOL = isSmall ? 6 : 10;
    for (let i = 0; i < RIPPLE_POOL; i++) {
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: glowColor,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2.15; // near-horizontal, slightly tilted to camera
      ring.visible = false;
      rig.add(ring);
      ripples.push({ ring, life: 0, duration: 1, x: 0, z: 0, scale: 1 });
    }

    function spawnRipple(x: number, y: number, z: number, scale: number) {
      const r = ripples.find((rp) => rp.life <= 0);
      if (!r) return;
      r.x = x;
      r.z = z;
      r.scale = scale;
      r.duration = 0.9 + Math.random() * 0.5;
      r.life = r.duration;
      r.ring.position.set(x, y, z);
      r.ring.visible = true;
    }

    // Ambient drifting mist for depth.
    const mistCount = isSmall ? 40 : 80;
    const mistPos = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = (Math.random() - 0.5) * 16;
      mistPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      mistPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const mistGeo = new THREE.BufferGeometry();
    mistGeo.setAttribute("position", new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
      color: 0x8fc6ff,
      size: 0.045,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mist = new THREE.Points(mistGeo, mistMat);
    scene.add(mist);

    // Pointer parallax (rig rotates gently toward the cursor).
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    function onMove(e: PointerEvent) {
      const r = mount!.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) clock.start();
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) clock.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    let raf = 0;

    function placeDrop(d: Drop) {
      d.core.position.set(d.x, d.y, d.z);
      d.glow.position.set(d.x, d.y, d.z);
      // Streak sits just above the droplet (the trail it leaves falling).
      d.streak.position.set(d.x, d.y + 0.55 * d.scale, d.z);
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Ease parallax.
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      rig.rotation.y = current.x * 0.18;
      rig.rotation.x = -current.y * 0.1;

      for (const d of drops) {
        d.y -= d.speed * dt;

        // Fade the streak in as it accelerates; keep the head bright.
        const sMat = d.streak.material as THREE.MeshBasicMaterial;
        sMat.opacity = 0.16 + 0.06 * Math.sin(t * 3 + d.x);

        if (d.y <= d.surface) {
          spawnRipple(d.x, d.surface, d.z, d.scale);
          // Respawn at the top with a fresh column position & speed.
          d.y = TOP + Math.random() * 2.5;
          d.x = THREE.MathUtils.clamp(d.x + (Math.random() - 0.5) * 1.6, -7, 7);
          d.speed = (reduce ? 1.1 : 2.4) + Math.random() * 2.2;
          d.surface = surfaceFor();
        }
        placeDrop(d);
      }

      for (const r of ripples) {
        if (r.life <= 0) continue;
        r.life -= dt;
        const k = Math.max(r.life / r.duration, 0);
        const grow = (1 - k) * 1.6 + 0.3;
        r.ring.scale.setScalar(grow * r.scale);
        (r.ring.material as THREE.MeshBasicMaterial).opacity = k * 0.5;
        if (r.life <= 0) r.ring.visible = false;
      }

      mist.rotation.y = t * 0.015;
      mist.position.y = Math.sin(t * 0.25) * 0.2;

      renderer.render(scene, camera);
    }
    frame();

    function onResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      drops.forEach((d) => {
        (d.core.material as THREE.Material).dispose();
        (d.glow.material as THREE.Material).dispose();
        (d.streak.material as THREE.Material).dispose();
      });
      ripples.forEach((r) => (r.ring.material as THREE.Material).dispose());
      dropGeo.dispose();
      streakGeo.dispose();
      ringGeo.dispose();
      mistGeo.dispose();
      mistMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
