import { CitizenProfile } from './citizens';

export interface ContributingFactor {
  id: string;
  name: string;
  description: string;
  score: number;
  icon: string;
  category: string;
}

export interface AIExplanation {
  summary: string;
  details: string[];
  recommendation: string;
}

export function getRiskScoringData(p: CitizenProfile) {
  const score = p.score;
  const riskLevel = p.riskLevel;

  const vehicleScore = score >= 90 ? 20 : score >= 75 ? 16 : score >= 55 ? 10 : 5;
  const utilityScore = score >= 90 ? 25 : score >= 75 ? 18 : score >= 55 ? 12 : 6;
  const travelScore = score >= 90 ? 18 : score >= 75 ? 14 : score >= 55 ? 8 : 4;
  const propertyScore = score >= 90 ? 20 : score >= 75 ? 15 : score >= 55 ? 10 : 5;
  const incomeScore = score >= 90 ? 17 : score >= 75 ? 13 : score >= 55 ? 8 : 4;

  const contributingFactors: ContributingFactor[] = [
    {
      id: 'luxury-vehicle',
      name: 'Vehicle Ownership Discrepancy',
      description: `${p.vehicle} registered under taxpayer name — valued at ${p.vehicleValue}`,
      score: vehicleScore,
      icon: 'ri-car-line',
      category: 'Asset',
    },
    {
      id: 'electricity',
      name: 'Electricity Consumption Pattern',
      description: `Monthly bill averaging ${p.utilityMonthly} — consistent with ${score >= 75 ? 'large residential property' : 'moderate property'}`,
      score: utilityScore,
      icon: 'ri-flashlight-line',
      category: 'Utility',
    },
    {
      id: 'foreign-travel',
      name: 'Foreign Travel Frequency',
      description: `${p.travelTrips} international trips in 24 months — ${p.travelDests}`,
      score: travelScore,
      icon: 'ri-flight-takeoff-line',
      category: 'Travel',
    },
    {
      id: 'property-portfolio',
      name: 'Property Portfolio',
      description: `${p.propertyLoc} valued at ${p.propertyValue}${score >= 85 ? ' plus additional undeclared plots' : ''}`,
      score: propertyScore,
      icon: 'ri-building-2-line',
      category: 'Asset',
    },
    {
      id: 'income-mismatch',
      name: 'Declared Income Mismatch',
      description: `Declared annual income of ${p.incomeDeclared} vs lifestyle indicating ${p.incomeEstimated}`,
      score: incomeScore,
      icon: 'ri-money-rupee-circle-line',
      category: 'Financial',
    },
  ];

  let summaryText: string;
  if (score >= 85) {
    summaryText = `The individual reports annual income of ${p.incomeDeclared} while maintaining assets and expenditures typically associated with annual earnings exceeding ${p.incomeEstimated}. Systematic discrepancy pattern detected.`;
  } else if (score >= 65) {
    summaryText = `Declared income of ${p.incomeDeclared} shows moderate inconsistency with lifestyle indicators suggesting earnings closer to ${p.incomeEstimated}. Further verification warranted.`;
  } else if (score >= 40) {
    summaryText = `Minor discrepancies observed between declared income of ${p.incomeDeclared} and lifestyle patterns. Income estimate of ${p.incomeEstimated} within acceptable variance range.`;
  } else {
    summaryText = `Declared income of ${p.incomeDeclared} appears broadly consistent with observed lifestyle. Estimated actual income of ${p.incomeEstimated} falls within standard deviation.`;
  }

  const incomeDeclaredNum = parseInt(p.incomeDeclared.replace(/[^0-9.]/g, ''));
  const incomeEstimatedNum = parseInt(p.incomeEstimated.replace(/[^0-9.]/g, ''));
  const ratio = Math.round(incomeEstimatedNum / incomeDeclaredNum);

  const aiExplanation: AIExplanation = {
    summary: summaryText,
    details: [
      `Asset-to-income ratio exceeds ${ratio}:1 — ${ratio > 10 ? 'significantly above' : 'within'} the national average for declared filers`,
      `Monthly ${p.utilityId.split('-')[0]} consumption patterns match ${score >= 75 ? 'luxury' : score >= 50 ? 'upper-mid' : 'standard'} residential properties`,
      `International travel frequency places taxpayer in the ${score >= 80 ? 'top 2%' : score >= 55 ? 'top 15%' : 'average range'} of all filers in the same declared income bracket`,
      `Vehicle registration value ${score >= 75 ? `exceeds ${Math.round((parseInt(p.vehicleValue.replace(/[^0-9.]/g, '')) / incomeDeclaredNum) * 1000) / 1000}x` : 'is within 1.5x of'} the declared annual income`,
    ],
    recommendation: score >= 85
      ? `Immediate audit recommended. Flag case for FBR Investigation Unit — ${p.assignedUnit}.`
      : score >= 65
        ? `Priority review recommended. Assign to ${p.assignedUnit} for detailed verification within 30 days.`
        : score >= 40
          ? `Routine verification recommended. Schedule desk review for next audit cycle.`
          : 'Low priority. Maintain standard monitoring protocols.',
  };

  return {
    name: p.name,
    cnic: p.cnic,
    score,
    riskLevel,
    incomeDeclared: p.incomeDeclared,
    incomeEstimated: p.incomeEstimated,
    province: p.province,
    city: p.city,
    contributingFactors,
    aiExplanation,
  };
}

export const riskLevels = [
  { level: 'Low', range: '0-30', color: 'bg-accent-500', textColor: 'text-accent-700', bgColor: 'bg-accent-100' },
  { level: 'Medium', range: '31-60', color: 'bg-secondary-500', textColor: 'text-secondary-700', bgColor: 'bg-secondary-100' },
  { level: 'High', range: '61-80', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-100' },
  { level: 'Critical', range: '81-100', color: 'bg-rose-600', textColor: 'text-rose-700', bgColor: 'bg-rose-100' },
];

// Legacy default export for backward compatibility
import { defaultCitizen } from './citizens';
const defaultRSData = getRiskScoringData(defaultCitizen);
export const riskScoringData = { ...defaultRSData };
export const contributingFactors = defaultRSData.contributingFactors;
export const aiExplanation = defaultRSData.aiExplanation;