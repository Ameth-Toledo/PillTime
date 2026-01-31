import type { IMedicationRepository } from '../domain/IMedicationRepository.js';
import type { Medication } from '../domain/entities/Medication.js';
import type { MedicationRequest } from '../domain/dto/MedicationRequest.js';

export class CreateMedicationUseCase {
  constructor(private medicationRepository: IMedicationRepository) {}

  async execute(medicationRequest: MedicationRequest): Promise<Medication> {
    if (!medicationRequest.medication_name || medicationRequest.medication_name.trim() === '') {
      throw new Error('El nombre del medicamento es obligatorio');
    }

    if (!medicationRequest.frequency_hours || medicationRequest.frequency_hours <= 0) {
      throw new Error('La frecuencia en horas debe ser mayor a 0');
    }

    if (!medicationRequest.start_time || medicationRequest.start_time.trim() === '') {
      throw new Error('La hora de inicio es obligatoria');
    }

    const newMedication: Omit<Medication, 'id' | 'created_at'> = {
      medication_name: medicationRequest.medication_name.trim(),
      rxcui: medicationRequest.rxcui || null,
      dosage: medicationRequest.dosage || null,
      frequency_hours: medicationRequest.frequency_hours,
      start_time: medicationRequest.start_time.trim(),
      is_active: true,
    };

    return await this.medicationRepository.save(newMedication);
  }
}