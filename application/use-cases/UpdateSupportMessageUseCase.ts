import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';
import { SupportMessageResponseDTO } from '../dto/SupportDTO';

export class UpdateSupportMessageUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(id: string, data: Partial<{ name?: string; email?: string; message?: string; isRead?: boolean }>): Promise<SupportMessageResponseDTO> {
    const updated = await this.supportMessageRepository.update(id, data as any)
    if (!updated) throw { status: 404, message: 'Support message not found' }
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      message: updated.message,
      isRead: updated.isRead,
      createdAt: updated.createdAt.toISOString(),
    }
  }
}
