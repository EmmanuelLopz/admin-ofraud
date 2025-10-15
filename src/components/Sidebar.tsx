"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LayoutGrid, Users as UsersIcon, FileText, CheckCircle, ToolCase, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from '@/src/context/AuthContext';

const NAV = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Usuarios",  href: "/users",     icon: UsersIcon },
  { name: "Reportes",  href: "/reports",  icon: FileText },
  { name: "Revisión de Reportes", href: "/validation", icon: CheckCircle },
  { name: "Herramientas", href: "/tools", icon: ToolCase },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // if (!user){
  //   return <div>Nada</div>
  // }

  return (
    <aside className="h-full w-full bg-[#060025] shadow-lg flex flex-col">

        <div className="flex items-center gap-3 py-4 px-6">
          <div className="h-10 w-auto relative aspect-square">
            <Image
              src="/LogoOfraud.png"
              alt="Logo O-Fraud"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-white text-lg font-medium">O-Fraud</h1>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-auto relative rounded-full overflow-hidden aspect-square">
            <Image
              src="/adam.jpg"
              alt="profile photo"
              fill
              className="object-fill"
              priority
            />
          </div>

          <div className="text-white text-lg font-semibold">{user ? user.name : "Adam Sandler"}</div>
          <div className="text-gray-500">Administrador</div>
        </div>

        <div className="border-t border-gray-700 my-4" />

        <div className="flex flex-col flex-1 justify-between">
          {/* Menú de navegación con Links reales */}
          <nav className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">

            {NAV.map((item) => {
              const Icon = item.icon;
              const isReportsSection = item.name === "Reportes" &&
                (pathname.startsWith("/reports") || pathname === "/report_detail" || pathname.startsWith("/comment"));
              
              const active = pathname === item.href || pathname.startsWith(item.href + "/") || isReportsSection;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white shadow-md transition-all duration-200"
                      : "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#c7c9d1] hover:text-white hover:bg-white/10 transition-all duration-200"
                  }
                  style={active ? { backgroundColor: "#FF4400" } : {}}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-row text-white p-6 m-1 gap-2 items-center justify-center cursor-pointer"> 
            <div 
              className="flex border-b-2 border-transparent hover:border-red-500 transition-all gap-2"
              onClick={()=>{
                logout();
                console.log("cerrando la sesion");
              }}
            >
              <div style={{color: "#FF4400"}} > Salir </div> 
              <LogOut size={20} style={{color: "#FF4400" }} className="pt-1"/>
            </div>
          </div>
        </div>
    </aside>
  );
}

