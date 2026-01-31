export interface MedicationResponse {
  id: number;
  medication_name: string;
  rxcui: string | null;
  dosage: string | null;
  frequency_hours: number;
  start_time: string;
  is_active: boolean;
  created_at: string;
  next_dose?: string;
}

export interface MedicationListResponse {
  medications: MedicationResponse[];
  total: number;
}