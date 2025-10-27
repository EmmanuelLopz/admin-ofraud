import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { AuthRunner } from '@/src/wrappers/authRunner';
import { useFileUpload } from '@/src/hooks/useFileUpload';
import { getProfileImageUrl, sanitizeImageSrc } from '@/src/utils/imageUtils';
import axios from 'axios';
import { Category, Reporte } from '@/src/types/types';

interface UpdateReportModalProps {
  report: Reporte;
  onClose: () => void;
  onReportUpdated: () => void;
  authRunner: AuthRunner;
}

export default function UpdateReportModal({ report, onClose, onReportUpdated, authRunner }: UpdateReportModalProps) {
  const [formData, setFormData] = useState({
    title: report.title,
    description: report.description,
    reference_url: report.reference_url,
    category_id: report.category_id.toString(),
    status_id: report.status_id.toString(),
    report_pic_url: report.report_pic_url,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const { uploading, uploadFile } = useFileUpload(authRunner);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await authRunner.runWithAuth(async (token) => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/category`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        });
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error al cargar las categorías');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate that the input name is one of the expected fields
    const allowedFields = ['title', 'description', 'reference_url', 'category_id', 'status_id'];
    if (!allowedFields.includes(name)) {
      console.warn('Attempted to set invalid field:', name);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Tipo de archivo no permitido. Solo se permiten imágenes PNG, JPEG, GIF y WebP.');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('El archivo es demasiado grande. Tamaño máximo: 5MB.');
        return;
      }
      
      setSelectedImage(file);
      setError(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        setError('Error al leer el archivo de imagen.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalReportPicUrl = formData.report_pic_url;

      // Upload new image if selected
      if (selectedImage) {
        const uploadResult = await uploadFile(selectedImage);
        if (uploadResult) {
          finalReportPicUrl = uploadResult.filename;
        } else {
          throw new Error('Error al subir la imagen');
        }
      }

      // Update report
      await authRunner.runWithAuth(async (token) => {
        const updateData = {
          title: formData.title,
          description: formData.description,
          report_pic_url: finalReportPicUrl,
          category_id: parseInt(formData.category_id),
          user_id: report.user_id,
          reference_url: formData.reference_url,
          creation_date: report.creation_date,
          status_id: parseInt(formData.status_id),
          deleted_at: null,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/reports/${report.id}`,
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

      onReportUpdated();
      onClose();
    } catch (error: any) {
      console.error('Error updating report:', error);
      setError(error.response?.data?.message || 'Error al actualizar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const currentImageUrl = imagePreview ? sanitizeImageSrc(imagePreview) : getProfileImageUrl(formData.report_pic_url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-semibold text-[#060025] mb-6">Actualizar Reporte</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4 w-full">
              <img
                src={currentImageUrl}
                alt="Report preview"
                className="w-full h-48 object-cover rounded-md border-4 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x300';
                }}
              />
              {(uploading || loading) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="report-image"
              disabled={loading || uploading}
            />
            <label
              htmlFor="report-image"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer transition-colors disabled:opacity-50"
            >
              <Upload size={16} />
              {uploading ? 'Subiendo...' : 'Cambiar Imagen'}
            </label>
          </div>

          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              placeholder="Título del reporte"
              disabled={loading}
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              placeholder="Descripción detallada del reporte"
              disabled={loading}
            />
          </div>

          {/* Reference URL Field */}
          <div>
            <label htmlFor="reference_url" className="block text-sm font-medium text-gray-700 mb-1">
              URL de Referencia *
            </label>
            <input
              type="url"
              id="reference_url"
              name="reference_url"
              value={formData.reference_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              placeholder="https://ejemplo.com"
              disabled={loading}
            />
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              disabled={loading || loadingCategories}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status_id" className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              id="status_id"
              name="status_id"
              value={formData.status_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4400] focus:border-[#FF4400]"
              disabled={loading}
            >
              <option value="1">Enviado</option>
              <option value="2">Rechazado</option>
              <option value="3">Aceptado</option>
            </select>
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
                'Actualizar Reporte'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
