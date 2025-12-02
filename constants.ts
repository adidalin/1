import { MetalData } from './types';

export const METALS: Record<string, MetalData> = {
  Mg: {
    symbol: 'Mg',
    name: '镁 (Magnesium)',
    atomicMass: 24,
    valency: 2,
    activityRank: 1,
    color: '#8884d8', // Purple
    description: '最活泼，反应最快，斜率最陡。',
  },
  Al: {
    symbol: 'Al',
    name: '铝 (Aluminum)',
    atomicMass: 27,
    valency: 3,
    activityRank: 2,
    color: '#3b82f6', // Blue
    description: '产氢之王！等质量下产生氢气最多。',
  },
  Zn: {
    symbol: 'Zn',
    name: '锌 (Zinc)',
    atomicMass: 65,
    valency: 2,
    activityRank: 3,
    color: '#10b981', // Emerald
    description: '实验室制氢气的常用金属，速率适中。',
  },
  Fe: {
    symbol: 'Fe',
    name: '铁 (Iron)',
    atomicMass: 56,
    valency: 2,
    activityRank: 4,
    color: '#f97316', // Orange
    description: '反应较慢，溶液变为浅绿色。',
  },
};

// Molar mass of HCl roughly 36.5
export const MOLAR_MASS_HCL = 36.5;
