export interface DataSource {
  id: string;
  name: string;
  icon: string;
  category: string;
  status: 'Connected' | 'Degraded' | 'Disconnected';
  records: number;
  recordsFormatted: string;
  lastSync: string;
  lastSyncRelative: string;
  qualityScore: number;
  description: string;
  colorClass: string;
}

export const dataSources: DataSource[] = [
  {
    id: 'fbr-tax-records',
    name: 'FBR Tax Records',
    icon: 'ri-file-text-line',
    category: 'Taxation',
    status: 'Connected',
    records: 2847291,
    recordsFormatted: '2,847,291',
    lastSync: '2025-06-11T08:42:15',
    lastSyncRelative: '2 hours ago',
    qualityScore: 98,
    description: 'Federal Board of Revenue tax filings, income declarations, and withholding records for all registered taxpayers.',
    colorClass: 'primary',
  },
  {
    id: 'excise-vehicle-registry',
    name: 'Excise Vehicle Registry',
    icon: 'ri-car-line',
    category: 'Vehicles',
    status: 'Connected',
    records: 18423560,
    recordsFormatted: '18,423,560',
    lastSync: '2025-06-11T09:15:42',
    lastSyncRelative: '1 hour ago',
    qualityScore: 94,
    description: 'Provincial excise and taxation department vehicle registration records including ownership history and vehicle specifications.',
    colorClass: 'accent',
  },
  {
    id: 'property-registration',
    name: 'Property Registration Authority',
    icon: 'ri-building-line',
    category: 'Property',
    status: 'Connected',
    records: 5120384,
    recordsFormatted: '5,120,384',
    lastSync: '2025-06-11T07:30:00',
    lastSyncRelative: '3 hours ago',
    qualityScore: 91,
    description: 'Land and property registry records covering ownership, transfers, valuation, and mortgage encumbrances across all provinces.',
    colorClass: 'secondary',
  },
  {
    id: 'utility-companies',
    name: 'Utility Companies',
    icon: 'ri-flashlight-line',
    category: 'Utilities',
    status: 'Connected',
    records: 34892110,
    recordsFormatted: '34,892,110',
    lastSync: '2025-06-11T10:05:33',
    lastSyncRelative: '15 minutes ago',
    qualityScore: 87,
    description: 'Electricity, gas, and water utility consumption data from LESCO, SNGPL, K-Electric, and regional distribution companies.',
    colorClass: 'primary',
  },
  {
    id: 'nadra-identity',
    name: 'NADRA Identity Records',
    icon: 'ri-profile-line',
    category: 'Identity',
    status: 'Connected',
    records: 220548392,
    recordsFormatted: '220,548,392',
    lastSync: '2025-06-11T10:22:18',
    lastSyncRelative: '5 minutes ago',
    qualityScore: 99,
    description: 'National Database and Registration Authority records including CNIC, family trees, address verification, and biometric data.',
    colorClass: 'accent',
  },
  {
    id: 'immigration-travel',
    name: 'Immigration Travel Logs',
    icon: 'ri-plane-line',
    category: 'Travel',
    status: 'Connected',
    records: 12765448,
    recordsFormatted: '12,765,448',
    lastSync: '2025-06-11T06:48:00',
    lastSyncRelative: '4 hours ago',
    qualityScore: 85,
    description: 'FIA immigration departure and arrival records including passport stamps, visa categories, and travel frequency patterns.',
    colorClass: 'secondary',
  },
  {
    id: 'banking-transactions',
    name: 'Banking Transactions',
    icon: 'ri-bank-line',
    category: 'Finance',
    status: 'Connected',
    records: 156234789,
    recordsFormatted: '156,234,789',
    lastSync: '2025-06-11T09:55:10',
    lastSyncRelative: '45 minutes ago',
    qualityScore: 92,
    description: 'Aggregated banking transaction data from State Bank reporting channels, including high-value deposits and cross-bank transfers.',
    colorClass: 'primary',
  },
];

export const sourceMetrics = {
  totalSources: 7,
  allConnected: true,
  totalRecords: 454311974,
  avgQualityScore: 92,
  lastFullSync: '2025-06-11T10:22:18',
};