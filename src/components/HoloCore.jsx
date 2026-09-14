import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

/* ────────────────────────────────────────────────────────────────
   3D Network Topology — bleeds softly beyond its container via
   radial mask + oversized canvas so there are no hard square edges.
   ──────────────────────────────────────────────────────────────── */

const NODE_COUNT = 80;
const MAX_LINK_LEN = 1.75;
const MAX_DEGREE = 3;
const TAU = Math.PI * 2;

function buildNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / NODE_COUNT;
    const r = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    const dist = 0.55 + Math.random() * 0.45;
    return {
      x: Math.cos(a) * r * dist,
      y: y * dist,
      z: Math.sin(a) * r * dist,
      hub: i % 10 === 0,
    };
  });

  const linkSet = new Set();
  const links = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const nb = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dz = nodes[i].z - nodes[j].z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < MAX_LINK_LEN) nb.push({ j, d });
    }
    nb.sort((p, q) => p.d - q.d)
      .slice(0, MAX_DEGREE)
      .forEach(({ j }) => {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!linkSet.has(k)) {
          linkSet.add(k);
          links.push([Math.min(i, j), Math.max(i, j)]);
        }
      });
  }
  return { nodes, links };
}

const { nodes: NET_NODES, links: NET_LINKS } = buildNetwork();
const HUB_INDICES = NET_NODES.map((n, i) => n.hub ? i : -1).filter((i) => i >= 0);

function makeGlowTex() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, 'rgba(255,255,255,1)');
  rad.addColorStop(0.08, 'rgba(255,255,255,0.92)');
  rad.addColorStop(0.3, 'rgba(255,255,255,0.4)');
  rad.addColorStop(0.7, 'rgba(255,255,255,0.08)');
  rad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function makeRingTex() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d');
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(64, 64, 58, 0, TAU);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function NetworkScene({ isDark, mouse, reduced }) {
  const groupRef = useRef(null);
  const vel = useRef({ x: 0, y: 0 });
  const rot = useRef({ x: -0.3, y: 0 });

  const hubGlowRefs = useRef([]);
  const hubCoreRefs = useRef([]);
  const hubRingRefs = useRef([]);

  const palette = useMemo(() => {
    if (isDark) {
      return {
        accent: new THREE.Color(45 / 255, 212 / 255, 191 / 255),
        spark: new THREE.Color(190 / 255, 242 / 255, 100 / 255),
        sky: new THREE.Color(56 / 255, 189 / 255, 248 / 255),
        dim: new THREE.Color(45 / 255, 212 / 255, 191 / 255).multiplyScalar(0.35),
      };
    }
    return {
      accent: new THREE.Color(13 / 255, 148 / 255, 136 / 255),
      spark: new THREE.Color(77 / 255, 124 / 255, 15 / 255),
      sky: new THREE.Color(2 / 255, 132 / 255, 199 / 255),
      dim: new THREE.Color(13 / 255, 148 / 255, 136 / 255).multiplyScalar(0.35),
    };
  }, [isDark]);

  const glowTex = useMemo(makeGlowTex, []);
  const ringTex = useMemo(makeRingTex, []);
  const blend = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

  const lineGeo = useMemo(() => {
    const pos = new Float32Array(NET_LINKS.length * 6);
    NET_LINKS.forEach(([a, b], i) => {
      pos[i * 6]     = NET_NODES[a].x;
      pos[i * 6 + 1] = NET_NODES[a].y;
      pos[i * 6 + 2] = NET_NODES[a].z;
      pos[i * 6 + 3] = NET_NODES[b].x;
      pos[i * 6 + 4] = NET_NODES[b].y;
      pos[i * 6 + 5] = NET_NODES[b].z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const nodeGeo = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    NET_NODES.forEach((n, i) => {
      pos[i * 3]     = n.x;
      pos[i * 3 + 1] = n.y;
      pos[i * 3 + 2] = n.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const pulseRef = useRef({ list: [], geo: null });
  const pulseGeo = useMemo(() => {
    const pos = new Float32Array(16 * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setDrawRange(0, 0);
    pulseRef.current.geo = g;
    return g;
  }, []);

  const ambientGeo = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * TAU;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 1.8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock, camera }, delta) => {
    if (reduced) return;
    const t = clock.elapsedTime;

    const tx = mouse.current.y * 0.55;
    const ty = mouse.current.x * 0.55 + t * 0.06;
    vel.current.x += (tx - rot.current.x) * 0.003;
    vel.current.y += (ty - rot.current.y) * 0.003;
    vel.current.x *= 0.92;
    vel.current.y *= 0.92;
    rot.current.x += vel.current.x;
    rot.current.y += vel.current.y;

    if (groupRef.current) {
      groupRef.current.rotation.x = rot.current.x;
      groupRef.current.rotation.y = rot.current.y;
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.03;
    }

    camera.position.x = Math.sin(t * 0.025) * 0.08;
    camera.position.y = Math.cos(t * 0.03) * 0.06;
    camera.lookAt(0, 0, 0);

    HUB_INDICES.forEach((idx, vi) => {
      const core = hubCoreRefs.current[idx];
      const glow = hubGlowRefs.current[idx];
      const ring = hubRingRefs.current[idx];
      const phase = t * 2.0 + vi * 1.7;
      const p = (Math.sin(phase) + 1) / 2;
      if (core) core.scale.setScalar(0.85 + p * 0.35);
      if (glow) {
        glow.scale.setScalar(1 + p * 0.9);
        glow.material.opacity = 0.06 + p * 0.14;
      }
      if (ring) {
        ring.scale.setScalar(1.2 + p * 1.4);
        ring.material.opacity = 0.18 + p * 0.22;
      }
    });

    const pr = pulseRef.current;
    if (pr.list.length < 14 && Math.random() < 0.07) {
      const li = (Math.random() * NET_LINKS.length) | 0;
      const [a, b] = NET_LINKS[li];
      pr.list.push({
        a, b, t: 0,
        speed: 0.015 + Math.random() * 0.02,
      });
    }
    pr.list = pr.list.filter((p) => (p.t += p.speed * delta * 60) <= 1);
    const pPos = pr.geo.attributes.position.array;
    pr.list.forEach((p, i) => {
      const na = NET_NODES[p.a], nb = NET_NODES[p.b];
      const f = p.t;
      pPos[i * 3]     = na.x + (nb.x - na.x) * f;
      pPos[i * 3 + 1] = na.y + (nb.y - na.y) * f;
      pPos[i * 3 + 2] = na.z + (nb.z - na.z) * f;
    });
    pr.geo.attributes.position.needsUpdate = true;
    pr.geo.setDrawRange(0, pr.list.length);

    if (ambientGeo) {
      const aPos = ambientGeo.attributes.position.array;
      for (let i = 0; i < 200; i++) {
        const i3 = i * 3;
        const x = aPos[i3], y = aPos[i3 + 1], z = aPos[i3 + 2];
        const rad = Math.sqrt(x * x + y * y + z * z);
        const th = Math.atan2(y, x) + delta * 0.003;
        const ph = Math.acos(Math.max(-1, Math.min(1, z / rad))) + delta * 0.001;
        aPos[i3]     = rad * Math.sin(ph) * Math.cos(th);
        aPos[i3 + 1] = rad * Math.sin(ph) * Math.sin(th);
        aPos[i3 + 2] = rad * Math.cos(ph);
      }
      ambientGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <pointLight position={[3, 3, 4]} intensity={isDark ? 1 : 0.6} color={palette.accent} distance={12} />
      <pointLight position={[-2, -2, -3]} intensity={isDark ? 0.5 : 0.3} color={palette.sky} distance={10} />

      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={isDark ? 0.025 : 0.06} />
      </mesh>

      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={palette.accent} transparent opacity={isDark ? 0.2 : 0.5} />
      </lineSegments>

      <points geometry={ambientGeo}>
        <pointsMaterial
          size={isDark ? 0.018 : 0.025}
          map={glowTex}
          blending={blend}
          depthWrite={false}
          transparent
          color={palette.accent}
          opacity={isDark ? 0.5 : 0.55}
          sizeAttenuation
        />
      </points>

      <points geometry={nodeGeo}>
        <pointsMaterial
          size={isDark ? 0.045 : 0.055}
          map={glowTex}
          blending={blend}
          depthWrite={false}
          transparent
          color={palette.accent}
          opacity={isDark ? 0.9 : 1}
          sizeAttenuation
        />
      </points>

      {HUB_INDICES.map((idx) => {
        const n = NET_NODES[idx];
        return (
          <group key={idx} position={[n.x, n.y, n.z]}>
            <mesh ref={(el) => { hubCoreRefs.current[idx] = el; }}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color={palette.accent} />
            </mesh>
            <mesh ref={(el) => { hubGlowRefs.current[idx] = el; }}>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshBasicMaterial color={palette.accent} transparent opacity={isDark ? 0.12 : 0.25} />
            </mesh>
            <sprite ref={(el) => { hubRingRefs.current[idx] = el; }}>
              <spriteMaterial
                map={ringTex}
                color={palette.accent}
                transparent
                opacity={isDark ? 0.25 : 0.5}
                blending={blend}
                depthWrite={false}
              />
            </sprite>
          </group>
        );
      })}

      <points geometry={pulseGeo}>
        <pointsMaterial
          size={isDark ? 0.065 : 0.08}
          map={glowTex}
          blending={blend}
          depthWrite={false}
          transparent
          color={palette.accent}
          opacity={isDark ? 0.95 : 1}
          sizeAttenuation
        />
      </points>

      <EffectComposer>
        <Bloom
          luminanceThreshold={isDark ? 0.15 : 0.7}
          luminanceSmoothing={0.9}
          intensity={isDark ? 0.65 : 0.1}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
}

const HoloCore = ({ size = 240, className = '' }) => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  const canvasSize = size * 1.5;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const onMove = useCallback((e) => {
    const r = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    };
  }, []);

  const onLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        width: size,
        height: size,
        position: 'relative',
        overflow: 'visible',
      }}
      className={className}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: canvasSize,
          height: canvasSize,
          transform: 'translate(-50%, -50%)',
          ...(isDark
            ? {
                maskImage: 'radial-gradient(circle, black 18%, rgba(0,0,0,0.4) 50%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(circle, black 18%, rgba(0,0,0,0.4) 50%, transparent 72%)',
              }
            : {}),
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.0], fov: 42 }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
          gl={{ antialias: true, alpha: true }}
          frameloop={visible ? 'always' : 'never'}
          style={{ width: '100%', height: '100%' }}
        >
          <NetworkScene isDark={isDark} mouse={mouseRef} reduced={reduced} />
        </Canvas>
      </div>
    </div>
  );
};

export default HoloCore;
