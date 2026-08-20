"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BuildingScene = dynamic(() => import("./BuildingScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-elevated/50 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading 3D Model...</span>
      </div>
    </div>
  ),
});

interface DigitalTwinViewerProps {
  selectedFloor: number | null;
  onFloorSelect: (floor: number) => void;
  timelineProgress: number;
  viewMode: "solid" | "wireframe" | "exploded" | "transparent";
  isNightMode: boolean;
  visibleFloors: number[];
}

export default function DigitalTwinViewer(props: DigitalTwinViewerProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BuildingScene {...props} />
    </Suspense>
  );
}
