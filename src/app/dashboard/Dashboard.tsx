import Card from "@/src/components/Card";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="ml-[300px] flex-1 bg-[#f6f7fb] p-10">
        <h1 className="text-3xl font-semibold text-[#060025]">Dashboard</h1>
        <Card className="p-2 text-sm w-1/2">
          <p>This is a small card</p>
        </Card>
      </main>
    </div>
  );
}