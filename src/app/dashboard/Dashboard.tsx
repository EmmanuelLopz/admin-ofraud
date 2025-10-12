import Card from "@/src/components/Card";
import DataCard from "@/src/components/DataCard";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      
      <main className="flex-1 bg-[#f6f7fb] p-10">
        <h1 className="text-3xl font-semibold text-[#060025] mb-5">Dashboard</h1>
        <div className="flex flex-wrap justify-between">
          <DataCard title="10000" info="Usuarios" color="#007bff" icon="Usuarios" />
          <DataCard title="22500" info="Reportes" color="#ffc107" icon="Reportes" />
          <DataCard title="50000" info="Likes" color="#28a745" icon="Likes" />
          <DataCard title="10000" info="Comentarios" color="#dc3545" icon="Comentarios" />
        </div>
      </main>
    </div>
  );
}