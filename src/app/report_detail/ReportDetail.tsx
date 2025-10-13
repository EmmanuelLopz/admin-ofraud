'use client';

import { useEffect, useState } from 'react';
import { Reporte } from '../../types/types'; // Ajusta la ruta según tus tipos
import reportes from "@/src/types/reportExamples";
import MainLayout from '@/src/components/MainLayout';
import CommentCard from '@/src/components/report/CommentCard';
import ReportCard from '@/src/components/report/ReportCard';

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
      <div className="flex flex-1 flex-col p-10 items-center justify-start gap-10 overflow-y-scroll h-full hide-scrollbar">
        
        <ReportCard reporte={reporte} className="w-2/3 h-2/3" />

        <div className="w-3/5 gap-5">
            <CommentCard comment={reporte.comments[0]} />
        </div>
        
      </div>
    </MainLayout>
  );
}
