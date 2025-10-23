"use client";

import { useState, useEffect } from "react";
import Card from "@/src/components/Card";
import DataCard from "@/src/components/DataCard";
import Sidebar from "../../components/Sidebar";
import MostLikedReports from "@/src/components/MostLikedReports";
import UsersWithMostReports from "@/src/components/UsersWithMostReports";
import TotalReportsAllTime from "@/src/components/TotalReportsAllTime";
import ProtectedRoute from "@/src/wrappers/ProtectedRoute";
import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from "@/src/wrappers/authRunner";
import axios from "axios";

interface DashboardStats {
  users: number;
  reports: number;
  comments: number;
  likes: number;
}

export default function Dashboard() {
  const { accessToken, tryRefreshToken, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authRunner = new AuthRunner(
    () => accessToken,
    async () => {
      const refreshed = await tryRefreshToken();
      return refreshed ? accessToken : null;
    },
    logout
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: DashboardStats = await authRunner.runWithAuth(async (token) => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/stats/dashboard`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return response.data;
        });
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchStats();
    }
  }, [accessToken]);
  
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <div className="w-1/6">
          <Sidebar />
        </div>
        
        <main className="flex-1 bg-[#f6f7fb] p-10">
          <h1 className="text-3xl font-semibold text-[#060025] mb-5">Dashboard</h1>
          <div className="flex flex-wrap justify-between mb-10">
            {loading ? (
              <p>Cargando estadísticas...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : stats ? (
              <>
                <DataCard title={String(stats.users)} info="Usuarios" color="#007bff" icon="Usuarios" />
                <DataCard title={String(stats.reports)} info="Reportes" color="#ffc107" icon="Reportes" />
                <DataCard title={String(stats.likes)} info="Likes" color="#28a745" icon="Likes" />
                <DataCard title={String(stats.comments)} info="Comentarios" color="#dc3545" icon="Comentarios" />
              </>
            ) : null}
          </div>
          <div className='grid grid-cols-2 gap-4 mb-10'>
            <Card>
              <MostLikedReports/>
            </Card>
            <Card>
              <UsersWithMostReports/>
            </Card>
          </div>
          <Card>
            <TotalReportsAllTime/>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}