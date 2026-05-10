/** Shared illustrative data for farmer marketing pages (hero previews, demo copy). */

export type DemoMilkCollectionRow = {
  id: string;
  dateDisplay: string;
  shift: 'Morning' | 'Evening';
  milkType: 'Cow' | 'Buffalo' | 'Mixed';
  fat: number;
  snf: number;
  quantityLiters: number;
  amountInr: number;
  status: 'Accepted' | 'Processing' | 'Rejected';
};

export type DemoPaymentRow = {
  id: string;
  period: string;
  quantityLiters: number;
  amountInr: number;
  status: 'Paid' | 'Pending' | 'Processing';
  transactionId?: string;
  dateDisplay: string;
};

export const FARMER_DASHBOARD_DEMO = {
  vendorName: 'Sunrise Collection Center',
  dateIso: '2026-05-10',
  dateDisplayEn: '10 May 2026',
  milkType: 'Cow' as const,
  quantityLiters: 5.5,
  demoPayoutInr: 638,
  /** Summary for the rolling window used on the real dashboard (e.g. last 7 days). */
  summary: {
    totalLiters: 24.6,
    totalEntries: 8,
    avgFat: 4.18,
    avgSnf: 8.28,
    totalAmountInr: 2842,
  },
  /** “Today” tiles match Farmer Dashboard stat cards. */
  today: {
    totalLiters: 11.2,
    entries: 2,
    avgFat: 4.12,
    avgSnf: 8.35,
    totalAmountInr: 638,
  },
  recentCollections: [
    {
      id: 'c1',
      dateDisplay: '10 May 2026',
      shift: 'Morning',
      milkType: 'Cow',
      fat: 4.1,
      snf: 8.4,
      quantityLiters: 5.5,
      amountInr: 312,
      status: 'Accepted',
    },
    {
      id: 'c2',
      dateDisplay: '10 May 2026',
      shift: 'Evening',
      milkType: 'Cow',
      fat: 4.15,
      snf: 8.3,
      quantityLiters: 5.7,
      amountInr: 326,
      status: 'Accepted',
    },
    {
      id: 'c3',
      dateDisplay: '9 May 2026',
      shift: 'Evening',
      milkType: 'Cow',
      fat: 4.0,
      snf: 8.2,
      quantityLiters: 5.2,
      amountInr: 289,
      status: 'Accepted',
    },
    {
      id: 'c4',
      dateDisplay: '9 May 2026',
      shift: 'Morning',
      milkType: 'Cow',
      fat: 4.2,
      snf: 8.5,
      quantityLiters: 5.4,
      amountInr: 305,
      status: 'Processing',
    },
  ] as const satisfies readonly DemoMilkCollectionRow[],
  samplePayments: [
    {
      id: 'p1',
      period: '1–15 Apr 2026',
      quantityLiters: 410,
      amountInr: 21840,
      status: 'Paid',
      transactionId: 'TXN-DK-10432',
      dateDisplay: '20 Apr 2026',
    },
    {
      id: 'p2',
      period: '16–31 Mar 2026',
      quantityLiters: 398,
      amountInr: 21104,
      status: 'Paid',
      transactionId: 'TXN-DK-10388',
      dateDisplay: '5 Apr 2026',
    },
    {
      id: 'p3',
      period: '16–30 Apr 2026',
      quantityLiters: 425,
      amountInr: 22650,
      status: 'Processing',
      dateDisplay: '—',
    },
    {
      id: 'p4',
      period: '1–15 May 2026',
      quantityLiters: 402,
      amountInr: 21486,
      status: 'Pending',
      dateDisplay: '—',
    },
  ] as const satisfies readonly DemoPaymentRow[],
} as const;
