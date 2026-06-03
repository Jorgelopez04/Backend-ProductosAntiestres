import { SupportMessage } from '../entities/SupportMessage';

export interface SupportMessageRepository {
  create(message: Omit<SupportMessage, 'id' | 'createdAt'>): Promise<SupportMessage>;
  findAll(): Promise<SupportMessage[]>;
  findById(id: string): Promise<SupportMessage | null>;
  markAsRead(id: string): Promise<SupportMessage>;
  update(id: string, data: Partial<Omit<SupportMessage, 'id' | 'createdAt'>>): Promise<SupportMessage | null>;
  delete(id: string): Promise<boolean>;
}
