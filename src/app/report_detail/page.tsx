'use client';

import { useEffect, useState } from 'react';
import { Reporte } from '../../types/types'; // Ajusta la ruta según tus tipos
import reportes from "@/src/types/reportExamples";
import MainLayout from '@/src/components/MainLayout';
import Card from '@/src/components/Card';


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
    <MainLayout>
      <div className="flex-1 flex p-10 items-start justify-center">
        <Card 
          className="w-2/3 h-2/3"
        >
          <div className="text-xl font-semibold text-center mb-4"> {reporte.title} </div>
          <img
            src={reporte.photo_url}
            alt={reporte.title}
            className="
              w-full h-2/3
              object-cover 
              rounded-md 
              mb-5 
              shadow-xl
            "
          />
          <a href={reporte.url} className="text-blue-500 hover:underline mb-2 block">
            URL: {reporte.url}
          </a>
          <p className="text-gray-700 mb-10">{reporte.description}</p>
          <p className="text-sm text-gray-500">Categoría: </p>
          <p className="text-sm text-gray-500">{reporte.category}</p>
        </Card>
      </div>
    </MainLayout>
  );
}
