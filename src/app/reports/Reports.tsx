'use client'
import Sidebar from "@/src/components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import reportes from "@/src/types/reportExamples";
import { useRouter } from "next/navigation";

export default function Reports() {
  const router = useRouter();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar a la izquierda */}
      
      <div className="w-1/6">
          <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col bg-[#f6f7fb]">
        {/* Header fijo */}
        <div className="p-10">
          <h1 className="text-5xl font-semibold text-[#060025]">Reportes</h1>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto px-10 p-5">
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
            {reportes.map((reporte, i) => (
              <ReportCard 
                key={i} 
                reporte={reporte} 
                onClick={() => {
                    localStorage.setItem("reporteActivo", i.toString());
                    router.push("/report_detail");
                }} 
                className="cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}