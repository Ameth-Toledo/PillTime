import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { configureMedicationRoutes } from './src/medications/infrastructure/routes/routes.js';
import {
  createMedicationController,
  getAllMedicationsController,
  getMedicationByIdController,
  updateMedicationController,
  deleteMedicationController,
  markAsTakenController,
  searchMedicationController,
  getMedicationInfoController,
} from './src/medications/infrastructure/dependencies.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

const medicationRoutes = configureMedicationRoutes(
  createMedicationController,
  getAllMedicationsController,
  getMedicationByIdController,
  updateMedicationController,
  deleteMedicationController,
  markAsTakenController,
  searchMedicationController,
  getMedicationInfoController
);

app.use('/api', medicationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PillTime API - Running' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});