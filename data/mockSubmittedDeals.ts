import { SubmittedDeal } from '@/types/deal';

const now = new Date().toISOString();

export const mockSubmittedDeals: SubmittedDeal[] = [
  {
    id: 's1',
    dispensaryName: 'Raritan Reserve',
    city: 'Piscataway',
    county: 'Middlesex',
    state: 'NJ',
    address: '123 Demo Street, Piscataway, NJ',
    title: 'Concentrate Happy Hour',
    category: 'Concentrates',
    discount: 15,
    expirationDate: '2026-04-30',
    sourceUrl: 'https://example.com/source/raritan-concentrates',
    submitterEmail: 'ops@raritanreserve.example',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 's2',
    dispensaryName: 'Hub City Herbals',
    city: 'New Brunswick',
    county: 'Middlesex',
    state: 'NJ',
    address: '456 Demo Ave, New Brunswick, NJ',
    title: 'Edibles Weeknight Promo',
    category: 'Edibles',
    discount: 10,
    expirationDate: '2026-05-04',
    sourceUrl: 'https://example.com/source/hubcity-special',
    submitterEmail: 'manager@hubcity.example',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  },
];
