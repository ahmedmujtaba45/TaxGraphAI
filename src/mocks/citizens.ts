/* ========================================================================
   MASTER CITIZENS DATASET — 21 citizens across 8 cities
   Each citizen has full data for all 4 modules:
     - Entity Resolution   - Knowledge Graph
     - Risk Scoring        - Audit Reports
   ======================================================================== */

export interface CitizenProfile {
  id: string;
  name: string;
  cnic: string;
  city: string;
  province: string;
  incomeDeclared: string;
  incomeEstimated: string;
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  vehicle: string;
  vehicleReg: string;
  vehicleValue: string;
  propertyLoc: string;
  propertyValue: string;
  utilityMonthly: string;
  utilityId: string;
  travelTrips: number;
  travelDests: string;
  travelSpend: string;
  bankName: string;
  bankBalance: string;
  bankMonthly: string;
  businessName: string;
  businessReg: string;
  businessRevenue: string;
  passportNo: string;
  auditId: string;
  caseStatus: string;
  assignedOfficer: string;
  assignedUnit: string;
}

export const citizenProfiles: CitizenProfile[] = [
  // ===== LAHORE (3) =====
  {
    id: 'ahmed-raza', name: 'Ahmed Raza', cnic: '37405-1234567-1',
    city: 'Lahore', province: 'Punjab',
    incomeDeclared: 'PKR 800,000', incomeEstimated: 'PKR 15,000,000',
    score: 92, riskLevel: 'Critical', confidence: 98.7,
    vehicle: 'Toyota Fortuner 2023', vehicleReg: 'LEA-23-4567', vehicleValue: 'PKR 15.2M',
    propertyLoc: 'DHA Phase 5, Lahore', propertyValue: 'PKR 85 Million',
    utilityMonthly: 'PKR 285,000', utilityId: 'LESCO-88912',
    travelTrips: 14, travelDests: 'UAE, UK, Thailand, Malaysia', travelSpend: 'PKR 8.5 Million',
    bankName: 'HBL Main Branch', bankBalance: 'PKR 45 Million', bankMonthly: 'PKR 12.5 Million',
    businessName: 'Raza Traders Pvt Ltd', businessReg: 'SECP-889123', businessRevenue: 'PKR 180 Million',
    passportNo: 'AB1234567',
    auditId: 'FBR-AUD-2025-08421', caseStatus: 'Under Investigation',
    assignedOfficer: 'Tariq Mehmood Awan', assignedUnit: 'Zone III — Lahore',
  },
  {
    id: 'muhammad-usman', name: 'Muhammad Usman', cnic: '35202-2345678-3',
    city: 'Lahore', province: 'Punjab',
    incomeDeclared: 'PKR 650,000', incomeEstimated: 'PKR 8,500,000',
    score: 78, riskLevel: 'High', confidence: 94.2,
    vehicle: 'Honda Civic 2022', vehicleReg: 'LEA-22-8912', vehicleValue: 'PKR 7.8M',
    propertyLoc: 'Bahria Town, Lahore', propertyValue: 'PKR 45 Million',
    utilityMonthly: 'PKR 145,000', utilityId: 'LESCO-66421',
    travelTrips: 8, travelDests: 'UAE, Saudi Arabia, Turkey', travelSpend: 'PKR 3.2 Million',
    bankName: 'UBL Gulberg Branch', bankBalance: 'PKR 18 Million', bankMonthly: 'PKR 4.5 Million',
    businessName: 'Usman Textiles', businessReg: 'SECP-445672', businessRevenue: 'PKR 95 Million',
    passportNo: 'CD3456789',
    auditId: 'FBR-AUD-2025-09142', caseStatus: 'Pending Review',
    assignedOfficer: 'Fatima Sheikh', assignedUnit: 'Zone III — Lahore',
  },
  {
    id: 'bilal-hussain', name: 'Bilal Hussain', cnic: '35202-3456789-5',
    city: 'Lahore', province: 'Punjab',
    incomeDeclared: 'PKR 1,200,000', incomeEstimated: 'PKR 22,000,000',
    score: 85, riskLevel: 'Critical', confidence: 96.5,
    vehicle: 'BMW X5 2023', vehicleReg: 'LEA-23-1123', vehicleValue: 'PKR 35M',
    propertyLoc: 'DHA Phase 6, Lahore', propertyValue: 'PKR 120 Million',
    utilityMonthly: 'PKR 420,000', utilityId: 'LESCO-77831',
    travelTrips: 22, travelDests: 'UK, UAE, Switzerland, Malaysia, Turkey', travelSpend: 'PKR 15 Million',
    bankName: 'MCB DHA Branch', bankBalance: 'PKR 85 Million', bankMonthly: 'PKR 28 Million',
    businessName: 'Bilal Enterprises Ltd', businessReg: 'SECP-331894', businessRevenue: 'PKR 350 Million',
    passportNo: 'EF5678901',
    auditId: 'FBR-AUD-2025-10288', caseStatus: 'Under Investigation',
    assignedOfficer: 'Colonel (R) Hamid Raza', assignedUnit: 'Zone III — Lahore',
  },

  // ===== RAWALPINDI (2) =====
  {
    id: 'tariq-mehmood', name: 'Tariq Mehmood', cnic: '37406-4567890-7',
    city: 'Rawalpindi', province: 'Punjab',
    incomeDeclared: 'PKR 550,000', incomeEstimated: 'PKR 6,200,000',
    score: 68, riskLevel: 'High', confidence: 89.3,
    vehicle: 'Toyota Corolla 2021', vehicleReg: 'RWP-21-3456', vehicleValue: 'PKR 4.5M',
    propertyLoc: 'Gulrez Housing Scheme, Rawalpindi', propertyValue: 'PKR 28 Million',
    utilityMonthly: 'PKR 95,000', utilityId: 'IESCO-44123',
    travelTrips: 5, travelDests: 'UAE, Saudi Arabia', travelSpend: 'PKR 1.8 Million',
    bankName: 'HBL Saddar Branch', bankBalance: 'PKR 8.2 Million', bankMonthly: 'PKR 1.9 Million',
    businessName: 'Tariq Auto Parts', businessReg: 'SECP-782341', businessRevenue: 'PKR 65 Million',
    passportNo: 'GH9012345',
    auditId: 'FBR-AUD-2025-11345', caseStatus: 'Pending Review',
    assignedOfficer: 'Brigadier (R) Tariq Mehmood', assignedUnit: 'Zone II — Rawalpindi',
  },
  {
    id: 'sajid-ali', name: 'Sajid Ali', cnic: '37406-5678901-9',
    city: 'Rawalpindi', province: 'Punjab',
    incomeDeclared: 'PKR 400,000', incomeEstimated: 'PKR 3,800,000',
    score: 55, riskLevel: 'Medium', confidence: 82.1,
    vehicle: 'Suzuki Swift 2022', vehicleReg: 'RWP-22-7890', vehicleValue: 'PKR 2.8M',
    propertyLoc: 'Bahria Town Phase 8, Rawalpindi', propertyValue: 'PKR 18 Million',
    utilityMonthly: 'PKR 62,000', utilityId: 'IESCO-55321',
    travelTrips: 3, travelDests: 'UAE', travelSpend: 'PKR 0.9 Million',
    bankName: 'ABL Commercial Market', bankBalance: 'PKR 5.4 Million', bankMonthly: 'PKR 1.1 Million',
    businessName: 'Sajid General Store', businessReg: 'SECP-567123', businessRevenue: 'PKR 32 Million',
    passportNo: 'IJ2345678',
    auditId: 'FBR-AUD-2025-12456', caseStatus: 'Initial Review',
    assignedOfficer: 'Brigadier (R) Tariq Mehmood', assignedUnit: 'Zone II — Rawalpindi',
  },

  // ===== ISLAMABAD (5) =====
  {
    id: 'faisal-iqbal', name: 'Faisal Iqbal', cnic: '37401-6789012-1',
    city: 'Islamabad', province: 'ICT',
    incomeDeclared: 'PKR 2,500,000', incomeEstimated: 'PKR 45,000,000',
    score: 96, riskLevel: 'Critical', confidence: 99.1,
    vehicle: 'Mercedes Benz S-Class 2024', vehicleReg: 'ICT-24-0011', vehicleValue: 'PKR 65M',
    propertyLoc: 'F-7/2, Islamabad', propertyValue: 'PKR 220 Million',
    utilityMonthly: 'PKR 680,000', utilityId: 'IESCO-99012',
    travelTrips: 31, travelDests: 'UK, USA, UAE, Switzerland, France, Singapore', travelSpend: 'PKR 28 Million',
    bankName: 'Standard Chartered F-7', bankBalance: 'PKR 180 Million', bankMonthly: 'PKR 52 Million',
    businessName: 'Iqbal Holdings Ltd', businessReg: 'SECP-112233', businessRevenue: 'PKR 620 Million',
    passportNo: 'KL3456789',
    auditId: 'FBR-AUD-2025-00981', caseStatus: 'Under Investigation',
    assignedOfficer: 'Dr. Ayesha Kamal', assignedUnit: 'Zone I — Islamabad',
  },
  {
    id: 'zeeshan-ahmed', name: 'Zeeshan Ahmed', cnic: '37401-7890123-3',
    city: 'Islamabad', province: 'ICT',
    incomeDeclared: 'PKR 1,800,000', incomeEstimated: 'PKR 25,000,000',
    score: 81, riskLevel: 'Critical', confidence: 91.8,
    vehicle: 'Land Cruiser 2023', vehicleReg: 'ICT-23-4422', vehicleValue: 'PKR 42M',
    propertyLoc: 'E-11/3, Islamabad', propertyValue: 'PKR 95 Million',
    utilityMonthly: 'PKR 320,000', utilityId: 'IESCO-77543',
    travelTrips: 18, travelDests: 'UK, UAE, Thailand, Malaysia, Qatar', travelSpend: 'PKR 11 Million',
    bankName: 'Meezan Bank Blue Area', bankBalance: 'PKR 62 Million', bankMonthly: 'PKR 18 Million',
    businessName: 'Zeeshan Tech Solutions', businessReg: 'SECP-445566', businessRevenue: 'PKR 210 Million',
    passportNo: 'MN5678901',
    auditId: 'FBR-AUD-2025-13567', caseStatus: 'Under Investigation',
    assignedOfficer: 'Dr. Ayesha Kamal', assignedUnit: 'Zone I — Islamabad',
  },
  {
    id: 'imran-haider', name: 'Imran Haider', cnic: '37401-8901234-5',
    city: 'Islamabad', province: 'ICT',
    incomeDeclared: 'PKR 950,000', incomeEstimated: 'PKR 12,000,000',
    score: 72, riskLevel: 'High', confidence: 87.4,
    vehicle: 'Honda BR-V 2022', vehicleReg: 'ICT-22-5566', vehicleValue: 'PKR 5.8M',
    propertyLoc: 'Bahria Enclave, Islamabad', propertyValue: 'PKR 38 Million',
    utilityMonthly: 'PKR 175,000', utilityId: 'IESCO-33421',
    travelTrips: 10, travelDests: 'UAE, Malaysia, Turkey', travelSpend: 'PKR 4.1 Million',
    bankName: 'HBL Blue Area', bankBalance: 'PKR 22 Million', bankMonthly: 'PKR 6.8 Million',
    businessName: 'Haider Construction Co', businessReg: 'SECP-778899', businessRevenue: 'PKR 140 Million',
    passportNo: 'OP1234567',
    auditId: 'FBR-AUD-2025-14678', caseStatus: 'Pending Review',
    assignedOfficer: 'Fatima Sheikh', assignedUnit: 'Zone I — Islamabad',
  },
  {
    id: 'nasir-khan', name: 'Nasir Khan', cnic: '37401-9012345-7',
    city: 'Islamabad', province: 'ICT',
    incomeDeclared: 'PKR 500,000', incomeEstimated: 'PKR 4,500,000',
    score: 48, riskLevel: 'Medium', confidence: 78.9,
    vehicle: 'Suzuki Alto 2021', vehicleReg: 'ICT-21-7788', vehicleValue: 'PKR 1.9M',
    propertyLoc: 'G-13/2, Islamabad', propertyValue: 'PKR 12 Million',
    utilityMonthly: 'PKR 55,000', utilityId: 'IESCO-11882',
    travelTrips: 2, travelDests: 'UAE', travelSpend: 'PKR 0.6 Million',
    bankName: 'UBL G-9 Markaz', bankBalance: 'PKR 3.1 Million', bankMonthly: 'PKR 0.8 Million',
    businessName: 'Nasir Electronics', businessReg: 'SECP-990011', businessRevenue: 'PKR 28 Million',
    passportNo: 'QR7890123',
    auditId: 'FBR-AUD-2025-15789', caseStatus: 'Initial Review',
    assignedOfficer: 'Brigadier (R) Tariq Mehmood', assignedUnit: 'Zone I — Islamabad',
  },
  {
    id: 'kamran-butt', name: 'Kamran Butt', cnic: '37401-0123456-9',
    city: 'Islamabad', province: 'ICT',
    incomeDeclared: 'PKR 750,000', incomeEstimated: 'PKR 9,000,000',
    score: 64, riskLevel: 'High', confidence: 84.6,
    vehicle: 'Kia Sportage 2023', vehicleReg: 'ICT-23-9900', vehicleValue: 'PKR 8.2M',
    propertyLoc: 'B-17, Islamabad', propertyValue: 'PKR 22 Million',
    utilityMonthly: 'PKR 110,000', utilityId: 'IESCO-44567',
    travelTrips: 7, travelDests: 'UAE, Saudi Arabia, Malaysia', travelSpend: 'PKR 2.5 Million',
    bankName: 'Faysal Bank F-10', bankBalance: 'PKR 11 Million', bankMonthly: 'PKR 3.2 Million',
    businessName: 'Butt Catering Services', businessReg: 'SECP-334455', businessRevenue: 'PKR 75 Million',
    passportNo: 'ST5678901',
    auditId: 'FBR-AUD-2025-16890', caseStatus: 'Pending Review',
    assignedOfficer: 'Fatima Sheikh', assignedUnit: 'Zone I — Islamabad',
  },

  // ===== QUETTA (3) =====
  {
    id: 'abdul-ghaffar', name: 'Abdul Ghaffar', cnic: '54400-1234567-1',
    city: 'Quetta', province: 'Balochistan',
    incomeDeclared: 'PKR 350,000', incomeEstimated: 'PKR 5,200,000',
    score: 74, riskLevel: 'High', confidence: 86.2,
    vehicle: 'Toyota Hilux 2022', vehicleReg: 'QTA-22-3311', vehicleValue: 'PKR 12M',
    propertyLoc: 'Jinnah Town, Quetta', propertyValue: 'PKR 32 Million',
    utilityMonthly: 'PKR 105,000', utilityId: 'QESCO-22134',
    travelTrips: 9, travelDests: 'UAE, Iran, Afghanistan', travelSpend: 'PKR 3.8 Million',
    bankName: 'NBP Quetta Cantt', bankBalance: 'PKR 16 Million', bankMonthly: 'PKR 4.2 Million',
    businessName: 'Ghaffar Trading Co', businessReg: 'SECP-556128', businessRevenue: 'PKR 88 Million',
    passportNo: 'UV9012345',
    auditId: 'FBR-AUD-2025-17901', caseStatus: 'Under Investigation',
    assignedOfficer: 'Ahmed Mujtaba', assignedUnit: 'Zone IV — Quetta',
  },
  {
    id: 'hameedullah-khan', name: 'Hameedullah Khan', cnic: '54400-2345678-3',
    city: 'Quetta', province: 'Balochistan',
    incomeDeclared: 'PKR 280,000', incomeEstimated: 'PKR 3,100,000',
    score: 42, riskLevel: 'Medium', confidence: 72.8,
    vehicle: 'Suzuki Bolan 2020', vehicleReg: 'QTA-20-5544', vehicleValue: 'PKR 1.2M',
    propertyLoc: 'Cantt Area, Quetta', propertyValue: 'PKR 8.5 Million',
    utilityMonthly: 'PKR 35,000', utilityId: 'QESCO-33221',
    travelTrips: 2, travelDests: 'Iran', travelSpend: 'PKR 0.4 Million',
    bankName: 'HBL Quetta Main', bankBalance: 'PKR 2.8 Million', bankMonthly: 'PKR 0.5 Million',
    businessName: 'Khan Dry Fruits', businessReg: 'SECP-778234', businessRevenue: 'PKR 18 Million',
    passportNo: 'WX1234567',
    auditId: 'FBR-AUD-2025-18012', caseStatus: 'Initial Review',
    assignedOfficer: 'Ali Raza', assignedUnit: 'Zone IV — Quetta',
  },
  {
    id: 'naseebullah-achakzai', name: 'Naseebullah Achakzai', cnic: '54400-3456789-5',
    city: 'Quetta', province: 'Balochistan',
    incomeDeclared: 'PKR 420,000', incomeEstimated: 'PKR 7,800,000',
    score: 61, riskLevel: 'High', confidence: 80.5,
    vehicle: 'Toyota Prado 2021', vehicleReg: 'QTA-21-6677', vehicleValue: 'PKR 22M',
    propertyLoc: 'Sariab Road, Quetta', propertyValue: 'PKR 42 Million',
    utilityMonthly: 'PKR 140,000', utilityId: 'QESCO-44332',
    travelTrips: 12, travelDests: 'UAE, Saudi Arabia, Iran, Turkey', travelSpend: 'PKR 5.5 Million',
    bankName: 'MCB Quetta Cantt', bankBalance: 'PKR 28 Million', bankMonthly: 'PKR 7.1 Million',
    businessName: 'Achakzai Transport', businessReg: 'SECP-889561', businessRevenue: 'PKR 125 Million',
    passportNo: 'YZ7890123',
    auditId: 'FBR-AUD-2025-19123', caseStatus: 'Pending Review',
    assignedOfficer: 'Ahmed Mujtaba', assignedUnit: 'Zone IV — Quetta',
  },

  // ===== PESHAWAR (3) =====
  {
    id: 'khalid-mehmood', name: 'Khalid Mehmood', cnic: '17301-4567890-7',
    city: 'Peshawar', province: 'KPK',
    incomeDeclared: 'PKR 600,000', incomeEstimated: 'PKR 11,000,000',
    score: 76, riskLevel: 'High', confidence: 88.9,
    vehicle: 'Toyota Fortuner 2022', vehicleReg: 'PSH-22-1122', vehicleValue: 'PKR 14.5M',
    propertyLoc: 'Hayatabad Phase 5, Peshawar', propertyValue: 'PKR 55 Million',
    utilityMonthly: 'PKR 195,000', utilityId: 'PESCO-55221',
    travelTrips: 11, travelDests: 'UAE, Saudi Arabia, Afghanistan, Qatar', travelSpend: 'PKR 4.8 Million',
    bankName: 'HBL University Road', bankBalance: 'PKR 32 Million', bankMonthly: 'PKR 9.2 Million',
    businessName: 'Khalid Marble Industries', businessReg: 'SECP-667234', businessRevenue: 'PKR 160 Million',
    passportNo: 'AB1234567',
    auditId: 'FBR-AUD-2025-20234', caseStatus: 'Under Investigation',
    assignedOfficer: 'Saad Bin Khalid', assignedUnit: 'Zone V — Peshawar',
  },
  {
    id: 'muhammad-waqas', name: 'Muhammad Waqas', cnic: '17301-5678901-9',
    city: 'Peshawar', province: 'KPK',
    incomeDeclared: 'PKR 380,000', incomeEstimated: 'PKR 3,500,000',
    score: 38, riskLevel: 'Medium', confidence: 68.4,
    vehicle: 'Honda City 2020', vehicleReg: 'PSH-20-3344', vehicleValue: 'PKR 2.3M',
    propertyLoc: 'University Town, Peshawar', propertyValue: 'PKR 10 Million',
    utilityMonthly: 'PKR 48,000', utilityId: 'PESCO-33221',
    travelTrips: 2, travelDests: 'UAE', travelSpend: 'PKR 0.5 Million',
    bankName: 'UBL Peshawar Cantt', bankBalance: 'PKR 3.5 Million', bankMonthly: 'PKR 0.7 Million',
    businessName: 'Waqas General Trading', businessReg: 'SECP-112345', businessRevenue: 'PKR 22 Million',
    passportNo: 'CD9876543',
    auditId: 'FBR-AUD-2025-21345', caseStatus: 'Initial Review',
    assignedOfficer: 'Ali Raza', assignedUnit: 'Zone V — Peshawar',
  },
  {
    id: 'saad-bin-khalid', name: 'Saad Bin Khalid', cnic: '17301-6789012-1',
    city: 'Peshawar', province: 'KPK',
    incomeDeclared: 'PKR 1,500,000', incomeEstimated: 'PKR 18,000,000',
    score: 88, riskLevel: 'Critical', confidence: 95.3,
    vehicle: 'Audi Q7 2023', vehicleReg: 'PSH-23-5566', vehicleValue: 'PKR 48M',
    propertyLoc: 'DHA Peshawar', propertyValue: 'PKR 150 Million',
    utilityMonthly: 'PKR 380,000', utilityId: 'PESCO-88771',
    travelTrips: 25, travelDests: 'UK, UAE, Germany, Thailand, Malaysia, Turkey', travelSpend: 'PKR 18 Million',
    bankName: 'HBL DHA Peshawar', bankBalance: 'PKR 95 Million', bankMonthly: 'PKR 28 Million',
    businessName: 'Saad Enterprises Pvt Ltd', businessReg: 'SECP-223344', businessRevenue: 'PKR 380 Million',
    passportNo: 'EF4567890',
    auditId: 'FBR-AUD-2025-22456', caseStatus: 'Under Investigation',
    assignedOfficer: 'Colonel (R) Hamid Raza', assignedUnit: 'Zone V — Peshawar',
  },

  // ===== SINDH / KARACHI (3) =====
  {
    id: 'nadeem-qureshi', name: 'Nadeem Qureshi', cnic: '42301-7890123-3',
    city: 'Karachi', province: 'Sindh',
    incomeDeclared: 'PKR 3,000,000', incomeEstimated: 'PKR 52,000,000',
    score: 98, riskLevel: 'Critical', confidence: 99.5,
    vehicle: 'Range Rover Sport 2024', vehicleReg: 'KHI-24-0001', vehicleValue: 'PKR 82M',
    propertyLoc: 'DHA Phase 8, Karachi', propertyValue: 'PKR 280 Million',
    utilityMonthly: 'PKR 850,000', utilityId: 'KESC-99001',
    travelTrips: 38, travelDests: 'UK, USA, UAE, Switzerland, France, Italy, Singapore, Australia', travelSpend: 'PKR 35 Million',
    bankName: 'Standard Chartered Clifton', bankBalance: 'PKR 250 Million', bankMonthly: 'PKR 68 Million',
    businessName: 'Qureshi International Ltd', businessReg: 'SECP-111222', businessRevenue: 'PKR 850 Million',
    passportNo: 'GH1234567',
    auditId: 'FBR-AUD-2025-00123', caseStatus: 'Under Investigation',
    assignedOfficer: 'Dr. Ayesha Kamal', assignedUnit: 'Zone VI — Karachi',
  },
  {
    id: 'asif-saeed', name: 'Asif Saeed', cnic: '42301-8901234-5',
    city: 'Karachi', province: 'Sindh',
    incomeDeclared: 'PKR 1,100,000', incomeEstimated: 'PKR 14,000,000',
    score: 70, riskLevel: 'High', confidence: 85.7,
    vehicle: 'Toyota Camry 2023', vehicleReg: 'KHI-23-4455', vehicleValue: 'PKR 18M',
    propertyLoc: 'Clifton Block 5, Karachi', propertyValue: 'PKR 65 Million',
    utilityMonthly: 'PKR 240,000', utilityId: 'KESC-55432',
    travelTrips: 15, travelDests: 'UAE, UK, Thailand, Malaysia', travelSpend: 'PKR 6.2 Million',
    bankName: 'HBL Clifton', bankBalance: 'PKR 35 Million', bankMonthly: 'PKR 11 Million',
    businessName: 'Saeed Impex', businessReg: 'SECP-334561', businessRevenue: 'PKR 195 Million',
    passportNo: 'IJ8901234',
    auditId: 'FBR-AUD-2025-23567', caseStatus: 'Pending Review',
    assignedOfficer: 'Colonel (R) Hamid Raza', assignedUnit: 'Zone VI — Karachi',
  },
  {
    id: 'rafay-ahmed', name: 'Rafay Ahmed', cnic: '42301-9012345-7',
    city: 'Karachi', province: 'Sindh',
    incomeDeclared: 'PKR 700,000', incomeEstimated: 'PKR 6,800,000',
    score: 52, riskLevel: 'Medium', confidence: 76.3,
    vehicle: 'Honda City 2022', vehicleReg: 'KHI-22-6677', vehicleValue: 'PKR 3.5M',
    propertyLoc: 'Gulshan-e-Iqbal, Karachi', propertyValue: 'PKR 15 Million',
    utilityMonthly: 'PKR 72,000', utilityId: 'KESC-22331',
    travelTrips: 4, travelDests: 'UAE, Saudi Arabia', travelSpend: 'PKR 1.2 Million',
    bankName: 'Meezan Bank Gulshan', bankBalance: 'PKR 6.2 Million', bankMonthly: 'PKR 1.4 Million',
    businessName: 'Rafay General Store', businessReg: 'SECP-778123', businessRevenue: 'PKR 35 Million',
    passportNo: 'KL5678901',
    auditId: 'FBR-AUD-2025-24678', caseStatus: 'Initial Review',
    assignedOfficer: 'Ali Raza', assignedUnit: 'Zone VI — Karachi',
  },

  // ===== AJK (1) =====
  {
    id: 'raja-shehzad', name: 'Raja Shehzad', cnic: '82202-0123456-9',
    city: 'Mirpur', province: 'AJK',
    incomeDeclared: 'PKR 320,000', incomeEstimated: 'PKR 4,200,000',
    score: 45, riskLevel: 'Medium', confidence: 74.8,
    vehicle: 'Suzuki Cultus 2021', vehicleReg: 'MIR-21-1122', vehicleValue: 'PKR 2.1M',
    propertyLoc: 'New Mirpur City, AJK', propertyValue: 'PKR 14 Million',
    utilityMonthly: 'PKR 52,000', utilityId: 'AJK-ES-3412',
    travelTrips: 4, travelDests: 'UK, UAE', travelSpend: 'PKR 1.5 Million',
    bankName: 'HBL Mirpur', bankBalance: 'PKR 7.8 Million', bankMonthly: 'PKR 1.6 Million',
    businessName: 'Shehzad Construction', businessReg: 'SECP-445611', businessRevenue: 'PKR 42 Million',
    passportNo: 'MN3456789',
    auditId: 'FBR-AUD-2025-25789', caseStatus: 'Initial Review',
    assignedOfficer: 'Ahmed Mujtaba', assignedUnit: 'Zone VII — AJK',
  },

  // ===== GILGIT (1) =====
  {
    id: 'riaz-hussain', name: 'Riaz Hussain', cnic: '71101-1234567-1',
    city: 'Gilgit', province: 'Gilgit-Baltistan',
    incomeDeclared: 'PKR 250,000', incomeEstimated: 'PKR 2,800,000',
    score: 35, riskLevel: 'Medium', confidence: 70.2,
    vehicle: 'Suzuki Ravi 2020', vehicleReg: 'GLT-20-3344', vehicleValue: 'PKR 0.95M',
    propertyLoc: 'Jutial, Gilgit', propertyValue: 'PKR 7.5 Million',
    utilityMonthly: 'PKR 28,000', utilityId: 'GB-ES-1123',
    travelTrips: 1, travelDests: 'China', travelSpend: 'PKR 0.3 Million',
    bankName: 'NBP Gilgit Main', bankBalance: 'PKR 2.1 Million', bankMonthly: 'PKR 0.4 Million',
    businessName: 'Riaz Tour Operators', businessReg: 'SECP-992211', businessRevenue: 'PKR 15 Million',
    passportNo: 'OP7890123',
    auditId: 'FBR-AUD-2025-26890', caseStatus: 'Initial Review',
    assignedOfficer: 'Ali Raza', assignedUnit: 'Zone VIII — Gilgit',
  },
];

export const allCitizens = citizenProfiles;
export const defaultCitizen = citizenProfiles[0];

export function getCitizenById(id: string): CitizenProfile | undefined {
  return citizenProfiles.find((c) => c.id === id);
}

export function getCitizensByCity(city: string): CitizenProfile[] {
  return citizenProfiles.filter((c) => c.city === city);
}

export const cityGroups = (() => {
  const order = ['Lahore', 'Rawalpindi', 'Islamabad', 'Quetta', 'Peshawar', 'Karachi', 'Mirpur', 'Gilgit'];
  return order.map((city) => ({
    city,
    citizens: citizenProfiles.filter((c) => c.city === city),
  })).filter((g) => g.citizens.length > 0);
})();