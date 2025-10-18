'use client';

import { useEffect, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Toast from './Toast';

import { AuthRunner } from '../wrappers/authRunner';

type DeleteUserModalProps = {
  onClose: () => void;
  onUserDeleted: (deletedId: string) => void;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
  authRunner: AuthRunner;
};

type ToastState = {
  show: boolean;
  message: string;
  type: 'success' | 'error';
};

export default function DeleteUserModal({
  onClose,
  onUserDeleted,
  user,
  authRunner,
}: DeleteUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
  };
  const hideToast = () => setToast((prev) => ({ ...prev, show: false }));

  // Cerrar con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !loading) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [loading, onClose]);

  // Cerrar haciendo clic fuera del modal
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (loading) return;
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirm = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await authRunner.runWithAuth(
        (token) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${user.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
      );

      if (response && response.ok) {
        showToast(
          `Usuario${user.name ? ` "${user.name}"` : ''} eliminado correctamente`,
          'success'
        );
        setTimeout(() => {
          onUserDeleted(user.id);
          onClose();
        }, 1200);
      } else if (response) {
        const errorData = await response.json();
        showToast(errorData.message || 'Error al eliminar el usuario', 'error');
        setLoading(false);
      } else {
        showToast('Error de autenticación. Intente iniciar sesión de nuevo.', 'error');
        setLoading(false);
      }
    } catch (error) {
      showToast('Error de red o de servidor', 'error');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-desc"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-red-100 text-red-700">
              <AlertTriangle size={18} />
            </span>
            <h2
              id="confirm-delete-title"
              className="text-lg font-semibold text-[#060025]"
            >
              ¿Estás seguro de eliminar a este usuario?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
            disabled={loading}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <p id="confirm-delete-desc" className="text-sm text-gray-700 mb-4">
          Esta acción no se puede deshacer. Se eliminará al usuario{' '}
          <span className="font-medium">
            {user?.name || user?.email || `ID ${user?.id}`}
          </span>
          .
        </p>

        {/* Footer */}
        <div className="flex gap-3 pt-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Eliminando...' : 'Confirmar'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
