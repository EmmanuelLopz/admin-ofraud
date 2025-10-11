"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const usuarios = [
    {
      id: "1",
      nombre: "Ana García",
      email: "ana.garcia@email.com",
      foto: "https://images.unsplash.com/photo-1585554414787-09b821c321c0"
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      foto: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23"
    },
    {
      id: "3",
      nombre: "María López",
      email: "maria.lopez@email.com",
      foto: "https://images.unsplash.com/photo-1758518727888-ffa196002e59"
    },
    {
      id: "4",
      nombre: "Pedro Martínez",
      email: "pedro.martinez@email.com",
      foto: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23"
    },
    {
      id: "5",
      nombre: "Laura Hernández",
      email: "laura.hernandez@email.com",
      foto: "https://images.unsplash.com/photo-1585554414787-09b821c321c0"
    },
    {
      id: "6",
      nombre: "Diego Santos",
      email: "diego.santos@email.com",
      foto: "https://images.unsplash.com/photo-1758518727888-ffa196002e59"
    },
    {
      id: "7",
      nombre: "Sofía Ramírez",
      email: "sofia.ramirez@email.com",
      foto: "https://images.unsplash.com/photo-1585554414787-09b821c321c0"
    },
    {
      id: "8",
      nombre: "Miguel Ángel Torres",
      email: "miguel.torres@email.com",
      foto: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23"
    }
  ];

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="ml-[300px] flex-1 bg-[#f6f7fb] p-10">
        <div>
          {/* Header con título y buscador */}
          <div className="mb-6">
            <h2 className="mb-4">Usuarios</h2>
            <div className="relative max-w-md">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* You can use an SVG icon for search here */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              </span>
              <input
              type="text"
              placeholder="Buscar por nombre, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-gray-200 rounded focus:border-[#FF4400] focus:ring-[#FF4400] py-2 w-full"
              />
            </div>
          </div>

          {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header de la tabla */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#060025' }}>
          <div className="col-span-2">
            <span className="text-sm text-white">ID</span>
          </div>
          <div className="col-span-4">
            <span className="text-sm text-white">Nombre</span>
          </div>
          <div className="col-span-3">
            <span className="text-sm text-white">Email</span>
          </div>
          <div className="col-span-3 flex">
            <span className="text-sm text-white">Acciones</span>
          </div>
        </div>

        {/* Filas de usuarios */}
        <div className="divide-y divide-gray-100">
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                {/* ID */}
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">{usuario.id}</span>
                </div>

                {/* Nombre */}
                <div className="col-span-4">
                  <span className="text-sm text-gray-900">{usuario.nombre}</span>
                </div>

                {/* Email */}
                <div className="col-span-3">
                  <span className="text-sm text-gray-600">{usuario.email}</span>
                </div>

                {/* Acciones */}
                <div className="col-span-3 flex gap-5 ml-10">
                    <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white border-0 rounded px-2 py-1 text-sm flex items-center"
                    >
                    <Eye size={16} />
                    </button>
                    <button
                    type="button"
                    className="bg-white hover:bg-gray-50 border-2 border-[#060025] text-[#060025] hover:text-[#060025] rounded px-2 py-1 text-sm flex items-center"
                    >
                    <Edit size={16} />
                    </button>
                    <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white border-0 rounded px-2 py-1 text-sm flex items-center"
                    >
                    <Trash2 size={16} />
                    </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No se encontraron usuarios que coincidan con la búsqueda.</p>
            </div>
          )}
        </div>
      </div>
        </div>
      </main>
    </div>
  );
}