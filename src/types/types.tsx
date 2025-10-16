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

type Category = {
  id: number;
  name: string;
  icon: string;
  description: string;
  deletedAt: string | null;
}

export type { User, Commenta, Reporte, Category };