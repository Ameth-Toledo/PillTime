import type { Request, Response } from 'express';
import { RxNormService } from '../../services/RxNormService.js';

export class SearchMedicationController {
  private rxNormService: RxNormService;

  constructor() {
    this.rxNormService = new RxNormService();
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;

      if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'El parámetro "name" es obligatorio' });
        return;
      }

      const medications = await this.rxNormService.searchMedication(name);

      res.status(200).json({
        total: medications.length,
        medications: medications,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al buscar medicamento' });
      }
    }
  }
}