export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
