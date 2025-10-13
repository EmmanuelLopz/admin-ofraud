'use client'
import Card from "@/src/components/Card";
import Sidebar from "../../components/Sidebar";
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
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-10">
            {reportes.map((reporte, i) => (
              <Card 
                key={i} 
                className="basis-5/12"
                onClick={() => {
                  localStorage.setItem("reporteActivo", i.toString());
                  router.push("/report_detail");
                }}
              >
                <div className="text-xl font-semibold text-center mb-4"> {reporte.title} </div>
                <img
                  src={reporte.photo_url}
                  alt={reporte.title}
                  className="
                    w-full h-48 
                    object-cover 
                    rounded-md 
                    mb-5 
                    shadow-xl
                  "
                />
                <a href={reporte.url} className="text-blue-500 hover:underline mb-2 block">
                  URL: {reporte.url}
                </a>
                <p className="text-gray-700 mb-10">{reporte.description}</p>
                <p className="text-sm text-gray-500">Categoría: </p>
                <p className="text-sm text-gray-500">{reporte.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}