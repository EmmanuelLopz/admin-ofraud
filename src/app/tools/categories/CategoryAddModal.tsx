'use client';

import React, {useState} from "react";
import { swiftToLucideMap } from "../icons/iconsMap";
import { Category } from "@/src/types/types";
import exampleCategories from "@/src/types/categoryExamples";
import { useAuth } from '@/src/context/AuthContext';
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';

type CategoryAddModalProps = {
  onClose: () => void;
  setRefreshCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function CategoryAddModal({ onClose, setRefreshCounter }: CategoryAddModalProps){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();

    const authRunner = new AuthRunner(
        () => accessToken,
        async () => {
            const refreshed = await tryRefreshToken();
            return refreshed ? accessToken : null;
        },
        logout
    );

    const handleSave = async () => {
        if (!name || !icon) {
            alert("El nombre y el ícono son obligatorios.");
            return;
        }

        const newCategory = {
            name,
            description,
            icon
        };

        const data = await authRunner.runWithAuth(async (token) => {
            const res = await axios.post('http://localhost:3001/category', newCategory, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        });

        if (!data) {
            alert("No se pudo registrar la categoría.");
            return;
        }

        console.log("Nueva categoría:", newCategory); // Aquí podrías hacer un POST o levantarlo al padre
        // refrescar con un contador lo de atras

        setRefreshCounter(prev => prev + 1);

        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-53">
            <div className="bg-white rounded-xl p-8 w-1/2 max-w-full shadow-lg relative">
                <h2 className="text-2xl font-bold mb-4 text-orange-500">Registrar Nueva Categoría</h2>

                <input 
                    type="text" 
                    placeholder="Nombre de categoría" 
                    className="w-full p-2 border rounded mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea 
                    placeholder="Descripción de la categoría" 
                    className="w-full p-2 border rounded mb-4 resize-none h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="w-full p-2 border rounded mb-4"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                >

                    {Object.entries(swiftToLucideMap).map(([swiftKey, lucideKey]) => {
                        return (
                        <option key={lucideKey} value={swiftKey}>
                            {swiftKey}
                        </option>
                        );
                    })}
                </select>

                <button 
                    onClick={onClose}
                    className="absolute top-1 right-2 text-gray-500 hover:text-gray-900 text-4xl"
                    aria-label="Cerrar modal"
                >
                    ✕
                </button>

                <button 
                    className="bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded w-full"
                    onClick={handleSave}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}