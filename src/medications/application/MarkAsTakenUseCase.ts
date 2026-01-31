import type { IMedicationRepository } from '../domain/IMedicationRepository.js';

export class MarkAsTakenUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(medicationId: number): Promise<void> {
    const medication = await this.medicationRepository.getById(medicationId);

    if (!medication) {
      throw new Error('Medicamento no encontrado');
    }

    await this.medicationRepository.markAsTaken(medicationId);
  }
}