export interface CitizenRecord {
  cnic: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  vehicleOwnership: string;
  propertyValue: number;
  propertyValueLabel: string;
  monthlyElectricityBill: number;
  monthlyElectricityBillLabel: string;
  internationalTrips: number;
  declaredIncome: number;
  declaredIncomeLabel: string;
  taxPaid: number;
  taxPaidLabel: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}