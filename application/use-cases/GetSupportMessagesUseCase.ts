import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';
import { SupportMessageResponseDTO } from '../dto/SupportDTO';

export class GetSupportMessagesUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(): Promise<SupportMessageResponseDTO[]> {
    const messages = await this.supportMessageRepository.findAll();
    return messages.map((message) => ({
      id: message.id,
      name: message.name,
      email: message.email,
      message: message.message,
      isRead: message.isRead,
      createdAt: message.createdAt.toISOString(),
    }));
  }
}
