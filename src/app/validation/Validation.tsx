'use client';
import CustomButton from "@/src/components/CustomButton";
import Sidebar from "../../components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import reportes from "@/src/types/reportExamples";
import { useState } from "react";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";

export default function Validation() {
  const [reports, setReports] = useState(reportes);
  const [action, setAction] = useState<String>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number | null>(null);
  
  function openModal(index: number, action: String) {
    setSelectedReportIndex(index);
    setAction(action);
    setIsModalOpen(true);
  }

  function confirm() {
    if (selectedReportIndex !== null) {
      setReports((prev) => prev.filter((_, i) => i !== selectedReportIndex));
      setIsModalOpen(false);
      setSelectedReportIndex(null);
    }
  }

  function cancel() {
    setIsModalOpen(false);
    setSelectedReportIndex(null);
  }

  return (
    <ProtectedRoute>
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
                    onClick={()=>openModal(i, "Aceptar")}
                  />
                  <CustomButton 
                    label="Reject" 
                    className="bg-red-500 hover:bg-red-600 w-1/2"
                    onClick={()=>openModal(i, "Eliminar")}
                  />
                </div>
                
              </ReportCard>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-lg p-6 w-1/5 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirmar acción</h2>
            <p>¿Estás seguro que quieres {action} este reporte?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={cancel}
              >
                Cancelar
              </button>
              
              <button
                className={`px-4 py-2 rounded text-white ${
                  action === "Eliminar"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={confirm}
              >
                {action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}