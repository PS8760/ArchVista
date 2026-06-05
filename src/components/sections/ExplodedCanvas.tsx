"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface ExplodedCanvasProps {
  progress: number;
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 731.41) * 10000;
  return value - Math.floor(value);
}

// ── Structural column positions (shared, never re-created) ───────────────────
const COLUMNS = [
  { x: -1.7, z: -1.7 },
  { x:  1.7, z: -1.7 },
  { x: -1.7, z:  1.7 },
  { x:  1.7, z:  1.7 },
] as const;

// ── Floor metadata — no JSX here; interior is rendered separately ────────────
const FLOORS = [
  { name: "Foundation & Garage",      width: 4.2, depth: 4.2, height: 0.15, hasColumns: false, hasInterior: false },
  { name: "Ground Floor & Entrance",  width: 4.0, depth: 4.0, height: 0.12, hasColumns: true,  hasInterior: true  },
  { name: "Living Room & Kitchen",    width: 4.0, depth: 4.0, height: 0.12, hasColumns: true,  hasInterior: true  },
  { name: "Master Suite & Spa",       width: 3.6, depth: 3.6, height: 0.12, hasColumns: true,  hasInterior: true  },
  { name: "Rooftop Terrace & Pool",   width: 3.2, depth: 3.2, height: 0.10, hasColumns: false, hasInterior: true  },
] as const;

// ── Per-floor interior components (stable, defined outside render) ────────────
function GroundFloorInterior() {
  return (
    <>
      <mesh position={[-1.2, 0.25, 1.2]}>
        <boxGeometry args={[1.2, 0.4, 0.4]} />
        <meshStandardMaterial color="#D8C5A3" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, -1.0]}>
        <boxGeometry args={[0.3, 1.0, 1.5]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.8} />
        <Edges color="#D8C5A3" opacity={0.15} />
      </mesh>
    </>
  );
}

function LivingRoomInterior() {
  return (
    <>
      <group position={[1.0, 0.2, 1.0]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.6]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.9} />
        </mesh>
        <mesh position={[-0.45, 0.15, -0.45]} rotation-y={Math.PI / 2}>
          <boxGeometry args={[1.2, 0.3, 0.6]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.9} />
        </mesh>
      </group>
      <group position={[-1.0, 0.05, -0.5]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.4, 0.06, 0.8]} />
          <meshStandardMaterial color="#D8C5A3" roughness={0.2} metalness={0.7} />
          <Edges color="#D8C5A3" opacity={0.4} />
        </mesh>
        {([-0.6, 0.6] as const).map((px) =>
          ([-0.3, 0.3] as const).map((pz) => (
            <mesh key={`leg-${px}-${pz}`} position={[px, 0.125, pz]}>
              <cylinderGeometry args={[0.03, 0.03, 0.25]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          ))
        )}
      </group>
    </>
  );
}

function MasterSuiteInterior() {
  return (
    <>
      <group position={[0, 0.1, -0.6]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.5, 0.2, 1.6]} />
          <meshStandardMaterial color="#D8C5A3" roughness={0.5} />
          <Edges color="#D8C5A3" opacity={0.3} />
        </mesh>
        <mesh position={[0, 0.25, -0.6]}>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </group>
      <mesh position={[-0.8, 0.4, 0.5]}>
        <boxGeometry args={[0.05, 0.8, 1.2]} />
        <meshStandardMaterial color="#D8C5A3" transparent opacity={0.2} roughness={0.1} />
        <Edges color="#D8C5A3" opacity={0.6} />
      </mesh>
    </>
  );
}

function RooftopInterior() {
  const postPositions = [
    [-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48],
  ] as const;

  return (
    <>
      <mesh position={[0.6, 0.02, 0.6]}>
        <boxGeometry args={[1.4, 0.04, 1.0]} />
        <meshStandardMaterial
          color="#4ad2ff"
          transparent
          opacity={0.6}
          roughness={0.1}
          emissive="#1d6680"
          emissiveIntensity={1.5}
        />
        <Edges color="#4ad2ff" opacity={0.8} />
      </mesh>
      <group position={[-0.8, 0.4, -0.8]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.0, 0.05, 1.0]} />
          <meshStandardMaterial color="#1a1a1a" />
          <Edges color="#D8C5A3" opacity={0.4} />
        </mesh>
        {postPositions.map(([px, pz]) => (
          <mesh key={`post-${px}-${pz}`} position={[px, 0.2, pz]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>
    </>
  );
}

// Map floor index → interior component
function FloorInterior({ index }: { index: number }) {
  if (index === 1) return <GroundFloorInterior />;
  if (index === 2) return <LivingRoomInterior />;
  if (index === 3) return <MasterSuiteInterior />;
  if (index === 4) return <RooftopInterior />;
  return null;
}

// ── BuildingModel ─────────────────────────────────────────────────────────────
function BuildingModel({ progress }: { progress: number }) {
  const groupRef  = useRef<THREE.Group>(null);
  const floorRefs = useRef<(THREE.Group | null)[]>([]);
  // Accumulate elapsed time ourselves to avoid THREE.Clock
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    if (groupRef.current) {
      groupRef.current.rotation.y =
        elapsedRef.current * 0.06 + progress * Math.PI * 0.4;
    }

    floorRefs.current.forEach((floor, idx) => {
      if (!floor) return;
      const baseY      = (idx - 2) * 1.1;
      const separation = (idx - 2) * 1.6 * progress;
      floor.position.y = THREE.MathUtils.lerp(
        floor.position.y,
        baseY + separation,
        0.1
      );
    });
  });

  return (
    <group ref={groupRef}>
      {/* Structural columns */}
      {COLUMNS.map((col, i) => (
        <mesh key={`col-${i}`} position={[col.x, 0, col.z]}>
          <cylinderGeometry args={[0.04, 0.04, 7.5]} />
          <meshStandardMaterial
            color="#D8C5A3"
            transparent
            opacity={0.25 + progress * 0.4}
            roughness={0.2}
            metalness={0.9}
          />
          <Edges color="#D8C5A3" opacity={0.4} />
        </mesh>
      ))}

      {/* Floor groups */}
      {FLOORS.map((floor, idx) => (
        <group
          key={idx}
          ref={(el) => { floorRefs.current[idx] = el; }}
          position={[0, (idx - 2) * 1.1, 0]}
        >
          {/* Slab */}
          <mesh position={[0, floor.height / 2, 0]}>
            <boxGeometry args={[floor.width, floor.height, floor.depth]} />
            <meshStandardMaterial
              color="#0d0d0d"
              transparent
              opacity={0.35}
              roughness={0.1}
              metalness={0.9}
            />
            <Edges color="#D8C5A3" opacity={0.6 + progress * 0.4} />
          </mesh>

          {/* Sub-floor glow */}
          <mesh position={[0, -0.01, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[floor.width - 0.05, floor.depth - 0.05]} />
            <meshStandardMaterial
              color="#D8C5A3"
              transparent
              opacity={0.03 + progress * 0.07}
              emissive="#D8C5A3"
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Inner columns */}
          {floor.hasColumns && (
            <group position={[0, floor.height, 0]}>
              {COLUMNS.map((col, ci) => (
                <mesh key={`ic-${ci}`} position={[col.x * 0.9, 0.5, col.z * 0.9]}>
                  <cylinderGeometry args={[0.03, 0.03, 1.0]} />
                  <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
                  <Edges color="#D8C5A3" opacity={0.2} />
                </mesh>
              ))}
            </group>
          )}

          {/* Interior furnishings */}
          {floor.hasInterior && (
            <group position={[0, floor.height, 0]}>
              <FloorInterior index={idx} />
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

// ── Starfield ─────────────────────────────────────────────────────────────────
function Starfield() {
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(450);
    for (let i = 0; i < 450; i++) {
      arr[i] = (pseudoRandom(i + 1) - 0.5) * 16;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsedRef.current * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#D8C5A3" size={0.045} sizeAttenuation transparent opacity={0.35} />
    </points>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────
function CustomGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useEffect(() => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material;
      mat.transparent = true;
      mat.opacity = 0.15;
    }
  }, []);

  return (
    <gridHelper ref={gridRef} args={[14, 14, "#D8C5A3", "#222222"]} position={[0, -3.2, 0]} />
  );
}

// ── Canvas export ─────────────────────────────────────────────────────────────
export default function ExplodedCanvas({ progress }: ExplodedCanvasProps) {
  return (
    <div className="relative h-full min-h-[260px] w-full lg:min-h-[500px]">
      <Canvas
        camera={{ position: [5, 4, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#8ab4f8" />
        <pointLight position={[3, 5, 3]}   intensity={3.0} color="#D8C5A3" distance={15} />
        <pointLight position={[-3, -3, -3]} intensity={1.5} color="#D8C5A3" distance={10} />
        <BuildingModel progress={progress} />
        <Starfield />
        <CustomGrid />
      </Canvas>
    </div>
  );
}
