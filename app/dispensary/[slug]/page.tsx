import AgeGate from '@/components/AgeGate';
import DealCard from '@/components/DealCard';
import { mockDeals } from '@/data/mockDeals';

export default function DispensaryProfile({ params }: { params: { slug: string } }) {
  const deals = mockDeals.filter((deal) => deal.dispensarySlug === params.slug);

  if (deals.length === 0) {
    return <p className="text-nashbud-muted">Dispensary profile not found.</p>;
  }

  const dispensary = deals[0];

  return (
    <>
      <AgeGate />
      <section className="space-y-5">
        <div className="panel p-6">
          <h1 className="text-2xl font-bold">{dispensary.dispensaryName}</h1>
          <p className="mt-2 text-sm text-nashbud-muted">Address: 123 Demo Street, {dispensary.city}, NJ</p>
          <p className="text-sm text-nashbud-muted">Hours: Mon-Sat 9:00 AM - 9:00 PM (placeholder)</p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Active Deals</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>

        <p className="text-xs text-nashbud-muted">
          Compliance: Listing information is for discovery only. No checkout, ordering, payment, or
          delivery is provided through NashBud.
        </p>
      </section>
    </>
  );
}
