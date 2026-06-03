import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';
import { SupportMessageResponseDTO } from '../dto/SupportDTO';

export class GetSupportMessageByIdUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(id: string): Promise<SupportMessageResponseDTO> {
    const message = await this.supportMessageRepository.findById(id)
    if (!message) throw { status: 404, message: 'Support message not found' }
    return {
      id: message.id,
      name: message.name,
      email: message.email,
      message: message.message,
      isRead: message.isRead,
      createdAt: message.createdAt.toISOString(),
    }
  }
}
