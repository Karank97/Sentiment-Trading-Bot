'use client';

import AdminDealTable from '@/components/AdminDealTable';
import { SubmittedDeal } from '@/types/deal';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [deals, setDeals] = useState<SubmittedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/deals?scope=submissions&status=pending');
      const body = (await response.json()) as { data?: SubmittedDeal[]; error?: string };
      if (!response.ok) throw new Error(body.error ?? 'Failed to load pending deals.');
      setDeals(body.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDeals();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setBusyId(id);
    try {
      const response = await fetch(`/api/admin/deals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? 'Failed to update status.');
      await loadDeals();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setBusyId(undefined);
    }
  };

  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Admin Review</h1>
      <p className="mb-4 text-sm text-nashbud-muted">
        Review pending submissions and approve or reject before public listing.
      </p>

      {loading ? (
        <p className="panel p-4 text-sm text-nashbud-muted">Loading pending submissions...</p>
      ) : (
        <AdminDealTable deals={deals} onAction={updateStatus} busyId={busyId} />
      )}

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </section>
  );
}
