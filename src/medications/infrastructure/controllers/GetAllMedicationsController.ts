import type { Request, Response } from 'express';
import type { GetAllMedicationsUseCase } from '../../application/GetAllMedicationsUseCase.js';
import type { MedicationResponse } from '../../domain/dto/MedicationResponse.js';

export class GetAllMedicationsController {
  constructor(private getAllMedicationsUseCase: GetAllMedicationsUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const medications = await this.getAllMedicationsUseCase.execute();

      const medicationsResponse: MedicationResponse[] = medications.map(med => ({
        id: med.id,
        medication_name: med.medication_name,
        rxcui: med.rxcui,
        dosage: med.dosage,
        frequency_hours: med.frequency_hours,
        start_time: med.start_time,
        is_active: med.is_active,
        created_at: med.created_at.toISOString(),
      }));

      res.status(200).json({
        medications: medicationsResponse,
        total: medicationsResponse.length,
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