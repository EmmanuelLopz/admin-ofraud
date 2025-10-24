import { useState } from 'react';
import { X, Upload, User, Eye, EyeOff } from 'lucide-react';
import { AuthRunner } from '@/src/wrappers/authRunner';
import { useFileUpload } from '@/src/hooks/useFileUpload';
import { getProfileImageUrl } from '@/src/utils/imageUtils';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  profile_pic_url: string;
}

interface UpdateUserModalProps {
  user: User;
  onClose: () => void;
  onUserUpdated: () => void;
  authRunner: AuthRunner;
}

export default function UpdateUserModal({ user, onClose, onUserUpdated, authRunner }: UpdateUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    admin: user.admin,
    profile_pic_url: user.profile_pic_url
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { uploading, uploadFile } = useFileUpload(authRunner);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalProfilePicUrl = formData.profile_pic_url;

      // Upload new image if selected
      if (selectedImage) {
        const uploadResult = await uploadFile(selectedImage);
        if (uploadResult) {
          finalProfilePicUrl = uploadResult.filename;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      // Update user
      await authRunner.runWithAuth(async (token) => {
        const updateData: any = {
          id: user.id,
          name: formData.name,
          email: formData.email,
          profile_pic_url: finalProfilePicUrl,
        };

        // Only include password if it's provided
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users`,
          updateData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      });

      onUserUpdated();
      onClose();
    } catch (error: any) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.message || 'Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const currentImageUrl = imagePreview || getProfileImageUrl(formData.profile_pic_url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-semibold text-[#060025] mb-6">Actualizar Usuario</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <img
                src={currentImageUrl}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/200';
                }}
              />
              {(uploading || loading) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="profile-image"
              disabled={loading || uploading}
            />
            <label
              htmlFor="profile-image"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer transition-colors disabled:opacity-50"
            >
              <Upload size={16} />
              {uploading ? 'Subiendo...' : 'Cambiar Imagen'}
            </label>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
                placeholder="Ingresa el nombre completo"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              placeholder="ejemplo@correo.com"
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña (opcional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
                placeholder="Dejar vacío para mantener la actual"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading || uploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-4 py-2 bg-[#FF4400] text-white rounded-md hover:bg-[#e63d00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Actualizando...
                </>
              ) : (
                'Actualizar Usuario'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}