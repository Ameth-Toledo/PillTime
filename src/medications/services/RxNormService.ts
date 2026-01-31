export interface RxNormDrug {
  rxcui: string;
  name: string;
  synonym?: string;
}

export interface RxNormSearchResponse {
  drugGroup?: {
    conceptGroup?: Array<{
      conceptProperties?: RxNormDrug[];
    }>;
  };
}

export class RxNormService {
  private baseUrl = 'https://rxnav.nlm.nih.gov/REST';

  async searchMedication(name: string): Promise<RxNormDrug[]> {
    try {
      const response = await fetch(`${this.baseUrl}/drugs.json?name=${encodeURIComponent(name)}`);
      
      if (!response.ok) {
        throw new Error('Error al buscar el medicamento');
      }

      const data: RxNormSearchResponse = await response.json();
      
      const conceptGroup = data.drugGroup?.conceptGroup || [];
      const drugs: RxNormDrug[] = [];

      for (const group of conceptGroup) {
        if (group.conceptProperties) {
          drugs.push(...group.conceptProperties);
        }
      }

      return drugs;
    } catch (error) {
      console.error('Error en RxNorm API:', error);
      throw new Error('No se pudo buscar el medicamento');
    }
  }

  async getMedicationInfo(rxcui: string): Promise<RxNormDrug | null> {
    try {
      const response = await fetch(`${this.baseUrl}/rxcui/${rxcui}/properties.json`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      return data.properties || null;
    } catch (error) {
      console.error('Error obteniendo información del medicamento:', error);
      return null;
    }
  }
}