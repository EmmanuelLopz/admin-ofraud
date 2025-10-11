"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function Register() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  
  return (
    <main className="login-page">
      <Image src="/LogoOfraud.png" alt="Logo O-Fraud"
        width={110}
        height={110}
        className="login-logo"
        priority/>
      <h3 className="login-role">Administrador</h3>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Registro</h2>

        <div className="input-group">
          <span className="input-icon"><FaUser /></span>
          <input type="text" placeholder="Nombre Completo" name="name" />
        </div>

        <div className="input-group">
          <span className="input-icon"><FaEnvelope /></span>
          <input type="email" placeholder="Correo" name="email" autoComplete="email" />
        </div>

        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Contraseña" name="password" autoComplete="current-password" />
        </div>

        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Confirmar contraseña" name="confirmPassword" autoComplete="new-password" />
        </div>

        <button className="orange-btn" type="submit">Crear Cuenta</button>

        <div className="text-center pt-4">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  className="hover:underline"
                  style={{ color: '#FF4400' }}
                  onClick={() => router.push("/login")}
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
      </form>
    </main>
  );
}
