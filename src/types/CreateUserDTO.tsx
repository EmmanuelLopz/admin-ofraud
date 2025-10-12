export interface CreateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  creation_date: string;
  profile_pic_url: string;
  admin: boolean;
  update_date: string;
}
