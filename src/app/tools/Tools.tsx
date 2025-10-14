'use client';

import Sidebar from "@/src/components/Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Icons from "lucide-react";

export default function Tools() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<Number|null>(null);
  const iconNameFromDB = "Users"; // or "Tool", "FileText", etc.
  const LucideIcon = Icons[iconNameFromDB];

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

                <img src="/symbols/0.circle.fill.svg" alt="coming soon" className="w-1/6 h-auto text-red-300" />

                {LucideIcon ? <LucideIcon size={24} color="blue" /> : null}

                <div className="grid grid-cols-4 gap-4 p-4">
                    Hola
                </div>
            </div>
        </div>
    );
}