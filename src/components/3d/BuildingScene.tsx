"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  Html,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { floors, getFloorColor } from "@/lib/mock-data";

interface BuildingSceneProps {
  selectedFloor: number | null;
  onFloorSelect: (floor: number) => void;
  timelineProgress: number;
  viewMode: "solid" | "wireframe" | "exploded" | "transparent";
  isNightMode: boolean;
  visibleFloors: number[];
}

function FloorBlock({
  floor,
  index,
  totalFloors,
  selected,
  onSelect,
  viewMode,
  timelineProgress,
  exploded,
}: {
  floor: (typeof floors)[0];
  index: number;
  totalFloors: number;
  selected: boolean;
  onSelect: (id: number) => void;
  viewMode: string;
  timelineProgress: number;
  exploded: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const floorHeight = 1.2;
  const floorWidth = 4;
  const floorDepth = 3;
  const gap = 0.05;

  const progressThreshold = (index + 1) / totalFloors;
  const isVisible = timelineProgress >= progressThreshold * 0.5;
  const scaleY = isVisible
    ? Math.min(1, (timelineProgress - progressThreshold * 0.3) / (progressThreshold * 0.7 + 0.01))
    : 0;

  const yPos = index * (floorHeight + gap) + (exploded ? index * 0.8 : 0);
  const color = getFloorColor(floor.status);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, Math.max(0.01, scaleY), 0.05);
    }
  });

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(floor.id);
    },
    [floor.id, onSelect]
  );

  const opacity = viewMode === "transparent" ? 0.4 : viewMode === "wireframe" ? 0.6 : 1;
  const wireframe = viewMode === "wireframe";

  if (scaleY <= 0.01 && timelineProgress < progressThreshold * 0.5) return null;

  return (
    <group position={[0, yPos, 0]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[floorWidth, floorHeight, floorDepth]} />
        <meshStandardMaterial
          color={color}
          transparent={opacity < 1 || selected || hovered}
          opacity={selected ? 0.9 : hovered ? 0.85 : opacity}
          wireframe={wireframe}
          emissive={selected ? color : hovered ? color : "#000000"}
          emissiveIntensity={selected ? 0.3 : hovered ? 0.15 : 0}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Floor label */}
      {(hovered || selected) && (
        <Html position={[floorWidth / 2 + 0.5, floorHeight / 2, 0]} center>
          <div className="glass-card-sm !p-2 whitespace-nowrap pointer-events-none">
            <p className="text-xs font-medium text-white">{floor.name}</p>
            <p className="text-xs text-gray-400">{floor.completion}% complete</p>
          </div>
        </Html>
      )}

      {/* Window details */}
      {viewMode === "solid" && scaleY > 0.5 && (
        <Windows floorWidth={floorWidth} floorHeight={floorHeight} floorDepth={floorDepth} />
      )}
    </group>
  );
}

function Windows({
  floorWidth,
  floorHeight,
  floorDepth,
}: {
  floorWidth: number;
  floorHeight: number;
  floorDepth: number;
}) {
  const windows = useMemo(() => {
    const w: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    for (let i = -1; i <= 1; i++) {
      w.push({
        pos: [i * 1.2, floorHeight * 0.1, floorDepth / 2 + 0.01],
        size: [0.5, 0.4, 0.02],
      });
    }
    return w;
  }, [floorHeight, floorDepth]);

  return (
    <>
      {windows.map((win, i) => (
        <mesh key={i} position={win.pos}>
          <boxGeometry args={win.size} />
          <meshStandardMaterial
            color="#1e3a5f"
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

function Ground() {
  return (
    <>
      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1e293b"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#334155"
        fadeDistance={15}
        infiniteGrid
      />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={15}
        blur={2}
        far={10}
      />
    </>
  );
}

function SceneContent({
  selectedFloor,
  onFloorSelect,
  timelineProgress,
  viewMode,
  isNightMode,
  visibleFloors,
}: BuildingSceneProps) {
  const exploded = viewMode === "exploded";

  const filteredFloors = floors.filter((f) => visibleFloors.includes(f.id));

  return (
    <>
      <ambientLight intensity={isNightMode ? 0.15 : 0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={isNightMode ? 0.3 : 1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 10, -5]} intensity={isNightMode ? 0.5 : 0.3} color="#3b82f6" />
      {isNightMode && (
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#fbbf24" />
      )}

      <Environment preset={isNightMode ? "night" : "city"} />

      <group position={[0, 0, 0]}>
        {filteredFloors.map((floor, index) => (
          <FloorBlock
            key={floor.id}
            floor={floor}
            index={index}
            totalFloors={filteredFloors.length}
            selected={selectedFloor === floor.id}
            onSelect={onFloorSelect}
            viewMode={viewMode}
            timelineProgress={timelineProgress / 100}
            exploded={exploded}
          />
        ))}
      </group>

      <Ground />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 3, 0]}
      />
    </>
  );
}

export default function BuildingScene(props: BuildingSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 6, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
