export interface Medication {
  id: number;
  medication_name: string;
  rxcui: string | null;
  dosage: string | null;
  frequency_hours: number;
  start_time: string;
  is_active: boolean;
  created_at: Date;
}