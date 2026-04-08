"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let animationId: number;

    const init = async () => {
      const THREE = await import("three");
      // If unmounted while waiting for import, bail before touching the DOM
      if (cancelled) return;

      const W = mount.clientWidth;
      const H = mount.clientHeight;
      const isMobile = window.innerWidth < 768;

      /* ── Renderer ───────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      /* ── Scene & Camera ─────────────────────────────── */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.z = 7;

      /* ── Circular particle texture ──────────────────── */
      const canvas2d = document.createElement("canvas");
      canvas2d.width = 64;
      canvas2d.height = 64;
      const ctx = canvas2d.getContext("2d")!;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      const dotTexture = new THREE.CanvasTexture(canvas2d);

      /* ── Lights ─────────────────────────────────────── */
      // Ambient — very dim so dark areas stay dark
      scene.add(new THREE.AmbientLight(0xffffff, 0.04));

      // Key light — strong directional from top-right for the main highlight
      const keyLight = new THREE.SpotLight(0xffffff, 80, 30, Math.PI / 5, 0.35, 1.5);
      keyLight.position.set(4, 6, 4);
      scene.add(keyLight);

      // Fill light — cold blue-white from left, subtle
      const fillLight = new THREE.PointLight(0xc8e0ff, 8, 18);
      fillLight.position.set(-5, 1, 3);
      scene.add(fillLight);

      // Rim light — from behind, creates edge separation
      const rimLight = new THREE.PointLight(0xffffff, 10, 20);
      rimLight.position.set(0, -4, -5);
      scene.add(rimLight);

      // Sparkle lights — orbit to create facet shimmer
      const spark1 = new THREE.PointLight(0xffffff, 22, 5);
      scene.add(spark1);
      const spark2 = new THREE.PointLight(0xe0f0ff, 16, 4);
      scene.add(spark2);
      const spark3 = new THREE.PointLight(0xffffff, 14, 4);
      scene.add(spark3);

      /* ── Main group ─────────────────────────────────── */
      const group = new THREE.Group();
      group.position.x = isMobile ? 0 : 1.8;
      group.position.y = -0.1;
      scene.add(group);

      /* ── Core gem — dark glossy material ────────────── */
      // Non-indexed geometry so flat shading gives hard facets
      const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
      // Convert to non-indexed for sharp flat facets
      const nonIndexed = coreGeo.toNonIndexed();
      nonIndexed.computeVertexNormals();

      const coreMat = new THREE.MeshPhongMaterial({
        color: 0x080808,        // near-black
        emissive: 0x000000,
        specular: 0xffffff,     // pure white specular for glassy highlights
        shininess: 400,         // very high — tight, bright specular spots
        flatShading: true,
        transparent: false,
      });
      const core = new THREE.Mesh(nonIndexed, coreMat);
      group.add(core);

      /* Inner gem — slightly smaller, slightly lighter for depth */
      const innerGeo = new THREE.IcosahedronGeometry(0.72, 1).toNonIndexed();
      innerGeo.computeVertexNormals();
      const innerMat = new THREE.MeshPhongMaterial({
        color: 0x111111,
        specular: 0xffffff,
        shininess: 600,
        flatShading: true,
        transparent: true,
        opacity: 0.55,
        side: THREE.BackSide,
      });
      group.add(new THREE.Mesh(innerGeo, innerMat));

      /* Thin wireframe overlay — very subtle */
      const wireGeo = new THREE.IcosahedronGeometry(1.08, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x444444,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      group.add(wire);

      /* ── Orbit rings — glowing halos ─────────────────── */
      // Primary ring — warm white glow, steep diagonal tilt
      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.72, 0.012, 16, 160),
        new THREE.MeshBasicMaterial({ color: 0xdde8ff, transparent: true, opacity: 0.5 })
      );
      ring1.rotation.x = Math.PI / 4;
      ring1.rotation.y = Math.PI / 10;
      group.add(ring1);



      /* ── Circular particles (floating dust/sparkles) ── */
      const PARTICLE_COUNT = 180;
      const pPos = new Float32Array(PARTICLE_COUNT * 3);
      const pSizes = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.2 + Math.pow(Math.random(), 0.5) * 2.5;
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
        pSizes[i] = 0.015 + Math.random() * 0.025;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("size", new THREE.BufferAttribute(pSizes, 1));
      const pMat = new THREE.PointsMaterial({
        color: 0xcccccc,
        size: 0.022,
        map: dotTexture,
        transparent: true,
        opacity: 0.45,
        alphaTest: 0.01,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      /* ── Mouse tracking ─────────────────────────────── */
      let mx = 0, my = 0, tx = 0, ty = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      const onTouch = (e: TouchEvent) => {
        mx = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
        my = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse);
      window.addEventListener("touchmove", onTouch, { passive: true });

      /* ── Resize ──────────────────────────────────────── */
      const onResize = () => {
        if (!mount) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        group.position.x = window.innerWidth < 768 ? 0 : 1.8;
      };
      window.addEventListener("resize", onResize);

      /* ── Animation loop ─────────────────────────────── */
      const clock = new THREE.Clock();

      const tick = () => {
        animationId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        // Smooth mouse lerp
        tx += (mx * 0.6 - tx) * 0.04;
        ty += (my * 0.45 - ty) * 0.04;

        // Gem rotation — slow and steady
        group.rotation.y = t * 0.14 + tx * 0.8;
        group.rotation.x = ty * 0.5 + Math.sin(t * 0.2) * 0.04;

        // Wireframe counter-spin
        wire.rotation.y = -t * 0.18;
        wire.rotation.z =  t * 0.09;

        // Rings orbit
        ring1.rotation.z =  t * 0.16;


        // Floating particles drift
        particles.rotation.y =  t * 0.025 + tx * 0.08;
        particles.rotation.x =  Math.sin(t * 0.12) * 0.05 + ty * 0.06;

        // Sparkle lights orbit tightly around the gem — create facet flashes
        spark1.position.set(
          Math.sin(t * 1.3) * 1.8 + group.position.x,
          Math.cos(t * 0.9) * 1.5,
          Math.cos(t * 1.1) * 1.8
        );
        spark2.position.set(
          Math.cos(t * 0.8 + 2) * 2.0 + group.position.x,
          Math.sin(t * 1.4 + 1) * 1.6,
          Math.sin(t * 0.7 + 1) * 2.0
        );
        spark3.position.set(
          Math.sin(t * 1.1 + 4) * 1.6 + group.position.x,
          Math.cos(t * 1.2 + 3) * 1.4,
          Math.cos(t * 0.9 + 2) * 1.6
        );

        // Key spotlight tracks slowly for dramatic sweep
        keyLight.position.x = 3 + Math.sin(t * 0.3) * 2;
        keyLight.position.z = 4 + Math.cos(t * 0.3) * 1;

        renderer.render(scene, camera);
      };

      tick();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("touchmove", onTouch);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        dotTexture.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    let cleanupFn: (() => void) | undefined;
    init().then(fn => {
      if (cancelled) fn?.();
      else cleanupFn = fn;
    });
    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
