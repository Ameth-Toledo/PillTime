import type { Medication } from './entities/Medication.js';

export interface IMedicationRepository {
  save(medication: Omit<Medication, 'id' | 'created_at'>): Promise<Medication>;
  getById(id: number): Promise<Medication | null>;
  getAll(): Promise<Medication[]>;
  update(medication: Medication): Promise<void>;
  delete(id: number): Promise<void>;
  markAsTaken(medicationId: number): Promise<void>;
  getTotal(): Promise<number>;
}