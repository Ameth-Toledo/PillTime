import type { Request, Response } from 'express';
import { RxNormService } from '../../services/RxNormService.js';

export class GetMedicationInfoController {
  private rxNormService: RxNormService;

  constructor() {
    this.rxNormService = new RxNormService();
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const rxcui = req.params.rxcui as string;

      if (!rxcui) {
        res.status(400).json({ error: 'El rxcui es obligatorio' });
        return;
      }

      const info = await this.rxNormService.getMedicationInfo(rxcui);

      if (!info) {
        res.status(404).json({ error: 'Medicamento no encontrado' });
        return;
      }

      res.status(200).json(info);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al obtener información del medicamento' });
      }
    }
  }
}