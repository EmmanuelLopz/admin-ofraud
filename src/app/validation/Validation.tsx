import Sidebar from "../../components/Sidebar";

export default function Validation() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="ml-[300px] flex-1 bg-[#f6f7fb] p-10">
        <h1 className="text-3xl font-semibold text-[#060025]">Aceptación de reportes</h1>
      </main>
    </div>
  );
}