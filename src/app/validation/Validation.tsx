'use client';
import CustomButton from "@/src/components/CustomButton";
import Sidebar from "../../components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { AuthRunner } from "@/src/wrappers/authRunner";
import { useAuth } from "@/src/context/AuthContext";
import { Reporte } from "@/src/types/types";
import axios from "axios";

export default function Validation() {
  const [reports, setReports] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<String>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number | null>(null);
  const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
  
  
  const authRunner = new AuthRunner(
          () => accessToken,
          async () => {
              const refreshed = await tryRefreshToken();
              return refreshed ? accessToken : null;
          },
          logout
    );

  // Fetch reports by status ID (1 for pending validation)
  const fetchReportsByStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await authRunner.runWithAuth(async (token) => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/reports/status/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched reports:", response.data);
        return response.data;
      });

      if (result) {
        // Fetch category data for each report
        const reportsWithCategories = await Promise.all(
          result.map(async (repo: Reporte) => {
            const categoryData = await authRunner.runWithAuth(async (token) => {
              if (loadingTokens) return null;

              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/category/${repo.category_id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              return res.data;
            });

            return { ...repo, category: categoryData };
          })
        );

        setReports(reportsWithCategories);
      } else {
        setError('No se pudieron cargar los reportes');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Error al cargar los reportes');
    } finally {
      setLoading(false);
    }
  };

  // Load reports on component mount
  useEffect(() => {
    if (!loadingTokens && accessToken) {
      fetchReportsByStatus();
    }
  }, [accessToken, loadingTokens]);

  
  function openModal(reportId: number, action: String) {
    setSelectedReportIndex(reportId);
    setAction(action);
    setIsModalOpen(true);
  }

  async function confirm() {
    if (selectedReportIndex !== null) {
      try {
        let endpoint = "";
        if (action === "accept") {
          endpoint = `/reports/${selectedReportIndex}/accept`;
        } else if (action === "reject") {
          endpoint = `/reports/${selectedReportIndex}/reject`;
        }

        const result = await authRunner.runWithAuth(async (token) => {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${endpoint}`,
            {
              status_id: action === "accept" ? 3 : 2
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
          return response.data;
        });

        if (result) {
          // Remove the processed report from the list
          setReports(prevReports => 
            prevReports.filter(report => report.id !== selectedReportIndex)
          );
          console.log(`Report ${action}ed successfully`);
        }
      } catch (error) {
        console.error(`Error ${action}ing report:`, error);
      }

      setIsModalOpen(false);
      setSelectedReportIndex(null);
    }
  }  function cancel() {
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-600">Cargando reportes...</div>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="text-xl text-red-600 mb-4">{error}</div>
              <button 
                onClick={fetchReportsByStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reintentar
              </button>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-600">No hay reportes pendientes de validación</div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
              {reports.map((reporte, i) => (
                <ReportCard 
                  key={reporte.id} 
                  reporte={reporte} 
                  className="
                    hover:scale-105 
                    transition-transform
                  "
                >

                  <div className="flex flex-row gap-2 pt-8">
                    <CustomButton 
                      label="Aceptar" 
                      className="bg-green-500 hover:bg-green-600 w-1/2"
                      onClick={()=>openModal(reporte.id, "accept")}
                    />
                    <CustomButton 
                      label="Rechazar" 
                      className="bg-red-500 hover:bg-red-600 w-1/2"
                      onClick={()=>openModal(reporte.id, "reject")}
                    />
                  </div>
                  
                </ReportCard>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-lg p-6 w-1/5 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirmar acción</h2>
            <p>¿Estás seguro que quieres {action === 'accept' ? 'aceptar' : 'rechazar'} este reporte?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                className={`px-4 py-2 rounded ${
                  action === 'reject' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={cancel}
              >
                Cancelar
              </button>
              
              <button
                className={`px-4 py-2 rounded ${
                  action === 'reject'
                    ? 'bg-gray-300 hover:bg-gray-400 text-black'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                onClick={confirm}
              >
                {action === "accept" ? "Aceptar" : "Rechazar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}