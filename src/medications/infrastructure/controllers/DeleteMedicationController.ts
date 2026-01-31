import type { Request, Response } from 'express';
import type { DeleteMedicationUseCase } from '../../application/DeleteMedicationUseCase.js';

export class DeleteMedicationController {
  constructor(private deleteMedicationUseCase: DeleteMedicationUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID invalido' });
        return;
      }

      await this.deleteMedicationUseCase.execute(id);

      res.status(200).json({
        message: 'Medicamento eliminado exitosamente',
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}