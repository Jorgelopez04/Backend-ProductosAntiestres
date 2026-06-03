import { CreateSupportMessageDTO, SupportMessageResponseDTO } from '../dto/SupportDTO';
import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';

export class CreateSupportMessageUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(data: CreateSupportMessageDTO): Promise<SupportMessageResponseDTO> {
    if (!data.message) {
      throw { status: 400, message: 'El mensaje es requerido' };
    }

    const supportMessage = await this.supportMessageRepository.create({
      name: data.name,
      email: data.email,
      message: data.message,
      isRead: false,
    });

    return {
      id: supportMessage.id,
      name: supportMessage.name,
      email: supportMessage.email,
      message: supportMessage.message,
      isRead: supportMessage.isRead,
      createdAt: supportMessage.createdAt.toISOString(),
    };
  }
}
