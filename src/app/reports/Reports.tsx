'use client'
import Sidebar from "@/src/components/Sidebar";
import ReportCard from "@/src/components/report/ReportCard";
import reportes from "@/src/types/reportExamples";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';
import { Reporte } from "@/src/types/types";

export default function Reports() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<Number|null>(null);
  const [reports, setReports] = useState<Reporte[]> ([]);

  const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();
  
  const authRunner = new AuthRunner(
      () => accessToken,
      async() => {
          const refreshed = await tryRefreshToken();
          return refreshed ? accessToken : null;
      },
      logout
  );

  useEffect(() => {

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
    }

    fetchReports();
    
  }, [loadingTokens])
  

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
            <h1 className="text-5xl font-semibold text-[#060025]">Reportes</h1>
          </div>

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto px-10 p-5">
            <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
              {reports.map((reporte, i) => (
                <ReportCard 
                  key={i} 
                  reporte={reporte} 
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => router.push(`/report_detail?id=${i}`)}
                  className="
                    cursor-pointer 
                    hover:scale-105 
                    transition-transform
                  "
                  isHovered={hoveredIndex === i}
                  hoveredContent={
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold">{reporte.title}</div>
                      <div className="text-gray-600 italic">Resumen breve del reporte</div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}