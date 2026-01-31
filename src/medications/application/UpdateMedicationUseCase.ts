import type { IMedicationRepository } from '../domain/IMedicationRepository.js';
import type { Medication } from '../domain/entities/Medication.js';
import type { UpdateMedicationRequest } from '../domain/dto/MedicationRequest.js';

export class UpdateMedicationUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(id: number, updateRequest: UpdateMedicationRequest): Promise<Medication> {
    const existingMedication = await this.medicationRepository.getById(id);

    if (!existingMedication) {
      throw new Error('Medicamento no encontrado');
    }

    const updatedMedication: Medication = {
      ...existingMedication,
      medication_name: updateRequest.medication_name?.trim() || existingMedication.medication_name,
      dosage: updateRequest.dosage?.trim() || existingMedication.dosage,
      frequency_hours: updateRequest.frequency_hours || existingMedication.frequency_hours,
      start_time: updateRequest.start_time?.trim() || existingMedication.start_time,
      is_active: updateRequest.is_active !== undefined ? updateRequest.is_active : existingMedication.is_active,
    };

    await this.medicationRepository.update(updatedMedication);

    return updatedMedication;
  }
}