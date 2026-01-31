import type { IMedicationRepository } from '../domain/IMedicationRepository.js';
import type { Medication } from '../domain/entities/Medication.js';

export class GetAllMedicationsUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(): Promise<Medication[]> {
    return await this.medicationRepository.getAll();
  }
}