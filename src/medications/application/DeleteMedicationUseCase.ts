import type { IMedicationRepository } from '../domain/IMedicationRepository.js';

export class DeleteMedicationUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(id: number): Promise<void> {
    const medication = await this.medicationRepository.getById(id);

    if (!medication) {
      throw new Error('Medicamento no encontrado');
    }

    await this.medicationRepository.delete(id);
  }
}