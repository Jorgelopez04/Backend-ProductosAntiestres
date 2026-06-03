import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';
import { SupportMessageResponseDTO } from '../dto/SupportDTO';

export class MarkSupportMessageReadUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(id: string): Promise<SupportMessageResponseDTO> {
    const message = await this.supportMessageRepository.markAsRead(id);
    return {
      id: message.id,
      name: message.name,
      email: message.email,
      message: message.message,
      isRead: message.isRead,
      createdAt: message.createdAt.toISOString(),
    };
  }
}
