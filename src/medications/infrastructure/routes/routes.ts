import { Router } from 'express';
import type { CreateMedicationController } from '../controllers/CreateMedicationController.js';
import type { GetAllMedicationsController } from '../controllers/GetAllMedicationsController.js';
import type { GetMedicationByIdController } from '../controllers/GetMedicationByIdController.js';
import type { UpdateMedicationController } from '../controllers/UpdateMedicationController.js';
import type { DeleteMedicationController } from '../controllers/DeleteMedicationController.js';
import type { MarkAsTakenController } from '../controllers/MarkAsTakenController.js';
import type { SearchMedicationController } from '../controllers/SearchMedicationController.js';
import type { GetMedicationInfoController } from '../controllers/GetMedicationInfoController.js';

export function configureMedicationRoutes(
  createMedicationCtrl: CreateMedicationController,
  getAllMedicationsCtrl: GetAllMedicationsController,
  getMedicationByIdCtrl: GetMedicationByIdController,
  updateMedicationCtrl: UpdateMedicationController,
  deleteMedicationCtrl: DeleteMedicationController,
  markAsTakenCtrl: MarkAsTakenController,
  searchMedicationCtrl: SearchMedicationController,
  getMedicationInfoCtrl: GetMedicationInfoController
): Router {
  const router = Router();

  // RxNorm API routes (búsqueda externa)
  router.get('/medications/search', (req, res) => searchMedicationCtrl.execute(req, res));
  router.get('/medications/info/:rxcui', (req, res) => getMedicationInfoCtrl.execute(req, res));

  // CRUD Medication routes
  router.post('/medications', (req, res) => createMedicationCtrl.execute(req, res));
  router.get('/medications', (req, res) => getAllMedicationsCtrl.execute(req, res));
  router.get('/medications/:id', (req, res) => getMedicationByIdCtrl.execute(req, res));
  router.put('/medications/:id', (req, res) => updateMedicationCtrl.execute(req, res));
  router.delete('/medications/:id', (req, res) => deleteMedicationCtrl.execute(req, res));
  router.post('/medications/:id/taken', (req, res) => markAsTakenCtrl.execute(req, res));

  return router;
}