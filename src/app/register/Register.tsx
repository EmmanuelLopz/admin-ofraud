"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {CreateUserDTO} from "../../types/CreateUserDTO";

let RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .max(100, "Máximo 100 caracteres")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .max(60, "Máximo 60 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});


export default function Register() {
  const router = useRouter();

  
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-10 gap-4 text-center">
      <h3 className="size-16 flex-none"></h3>
      <Image src="/LogoOfraud.png" alt="Logo O-Fraud"
        width={110}
        height={110}
        className="login-logo"
        priority/>
      <h3 className="size-16 flex-none"></h3>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setStatus, setFieldError, resetForm }) => {
        setStatus(undefined);
        try {
          // Solo envía lo que el backend espera
          const payload = {
            name: values.name,
            email: values.email,
            password: values.password,
          };

          const res = await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (res.status === 201 || res.ok) {
            resetForm();
            router.replace("/login");
            return;
          }

          let backendMsg = "Error creando el usuario.";
          try {
            const err = await res.json();
            backendMsg =
              err?.message ||
              err?.error ||
              (Array.isArray(err?.message) ? err.message.join(", ") : backendMsg);

            if (String(backendMsg).toLowerCase().includes("email")) {
              setFieldError("email", backendMsg);
            } else {
              setStatus(backendMsg);
            }
          } catch {
            setStatus(backendMsg);
          }
        } catch (e) {
          setStatus("No se pudo conectar con el servidor. ¿Back en 4000 y CORS activo?");
        } finally {
          setSubmitting(false);
        }
      }}
    >
        {({ isSubmitting, status, values, handleChange, handleBlur, errors, touched, handleSubmit: formikHandleSubmit }) => (
          <form className="login-card" onSubmit={formikHandleSubmit}>
            <h2 className="m-0 mb-4 text-xl font-semibold">Registrate!</h2>

            {/* Nombre */}
            <div className="input-group">
              <span className="input-icon">
                <FaUser />
              </span>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nombre Completo"
                maxLength={50}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.name && errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}

            {/* Correo */}
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Correo"
                autoComplete="email"
                maxLength={100}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}

            {/* Contraseña */}
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña"
                autoComplete="current-password"
                maxLength={60}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

            {/* Confirmar contraseña */}
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                maxLength={60}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <button
              className="orange-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear Cuenta"}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  className="hover:underline"
                  style={{ color: "#FF4400" }}
                  onClick={() => router.push("/login")}
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </form>
        )}
      </Formik>
    </main>
  );
}
