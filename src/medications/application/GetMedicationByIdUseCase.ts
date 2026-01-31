import type { IMedicationRepository } from '../domain/IMedicationRepository.js';
import type { Medication } from '../domain/entities/Medication.js';

export class GetMedicationByIdUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.getById(id);
    
    if (!medication) {
      throw new Error('Medicamento no encontrado');
    }

    return medication;
  }
}