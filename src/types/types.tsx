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
  id: number;
  title: string;
  description: string;
  report_pic_url: string;
  category_id: number;
  user_id: number;
  reference_url: string;
  creation_date: string; // o Date si lo parseas al recibirlo
  status_id: number;
  category: Category | null;
  comments: Commenta[]; // Added comments array
};

type Category = {
  id: number;
  name: string;
  icon: string;
  description: string;
  deletedAt: string | null;
}

export type { User, Commenta, Reporte, Category };