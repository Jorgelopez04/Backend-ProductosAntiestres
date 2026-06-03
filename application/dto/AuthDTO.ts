export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
