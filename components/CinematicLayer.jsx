'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CinematicLayer
 * A transparent, full-viewport Three.js canvas that renders slow-floating
 * warm bokeh particles with additive blending — the "practical light" dust
 * that drifts behind a talking-head shot in a film. Mouse movement gently
 * parallaxes the camera for a dreamy, depth-rich feel.
 */
export default function CinematicLayer({ particleCount = 140 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- Scene setup -------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // --- Particle geometry --------------------------------------------
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count); // per-particle phase offset
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const warmth = new Float32Array(count); // 0 = white, 1 = full ember

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2;

      seeds[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.3;
      sizes[i] = 0.15 + Math.random() * 0.55;
      warmth[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aWarmth', new THREE.BufferAttribute(warmth, 1));

    // Soft round glow sprite generated on a canvas (no external asset needed)
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSprite: { value: sprite },
        uEmber: { value: new THREE.Color('#ff8c42') },
        uWhite: { value: new THREE.Color('#fff6ec') },
      },
      vertexShader: `
        attribute float aSeed;
        attribute float aSpeed;
        attribute float aSize;
        attribute float aWarmth;
        uniform float uTime;
        varying float vWarmth;
        varying float vFlicker;
        void main() {
          vWarmth = aWarmth;
          vec3 pos = position;
          pos.x += sin(uTime * aSpeed + aSeed) * 0.6;
          pos.y += sin(uTime * aSpeed * 0.7 + aSeed * 2.0) * 0.4 + uTime * aSpeed * 0.05;
          pos.y = mod(pos.y + 6.0, 12.0) - 6.0;
          vFlicker = 0.6 + 0.4 * sin(uTime * 1.5 + aSeed * 3.0);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * 90.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite;
        uniform vec3 uEmber;
        uniform vec3 uWhite;
        varying float vWarmth;
        varying float vFlicker;
        void main() {
          vec4 tex = texture2D(uSprite, gl_PointCoord);
          vec3 color = mix(uWhite, uEmber, vWarmth);
          float alpha = tex.a * vFlicker * 0.55;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse parallax --------------------------------------------
    const mouse = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    function handlePointerMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // --- Resize --------------------------------------------------------
    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    // --- Animation loop --------------------------------------------
    let raf;
    const clock = new THREE.Clock();
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      targetCam.x += (mouse.x * 0.8 - targetCam.x) * 0.02;
      targetCam.y += (-mouse.y * 0.5 - targetCam.y) * 0.02;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    tick();

    // --- Cleanup: dispose all GPU resources -----------------------------
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [particleCount]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
