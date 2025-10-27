'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';
import Toast from './Toast';

type CreateUserModalProps = {
  onClose: () => void;
  onUserCreated: () => void;
  authRunner: AuthRunner;
};

type ToastState = {
  show: boolean;
  message: string;
  type: 'success' | 'error';
};

type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export default function CreateUserModal({ onClose, onUserCreated, authRunner }: CreateUserModalProps) {
  const [formData, setFormData] = useState<CreateUserForm>({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }

    // Email validation with length check and efficient regex
    const email = formData.email.trim();
    if (!email) {
      errors.email = 'El correo es requerido';
    } else if (email.length > 254) { // RFC 5321
      errors.email = 'El correo es demasiado largo';
    } else {
      // Simple, linear-time regex that prevents ReDoS
      const emailRegex = new RegExp('^[^\\s@]{1,64}@[^\\s@]{1,255}$');
      const hasValidFormat = emailRegex.test(email);
      const hasSingleAt = (email.match(/@/g) || []).length === 1;
      const hasDot = email.includes('.');
      
      if (!hasValidFormat || !hasSingleAt || !hasDot) {
        errors.email = 'El correo no tiene un formato válido';
      }
    }

    // Validate password field
    const passwordValue = formData.password;
    if (!passwordValue) {
      errors.password = 'La contraseña es requerida';
    } else if (passwordValue.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = formData.isAdmin ? '/users/admin' : '/users';
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      console.log(`Creating ${formData.isAdmin ? 'admin' : 'user'}:`, userData);

      const result = await authRunner.runWithAuth(async (token) => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${endpoint}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      });

      if (result) {
        console.log('User created successfully:', result);
        const userType = formData.isAdmin ? 'administrador' : 'usuario';
        showToast(`${userType} creado exitosamente: ${formData.name}`, 'success');
        
        // Close modal after a short delay to let user see the success message
        setTimeout(() => {
          onUserCreated();
          onClose();
        }, 1500);
      } else {
        const errorMsg = 'Error al crear el usuario: No se pudo autenticar';
        setError(errorMsg);
        showToast(errorMsg, 'error');
      }
    } catch (err: any) {
      console.error('Error creating user:', err);
      let errorMessage = 'Error al crear el usuario';
      
      if (err.response?.data?.message) {
        errorMessage = `Error: ${err.response.data.message}`;
      } else if (err.response?.status === 409) {
        errorMessage = 'Error: Ya existe un usuario con este correo electrónico';
      } else if (err.response?.status === 400) {
        errorMessage = 'Error: Datos de usuario inválidos';
      } else if (err.response?.status === 500) {
        errorMessage = 'Error del servidor. Intenta nuevamente.';
      }
      
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#060025]">Crear Usuario</h2>
            {formData.isAdmin && (
              <p className="text-sm text-[#FF4400] font-medium">Modo Administrador</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-transparent"
              placeholder="Ingresa el nombre completo"
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-transparent"
              placeholder="usuario@email.com"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-transparent"
              placeholder="Mínimo 8 caracteres"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          {/* Admin checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleInputChange}
              className="w-4 h-4 text-[#FF4400] border-gray-300 rounded focus:ring-[#FF4400] focus:ring-2"
            />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">
              Administrador
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#FF4400] text-white rounded-md hover:bg-[#e63d00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}