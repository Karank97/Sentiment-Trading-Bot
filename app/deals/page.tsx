'use client';

import AgeGate from '@/components/AgeGate';
import DealCard from '@/components/DealCard';
import FiltersBar from '@/components/FiltersBar';
import { demoDataNotice, mockDeals } from '@/data/mockDeals';
import { useMemo, useState } from 'react';

export default function DealsPage() {
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    discount: '0',
    expiringSoon: false,
    verifiedOnly: false,
  });

  const cities = [...new Set(mockDeals.map((deal) => deal.city))];
  const categories = [...new Set(mockDeals.map((deal) => deal.category))];

  const filtered = useMemo(() => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 7);

    return mockDeals.filter((deal) => {
      if (filters.city && deal.city !== filters.city) return false;
      if (filters.category && deal.category !== filters.category) return false;
      if (deal.discount < Number(filters.discount)) return false;
      if (filters.verifiedOnly && deal.status !== 'verified') return false;
      if (filters.expiringSoon) {
        const exp = new Date(deal.expirationDate);
        if (exp > soon) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <AgeGate />
      <h1 className="mb-1 text-2xl font-bold sm:text-3xl">Middlesex County Deals</h1>
      <p className="mb-4 text-sm text-nashbud-muted">{demoDataNotice}</p>
      <FiltersBar
        cities={cities}
        categories={categories}
        {...filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </section>
    </>
  );
}
