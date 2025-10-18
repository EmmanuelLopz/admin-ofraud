/**
 * Construye la URL completa para descargar un archivo desde el backend
 * @param filename - El nombre del archivo obtenido del backend
 * @returns URL completa para descargar el archivo
 */
export const getImageUrl = (filename: string): string => {
  if (!filename || filename.trim() === '' || filename === 'null' || filename === 'undefined') {
    return 'https://placehold.co/200';
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return `${baseUrl}/file/download/${filename}`;
};

/**
 * Obtiene la URL de imagen de perfil con fallback a placeholder
 * @param profilePicUrl - URL de la imagen de perfil desde la base de datos
 * @returns URL de imagen o placeholder
 */
export const getProfileImageUrl = (profilePicUrl: string): string => {
  if (!profilePicUrl || profilePicUrl.trim() === '' || profilePicUrl === 'null' || profilePicUrl === 'undefined') {
    return 'https://placehold.co/200';
  }
  
  // Si ya es una URL completa, la devolvemos tal como está
  if (profilePicUrl.startsWith('http')) {
    return profilePicUrl;
  }
  
  // Si es un filename, construimos la URL de descarga
  return getImageUrl(profilePicUrl);
};