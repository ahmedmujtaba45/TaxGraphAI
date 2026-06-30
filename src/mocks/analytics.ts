export const topRiskCities = [
  { city: 'Lahore', score: 94, cases: 1847, recoveryPotential: 6.2, recoveryLabel: 'PKR 6.2B', color: '#e11d48' },
  { city: 'Karachi', score: 91, cases: 2103, recoveryPotential: 5.8, recoveryLabel: 'PKR 5.8B', color: '#e11d48' },
  { city: 'Islamabad', score: 85, cases: 612, recoveryPotential: 3.1, recoveryLabel: 'PKR 3.1B', color: '#f59e0b' },
  { city: 'Rawalpindi', score: 79, cases: 458, recoveryPotential: 1.9, recoveryLabel: 'PKR 1.9B', color: '#f59e0b' },
  { city: 'Faisalabad', score: 72, cases: 401, recoveryPotential: 1.5, recoveryLabel: 'PKR 1.5B', color: '#f59e0b' },
];

export const nonFilerDistribution = [
  { category: 'Business Owners', percentage: 35, color: '#1e3a5f' },
  { category: 'Salaried Employees', percentage: 28, color: '#0f766e' },
  { category: 'Property Investors', percentage: 18, color: '#b45309' },
  { category: 'Professionals', percentage: 12, color: '#b91c1c' },
  { category: 'Other', percentage: 7, color: '#78716c' },
];

export const revenueRecovery = [
  { sector: 'Real Estate', amount: 6.8, amountLabel: 'PKR 6.8B', color: '#1e3a5f' },
  { sector: 'Retail & Wholesale', amount: 4.2, amountLabel: 'PKR 4.2B', color: '#0f766e' },
  { sector: 'Professional Services', amount: 3.5, amountLabel: 'PKR 3.5B', color: '#b45309' },
  { sector: 'Manufacturing', amount: 2.8, amountLabel: 'PKR 2.8B', color: '#b91c1c' },
  { sector: 'Transport & Logistics', amount: 1.2, amountLabel: 'PKR 1.2B', color: '#78716c' },
];

export const assetVsIncomeData = [
  { name: 'Ahmed R.', declared: 0.8, actual: 15.2, city: 'Lahore' },
  { name: 'Muhammad A.', declared: 1.2, actual: 28.5, city: 'Lahore' },
  { name: 'Syeda F.', declared: 2.1, actual: 42.1, city: 'Karachi' },
  { name: 'Bilal M.', declared: 0.9, actual: 19.2, city: 'Peshawar' },
  { name: 'Dr. Ayesha', declared: 3.5, actual: 33.6, city: 'Karachi' },
  { name: 'Imran H.', declared: 1.5, actual: 11.3, city: 'Lahore' },
  { name: 'Sana T.', declared: 0.7, actual: 8.7, city: 'Peshawar' },
  { name: 'Omar F.', declared: 2.8, actual: 22.4, city: 'Islamabad' },
  { name: 'Rabia N.', declared: 0.6, actual: 6.9, city: 'Lahore' },
  { name: 'Tariq M.', declared: 1.1, actual: 4.5, city: 'Karachi' },
  { name: 'Hassan J.', declared: 0.5, actual: 3.8, city: 'Peshawar' },
  { name: 'Nadia K.', declared: 1.8, actual: 7.2, city: 'Islamabad' },
  { name: 'Faisal S.', declared: 0.4, actual: 2.9, city: 'Quetta' },
  { name: 'Zainab I.', declared: 1.3, actual: 5.1, city: 'Lahore' },
  { name: 'Kamran Y.', declared: 0.9, actual: 3.2, city: 'Karachi' },
];

export const pakistanHeatmapCities = [
  { city: 'Lahore', province: 'Punjab', riskScore: 94, activeCases: 1847, intensity: 100 },
  { city: 'Karachi', province: 'Sindh', riskScore: 91, activeCases: 2103, intensity: 97 },
  { city: 'Islamabad', province: 'ICT', riskScore: 85, activeCases: 612, intensity: 90 },
  { city: 'Rawalpindi', province: 'Punjab', riskScore: 79, activeCases: 458, intensity: 84 },
  { city: 'Faisalabad', province: 'Punjab', riskScore: 72, activeCases: 401, intensity: 76 },
  { city: 'Peshawar', province: 'KPK', riskScore: 68, activeCases: 325, intensity: 72 },
  { city: 'Multan', province: 'Punjab', riskScore: 63, activeCases: 287, intensity: 67 },
  { city: 'Gujranwala', province: 'Punjab', riskScore: 58, activeCases: 244, intensity: 61 },
  { city: 'Quetta', province: 'Balochistan', riskScore: 52, activeCases: 178, intensity: 55 },
  { city: 'Hyderabad', province: 'Sindh', riskScore: 47, activeCases: 203, intensity: 50 },
  { city: 'Sialkot', province: 'Punjab', riskScore: 43, activeCases: 156, intensity: 45 },
  { city: 'Sargodha', province: 'Punjab', riskScore: 38, activeCases: 132, intensity: 40 },
];

export const analyticsKpis = {
  potentialRevenueRecovery: 'PKR 18.5 Billion',
  casesRecommendedForAudit: '5,421',
  avgComplianceScore: '67%',
  entityResolutionAccuracy: '96.8%',
};