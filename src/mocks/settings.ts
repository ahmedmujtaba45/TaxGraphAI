export const riskConfig = {
  thresholds: {
    low: { min: 0, max: 30, label: 'Low Risk' },
    medium: { min: 31, max: 60, label: 'Medium Risk' },
    high: { min: 61, max: 80, label: 'High Risk' },
    critical: { min: 81, max: 100, label: 'Critical Risk' },
  },
  factorWeights: [
    { id: 'luxury-vehicle', label: 'Luxury Vehicle Ownership', weight: 20, description: 'Weight assigned to luxury/exotic vehicle registrations' },
    { id: 'electricity-consumption', label: 'High Electricity Consumption', weight: 25, description: 'Weight assigned to above-threshold utility bills' },
    { id: 'foreign-travel', label: 'Foreign Travel Frequency', weight: 15, description: 'Weight assigned to international travel patterns' },
    { id: 'property-portfolio', label: 'Property Portfolio Value', weight: 18, description: 'Weight assigned to real estate holdings' },
    { id: 'income-mismatch', label: 'Declared Income Mismatch', weight: 14, description: 'Weight assigned to income vs lifestyle gap' },
  ],
  aiConfidenceThreshold: 85,
  autoFlagThreshold: 75,
};

export const alertPreferences = [
  { id: 'critical-risk', label: 'Critical Risk Alerts', description: 'Notify when a citizen reaches Critical risk level (81-100)', enabled: true, channels: ['email', 'dashboard', 'sms'] },
  { id: 'high-risk', label: 'High Risk Alerts', description: 'Notify when a citizen reaches High risk level (61-80)', enabled: true, channels: ['email', 'dashboard'] },
  { id: 'audit-complete', label: 'Audit Report Generated', description: 'Notify when an automated audit report is finalised', enabled: true, channels: ['email', 'dashboard'] },
  { id: 'data-sync', label: 'Data Sync Anomalies', description: 'Alert when a data source sync fails or returns irregular records', enabled: true, channels: ['email', 'dashboard', 'sms'] },
  { id: 'entity-resolution', label: 'Entity Resolution Conflicts', description: 'Notify when entity resolution confidence drops below threshold', enabled: false, channels: ['dashboard'] },
  { id: 'weekly-digest', label: 'Weekly Intelligence Digest', description: 'Receive a weekly summary of all flagged cases and system metrics', enabled: true, channels: ['email'] },
  { id: 'model-update', label: 'AI Model Updates', description: 'Notify when risk scoring ML model is retrained or updated', enabled: false, channels: ['email', 'dashboard'] },
];

export const syncConfig = [
  { id: 'fbr-tax', label: 'FBR Tax Records', icon: 'ri-file-text-line', frequency: 30, unit: 'minutes', lastSynced: '2026-06-11T10:15:00', recordCount: '2.8M', color: 'primary' as const },
  { id: 'excise-vehicle', label: 'Excise Vehicle Registry', icon: 'ri-car-line', frequency: 60, unit: 'minutes', lastSynced: '2026-06-11T09:45:00', recordCount: '18.4M', color: 'accent' as const },
  { id: 'property-registry', label: 'Property Registration', icon: 'ri-building-line', frequency: 120, unit: 'minutes', lastSynced: '2026-06-11T08:30:00', recordCount: '5.1M', color: 'secondary' as const },
  { id: 'utility-companies', label: 'Utility Companies', icon: 'ri-flashlight-line', frequency: 15, unit: 'minutes', lastSynced: '2026-06-11T10:28:00', recordCount: '34.9M', color: 'primary' as const },
  { id: 'nadra-records', label: 'NADRA Identity Records', icon: 'ri-id-card-line', frequency: 5, unit: 'minutes', lastSynced: '2026-06-11T10:32:00', recordCount: '220.5M', color: 'accent' as const },
  { id: 'immigration-logs', label: 'Immigration Travel Logs', icon: 'ri-flight-takeoff-line', frequency: 240, unit: 'minutes', lastSynced: '2026-06-11T06:00:00', recordCount: '12.8M', color: 'secondary' as const },
  { id: 'banking-transactions', label: 'Banking Transactions', icon: 'ri-bank-line', frequency: 45, unit: 'minutes', lastSynced: '2026-06-11T10:05:00', recordCount: '156.2M', color: 'primary' as const },
];

export const accountInfo = {
  fullName: 'Admin Khan Tareen',
  email: 'admin.khan@taxgraph.fbr.gov.pk',
  role: 'System Administrator',
  department: 'FBR Intelligence Directorate — Zone III',
  employeeId: 'FBR-ADM-2023-7841',
  securityClearance: 'Top Secret — SCI',
  lastLogin: '2026-06-11T10:32:15',
  twoFactorEnabled: true,
};

export const systemInfo = {
  version: '3.7.2',
  buildNumber: 'TGAI-20260607-8421',
  environment: 'Production',
  region: 'Pakistan — Islamabad Data Centre',
  uptime: '47 days 14 hours 23 minutes',
  lastDeployment: '2026-06-07T04:15:00',
};