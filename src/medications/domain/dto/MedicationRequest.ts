export interface MedicationRequest {
  medication_name: string;
  rxcui?: string;
  dosage?: string;
  frequency_hours: number;
  start_time: string;
}

export interface UpdateMedicationRequest {
  medication_name?: string;
  dosage?: string;
  frequency_hours?: number;
  start_time?: string;
  is_active?: boolean;
}

export interface MarkAsTakenRequest {
  medication_id: number;
}