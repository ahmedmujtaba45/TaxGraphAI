import { CitizenProfile } from './citizens';

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  color: string;
  bgColor: string;
  size: number;
  icon: string;
  details?: {
    label: string;
    value: string;
  }[];
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
  riskLevel: 'high' | 'medium' | 'low';
}

export function getKnowledgeGraphData(p: CitizenProfile) {
  const centerId = p.id;
  const vehicleId = `${p.id}-vehicle`;
  const propertyId = `${p.id}-property`;
  const utilityId = `${p.id}-utility`;
  const travelId = `${p.id}-travel`;
  const bankId = `${p.id}-bank`;
  const taxId = `${p.id}-tax`;
  const businessId = `${p.id}-business`;

  const isHighRisk = p.score >= 75;
  const riskForEdges: 'high' | 'medium' | 'low' = p.score >= 75 ? 'high' : p.score >= 50 ? 'medium' : 'low';

  const graphNodes: GraphNode[] = [
    {
      id: centerId,
      label: p.name,
      type: 'Person',
      color: 'oklch(var(--primary-700))',
      bgColor: 'oklch(var(--primary-100))',
      size: 52,
      icon: 'ri-user-line',
      details: [
        { label: 'CNIC', value: p.cnic },
        { label: 'Risk Score', value: `${p.score} / 100` },
        { label: 'City', value: p.city },
        { label: 'Annual Declared', value: p.incomeDeclared },
      ],
    },
    {
      id: vehicleId,
      label: p.vehicle.split(' ').slice(0, 2).join(' '),
      type: 'Vehicle',
      color: 'oklch(var(--accent-600))',
      bgColor: 'oklch(var(--accent-100))',
      size: 36,
      icon: 'ri-car-line',
      details: [
        { label: 'Registration', value: p.vehicleReg },
        { label: 'Model', value: p.vehicle.split(' ').slice(2).join(' ') || p.vehicle },
        { label: 'Value', value: p.vehicleValue },
        { label: 'Lifestyle Mismatch', value: isHighRisk ? 'Yes - High Risk' : 'Moderate' },
      ],
    },
    {
      id: propertyId,
      label: p.propertyLoc.split(',')[0].trim() + ' Property',
      type: 'Property',
      color: 'oklch(var(--secondary-600))',
      bgColor: 'oklch(var(--secondary-100))',
      size: 36,
      icon: 'ri-building-line',
      details: [
        { label: 'Location', value: p.propertyLoc },
        { label: 'Estimated Value', value: p.propertyValue },
        { label: 'Declared Value', value: p.incomeDeclared },
        { label: 'Discrepancy', value: isHighRisk ? 'Significant' : 'Minor' },
      ],
    },
    {
      id: utilityId,
      label: 'Electricity Account',
      type: 'Utility',
      color: 'oklch(var(--accent-500))',
      bgColor: 'oklch(var(--accent-100))',
      size: 32,
      icon: 'ri-flashlight-line',
      details: [
        { label: 'Consumer ID', value: p.utilityId },
        { label: 'Monthly Avg', value: p.utilityMonthly },
        { label: 'Annual Cost', value: `PKR ${(parseInt(p.utilityMonthly.replace(/[^0-9]/g, '')) * 12).toLocaleString()}` },
        { label: 'Income Ratio', value: `${Math.round((parseInt(p.utilityMonthly.replace(/[^0-9]/g, '')) * 12 / parseInt(p.incomeDeclared.replace(/[^0-9]/g, ''))) * 100)}% of declared` },
      ],
    },
    {
      id: travelId,
      label: 'Passport Record',
      type: 'Travel',
      color: 'oklch(var(--primary-500))',
      bgColor: 'oklch(var(--primary-100))',
      size: 32,
      icon: 'ri-passport-line',
      details: [
        { label: 'Passport No', value: p.passportNo },
        { label: 'Trips (2 yrs)', value: `${p.travelTrips} International` },
        { label: 'Destinations', value: p.travelDests },
        { label: 'Travel Spend', value: `Est. ${p.travelSpend}` },
      ],
    },
    {
      id: bankId,
      label: 'Bank Account',
      type: 'Finance',
      color: 'oklch(var(--secondary-500))',
      bgColor: 'oklch(var(--secondary-100))',
      size: 32,
      icon: 'ri-bank-line',
      details: [
        { label: 'Bank', value: p.bankName },
        { label: 'Avg Balance', value: p.bankBalance },
        { label: 'Monthly Credits', value: p.bankMonthly },
        { label: 'Suspicious Txns', value: isHighRisk ? `${Math.floor(p.score / 4)} flagged` : 'None flagged' },
      ],
    },
    {
      id: taxId,
      label: 'Tax Filing Record',
      type: 'Tax',
      color: 'oklch(var(--accent-400))',
      bgColor: 'oklch(var(--accent-100))',
      size: 32,
      icon: 'ri-file-list-3-line',
      details: [
        { label: 'Filing Year', value: 'FY 2024-25' },
        { label: 'Declared Income', value: p.incomeDeclared },
        { label: 'Estimated Income', value: p.incomeEstimated },
        { label: 'Gap', value: `${Math.round((1 - parseInt(p.incomeDeclared.replace(/[^0-9]/g, '')) / parseInt(p.incomeEstimated.replace(/[^0-9]/g, ''))) * 100)}% under-declared` },
      ],
    },
    {
      id: businessId,
      label: 'Business Registration',
      type: 'Business',
      color: 'oklch(var(--primary-400))',
      bgColor: 'oklch(var(--primary-100))',
      size: 32,
      icon: 'ri-store-2-line',
      details: [
        { label: 'Company', value: p.businessName },
        { label: 'SECP Reg', value: p.businessReg },
        { label: 'Revenue', value: p.businessRevenue },
        { label: 'Risk', value: isHighRisk ? 'High - Audit Flagged' : 'Normal' },
      ],
    },
  ];

  const graphEdges: GraphEdge[] = [
    { source: centerId, target: vehicleId, label: 'Owns Vehicle', riskLevel: riskForEdges },
    { source: centerId, target: propertyId, label: 'Owns Property', riskLevel: riskForEdges },
    { source: centerId, target: utilityId, label: 'Linked Utility Account', riskLevel: riskForEdges },
    { source: centerId, target: travelId, label: 'International Travel', riskLevel: p.travelTrips >= 10 ? 'high' : p.travelTrips >= 5 ? 'medium' : 'low' },
    { source: centerId, target: bankId, label: 'Primary Bank Account', riskLevel: riskForEdges },
    { source: centerId, target: taxId, label: 'Annual Tax Filing', riskLevel: isHighRisk ? 'high' : 'medium' },
    { source: centerId, target: businessId, label: 'Registered Business Owner', riskLevel: isHighRisk ? 'high' : 'medium' },
  ];

  const graphMetrics = [
    { icon: 'ri-node-tree', label: 'Total Entities', value: '8', color: 'bg-primary-100 text-primary-700' },
    { icon: 'ri-git-branch-line', label: 'Relationships', value: '7', color: 'bg-accent-100 text-accent-700' },
    { icon: 'ri-alert-line', label: 'Risk Connections', value: String(graphEdges.filter((e) => e.riskLevel === 'high').length), color: 'bg-secondary-100 text-secondary-700' },
    { icon: 'ri-eye-line', label: 'Suspicious Patterns', value: String(isHighRisk ? (p.score >= 90 ? '5' : '3') : '1'), color: 'bg-primary-100 text-primary-700' },
  ];

  return { graphNodes, graphEdges, graphMetrics, centerId, isHighRisk };
}

export const filterCategories = [
  { id: 'all', label: 'All', icon: 'ri-apps-line' },
  { id: 'Vehicle', label: 'Vehicles', icon: 'ri-car-line' },
  { id: 'Property', label: 'Properties', icon: 'ri-building-line' },
  { id: 'Utility', label: 'Utilities', icon: 'ri-flashlight-line' },
  { id: 'Travel', label: 'Travel', icon: 'ri-plane-line' },
  { id: 'Finance', label: 'Finance', icon: 'ri-bank-line' },
  { id: 'Tax', label: 'Tax', icon: 'ri-file-list-3-line' },
  { id: 'Business', label: 'Business', icon: 'ri-store-2-line' },
];

// Legacy default export for backward compatibility
import { defaultCitizen } from './citizens';
const defaultKGData = getKnowledgeGraphData(defaultCitizen);
export const graphNodes = defaultKGData.graphNodes;
export const graphEdges = defaultKGData.graphEdges;
export const graphMetrics = defaultKGData.graphMetrics;