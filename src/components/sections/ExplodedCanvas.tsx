"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface ExplodedCanvasProps {
  progress: number;
}

function BuildingModel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const floorRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow continuous rotation plus scroll-based rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06 + progress * Math.PI * 0.4;
    }

    // Dynamic vertical spacing for each floor slab based on progress
    floorRefs.current.forEach((floor, idx) => {
      if (!floor) return;
      const baseY = (idx - 2) * 1.1; // Closed base Y
      const separation = (idx - 2) * 1.6 * progress; // Spacing increases with scroll progress
      const targetY = baseY + separation;
      floor.position.y = THREE.MathUtils.lerp(floor.position.y, targetY, 0.1);
    });
  });

  // Floor layout details
  const floors = [
    {
      name: "Foundation & Garage",
      width: 4.2,
      depth: 4.2,
      height: 0.15,
      color: "rgba(216, 197, 163, 0.08)",
      hasColumns: false,
    },
    {
      name: "Ground Floor & Entrance",
      width: 4.0,
      depth: 4.0,
      height: 0.12,
      color: "rgba(216, 197, 163, 0.12)",
      hasColumns: true,
      interior: (
        <>
          {/* Main lobby counter */}
          <mesh position={[-1.2, 0.25, 1.2]}>
            <boxGeometry args={[1.2, 0.4, 0.4]} />
            <meshStandardMaterial color="#D8C5A3" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Structural core wall */}
          <mesh position={[0, 0.5, -1.0]}>
            <boxGeometry args={[0.3, 1.0, 1.5]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.8} />
            <Edges color="#D8C5A3" opacity={0.15} />
          </mesh>
        </>
      ),
    },
    {
      name: "Living Room & Kitchen",
      width: 4.0,
      depth: 4.0,
      height: 0.12,
      color: "rgba(216, 197, 163, 0.15)",
      hasColumns: true,
      interior: (
        <>
          {/* Sofa L-shape */}
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
          {/* Dining Table */}
          <group position={[-1.0, 0.05, -0.5]}>
            {/* Table top */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[1.4, 0.06, 0.8]} />
              <meshStandardMaterial color="#D8C5A3" roughness={0.2} metalness={0.7} />
              <Edges color="#D8C5A3" opacity={0.4} />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.6, 0.125, -0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.25]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.6, 0.125, -0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.25]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[-0.6, 0.125, 0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.25]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.6, 0.125, 0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.25]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        </>
      ),
    },
    {
      name: "Master Suite & Spa",
      width: 3.6,
      depth: 3.6,
      height: 0.12,
      color: "rgba(216, 197, 163, 0.18)",
      hasColumns: true,
      interior: (
        <>
          {/* Platform Bed */}
          <group position={[0, 0.1, -0.6]}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[1.5, 0.2, 1.6]} />
              <meshStandardMaterial color="#D8C5A3" roughness={0.5} />
              <Edges color="#D8C5A3" opacity={0.3} />
            </mesh>
            {/* Pillow */}
            <mesh position={[0, 0.25, -0.6]}>
              <boxGeometry args={[1.2, 0.1, 0.4]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </mesh>
          </group>
          {/* Glass Partition */}
          <mesh position={[-0.8, 0.4, 0.5]}>
            <boxGeometry args={[0.05, 0.8, 1.2]} />
            <meshStandardMaterial color="#D8C5A3" transparent opacity={0.2} roughness={0.1} />
            <Edges color="#D8C5A3" opacity={0.6} />
          </mesh>
        </>
      ),
    },
    {
      name: "Rooftop Terrace & Pool",
      width: 3.2,
      depth: 3.2,
      height: 0.1,
      color: "rgba(216, 197, 163, 0.22)",
      hasColumns: false,
      interior: (
        <>
          {/* Swimming Pool (Semi-transparent glowing cyan) */}
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
          {/* Pergola Frame */}
          <group position={[-0.8, 0.4, -0.8]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[1.0, 0.05, 1.0]} />
              <meshStandardMaterial color="#1a1a1a" />
              <Edges color="#D8C5A3" opacity={0.4} />
            </mesh>
            {/* Pergola posts */}
            <mesh position={[-0.48, 0.2, -0.48]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.48, 0.2, -0.48]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[-0.48, 0.2, 0.48]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.48, 0.2, 0.48]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        </>
      ),
    },
  ];

  // Structural column coordinates (4 corners)
  const columns = [
    { x: -1.7, z: -1.7 },
    { x: 1.7, z: -1.7 },
    { x: -1.7, z: 1.7 },
    { x: 1.7, z: 1.7 },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 4 Structural core columns that connect all floors. Slabs slide along these. */}
      {columns.map((col, i) => (
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

      {/* Render each floor group */}
      {floors.map((floor, idx) => (
        <group
          key={idx}
          ref={(el) => {
            floorRefs.current[idx] = el;
          }}
          position={[0, (idx - 2) * 1.1, 0]}
        >
          {/* Main floor slab */}
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

          {/* Sub-floor glowing layer (luxury indicator) */}
          <mesh position={[0, -0.01, 0]}>
            <planeGeometry args={[floor.width - 0.05, floor.depth - 0.05]} rotation-x={-Math.PI / 2} />
            <meshStandardMaterial
              color="#D8C5A3"
              transparent
              opacity={0.03 + progress * 0.07}
              emissive="#D8C5A3"
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Columns on current floor, if applicable */}
          {floor.hasColumns && (
            <group position={[0, floor.height, 0]}>
              {columns.map((col, colIdx) => (
                <mesh key={`inner-col-${colIdx}`} position={[col.x * 0.9, 0.5, col.z * 0.9]}>
                  <cylinderGeometry args={[0.03, 0.03, 1.0]} />
                  <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
                  <Edges color="#D8C5A3" opacity={0.2} />
                </mesh>
              ))}
            </group>
          )}

          {/* Interior design elements */}
          <group position={[0, floor.height, 0]}>
            {floor.interior}
          </group>
        </group>
      ))}
    </group>
  );
}

function Starfield() {
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(450);
    for (let i = 0; i < 450; i++) {
      arr[i] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D8C5A3"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.35}
      />
    </points>
  );
}

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
    <gridHelper
      ref={gridRef}
      args={[14, 14, "#D8C5A3", "#222222"]}
      position={[0, -3.2, 0]}
    />
  );
}

export default function ExplodedCanvas({ progress }: ExplodedCanvasProps) {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas
        camera={{ position: [5, 4, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        
        {/* Soft fill light */}
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#8ab4f8" />
        
        {/* Luxury accent lights */}
        <pointLight position={[3, 5, 3]} intensity={3.0} color="#D8C5A3" distance={15} />
        <pointLight position={[-3, -3, -3]} intensity={1.5} color="#D8C5A3" distance={10} />
        
        <BuildingModel progress={progress} />
        
        <Starfield />

        {/* Reference base grid */}
        <CustomGrid />
      </Canvas>
    </div>
  );
}
