'use client';

import Sidebar from "@/src/components/Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { lucideToSwiftMap } from './icons/iconsMap';


export default function Tools() {
  const router = useRouter();

    function toPascalCase(str: string): string {
        return str
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }

    function getRandomHexColor(): string {
        return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    }


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

                <div className="flex-1 p-10 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Tarjeta 1 */}
                        <div
                            onClick={() => router.push('/tools/wordcloud')}
                            className="cursor-pointer p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform scale-105 hover:bg-blue-100 bg-white"
                        >
                            <h2 className="text-2xl font-semibold mb-4">Word Cloud</h2>
                            <p className="text-gray-600">Genera una nube de palabras a partir de los reportes.</p>
                        </div>

                        {/* Tarjeta 2 */}
                        <div
                            onClick={() => router.push('/tools/sentiment-analysis')}
                            className="cursor-pointer p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform scale-105 hover:bg-green-100 bg-white"
                        >
                            <h2 className="text-2xl font-semibold mb-4">Análisis de Sentimiento</h2>
                            <p className="text-gray-600">Analiza el sentimiento de los reportes recibidos.</p>
                        </div>

                        {/* Tarjeta 3 */}
                        <div
                            onClick={() => router.push('/tools/trend-analysis')}
                            className="cursor-pointer p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform scale-105 hover:bg-red-100 bg-white"
                        >
                            <h2 className="text-2xl font-semibold mb-4">Análisis de Tendencias</h2>
                            <p className="text-gray-600">Identifica tendencias en los reportes a lo largo del tiempo.</p>
                        </div>

                        <div>
                            {Object.entries(lucideToSwiftMap).map(([iconName, swiftName]) => {
                                const pascalCaseName = toPascalCase(iconName);
                                const IconComponent = Icons[pascalCaseName as keyof typeof Icons] as React.FC<LucideProps>;

                                if (!IconComponent) {
                                console.warn(`Icon not found: ${pascalCaseName}`);
                                return null;
                                }

                                return <IconComponent key={iconName} size={24} color={getRandomHexColor()} />;
                            })}
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}