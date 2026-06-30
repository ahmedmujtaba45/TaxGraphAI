export const statsData = [
  {
    id: 'citizens',
    icon: 'ri-user-line',
    label: 'Total Citizens Analysed',
    value: '125,430',
    change: '+12.5%',
    changeType: 'up',
    description: 'vs. previous quarter',
  },
  {
    id: 'non-filers',
    icon: 'ri-user-search-line',
    label: 'Potential Non-Filers',
    value: '7,920',
    change: '+23.8%',
    changeType: 'up',
    description: 'newly identified this month',
  },
  {
    id: 'high-risk',
    icon: 'ri-alert-line',
    label: 'High Risk Individuals',
    value: '1,243',
    change: '+8.3%',
    changeType: 'up',
    description: 'requiring immediate audit',
  },
  {
    id: 'revenue',
    icon: 'ri-money-rupee-circle-line',
    label: 'Estimated Revenue Leakage',
    value: 'PKR 4.2B',
    change: '-5.2%',
    changeType: 'down',
    description: 'recovered through enforcement',
  },
];

export const complianceScores = [
  { score: '0-20', count: 12450 },
  { score: '21-40', count: 18920 },
  { score: '41-60', count: 28750 },
  { score: '61-80', count: 35800 },
  { score: '81-100', count: 29510 },
];

export const provinceRisk = [
  { province: 'Punjab', highRisk: 480, mediumRisk: 1250, lowRisk: 8200 },
  { province: 'Sindh', highRisk: 380, mediumRisk: 980, lowRisk: 6100 },
  { province: 'KPK', highRisk: 210, mediumRisk: 540, lowRisk: 3200 },
  { province: 'Balochistan', highRisk: 95, mediumRisk: 260, lowRisk: 1400 },
  { province: 'ICT', highRisk: 78, mediumRisk: 180, lowRisk: 950 },
];

export const monthlyFlaggedCases = [
  { month: 'Jan', flagged: 1850, resolved: 1420 },
  { month: 'Feb', flagged: 2100, resolved: 1680 },
  { month: 'Mar', flagged: 1980, resolved: 1750 },
  { month: 'Apr', flagged: 2340, resolved: 1920 },
  { month: 'May', flagged: 2560, resolved: 2100 },
  { month: 'Jun', flagged: 2890, resolved: 2340 },
  { month: 'Jul', flagged: 3120, resolved: 2580 },
  { month: 'Aug', flagged: 2980, resolved: 2710 },
  { month: 'Sep', flagged: 3350, resolved: 2890 },
  { month: 'Oct', flagged: 3620, resolved: 3100 },
  { month: 'Nov', flagged: 3480, resolved: 3250 },
  { month: 'Dec', flagged: 3740, resolved: 3410 },
];

export const dataSourceContribution = [
  { name: 'NADRA', value: 32, color: 'bg-primary-600' },
  { name: 'Property Registry', value: 24, color: 'bg-accent-500' },
  { name: 'Vehicle Authority', value: 18, color: 'bg-secondary-500' },
  { name: 'Banking Records', value: 15, color: 'bg-primary-400' },
  { name: 'Utility Bills', value: 8, color: 'bg-accent-300' },
  { name: 'Other Sources', value: 3, color: 'bg-foreground-400' },
];

export const recentAlerts = [
  { name: 'Ahmed Raza', cnic: '37405-1234567-1', riskScore: 92, status: 'Critical', province: 'Punjab', amount: 'PKR 14.2M', citizenId: 'ahmed-raza' },
  { name: 'Muhammad Usman', cnic: '35202-2345678-3', riskScore: 78, status: 'High', province: 'Punjab', amount: 'PKR 7.85M', citizenId: 'muhammad-usman' },
  { name: 'Bilal Hussain', cnic: '35202-3456789-5', riskScore: 85, status: 'Critical', province: 'Punjab', amount: 'PKR 20.8M', citizenId: 'bilal-hussain' },
  { name: 'Tariq Mehmood', cnic: '37406-4567890-7', riskScore: 68, status: 'High', province: 'Punjab', amount: 'PKR 5.65M', citizenId: 'tariq-mehmood' },
  { name: 'Sajid Ali', cnic: '37406-5678901-9', riskScore: 55, status: 'Medium', province: 'Punjab', amount: 'PKR 3.4M', citizenId: 'sajid-ali' },
  { name: 'Faisal Iqbal', cnic: '37401-6789012-1', riskScore: 96, status: 'Critical', province: 'ICT', amount: 'PKR 42.5M', citizenId: 'faisal-iqbal' },
  { name: 'Zeeshan Ahmed', cnic: '37401-7890123-3', riskScore: 81, status: 'Critical', province: 'ICT', amount: 'PKR 23.2M', citizenId: 'zeeshan-ahmed' },
  { name: 'Imran Haider', cnic: '37401-8901234-5', riskScore: 72, status: 'High', province: 'ICT', amount: 'PKR 11.05M', citizenId: 'imran-haider' },
  { name: 'Nasir Khan', cnic: '37401-9012345-7', riskScore: 48, status: 'Medium', province: 'ICT', amount: 'PKR 4M', citizenId: 'nasir-khan' },
  { name: 'Kamran Butt', cnic: '37401-0123456-9', riskScore: 64, status: 'High', province: 'ICT', amount: 'PKR 8.25M', citizenId: 'kamran-butt' },
  { name: 'Abdul Ghaffar', cnic: '54400-1234567-1', riskScore: 74, status: 'High', province: 'Balochistan', amount: 'PKR 4.85M', citizenId: 'abdul-ghaffar' },
  { name: 'Hameedullah Khan', cnic: '54400-2345678-3', riskScore: 42, status: 'Medium', province: 'Balochistan', amount: 'PKR 2.82M', citizenId: 'hameedullah-khan' },
  { name: 'Naseebullah Achakzai', cnic: '54400-3456789-5', riskScore: 61, status: 'High', province: 'Balochistan', amount: 'PKR 7.38M', citizenId: 'naseebullah-achakzai' },
  { name: 'Khalid Mehmood', cnic: '17301-4567890-7', riskScore: 76, status: 'High', province: 'KPK', amount: 'PKR 10.4M', citizenId: 'khalid-mehmood' },
  { name: 'Muhammad Waqas', cnic: '17301-5678901-9', riskScore: 38, status: 'Medium', province: 'KPK', amount: 'PKR 3.12M', citizenId: 'muhammad-waqas' },
  { name: 'Saad Bin Khalid', cnic: '17301-6789012-1', riskScore: 88, status: 'Critical', province: 'KPK', amount: 'PKR 16.5M', citizenId: 'saad-bin-khalid' },
  { name: 'Nadeem Qureshi', cnic: '42301-7890123-3', riskScore: 98, status: 'Critical', province: 'Sindh', amount: 'PKR 49M', citizenId: 'nadeem-qureshi' },
  { name: 'Asif Saeed', cnic: '42301-8901234-5', riskScore: 70, status: 'High', province: 'Sindh', amount: 'PKR 12.9M', citizenId: 'asif-saeed' },
  { name: 'Rafay Ahmed', cnic: '42301-9012345-7', riskScore: 52, status: 'Medium', province: 'Sindh', amount: 'PKR 6.1M', citizenId: 'rafay-ahmed' },
  { name: 'Raja Shehzad', cnic: '82202-0123456-9', riskScore: 45, status: 'Medium', province: 'AJK', amount: 'PKR 3.88M', citizenId: 'raja-shehzad' },
  { name: 'Riaz Hussain', cnic: '71101-1234567-1', riskScore: 35, status: 'Medium', province: 'Gilgit-Baltistan', amount: 'PKR 2.55M', citizenId: 'riaz-hussain' },
];