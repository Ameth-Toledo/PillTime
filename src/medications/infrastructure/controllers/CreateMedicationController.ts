import type { Request, Response } from 'express';
import type { CreateMedicationUseCase } from '../../application/CreateMedicationUseCase.js';
import type { MedicationRequest } from '../../domain/dto/MedicationRequest.js';
import type { MedicationResponse } from '../../domain/dto/MedicationResponse.js';

export class CreateMedicationController {
  constructor(private createMedicationUseCase: CreateMedicationUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const medicationRequest: MedicationRequest = req.body;

      if (!medicationRequest.medication_name || !medicationRequest.frequency_hours || !medicationRequest.start_time) {
        res.status(400).json({ 
          error: 'Campos obligatorios: medication_name, frequency_hours, start_time' 
        });
        return;
      }

      const medication = await this.createMedicationUseCase.execute(medicationRequest);

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

      res.status(201).json({
        message: 'Medicamento creado exitosamente',
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