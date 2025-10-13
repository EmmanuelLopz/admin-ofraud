import Sidebar from "../../components/Sidebar";

export default function Validation() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <div className="w-1/6">
        <Sidebar />
      </div> 

      {/* Contenido principal */}
      <main className="flex-1 bg-[#f6f7fb] p-10">
        <h1 className="text-3xl font-semibold text-[#060025]">Aceptación de reportes</h1>
      </main>
    </div>
  );
}