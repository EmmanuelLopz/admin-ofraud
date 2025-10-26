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
 * Sanitiza una URL para asegurarse que sólo puede ser un enlace HTTP(S) o un data:image
 */
export const sanitizeImageSrc = (src: string): string => {
  if (!src || typeof src !== 'string') return 'https://placehold.co/200';
  const trimmed = src.trim();
  // Only allow http(s) URLs or "data:image/<format>;base64,..." for trusted FileReader images
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    /^data:image\/[a-zA-Z]+;base64,/.test(trimmed)
  ) {
    return trimmed;
  }
  // Otherwise, fallback placeholder
  return 'https://placehold.co/200';
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
  // Si ya es una URL completa, la devolvemos tal como está (pero sanitizada)
  if (profilePicUrl.startsWith('http')) {
    return sanitizeImageSrc(profilePicUrl);
  }
  // Si es un filename, construimos la URL de descarga (and sanitize)
  return sanitizeImageSrc(getImageUrl(profilePicUrl));
};