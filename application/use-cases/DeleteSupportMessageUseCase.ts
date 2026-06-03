import { SupportMessageRepository } from '../../domain/repositories/SupportMessageRepository';

export class DeleteSupportMessageUseCase {
  constructor(private supportMessageRepository: SupportMessageRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.supportMessageRepository.delete(id)
    if (!deleted) throw { status: 404, message: 'Support message not found' }
  }
}
