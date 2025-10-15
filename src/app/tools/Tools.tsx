'use client';

import Sidebar from "@/src/components/Sidebar";
import Card from "@/src/components/Card";
import { useRouter } from "next/navigation";


export default function Tools() {
    const router = useRouter();

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
                        <h1 className="text-5xl font-semibold text-[#060025]"> Herramientas </h1>
                    </div>

                    <div className="flex-1 p-10 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            
                            {/* Tarjeta 1 */}
                            <Card 
                                className="hover:transform scale-105 hover:bg-blue-100 bg-white cursor-pointer" 
                                onClick={() => router.push('/tools/categories')}
                            >
                                <h2 className="text-2xl font-semibold mb-4"> Categorías </h2>
                                <p className="text-gray-600">Descripción general de las categorias y añadir nuevas.</p>
                            </Card>

                            {/* Tarjeta 2 */}
                            <Card 
                                className="hover:transform scale-105 hover:bg-green-100 bg-white cursor-pointer" 
                                onClick={() => router.push('/tools/categories')}
                            >
                                <h2 className="text-2xl font-semibold mb-4">Análisis de Impacto</h2>
                                <p className="text-gray-600">Analiza el impacto que han tenido los reportes.</p>
                            </Card>

                            {/* Tarjeta 3 */}
                            <Card 
                                className="hover:transform scale-105 hover:bg-yellow-100 bg-white cursor-pointer" 
                                onClick={() => router.push('/tools/categories')}
                            >
                                <h2 className="text-2xl font-semibold mb-4">Análisis de Tendencias</h2>
                                <p className="text-gray-600">Identifica tendencias en los reportes a lo largo del tiempo.</p>
                            </Card>          
                                             
                        </div>
                    </div>
                </div>
            </div>
        );
}