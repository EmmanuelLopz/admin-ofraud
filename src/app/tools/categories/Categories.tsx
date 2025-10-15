'use client';

import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Sidebar from "@/src/components/Sidebar";
import React, { useState, useEffect } from 'react';
import { swiftToLucideMap } from "../icons/iconsMap";
import exampleCategories from "@/src/types/categoryExamples"
import { Category } from '@/src/types/types';
import CategoryModal from './CategoryModal';
import CategoryAddModal from './CategoryAddModal';
import ProtectedRoute from '@/src/wrappers/ProtectedRoute';

export default function Categories() {

    const [colors, setColors] = useState<{ hex: string; rgba: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<(Category & { hex: string; rgba: string, IconComponent: LucideIcon }) | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
    const newColors = exampleCategories.map(() => getRandomColor());
    setColors(newColors);
    }, []);

    function toPascalCase(str?: string): string {
        if (!str) return '';

        return str
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256); // 0–255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const hex = `#${[r, g, b]
            .map((c) => c.toString(16).padStart(2, '0'))
            .join('')}`;

        const rgba = `rgba(${r}, ${g}, ${b}, 0.5)`;

        return { hex, rgba };
    }


    return (
        <ProtectedRoute>
            <div className="flex h-screen ">

                <div className="w-1/6">
                    <Sidebar />
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col bg-[#f6f7fb]">
                    {/* Header fijo */}

                    <div className="p-10">
                        <h1 className="text-5xl font-semibold text-[#060025]"> Categorías </h1>
                    </div>

                    <div className="flex-1 px-10 pb-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 ">

                            
                                { exampleCategories.map((category, i) => {
                                    const lucideIconName = swiftToLucideMap[category.icon];
                                    const iconKey = toPascalCase(lucideIconName);
                                    const IconComponent = (Icons as any)[iconKey] as LucideIcon || Icons.HelpCircle;

                                    const { hex, rgba } = colors[i] || { hex: '#000', rgba: 'rgba(0,0,0,0.5)' };

                                    return (
                                        <div 
                                            className="rounded-xl bg-white p-5 flex justify-center items-center cursor-pointer" 
                                            key={category.id}
                                            style={{ 
                                                boxShadow: `0 4px 10px ${rgba}`
                                            }}
                                            onClick={() => setSelectedCategory({ ...category, hex, rgba, IconComponent })}
                                        >
                                            <div className="flex flex-row items-center space-x-5">
                                                <div className="text-center" style={{ color: hex }}>{category.name}</div>
                                                <IconComponent className="w-6 h-6" style={{ color: hex }} />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-5 rounded-full shadow-lg z-51"
                        >
                            + Nueva Categoría
                        </button>
                    </div>

                    {selectedCategory && 
                        <CategoryModal category={selectedCategory} onClose={()=>setSelectedCategory(null)}/>
                    }

                    {showAddModal && <CategoryAddModal onClose={()=>setShowAddModal(false)} />}

                </div>
            </div>
        </ProtectedRoute>
        );
}