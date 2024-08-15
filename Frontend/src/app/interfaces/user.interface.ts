export interface User {
  idUser: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  roles: string[];
  session_token?: string;
  refresh_token?: string;
}
