import { useState, useEffect } from 'react';
import { X, Upload} from 'lucide-react';
import { AuthRunner } from '@/src/wrappers/authRunner';
import { useFileUpload } from '@/src/hooks/useFileUpload';
import axios from 'axios';
import { Category } from '@/src/types/types';

interface CreateReportModalProps {
  onClose: () => void;
  onReportCreated: () => void;
  authRunner: AuthRunner;
}

export default function CreateReportModal({ onClose, onReportCreated, authRunner }: CreateReportModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reference_url: '',
    category_id: '',
    status_id: '1', // Default to submitted
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
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      // Validate required fields
      if (!formData.title || !formData.description || !formData.reference_url || !formData.category_id) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }

      if (!selectedImage) {
        throw new Error('Por favor selecciona una imagen para el reporte');
      }

      // Upload image first
      const uploadResult = await uploadFile(selectedImage);
      if (!uploadResult) {
        throw new Error('Error al subir la imagen');
      }

      // Create report
      await authRunner.runWithAuth(async (token) => {
        const reportData = {
          title: formData.title,
          description: formData.description,
          report_pic_url: uploadResult.filename,
          category_id: parseInt(formData.category_id),
          reference_url: formData.reference_url,
          status_id: parseInt(formData.status_id),
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/reports`,
          reportData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      });

      onReportCreated();
      onClose();
    } catch (error: any) {
      console.error('Error creating report:', error);
      setError(error.message || error.response?.data?.message || 'Error al crear el reporte');
    } finally {
      setLoading(false);
    }
  };

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

        <h2 className="text-2xl font-semibold text-[#060025] mb-6">Crear Nuevo Reporte</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center mb-6">
            {imagePreview && (
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border-4 border-gray-200"
                />
                {(uploading || loading) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="report-image"
              disabled={loading || uploading}
              required
            />
            <label
              htmlFor="report-image"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer transition-colors disabled:opacity-50"
            >
              <Upload size={16} />
              {uploading ? 'Subiendo...' : selectedImage ? 'Cambiar Imagen' : 'Seleccionar Imagen *'}
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
              Estado
            </label>
            <select
              id="status_id"
              name="status_id"
              value={formData.status_id}
              onChange={handleChange}
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
                  Creando...
                </>
              ) : (
                'Crear Reporte'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
