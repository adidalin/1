export interface MetalData {
  symbol: string;
  name: string;
  atomicMass: number;
  valency: number;
  activityRank: number; // 1 is highest
  color: string;
  description: string;
}

export interface SimulationPoint {
  x: number;
  Mg: number;
  Al: number;
  Zn: number;
  Fe: number;
}

export type GraphMode = 'TIME' | 'ACID_MASS' | 'METAL_MASS';
