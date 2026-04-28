export type DealStatus = 'verified' | 'pending' | 'approved' | 'rejected';

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

export type SubmittedDeal = {
  id: string;
  dispensaryName: string;
  city: string;
  county: 'Middlesex';
  state: 'NJ';
  address: string;
  title: string;
  category: Deal['category'];
  discount: number;
  expirationDate: string;
  sourceUrl: string;
  submitterEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};
