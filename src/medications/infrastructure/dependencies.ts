import { MySQLMedicationRepository } from './adapters/MySQLMedicationRepository.js';
import { CreateMedicationUseCase } from '../application/CreateMedicationUseCase.js';
import { GetAllMedicationsUseCase } from '../application/GetAllMedicationsUseCase.js';
import { GetMedicationByIdUseCase } from '../application/GetMedicationByIdUseCase.js';
import { UpdateMedicationUseCase } from '../application/UpdateMedicationUseCase.js';
import { DeleteMedicationUseCase } from '../application/DeleteMedicationUseCase.js';
import { MarkAsTakenUseCase } from '../application/MarkAsTakenUseCase.js';
import { CreateMedicationController } from './controllers/CreateMedicationController.js';
import { GetAllMedicationsController } from './controllers/GetAllMedicationsController.js';
import { GetMedicationByIdController } from './controllers/GetMedicationByIdController.js';
import { UpdateMedicationController } from './controllers/UpdateMedicationController.js';
import { DeleteMedicationController } from './controllers/DeleteMedicationController.js';
import { MarkAsTakenController } from './controllers/MarkAsTakenController.js';
import { SearchMedicationController } from './controllers/SearchMedicationController.js';
import { GetMedicationInfoController } from './controllers/GetMedicationInfoController.js';

// Repository
const medicationRepository = new MySQLMedicationRepository();

// Use Cases
const createMedicationUseCase = new CreateMedicationUseCase(medicationRepository);
const getAllMedicationsUseCase = new GetAllMedicationsUseCase(medicationRepository);
const getMedicationByIdUseCase = new GetMedicationByIdUseCase(medicationRepository);
const updateMedicationUseCase = new UpdateMedicationUseCase(medicationRepository);
const deleteMedicationUseCase = new DeleteMedicationUseCase(medicationRepository);
const markAsTakenUseCase = new MarkAsTakenUseCase(medicationRepository);

// Controllers
export const createMedicationController = new CreateMedicationController(createMedicationUseCase);
export const getAllMedicationsController = new GetAllMedicationsController(getAllMedicationsUseCase);
export const getMedicationByIdController = new GetMedicationByIdController(getMedicationByIdUseCase);
export const updateMedicationController = new UpdateMedicationController(updateMedicationUseCase);
export const deleteMedicationController = new DeleteMedicationController(deleteMedicationUseCase);
export const markAsTakenController = new MarkAsTakenController(markAsTakenUseCase);
export const searchMedicationController = new SearchMedicationController();
export const getMedicationInfoController = new GetMedicationInfoController();