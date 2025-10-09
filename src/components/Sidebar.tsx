import Image from "next/image";
import { LayoutDashboard, Users, FileText, CheckCircle } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[300px] bg-[#060025] shadow-lg z-10 flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-center gap-[25px] py-6 mt-[15px] mb-[50px]">
            <div className="bg-[#FF4400] p-2 rounded-lg w-[100px]">
            <Image
              src="/LogoOfraud.png"
              alt="Logo O-Fraud"
              width={100}
              height={0}
              style={{ height: "auto", width: "100%" }}
            />
            </div>
          <h1 className="text-white text-xl tracking-wide" style={{ color: "#fff" }}>O-Fraud</h1>
        </div>

        {/* Menú de navegación */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        <a
          href="#"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <LayoutDashboard size={20} />
          <span className="text-sm">Dashboard</span>
        </a>

        <a
          href="#"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-white shadow-md"
          style={{ backgroundColor: "#FF4400" }}
        >
          <Users size={20} />
          <span className="text-sm">Usuarios</span>
        </a>

        <a
          href="#"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <FileText size={20} />
          <span className="text-sm">Reportes</span>
        </a>

        <a
          href="#"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <CheckCircle size={20} />
          <span className="text-sm">Aceptación de Reportes</span>
        </a>
      </nav>

        
      </div>
    </aside>
  );
}

