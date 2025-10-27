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
 * Sanitiza una URL para asegurarse que sólo puede ser un enlace HTTP(S) válido o un data:image
 * Previene ataques XSS validando estrictamente el formato de la URL
 */
export const sanitizeImageSrc = (src: string): string => {
  if (!src || typeof src !== 'string') return 'https://placehold.co/200';
  
  const trimmed = src.trim();
  
  // Validate data URLs for images (from FileReader)
  const dataUrlRegex = /^data:image\/(png|jpg|jpeg|gif|webp|bmp);base64,[A-Za-z0-9+/=]+$/;
  if (dataUrlRegex.test(trimmed)) {
    return trimmed;
  }
  
  // Validate HTTP(S) URLs using URL constructor for strict validation
  try {
    const url = new URL(trimmed);
    
    // Only allow http and https protocols (prevents javascript:, data:, file:, etc.)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      console.warn('Invalid URL protocol:', url.protocol);
      return 'https://placehold.co/200';
    }
    
    // Optional: Whitelist allowed domains (uncomment if you want to restrict to specific domains)
    // const allowedDomains = ['placehold.co', 'localhost', process.env.NEXT_PUBLIC_API_URL];
    // if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
    //   console.warn('Domain not whitelisted:', url.hostname);
    //   return 'https://placehold.co/200';
    // }
    
    return url.toString();
  } catch (error) {
    // Invalid URL format
    console.warn('Invalid URL format:', trimmed);
    return 'https://placehold.co/200';
  }
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