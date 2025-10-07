"use client";
import React from 'react';
import '../styles.css';
import logo from './LogoOfraud.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const handleSubmit = (e) => {
  e.preventDefault();
};

export default function Login() {
  return (
    <main className="login-page">
      <img src={logo} alt="O-Fraud Logo" className="login-logo" />

      <h3 className="login-role">Administrador</h3>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">¡Bienvenido a O-Fraud!</h2>

        <div className="input-group">
          <span className="input-icon"><FaEnvelope /></span>
          <input type="email" placeholder="Correo" name="email" autoComplete="email" />
        </div>

        <div className="input-group">
          <span className="input-icon"><FaLock /></span>
          <input type="password" placeholder="Contraseña" name="password" autoComplete="current-password" />
        </div>

        <button className="login-btn" type="submit">Iniciar Sesión</button>
      </form>
    </main>
  );
}
