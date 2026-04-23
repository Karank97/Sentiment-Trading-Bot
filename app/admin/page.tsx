import AdminDealTable from '@/components/AdminDealTable';
import { mockDeals } from '@/data/mockDeals';

export default function AdminPage() {
  const pending = mockDeals.filter((deal) => deal.status === 'pending');

  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Admin Review</h1>
      <p className="mb-4 text-sm text-nashbud-muted">Mock moderation queue for submitted deals.</p>
      <AdminDealTable deals={pending} />
    </section>
  );
}
