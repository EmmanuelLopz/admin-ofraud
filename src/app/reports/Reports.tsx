import Sidebar from "../../components/Sidebar";

export default function Reports() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="ml-[300px] flex-1 bg-[#f6f7fb] p-10">
        <h1 className="text-3xl font-semibold text-[#060025]">
          Incidencias
        </h1>
      </main>
    </div>
  );
}