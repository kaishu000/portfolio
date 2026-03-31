'use client'
import { useRef, useMemo } from 'react';
import { useFrame, extend, ThreeElement } from '@react-three/fiber';
import { Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

declare module '@react-three/fiber' {
  interface ThreeElements {
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>;
  }
}

// page/pages から mode と gearCount を計算
// page 0        : Fluid (mode=0)
// page 1        : Arm   (mode=1)
// page 2〜pages-2: Gears (mode=2), gearCount = page-1
// page pages-1  : Jellyfish (mode=3) ← 最終ページのみ
function computeShape(page: number, pages: number): { mode: number; gearCount: number } {
  if (page === 0) return { mode: 0, gearCount: 1 };
  if (page === 1) return { mode: 1, gearCount: 1 };
  if (page >= pages - 1) return { mode: 3, gearCount: 1 };
  return { mode: 2, gearCount: page - 1 };
}

interface ParticleSwarmProps {
  mode: number;
  gearCount: number;
}

const ParticleSwarm = ({ mode: modeProp, gearCount: gearCountProp }: ParticleSwarmProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility

  const positions = useMemo(() => {
    // Math.random() はレンダー中に呼べないため、インデックスベースの決定論的疑似乱数を使用
    const seeded = (s: number) => (Math.sin(s * 9301 + 49297) * 233280) % 1;
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) pos.push(new THREE.Vector3(
      (seeded(i * 3)     - 0.5) * 100,
      (seeded(i * 3 + 1) - 0.5) * 100,
      (seeded(i * 3 + 2) - 0.5) * 100
    ));
    return pos;
  }, []);

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({ mode: modeProp, gearCount: gearCountProp, morphSpeed: 1 }), [modeProp, gearCountProp]);
  const addControl = (id: string, _l: string, _min: number, _max: number, val: number): number => {
    return (PARAMS as Record<string, number>)[id] ?? val;
  };
  const setInfo = (..._args: unknown[]) => {};
  const annotate = (..._args: unknown[]) => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const mode = addControl("mode", "Morph Mode (0:Fluid, 1:Arm, 2:Gears, 3:Jellyfish)", 0, 3, 0);
        const gearCount = Math.floor(addControl("gearCount", "Gear Quantity", 1, 5, 2));
        const morphSpeed = addControl("morphSpeed", "Animation Speed", 0, 2, 1);

        const ratio = i / count;
        const t = time * morphSpeed;

        // --- BASE VECTORS FOR MORPHING ---
        let tx = 0, ty = 0, tz = 0;

        // --- SHAPE 0: FLUID SPHERE (Default/Transition) ---
        const phi = Math.acos(1 - 2 * ratio);
        const theta = 2.3999632 * i;
        const rSphere = 30 + Math.sin(t + ratio * 10) * 5;
        const sx = rSphere * Math.sin(phi) * Math.cos(theta);
        const sy = rSphere * Math.sin(phi) * Math.sin(theta);
        const sz = rSphere * Math.cos(phi);

        // --- SHAPE 1: ARM (Bicep Flex) ---
        // Particles split into Upper Arm, Forearm, and Fist
        let ax = 0, ay = 0, az = 0;
        if (ratio < 0.4) { // Upper Arm / Bicep
        const segment = ratio / 0.4;
        const bicepBulge = Math.sin(segment * Math.PI) * 8 * Math.max(0, Math.sin(t * 2));
        const r = 4 + bicepBulge + Math.cos(theta * 5) * 0.5;
        ax = r * Math.cos(theta);
        ay = segment * 20 - 10;
        az = r * Math.sin(theta);
        } else if (ratio < 0.8) { // Forearm
        const segment = (ratio - 0.4) / 0.4;
        const r = 3.5 - segment * 1;
        const angle = 1.2 + Math.sin(t * 2) * 0.5; // Flexing motion
        ax = r * Math.cos(theta);
        const localY = segment * 18;
        const localZ = r * Math.sin(theta);
        ay = 10 + Math.cos(angle) * localY - Math.sin(angle) * localZ;
        az = Math.sin(angle) * localY + Math.cos(angle) * localZ;
        } else { // Fist
        const r = 5 * Math.pow(Math.random(), 0.5); // Use deterministic pseudo-random or index
        const fPhi = (ratio - 0.8) * 50;
        ax = Math.sin(fPhi) * Math.cos(theta) * 6;
        const angle = 1.2 + Math.sin(t * 2) * 0.5;
        const localY = 18 + Math.sin(fPhi) * Math.sin(theta) * 6;
        ay = 10 + Math.cos(angle) * localY;
        az = Math.sin(angle) * localY;
        }

        // --- TRANSFORM ARM: Y軸90°回転 + 1.5倍スケール + 左下オフセット ---
        const armOrigX = ax, armOrigZ = az;
        ax = armOrigZ * 1.5 - 50;
        ay = ay * 1.5 - 20;
        az = -armOrigX * 1.5;

        // --- SHAPE 2: GEARS (Multiple) ---
        let gx = 0, gy = 0, gz = 0;
        const particlesPerGear = count / gearCount;
        const gearIdx = Math.floor(i / particlesPerGear);
        const gearRatio = (i % particlesPerGear) / particlesPerGear;
        const gearTheta = gearRatio * Math.PI * 2;
        const gearZ = (Math.random() - 0.5) * 4; // Flatness

        const teeth = 12;
        const gearBaseR = 15;
        const toothDepth = 3;
        const toothShape = Math.max(0, Math.min(1, Math.sin(gearTheta * teeth) * 10));
        const gr = gearBaseR + toothShape * toothDepth;

        const gearSpin = t * (gearIdx % 2 === 0 ? 1 : -1);
        gx = Math.cos(gearTheta + gearSpin) * gr + (gearIdx - (gearCount - 1) * 0.5) * 35;
        gy = Math.sin(gearTheta + gearSpin) * gr;
        gz = (i % 10 - 5) * 0.5; // Adding some thickness

        // --- TRANSFORM GEAR: 左右交互オフセット + Y軸±30°回転 ---
        // gearCount奇数=左、偶数=右 でページごとに交互配置
        const isLeftGear = (gearCount - 1) % 2 === 0;
        const gAngle = isLeftGear ? Math.PI / 4 : -Math.PI / 4; // ±30°
        const gXOffset = isLeftGear ? -20 : 20;
        const gOrigX = gx;
        gx = gOrigX * Math.cos(gAngle) + gz * Math.sin(gAngle) + gXOffset;
        gz = -gOrigX * Math.sin(gAngle) + gz * Math.cos(gAngle);

        // --- SHAPE 3: JELLYFISH ---
        let jx = 0, jy = 0, jz = 0;
        if (ratio < 0.6) { // Bell
        const bRatio = ratio / 0.6;
        const bPhi = bRatio * Math.PI * 0.5;
        const bR = 25 * Math.sin(bPhi) * (1 + Math.sin(t * 3 - bPhi) * 0.1);
        jx = bR * Math.cos(theta);
        jy = Math.cos(bPhi) * 15 + Math.sin(t * 3) * 5;
        jz = bR * Math.sin(theta);
        } else { // Tentacles
        const tRatio = (ratio - 0.6) / 0.4;
        const tIdx = i % 8; // 8 main tentacles
        const tAngle = (tIdx / 8) * Math.PI * 2;
        const stretch = tRatio * 40;
        const wave = Math.sin(t * 3 - tRatio * 5) * tRatio * 5;
        jx = Math.cos(tAngle) * 15 + wave * Math.cos(tAngle);
        jy = -stretch + Math.sin(t * 3) * 5;
        jz = Math.sin(tAngle) * 15 + wave * Math.sin(tAngle);
        }

        // --- TRANSFORM JELLYFISH: Z軸35°傾き → ローカルX軸10°傾き ---
        const jRotZ = 0 * Math.PI / 180;
        const jRotX = 5 * Math.PI / 180;
        // ① Z軸回転（XY平面内で傾ける）
        const jAfterZx = jx * Math.cos(jRotZ) - jy * Math.sin(jRotZ);
        const jAfterZy = jx * Math.sin(jRotZ) + jy * Math.cos(jRotZ);
        // ② ローカルX軸回転（回転後のYZ平面で傾ける）
        jx = jAfterZx - 30;
        jy = jAfterZy * Math.cos(jRotX) - jz * Math.sin(jRotX) + 10;
        jz = jAfterZy * Math.sin(jRotX) + jz * Math.cos(jRotX);

        // --- INTERPOLATION LOGIC ---
        if (mode <= 1) {
        const m = mode;
        tx = sx * (1 - m) + ax * m;
        ty = sy * (1 - m) + ay * m;
        tz = sz * (1 - m) + az * m;
        } else if (mode <= 2) {
        const m = mode - 1;
        tx = ax * (1 - m) + gx * m;
        ty = ay * (1 - m) + gy * m;
        tz = az * (1 - m) + gz * m;
        } else {
        const m = mode - 2;
        tx = gx * (1 - m) + jx * m;
        ty = gy * (1 - m) + jy * m;
        tz = gz * (1 - m) + jz * m;
        }

        target.set(tx, ty, tz);

        // --- COLORING (Cool Tones: Purple -> Blue -> Green) ---
        // 0.8 (Purple) -> 0.6 (Blue) -> 0.3 (Green)
        let hue = 0;
        if (ratio < 0.5) {
        hue = 0.8 - (ratio * 2) * 0.2; // Purple to Blue
        } else {
        hue = 0.6 - (ratio - 0.5) * 2 * 0.3; // Blue to Green
        }

        const brightness = 0.4 + Math.sin(t + ratio * 20) * 0.2;
        color.setHSL(hue, 0.8, brightness);

        // --- HUD INFO ---
        if (i === 0) {
        const titles = ["Quantum Fluid", "Skill: Strength & Growth", "Projects: Engineering", "Organic Discovery"];
        setInfo(titles[Math.round(mode)] ?? "Quantum Fluid", "Dynamic morphing particle system utilizing parametric mapping.");
        annotate("origin", new THREE.Vector3(0, 0, 0), "Core");
        }
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

// Canvas の中で使うコンポーネント（Scene.tsx の <Canvas> 内に配置される）
export default function Particles({ page, pages }: { page: number; pages: number }) {
  const { mode, gearCount } = computeShape(page, pages);

  return (
    <>
      <ParticleSwarm mode={mode} gearCount={gearCount} />
      <Effects disableGamma>
        {/* threshold=0.85: 白背景(輝度1.0)はbloom対象だが影響を最小化、strength低減で白飽和を防ぐ */}
        <unrealBloomPass args={[new THREE.Vector2(256, 256), 0.4, 0.5, 0.9]} />
      </Effects>
    </>
  );
}
