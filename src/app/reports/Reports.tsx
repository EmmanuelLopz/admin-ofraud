'use client'
import Sidebar from "@/src/components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';
import { Reporte } from "@/src/types/types";
import CustomButton from "@/src/components/CustomButton";
import CreateReportModal from "@/src/components/CreateReportModal";
import UpdateReportModal from "@/src/components/UpdateReportModal";
import Toast from "@/src/components/Toast";
import { Edit } from "lucide-react";

export default function Reports() {
  const router = useRouter();
  const [reports, setReports] = useState<Reporte[]> ([]);
  const [filteredReports, setFilteredReports] = useState<Reporte[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Reporte | null>(null);
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  });

  const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
  
  const authRunner = new AuthRunner(
      () => accessToken,
      async() => {
          const refreshed = await tryRefreshToken();
          return refreshed ? accessToken : null;
      },
      logout
  );

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const fetchReports = async () => { 
    const data = await authRunner.runWithAuth(async (token) => {
      if(loadingTokens) return;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/reports`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return res.data;
    });

    if (!data) {
        console.error("Failed to fetch reports due to authentication issues");
        return;
    }

    const newReports = await Promise.all( data.map( async (repo: Reporte, i: number) => {

      const categoryData = await authRunner.runWithAuth(async (token) => {
        if (loadingTokens) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/category/${repo.category_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res.data;
      });

      return { ...repo, category: categoryData };

    }));

    if (!newReports) {
        console.error("Failed to fetch category of the report due to authentication issues");
        return;
    }

    setReports(newReports);
    console.log(newReports);
  };

  useEffect(() => {
    fetchReports();
  }, [loadingTokens]);

  // Filter reports whenever the status filter or reports change
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => report.status_id === parseInt(statusFilter));
      setFilteredReports(filtered);
    }
  }, [statusFilter, reports]);

  const handleReportCreated = () => {
    showToast("Reporte creado exitosamente", "success");
    fetchReports();
  };

  const handleReportUpdated = () => {
    showToast("Reporte actualizado exitosamente", "success");
    fetchReports();
  };

  const openUpdateModal = (report: Reporte) => {
    setSelectedReport(report);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedReport(null);
  };
  

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar a la izquierda */}
        
        <div className="w-1/6">
            <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col bg-[#f6f7fb]">
          {/* Header fijo */}
          <div className="p-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-5xl font-semibold text-[#060025]">Reportes</h1>
              <CustomButton
                label="Crear Reporte"
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-[#FF4400] hover:bg-[#e63d00]"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-3 items-center">
              <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              >
                <option value="all">Todos</option>
                <option value="1">Enviados</option>
                <option value="2">Rechazados</option>
                <option value="3">Aceptados</option>
              </select>
              <span className="text-sm text-gray-500">
                ({filteredReports.length} reporte{filteredReports.length !== 1 ? 's' : ''})
              </span>
            </div>
          </div>

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto px-10 p-5">
            {filteredReports.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">No hay reportes con este estado</p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
                {filteredReports.map((reporte, i) => (
                  <div key={reporte.id} className="relative">
                    <ReportCard 
                      reporte={reporte} 
                      onClick={() => router.push(`/report_detail?id=${reporte.id}`)}
                      className="
                        cursor-pointer 
                        hover:scale-105 
                        transition-transform
                      "
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdateModal(reporte);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors z-10"
                      title="Editar reporte"
                    >
                      <Edit size={18} className="text-[#060025]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Report Modal */}
      {isCreateModalOpen && (
        <CreateReportModal
          onClose={() => setIsCreateModalOpen(false)}
          onReportCreated={handleReportCreated}
          authRunner={authRunner}
        />
      )}

      {/* Update Report Modal */}
      {isUpdateModalOpen && selectedReport && (
        <UpdateReportModal
          report={selectedReport}
          onClose={closeUpdateModal}
          onReportUpdated={handleReportUpdated}
          authRunner={authRunner}
        />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ProtectedRoute>
  );
}