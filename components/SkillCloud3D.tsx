"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  Billboard,
  MeshDistortMaterial,
  Sparkles,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/* ─── Types ─── */

export interface SkillData {
  name: string;
  level: number;
  category: string;
  isDimmed?: boolean;
}

/* ─── Apple theme colors ─── */

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#dc2626",
  Frameworks: "#ea580c",
  Databases: "#d97706",
  "AI/ML": "#dc2626",
  Tools: "#ea580c",
  Core: "#78716c",
};

const BG_COLOR = 0xfaf8f5;
const CONNECTION_THRESHOLD = 2.2;
const MAX_CONNECTIONS = 60;

/* ─── Simplex 3D Noise (Stefan Gustavson, compact) ─── */

const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

const PERM = new Uint8Array(512);
const PERM_MOD12 = new Uint8Array(512);
{
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    PERM_MOD12[i] = PERM[i] % 12;
  }
}

function dot3(g: number[], x: number, y: number, z: number) {
  return g[0] * x + g[1] * y + g[2] * z;
}

const F3 = 1 / 3;
const G3 = 1 / 6;

function noise3D(xin: number, yin: number, zin: number): number {
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const x0 = xin - (i - t);
  const y0 = yin - (j - t);
  const z0 = zin - (k - t);
  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }
  const x1 = x0 - i1 + G3; const y1 = y0 - j1 + G3; const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2 * G3; const y2 = y0 - j2 + 2 * G3; const z2 = z0 - k2 + 2 * G3;
  const x3 = x0 - 1 + 3 * G3; const y3 = y0 - 1 + 3 * G3; const z3 = z0 - 1 + 3 * G3;
  const ii = i & 255; const jj = j & 255; const kk = k & 255;
  let n0: number, n1: number, n2: number, n3: number;
  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * dot3(GRAD3[PERM_MOD12[ii + PERM[jj + PERM[kk]]]], x0, y0, z0));
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * dot3(GRAD3[PERM_MOD12[ii + i1 + PERM[jj + j1 + PERM[kk + k1]]]], x1, y1, z1));
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * dot3(GRAD3[PERM_MOD12[ii + i2 + PERM[jj + j2 + PERM[kk + k2]]]], x2, y2, z2));
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  n3 = t3 < 0 ? 0 : (t3 *= t3, t3 * t3 * dot3(GRAD3[PERM_MOD12[ii + 1 + PERM[jj + 1 + PERM[kk + 1]]]], x3, y3, z3));
  return 32 * (n0 + n1 + n2 + n3);
}

/* ─── Fibonacci Sphere Placement ─── */

function fibonacciSphere(count: number, minR: number, maxR: number) {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const r = minR + Math.random() * (maxR - minR);
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radiusAtY * r,
        y * r * 0.6,
        Math.sin(theta) * radiusAtY * r
      )
    );
  }
  return points;
}

/* ─── Shared cursor position ref ─── */

const cursorRef = { current: new THREE.Vector3(999, 999, 999) };

/* ─── PostProcessing (bloom) ─── */

function PostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.6,
      0.4,
      0.7
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    composerRef.current = composer;
    return () => composer.dispose();
  }, [gl, scene, camera]);

  useEffect(() => {
    if (composerRef.current) composerRef.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
}

/* ─── Connection Lines ─── */

function ConnectionLines({ orbsRef }: { orbsRef: React.MutableRefObject<THREE.Vector3[]> }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(MAX_CONNECTIONS * 6);
    const colors = new Float32Array(MAX_CONNECTIONS * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame(() => {
    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;
    const orbs = orbsRef.current;
    let idx = 0;
    const count = orbs.length;

    for (let i = 0; i < count && idx < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < count && idx < MAX_CONNECTIONS; j++) {
        const d = orbs[i].distanceTo(orbs[j]);
        if (d < CONNECTION_THRESHOLD) {
          const alpha = (1 - d / CONNECTION_THRESHOLD) * 0.12;
          const vi = idx * 6;
          positions[vi] = orbs[i].x;
          positions[vi + 1] = orbs[i].y;
          positions[vi + 2] = orbs[i].z;
          positions[vi + 3] = orbs[j].x;
          positions[vi + 4] = orbs[j].y;
          positions[vi + 5] = orbs[j].z;
          colors[vi] = colors[vi + 1] = colors[vi + 2] = alpha;
          colors[vi + 3] = colors[vi + 4] = colors[vi + 5] = alpha;
          idx++;
        }
      }
    }
    geometry.setDrawRange(0, idx * 2);
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={1} />
    </lineSegments>
  );
}

/* ─── Cursor Tracker ─── */

function CursorTracker() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const v = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    cursorRef.current = camera.position.clone().add(dir.multiplyScalar(dist * 0.6));
  });

  return null;
}

/* ─── Skill Orb ─── */

function SkillOrb({
  skill,
  basePosition,
  orbsRef,
  index,
}: {
  skill: SkillData;
  basePosition: THREE.Vector3;
  orbsRef: React.MutableRefObject<THREE.Vector3[]>;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = CATEGORY_COLORS[skill.category] || "#78716c";
  const size = 0.06 + (skill.level / 100) * 0.1;

  const seed = useMemo(() => new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100), []);
  const driftSpeed = 0.08 + Math.random() * 0.07;
  const driftAmplitude = 0.3 + Math.random() * 0.3;

  const scaleTarget = useRef(1);
  const emissiveTarget = useRef(0.4);
  const glowOpacityTarget = useRef(0.04);

  useEffect(() => {
    scaleTarget.current = hovered ? 1.5 : 1;
    emissiveTarget.current = hovered ? 1.4 : 0.4;
    glowOpacityTarget.current = hovered ? 0.2 : 0.04;
  }, [hovered]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    const nx = noise3D(seed.x + t * driftSpeed, seed.y, seed.z) * driftAmplitude;
    const ny = noise3D(seed.x, seed.y + t * driftSpeed, seed.z) * driftAmplitude;
    const nz = noise3D(seed.x, seed.y, seed.z + t * driftSpeed) * driftAmplitude;

    let px = basePosition.x + nx;
    let py = basePosition.y + ny;
    let pz = basePosition.z + nz;

    const cursor = cursorRef.current;
    const dx = px - cursor.x;
    const dy = py - cursor.y;
    const dz = pz - cursor.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist < 2.5 && dist > 0.01) {
      const force = (1 - dist / 2.5) * 0.4;
      px += (dx / dist) * force;
      py += (dy / dist) * force;
      pz += (dz / dist) * force;
    }

    groupRef.current.position.set(px, py, pz);
    orbsRef.current[index] = groupRef.current.position.clone();

    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      const s = THREE.MathUtils.lerp(innerRef.current.scale.x, scaleTarget.current, 0.08);
      innerRef.current.scale.setScalar(s);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, emissiveTarget.current, 0.08);
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, glowOpacityTarget.current, 0.08);
    }
  });

  const dimOpacity = skill.isDimmed ? 0.15 : 1;

  return (
    <group ref={groupRef}>
      {/* Inner sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.2}
          distort={0.15}
          speed={2}
          transparent
          opacity={dimOpacity}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Billboard position={[0, size + 0.18, 0]}>
        <Text
          fontSize={0.09}
          color="#1c1917"
          anchorX="center"
          anchorY="bottom"
          fillOpacity={dimOpacity}
        >
          {skill.name}
        </Text>
        {hovered && !skill.isDimmed && (
          <Text
            position={[0, -0.12, 0]}
            fontSize={0.07}
            color={color}
            anchorX="center"
            anchorY="top"
          >
            {skill.level}%
          </Text>
        )}
      </Billboard>
    </group>
  );
}

/* ─── Scene ─── */

function Scene({ skills }: { skills: SkillData[] }) {
  const basePositions = useMemo(() => fibonacciSphere(skills.length, 1.5, 4.0), [skills.length]);
  const orbsRef = useRef<THREE.Vector3[]>(
    Array.from({ length: skills.length }, () => new THREE.Vector3())
  );

  return (
    <>
      <fog attach="fog" args={[BG_COLOR, 6, 20]} />
      <color attach="background" args={[BG_COLOR]} />

      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#dc2626" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#ea580c" />

      <AdaptiveDpr pixelated />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />

      <Sparkles count={60} scale={[10, 6, 10]} size={1.2} speed={0.2} opacity={0.15} color="#dc2626" />
      <Sparkles count={40} scale={[10, 6, 10]} size={1.0} speed={0.15} opacity={0.1} color="#ea580c" />

      <CursorTracker />
      <ConnectionLines orbsRef={orbsRef} />

      {skills.map((skill, i) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          basePosition={basePositions[i]}
          orbsRef={orbsRef}
          index={i}
        />
      ))}

      <PostProcessing />
    </>
  );
}

/* ─── Exported Component ─── */

export default function SkillCloud3D({
  skills,
  activeCategory,
}: {
  skills: SkillData[];
  activeCategory: string;
}) {
  const enrichedSkills = useMemo(
    () =>
      skills.map((s) => ({
        ...s,
        isDimmed: activeCategory !== "All" && s.category !== activeCategory,
      })),
    [skills, activeCategory]
  );

  return (
    <div className="w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-cream-border bg-cream-surface">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <Scene skills={enrichedSkills} />
      </Canvas>
    </div>
  );
}
