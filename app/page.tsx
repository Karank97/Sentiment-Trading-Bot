'use client';

import AgeGate from '@/components/AgeGate';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [query, setQuery] = useState('');

  return (
    <>
      <AgeGate />
      <section className="panel overflow-hidden p-6 sm:p-10">
        <p className="mb-3 inline-flex rounded-full bg-nashbud-accentSoft px-3 py-1 text-xs font-semibold text-green-300">
          Middlesex County, New Jersey
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Verified dispensary deals near you.</h1>
        <p className="mt-4 max-w-2xl text-sm text-nashbud-muted sm:text-base">
          Discover curated demo deals from licensed dispensaries across New Brunswick, Edison, East
          Brunswick, Woodbridge, Piscataway, and North Brunswick.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or zip code"
            className="w-full rounded-xl border border-white/20 bg-black/20 p-3"
          />
          <Link
            href={`/deals?location=${encodeURIComponent(query)}`}
            className="rounded-xl bg-nashbud-accent px-6 py-3 text-center font-semibold text-black transition hover:brightness-110"
          >
            Find Deals Near Me
          </Link>
        </div>
      </section>
    </>
  );
}
