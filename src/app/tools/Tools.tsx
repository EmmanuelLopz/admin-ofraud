'use client';

import Sidebar from "@/src/components/Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Tools() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<Number|null>(null);

  return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar a la izquierda */}
            
            <div className="w-1/6">
                <Sidebar />
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col bg-[#f6f7fb]">
                {/* Header fijo */}
                <div className="p-10">
                    <h1 className="text-5xl font-semibold text-[#060025]">Herramientas</h1>
                </div>
                <img src="https://raw.githubusercontent.com/andrewtavis/sf-symbols-online/master/glyphs/0.circle.fill.png" alt="coming soon" className="w-1/2 h-1/2 m-auto object-contain" />
            </div>
        </div>
    );
}