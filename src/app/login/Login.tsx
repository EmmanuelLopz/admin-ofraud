"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';


import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loadingTokens } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated, "loadingTokens:", loadingTokens);
    
    if(!loadingTokens && isAuthenticated) {
      console.log("Redirecting to dashboard...");
      router.push("/dashboard");
    }
  
  }, [isAuthenticated, loadingTokens, router])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      setLoading(true);
      await login(email, password); // attempt login
      // Redirect will be handled by useEffect
    } catch (error) {
      console.error(error);
      alert("Correo o contraseña incorrectos"); // show feedback
    } finally {
      setLoading(false);
    }
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

        <button className="orange-btn" type="submit" disabled={loading || loadingTokens}>
          {loading || loadingTokens ? "Cargando..." : "Iniciar Sesión"}
        </button>

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
