import { useState } from 'react';
import axios from 'axios';
import { AuthRunner } from '@/src/wrappers/authRunner';

interface UploadResponse {
  filename: string;
  path: string;
}

interface UseFileUploadResult {
  uploading: boolean;
  uploadFile: (file: File) => Promise<UploadResponse | null>;
}

export const useFileUpload = (authRunner: AuthRunner): UseFileUploadResult => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<UploadResponse | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await authRunner.runWithAuth(async (token) => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/file/upload`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data;
      });

      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadFile };
};