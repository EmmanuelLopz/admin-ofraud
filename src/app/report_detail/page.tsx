'use client';

import { useEffect, useState } from 'react';
import { Reporte } from '../../types/types'; // Ajusta la ruta según tus tipos
import reportes from "@/src/types/reportExamples";

export default function ReporteDetalle() {
  const [reporte, setReporte] = useState<Reporte | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('reporteActivo');
    const reporteIndex = data ? parseInt(data, 10) : null;
    setReporte(reportes[reporteIndex ?? 0]);
  }, []);

  if (!reporte) {
    
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">No se encontró el reporte</h1>
        <p>Intenta volver a la página anterior.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{reporte.title}</h1>
      <img
        src={reporte.photo_url}
        alt={reporte.title}
        className="w-full h-64 object-cover rounded mb-6 shadow-xl"
      />
      <p className="mb-4 text-gray-800">{reporte.description}</p>
      <p className="text-sm text-gray-600">Categoría: {reporte.category}</p>
      <a
        href={reporte.url}
        target="_blank"
        className="text-blue-500 hover:underline block mt-4"
      >
        Ver reporte original
      </a>
    </div>
  );
}
