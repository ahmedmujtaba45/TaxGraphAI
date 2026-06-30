import { CitizenProfile } from './citizens';

export interface AuditTimelineEvent {
  id: string;
  date: string;
  month: string;
  title: string;
  description: string;
  amount: string;
  icon: string;
  category: string;
}

export interface AIFinding {
  id: string;
  number: number;
  title: string;
  description: string;
  severity: string;
  evidence: string;
  icon: string;
}

export interface AuditRecommendation {
  confidence: number;
  recommendation: string;
  summary: string;
  nextSteps: string[];
}

export function getAuditReportData(p: CitizenProfile) {
  const isHighRisk = p.score >= 75;

  const auditCitizen = {
    name: p.name,
    cnic: p.cnic,
    province: p.province,
    city: p.city,
    incomeDeclared: p.incomeDeclared,
    auditId: p.auditId,
    caseStatus: p.caseStatus,
    assignedOfficer: p.assignedOfficer,
    assignedUnit: p.assignedUnit,
  };

  const auditTimeline: AuditTimelineEvent[] = [
    {
      id: 'event-1',
      date: '2025-01',
      month: 'Jan',
      title: 'Property Acquired',
      description: `Acquired ${p.propertyLoc} — ${isHighRisk ? 'luxury residential plot' : 'residential property'} with ${isHighRisk ? 'constructed house' : 'basic structure'}`,
      amount: p.propertyValue,
      icon: 'ri-building-2-line',
      category: 'Asset',
    },
    {
      id: 'event-2',
      date: '2025-03',
      month: 'Mar',
      title: 'Vehicle Registered',
      description: `Registered ${p.vehicle} under personal name at Excise & Taxation ${p.city}`,
      amount: p.vehicle,
      icon: 'ri-car-line',
      category: 'Asset',
    },
    {
      id: 'event-3',
      date: '2025-04',
      month: 'Apr',
      title: `${isHighRisk ? 'Electricity Usage Spike' : 'Utility Consumption Noted'}`,
      description: `Monthly electricity consumption ${isHighRisk ? 'increased 3.2x — consistent with full-time occupancy of large property' : 'patterns align with declared lifestyle'}`,
      amount: `${p.utilityMonthly} Monthly Bill`,
      icon: 'ri-flashlight-line',
      category: 'Utility',
    },
    {
      id: 'event-4',
      date: '2025-05',
      month: 'May',
      title: 'Tax Return Filed',
      description: `Annual income tax return submitted declaring total income of ${p.incomeDeclared} — Category: ${isHighRisk ? 'Salaried Individual (Suspicious)' : 'Salaried Individual'}`,
      amount: `Declared Income ${p.incomeDeclared}`,
      icon: 'ri-file-text-line',
      category: 'Financial',
    },
  ];

  const severityLevel = p.score >= 85 ? 'Critical' : p.score >= 65 ? 'High' : p.score >= 40 ? 'Medium' : 'Low';

  const aiFindings: AIFinding[] = [
    {
      id: 'finding-1',
      number: 1,
      title: 'Property Value Inconsistency',
      description: `Registered property valued at ${p.propertyValue} — ownership of such asset is ${isHighRisk ? 'statistically impossible' : 'notable'} with declared annual income of ${p.incomeDeclared}.`,
      severity: severityLevel,
      evidence: `${p.city} Property Registry — Folio #${p.id.toUpperCase().replace(/-/g, '').substring(0, 8)}`,
      icon: 'ri-scales-3-line',
    },
    {
      id: 'finding-2',
      number: 2,
      title: 'Vehicle Ownership Anomaly',
      description: `${p.vehicle} has market value of ${p.vehicleValue}. ${isHighRisk ? 'Monthly installment for standard auto financing would exceed declared monthly income.' : 'Asset value warrants review against declared income.'}`,
      severity: isHighRisk ? (p.score >= 90 ? 'Critical' : 'High') : 'Medium',
      evidence: `Excise & Taxation ${p.city} — Registration #${p.vehicleReg}`,
      icon: 'ri-steering-2-line',
    },
    {
      id: 'finding-3',
      number: 3,
      title: 'Utility Consumption Analysis',
      description: `${p.utilityId.split('-')[0]} bills averaging ${p.utilityMonthly}/month correspond to properties with ${isHighRisk ? 'significantly higher' : 'comparable'} market value than declared assets.`,
      severity: isHighRisk ? 'High' : 'Medium',
      evidence: `${p.utilityId} — Billing Cycle 2025`,
      icon: 'ri-plug-line',
    },
    {
      id: 'finding-4',
      number: 4,
      title: 'International Travel Frequency',
      description: `${p.travelTrips} international trips in 24 months to ${p.travelDests}. Travel expenditure ${isHighRisk && p.travelTrips >= 10 ? 'alone may exceed' : 'is notable relative to'} declared annual income.`,
      severity: p.travelTrips >= 15 ? 'High' : p.travelTrips >= 5 ? 'Medium' : 'Low',
      evidence: `FIA Immigration Records — Passport #${p.passportNo}`,
      icon: 'ri-flight-takeoff-line',
    },
  ];

  let recommendationSteps: string[];
  if (p.score >= 85) {
    recommendationSteps = [
      `Issue audit notice under Section 177 within 7 working days`,
      `Request wealth reconciliation statement for last 5 tax years`,
      `Coordinate with ${p.city} property registry for title freeze`,
      `Cross-reference bank account statements for undeclared transactions`,
    ];
  } else if (p.score >= 65) {
    recommendationSteps = [
      `Issue preliminary inquiry notice within 14 working days`,
      `Request supporting documents for all assets exceeding declared income`,
      `Verify ${p.businessName} business registration and revenue declarations`,
      `Schedule interview with taxpayer at ${p.assignedUnit}`,
    ];
  } else {
    recommendationSteps = [
      `Maintain routine monitoring of filing compliance`,
      `Verify next annual tax return for consistency`,
      `Cross-check utility consumption patterns quarterly`,
      `Escalate if new high-value assets are detected`,
    ];
  }

  const auditRecommendation: AuditRecommendation = {
    confidence: p.confidence,
    recommendation: p.score >= 85
      ? `Initiate detailed tax audit under Section 177 of the Income Tax Ordinance 2001. Issue notice for unexplained assets and income. Coordinate with ${p.city} authorities.`
      : p.score >= 65
        ? `Initiate preliminary inquiry. Request asset reconciliation from taxpayer. Flag for enhanced monitoring in next filing cycle.`
        : 'Routine verification recommended. No immediate action required. Continue standard monitoring.',
    summary: `Systematic analysis of independent data sources ${isHighRisk ? 'reveals a consistent pattern of lifestyle expenditure and asset accumulation fundamentally incompatible with declared income levels' : 'shows moderate discrepancy between declared income and lifestyle indicators — further review warranted'}.`,
    nextSteps: recommendationSteps,
  };

  return { auditCitizen, auditTimeline, aiFindings, auditRecommendation };
}

// Legacy default export for backward compatibility
import { defaultCitizen } from './citizens';
const defaultAuditData = getAuditReportData(defaultCitizen);
export const auditCitizen = defaultAuditData.auditCitizen;
export const auditTimeline = defaultAuditData.auditTimeline;
export const aiFindings = defaultAuditData.aiFindings;
export const auditRecommendation = defaultAuditData.auditRecommendation;