import React, {useState} from "react";
import { Category } from "@/src/types/types";

type CategoryAddModalProps = {
  onClose: () => void;
};

export default function CategoryAddModal({ onClose }: CategoryAddModalProps){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");

    const handleSave = () => {
        if (!name || !icon) {
            alert("El nombre y el ícono son obligatorios.");
            return;
        }

        const newCategory = {
            name,
            description,
            icon,
        };

        console.log("Nueva categoría:", newCategory); // Aquí podrías hacer un POST o levantarlo al padre

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
                    
                    <option value="" disabled>Selecciona un icono</option>
                    <option value="folder">📁 Folder</option>
                    <option value="book">📚 Book</option>
                    <option value="camera">📷 Camera</option>
                    <option value="star">⭐ Star</option>
                    <option value="heart">❤️ Heart</option>
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