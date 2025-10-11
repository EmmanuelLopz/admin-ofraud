"use client";
import Image from "next/image";
import React from "react";
import { LayoutGrid, Users, FileText, CheckCircle } from "lucide-react";

export default function Sidebar() {

  const [activeItem, setActiveItem] = React.useState("Dashboard"); // Default active item

  function setActiveSection(itemName: string){
    setActiveItem(itemName);
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[300px] bg-[#060025] shadow-lg z-10 flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-center gap-8 py-6 mt-[15px] mb-[50px]">
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

      {/* Menú de navegación (sin funcionalidad) */}
      <nav className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
        {/* Dashboard */}
        <a
          href="#"
          className={activeItem === "Dashboard" ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-md transition-all duration-200" : "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#c7c9d1] hover:text-white hover:bg-white/10 transition-all duration-200"}
          style={activeItem === "Dashboard" ? { backgroundColor: "#FF4400" } : {}}
          onClick={() => setActiveSection("Dashboard")}>
          <LayoutGrid size={20} />
          <span className="text-sm">Dashboard</span>
        </a>

        {/* Usuarios */}
        <a
          href="#"
          className={activeItem === "Usuarios" ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-md transition-all duration-200" : "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#c7c9d1] hover:text-white hover:bg-white/10 transition-all duration-200"}
          style={activeItem === "Usuarios" ? { backgroundColor: "#FF4400" } : {}}
          onClick={() => setActiveSection("Usuarios")}
        >
          <Users size={20} />
          <span className="text-sm">Usuarios</span>
        </a>

        {/* Reportes */}
        <a
          href="#"
          className={activeItem === "Reportes" ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-md transition-all duration-200" : "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#c7c9d1] hover:text-white hover:bg-white/10 transition-all duration-200"}
          style={activeItem === "Reportes" ? { backgroundColor: "#FF4400" } : {}}
          onClick={() => setActiveSection("Reportes")}
        >
          <FileText size={20} />
          <span className="text-sm">Reportes</span>
        </a>

        {/* Aceptación de Reportes */}
        <a
          href="#"
          className={activeItem === "Aceptacion" ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-md transition-all duration-200" : "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#c7c9d1] hover:text-white hover:bg-white/10 transition-all duration-200"}
          style={activeItem === "Aceptacion" ? { backgroundColor: "#FF4400" } : {}}
          onClick={() => setActiveSection("Aceptacion")}
          >
          <CheckCircle size={20} />
          <span className="text-sm">Aceptación de Reportes</span>
        </a>
      </nav>

        
      </div>
    </aside>
  );
}

