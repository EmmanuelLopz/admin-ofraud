'use client';

import { useEffect, useState } from 'react';
import { Reporte, Commenta } from '../../types/types'; 
import { useRouter } from "next/navigation";
import reportes from "@/src/types/reportExamples";
import MainLayout from '@/src/components/MainLayout';
import CommentCard from '@/src/components/report/CommentCard';
import ReportCard from '@/src/components/report/ReportCard';
import ProtectedRoute from '@/src/wrappers/ProtectedRoute';

import { useAuth } from "@/src/context/AuthContext";
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';

export default function ReporteDetalle() {
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [comments, setComments] = useState<Commenta[]>([]);
  const router = useRouter();

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
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id") || "0", 10);

    const fetchReport = async () => {
      const data = await authRunner.runWithAuth(async (token) => {
        if(loadingTokens) return;

          const res = await axios.get(`http://localhost:3001/reports/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
          })

          return res.data;
      });

      if(!data){
        console.log("Aun no se tienen los datos");
        return;
      }

      setReporte(data);

      const categoryData = await authRunner.runWithAuth(async (token) => {
        if (loadingTokens) return;

        const res = await axios.get(
          `http://localhost:3001/category/${data.category_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res.data;
      });

      if(!categoryData){
        console.log("Aun no se tienen la categoria");
        return;
      }

      setReporte({... data, category: categoryData});

      const reportComments = await authRunner.runWithAuth(async (token) => {
        if (loadingTokens) return;

        const res = await axios.get(
          `http://localhost:3001/comment/report/${data.id}/root`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res.data;
      });

      if(!reportComments){
        console.log("No se obtubieron los comentarios");
        return;
      }

      setComments(reportComments);
      
    }

    fetchReport();


    setReporte(reportes[id]);
  }, [loadingTokens]);

  if (!reporte) {
    return (
        <MainLayout>
            <div className="p-10">
                <h1 className="text-2xl font-bold">No se encontró el reporte</h1>
                <p>Intenta volver a la página anterior.</p>
            </div>
        </MainLayout>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex flex-1 flex-col p-10 h-full overflow-y-scroll hide-scrollbar">
          
          <div className="p-x-10 mb-10">
            <h1 className="text-5xl font-semibold text-[#060025] text-left">Detalle reporte</h1>
          </div>

          <div className="flex flex-col w-full justify-center items-center gap-10">
              <ReportCard reporte={reporte} className="w-2/3 h-auto" />

              {/* Todo lo de comentarios */}
              <div className="w-3/5 gap-5">
                  <h2 className="text-lg font-normal text-gray-500 mb-2">Comentario{comments.length > 1 ? 's':''}</h2>

                  <div className="flex flex-col w-full gap-4">
                      { comments.map((comment, index) => (
                          <CommentCard 
                              key={index} 
                              comment={comment} 
                              onClick={()=>{
                                  console.log("Storing coment:", JSON.stringify(comment));
                                  localStorage.setItem("activeComment", JSON.stringify(comment));
                                  router.push("/comment")
                                  router.push(`/comment?id=${comment.id}`)
                              }}
                              className='cursor-pointer'
                          />
                      ))}
                  </div>
              </div>
          </div>        
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
