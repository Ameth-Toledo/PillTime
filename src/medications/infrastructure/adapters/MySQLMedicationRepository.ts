import type { IMedicationRepository } from '../../domain/IMedicationRepository.js';
import type { Medication } from '../../domain/entities/Medication.js';
import pool from '../../../core/conn_mysql.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MySQLMedicationRepository implements IMedicationRepository {
  
  async save(medication: Omit<Medication, 'id' | 'created_at'>): Promise<Medication> {
    const query = `
      INSERT INTO medications (medication_name, rxcui, dosage, frequency_hours, start_time)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute<ResultSetHeader>(query, [
      medication.medication_name,
      medication.rxcui,
      medication.dosage,
      medication.frequency_hours,
      medication.start_time,
    ]);

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM medications WHERE id = ?',
      [result.insertId]
    );

    const row = rows[0];
    return {
      id: row.id,
      medication_name: row.medication_name,
      rxcui: row.rxcui,
      dosage: row.dosage,
      frequency_hours: row.frequency_hours,
      start_time: row.start_time,
      is_active: row.is_active,
      created_at: new Date(row.created_at),
    };
  }

  async getById(id: number): Promise<Medication | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM medications WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      medication_name: row.medication_name,
      rxcui: row.rxcui,
      dosage: row.dosage,
      frequency_hours: row.frequency_hours,
      start_time: row.start_time,
      is_active: row.is_active,
      created_at: new Date(row.created_at),
    };
  }

  async getAll(): Promise<Medication[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM medications WHERE is_active = TRUE ORDER BY created_at DESC'
    );

    return rows.map(row => ({
      id: row.id,
      medication_name: row.medication_name,
      rxcui: row.rxcui,
      dosage: row.dosage,
      frequency_hours: row.frequency_hours,
      start_time: row.start_time,
      is_active: row.is_active,
      created_at: new Date(row.created_at),
    }));
  }

  async update(medication: Medication): Promise<void> {
    const query = `
      UPDATE medications 
      SET medication_name = ?, dosage = ?, frequency_hours = ?, start_time = ?, is_active = ?
      WHERE id = ?
    `;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      medication.medication_name,
      medication.dosage,
      medication.frequency_hours,
      medication.start_time,
      medication.is_active,
      medication.id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error('Medicamento no encontrado');
    }
  }

  async delete(id: number): Promise<void> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM medications WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Medicamento no encontrado');
    }
  }

  async markAsTaken(medicationId: number): Promise<void> {
    const now = new Date();
    const query = `
      INSERT INTO medication_log (medication_id, scheduled_time, taken_at, status) 
      VALUES (?, ?, ?, 'taken')
    `;

    await pool.execute<ResultSetHeader>(query, [medicationId, now, now]);
  }

  async getTotal(): Promise<number> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM medications WHERE is_active = TRUE'
    );

    return rows[0].total;
  }
}