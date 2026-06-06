export type Tradeline = {
  id: string;
  bankName: string;
  last4: string;
  ageYears: number;
  creditLimit: number;
  utilizationPercent: number;
  statementDate: string;
  price: number;
  slotsTotal: number;
  slotsAvailable: number;
  notes?: string;
};

export const MOCK_TRADELINES: Tradeline[] = [
  {
    id: "tl-001",
    bankName: "Chase Sapphire",
    last4: "4821",
    ageYears: 6,
    creditLimit: 15000,
    utilizationPercent: 5,
    statementDate: "12th of month",
    price: 389,
    slotsTotal: 3,
    slotsAvailable: 1,
    notes: "Great for utilization padding",
  },
  {
    id: "tl-002",
    bankName: "Bank of America Cash Rewards",
    last4: "9034",
    ageYears: 4,
    creditLimit: 12000,
    utilizationPercent: 7,
    statementDate: "9th of month",
    price: 345,
    slotsTotal: 3,
    slotsAvailable: 2,
  },
  {
    id: "tl-003",
    bankName: "Discover It",
    last4: "2210",
    ageYears: 5,
    creditLimit: 18000,
    utilizationPercent: 4,
    statementDate: "3rd of month",
    price: 410,
    slotsTotal: 2,
    slotsAvailable: 1,
  },
  {
    id: "tl-004",
    bankName: "Citi Premier",
    last4: "7719",
    ageYears: 3,
    creditLimit: 10000,
    utilizationPercent: 6,
    statementDate: "15th of month",
    price: 320,
    slotsTotal: 4,
    slotsAvailable: 3,
  },
  {
    id: "tl-005",
    bankName: "Wells Fargo Active Cash",
    last4: "5532",
    ageYears: 8,
    creditLimit: 22000,
    utilizationPercent: 3,
    statementDate: "6th of month",
    price: 480,
    slotsTotal: 2,
    slotsAvailable: 1,
    notes: "Long age, high limit",
  },
  {
    id: "tl-006",
    bankName: "US Bank Altitude",
    last4: "1188",
    ageYears: 2,
    creditLimit: 9000,
    utilizationPercent: 9,
    statementDate: "18th of month",
    price: 275,
    slotsTotal: 3,
    slotsAvailable: 3,
  },
  {
    id: "tl-007",
    bankName: "Capital One Venture",
    last4: "6405",
    ageYears: 7,
    creditLimit: 16000,
    utilizationPercent: 5,
    statementDate: "21st of month",
    price: 430,
    slotsTotal: 3,
    slotsAvailable: 1,
  },
  {
    id: "tl-008",
    bankName: "Amex Blue Cash",
    last4: "3054",
    ageYears: 5,
    creditLimit: 14000,
    utilizationPercent: 8,
    statementDate: "25th of month",
    price: 360,
    slotsTotal: 4,
    slotsAvailable: 2,
  },
  {
    id: "tl-009",
    bankName: "PNC Core",
    last4: "7442",
    ageYears: 9,
    creditLimit: 25000,
    utilizationPercent: 2,
    statementDate: "11th of month",
    price: 515,
    slotsTotal: 1,
    slotsAvailable: 1,
    notes: "Premium limit + age combo",
  },
  {
    id: "tl-010",
    bankName: "Barclays Arrival",
    last4: "9820",
    ageYears: 4,
    creditLimit: 13000,
    utilizationPercent: 6,
    statementDate: "28th of month",
    price: 335,
    slotsTotal: 3,
    slotsAvailable: 2,
  },
];


