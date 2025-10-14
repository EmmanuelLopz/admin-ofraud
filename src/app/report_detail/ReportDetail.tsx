'use client';

import { useEffect, useState } from 'react';
import { Reporte } from '../../types/types'; 
import { useRouter } from "next/navigation";
import reportes from "@/src/types/reportExamples";
import MainLayout from '@/src/components/MainLayout';
import CommentCard from '@/src/components/report/CommentCard';
import ReportCard from '@/src/components/report/ReportCard';

export default function ReporteDetalle() {
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const router = useRouter();

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
      <div className="flex flex-1 flex-col p-10 h-full overflow-y-scroll hide-scrollbar">
        
        <div className="p-x-10 mb-10">
          <h1 className="text-5xl font-semibold text-[#060025] text-left">Detalle reporte</h1>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-10">
            <ReportCard reporte={reporte} className="w-2/3 h-2/3" />

            <div className="w-3/5 gap-5">
                <h2 className="text-lg font-normal text-gray-500 mb-2">Comentarios</h2>

                <div className="flex flex-col w-full gap-4">
                    { reporte.comments.map((comment, index) => (
                        <CommentCard 
                            key={index} 
                            comment={comment} 
                            onClick={()=>router.push("/comment")}
                        />
                    ))}
                </div>
            </div>
        </div>
        
        
      </div>
    </MainLayout>
  );
}
