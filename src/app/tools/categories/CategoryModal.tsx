import React from "react";
import { Category } from "@/src/types/types";
import { LucideIcon } from "lucide-react";

type Props = {
  category: Category & { hex: string; rgba: string; IconComponent: LucideIcon }
  onClose: () => void;
};

export default function CategoryModal({ category, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-1/6"></div>

            <div className="bg-white rounded-xl p-8 w-96 max-w-full shadow-lg relative flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4" style={{ color: category.hex }}>
                    {category.name}
                </h2>

                <category.IconComponent
                    className="w-20 h-20 mb-6"
                    style={{ color: category.hex }}
                />

                <p className="text-gray-700 mb-6 text-justify">{category.description}</p>

                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl"
                    onClick={onClose}
                    aria-label="Cerrar modal"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}