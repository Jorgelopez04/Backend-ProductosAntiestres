export interface CreateSupportMessageDTO {
  name?: string | null;
  email?: string | null;
  message: string;
}

export interface SupportMessageResponseDTO {
  id: string;
  name?: string | null;
  email?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}
