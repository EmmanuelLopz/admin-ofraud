// Usuario
type User = {
  name: string;
  photo_url: string;
};

// Comentario (puede tener respuestas)
type Commenta = {
  user: User;
  content: string;
  replies: Commenta[]; // Comentarios hijos
};

// Reporte
type Reporte = {
  title: string;
  url: string;
  photo_url: string;
  description: string;
  category: string;
  comments: Commenta[];
};

export type { User, Commenta, Reporte };