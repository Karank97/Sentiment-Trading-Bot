export type DealStatus = 'verified' | 'pending';

export type Deal = {
  id: string;
  dispensaryName: string;
  dispensarySlug: string;
  city: string;
  state: 'NJ';
  county: 'Middlesex';
  distance: string;
  title: string;
  category: 'Flower' | 'Edibles' | 'Vapes' | 'Concentrates' | 'Pre-Rolls' | 'Accessories';
  discount: number;
  expirationDate: string;
  sourceUrl: string;
  status: DealStatus;
};
