import { CitizenProfile } from './citizens';

export interface IdentityMatch {
  name: string;
  cnic: string;
  confidence: number;
  explanation: string;
  province: string;
}

export interface MatchedSource {
  id: string;
  icon: string;
  source: string;
  label: string;
  value: string;
  color: string;
  borderColor: string;
  detail: string;
}

function riskExplanation(p: CitizenProfile): string {
  if (p.score >= 85) return `Multiple records across independent databases indicate a high probability that all records belong to the same individual. Cross-referencing of CNIC, address history, and biometric markers confirms entity resolution with ${p.confidence}% confidence. Significant lifestyle-to-income disparity detected.`;
  if (p.score >= 65) return `Cross-database analysis confirms identity linkage with ${p.confidence}% confidence. Moderate discrepancies identified between declared income and asset profile warrant further investigation.`;
  if (p.score >= 40) return `Entity resolution completed with ${p.confidence}% confidence. Minor inconsistencies noted in utility and travel records relative to declared income. Routine verification recommended.`;
  return `Identity confirmed across available databases with ${p.confidence}% confidence. Profile appears consistent with declared income levels. Low priority for further review.`;
}

export function getEntityResolutionData(p: CitizenProfile) {
  const identityMatch: IdentityMatch = {
    name: p.name,
    cnic: p.cnic,
    confidence: p.confidence,
    explanation: riskExplanation(p),
    province: p.province,
  };

  const matchedSources: MatchedSource[] = [
    {
      id: 'fbr',
      icon: 'ri-government-line',
      source: 'FBR Tax Database',
      label: 'Annual Income',
      value: p.incomeDeclared,
      color: 'bg-primary-100 text-primary-700',
      borderColor: 'border-l-primary-500',
      detail: `Last filed: FY 2024-25 | Status: ${p.score >= 75 ? 'Flagged' : 'Verified'}`,
    },
    {
      id: 'excise',
      icon: 'ri-car-line',
      source: 'Excise Department',
      label: 'Vehicle',
      value: p.vehicle,
      color: 'bg-accent-100 text-accent-700',
      borderColor: 'border-l-accent-500',
      detail: `Registration: ${p.vehicleReg} | Value: ${p.vehicleValue}`,
    },
    {
      id: 'utility',
      icon: 'ri-flashlight-line',
      source: 'Electricity Utility',
      label: 'Monthly Bill',
      value: p.utilityMonthly,
      color: 'bg-secondary-100 text-secondary-700',
      borderColor: 'border-l-secondary-500',
      detail: `Consumer ID: ${p.utilityId} | 12-month average`,
    },
    {
      id: 'property',
      icon: 'ri-building-line',
      source: 'Property Registry',
      label: 'Property Value',
      value: p.propertyValue,
      color: 'bg-primary-100 text-primary-700',
      borderColor: 'border-l-primary-500',
      detail: `Location: ${p.propertyLoc}`,
    },
    {
      id: 'travel',
      icon: 'ri-plane-line',
      source: 'Travel Records',
      label: 'International Trips',
      value: `${p.travelTrips} in last 2 years`,
      color: 'bg-accent-100 text-accent-700',
      borderColor: 'border-l-accent-500',
      detail: `Destinations: ${p.travelDests}`,
    },
  ];

  return { identityMatch, matchedSources };
}

export const searchFields = [
  { id: 'name', label: 'Name Search', placeholder: 'Enter full name...', icon: 'ri-user-line' },
  { id: 'cnic', label: 'CNIC Search', placeholder: 'Enter CNIC number...', icon: 'ri-id-card-line' },
  { id: 'phone', label: 'Phone Search', placeholder: 'Enter phone number...', icon: 'ri-phone-line' },
];

// Legacy default export for backward compatibility
import { defaultCitizen } from './citizens';
const defaultData = getEntityResolutionData(defaultCitizen);
export const identityMatch = defaultData.identityMatch;
export const matchedSources = defaultData.matchedSources;