'use client';
import CustomButton from "@/src/components/CustomButton";
import Sidebar from "../../components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import reportes from "@/src/types/reportExamples";
import { useState } from "react";

export default function Validation() {
  const [reports, setReports] = useState(reportes);

  // Función para eliminar un reporte por índice o id
  function handleRemove(indexToRemove: number) {
    setReports((prevReports) => prevReports.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar a la izquierda */}
      <div className="w-1/6">
        <Sidebar />
      </div> 

      {/* Contenido principal */}
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-[#f6f7fb]">
        {/* Header fijo */}
        <div className="p-10">
          <h1 className="text-5xl font-semibold text-[#060025]">Reportes</h1>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto px-10 p-5">
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
            {reports.map((reporte, i) => (
              <ReportCard 
                key={i} 
                reporte={reporte} 
                className="
                  hover:scale-105 
                  transition-transform
                "
              >

                <div className="flex flex-row gap-2 pt-8">
                  <CustomButton 
                    label="Accept" 
                    className="bg-green-500 hover:bg-green-600 w-1/2"
                    onClick={()=>handleRemove(i)}
                  />
                  <CustomButton 
                    label="Reject" 
                    className="bg-red-500 hover:bg-red-600 w-1/2"
                    onClick={()=>handleRemove(i)}
                  />
                </div>
                
              </ReportCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}