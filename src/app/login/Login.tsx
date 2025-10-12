"use client";
import React from 'react';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';


import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function Login() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-10 gap-4 text-center">
      <h3 className="size-16 flex-none"></h3>
      <Image src="/LogoOfraud.png" alt="Logo O-Fraud"
        width={110}
        height={110}
        className="login-logo"
        priority/>
      <h3 className="size-16 flex-none"></h3>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="m-0 mb-4 text-xl font-semibold">¡Bienvenido a O-Fraud!</h2>

        <div className="input-group">
          <span className="input-icon"><FaEnvelope /></span>
          <input type="email" placeholder="Correo" name="email" autoComplete="email" />
        </div>

        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Contraseña" name="password" autoComplete="current-password" />
        </div>

        <button className="orange-btn" type="submit">Iniciar Sesión</button>

        <div className="text-center pt-4">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="hover:underline"
                  style={{ color: '#FF4400' }}
                  onClick={() => router.replace("/register")}
                >
                  Crear cuenta
                </button>
              </p>
            </div>
      </form>
    </main>
  );
}
