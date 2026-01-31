import type { Request, Response } from 'express';
import type { UpdateMedicationUseCase } from '../../application/UpdateMedicationUseCase.js';
import type { UpdateMedicationRequest } from '../../domain/dto/MedicationRequest.js';
import type { MedicationResponse } from '../../domain/dto/MedicationResponse.js';

export class UpdateMedicationController {
  constructor(private updateMedicationUseCase: UpdateMedicationUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID invalido' });
        return;
      }

      const updateRequest: UpdateMedicationRequest = req.body;

      const medication = await this.updateMedicationUseCase.execute(id, updateRequest);

      const medicationResponse: MedicationResponse = {
        id: medication.id,
        medication_name: medication.medication_name,
        rxcui: medication.rxcui,
        dosage: medication.dosage,
        frequency_hours: medication.frequency_hours,
        start_time: medication.start_time,
        is_active: medication.is_active,
        created_at: medication.created_at.toISOString(),
      };

      res.status(200).json({
        message: 'Medicamento actualizado exitosamente',
        medication: medicationResponse,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}