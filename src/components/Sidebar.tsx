"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LayoutGrid, Users as UsersIcon, FileText, CheckCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Usuarios",  href: "/users",     icon: UsersIcon },
  { name: "Reportes",  href: "/reports",  icon: FileText },
  { name: "Aceptación de Reportes", href: "/validation", icon: CheckCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[300px] bg-[#060025] shadow-lg z-10 flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-center gap-8 py-6 mt-[15px] mb-[50px]">
          <div className="bg-[#FFFFFF] p-2 w-[100px]">
            <Image
              src="/LogoOfraud.png"
              alt="Logo O-Fraud"
              width={100}
              height={0}
              style={{ height: "auto", width: "100%" }}
              priority
            />
          </div>
          <h1 className="text-white text-xl tracking-wide">O-Fraud</h1>
        </div>

        {/* Menú de navegación con Links reales */}
        <nav className="flex-1 px-6 pb-6 space-y-3 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
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
      </div>
    </aside>
  );
}

