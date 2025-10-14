'use client';

import Sidebar from "@/src/components/Sidebar";
import { useRouter } from "next/navigation";
import React from "react";

export default function Categories() {
    const router = useRouter();

    return (
            <div className="flex h-screen overflow-hidden">
                                
                <div className="w-1/6">
                    <Sidebar />
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col bg-[#f6f7fb]">
                    {/* Header fijo */}
                    <div className="p-10">
                        <h1 className="text-5xl font-semibold text-[#060025]"> Herramientas </h1>
                    </div>

                    <div className="flex-1 p-10 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            
                            {/* Tarjeta 1 */}
                            <div
                                onClick={() => router.push('/tools/cateogories')}
                                className="cursor-pointer p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform scale-105 hover:bg-blue-100 bg-white"
                            >
                                <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
                                <p className="text-gray-600">Descripción general de las categorias y añadir nuevas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}