// Usuario
type User = {
  name: string;
  photo_url: string;
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
};

type Category = {
  id: number;
  name: string;
  icon: string;
  description: string;
  deletedAt: string | null;
}

type UserR = {
  email: string;
  id: number;
  name: string;
  profile_pic_url: string;
}

type Commenta = {
  id: number;
  content: string;
  user_id: number;
  report_id: number;
  parent_comment_id: number | null;
  creation_date: string;
  deleted_at: string | null; 
  likes: number;
  user: UserR
}

export type { User, Commenta, Reporte, Category };