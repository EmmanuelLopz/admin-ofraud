"use client";
import React from "react";
import { FaUser, FaFileAlt, FaThumbsUp, FaComment } from "react-icons/fa";

interface CardProps {
  title: string;
  info: string;
  color: string;
  icon: string;
  onClick?: () => void;
}

export default function Card({ title, info, color, icon, onClick }: CardProps) {
    function getIcon(title: string) {
        switch (title) {
            case "Usuarios":
                return <FaUser size={40} />;
            case "Reportes":
                return <FaFileAlt size={40} />;
            case "Likes":
                return <FaThumbsUp size={40} />;
            case "Comentarios":
                return <FaComment size={40} />;
            default:
                return null;
        }
    }

    return (
    <div
      className={`rounded-lg shadow-md p-5 text-white cursor-pointer transition-transform duration-150 hover:scale-105`}
      style={{ backgroundColor: color, width: "100%", maxWidth: "250px" }}
      onClick={onClick}
    >
        <div className="flex flex-row items-center justify-center mb-4 w-full">
            <div className="flex items-center w-3/4">
                <div className="flex flex-col">
                    <label className="text-lg font-semibold block">{title}</label>
                    <p className="text-sm font-semibold block mb-1">{info}</p>
                </div>
                
            </div>
            <div className="flex justify-end items-center w-1/4">
                {getIcon(icon)}
            </div>
        </div>
    </div>
  );
}