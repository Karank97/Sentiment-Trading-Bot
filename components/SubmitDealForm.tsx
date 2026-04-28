'use client';

import { FormEvent, useState } from 'react';
import { FORBIDDEN_FIELDS } from '@/lib/dealValidation';

type Status = { kind: 'idle' | 'success' | 'error' | 'loading'; message?: string };

const initial = {
  dispensaryName: '',
  city: '',
  county: 'Middlesex',
  state: 'NJ',
  address: '',
  title: '',
  category: '',
  discount: '',
  expirationDate: '',
  sourceUrl: '',
  submitterEmail: '',
};

const categoryOptions = ['Flower', 'Edibles', 'Vapes', 'Concentrates', 'Pre-Rolls', 'Accessories'];

export default function SubmitDealForm() {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ kind: 'loading' });

    const extraForbidden = FORBIDDEN_FIELDS.some((field) => field in data);
    if (extraForbidden) {
      setStatus({ kind: 'error', message: 'Forbidden transactional fields were detected.' });
      return;
    }

    try {
      const response = await fetch('/api/submit-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, discount: Number(data.discount) }),
      });

      const body = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setStatus({ kind: 'error', message: body.error ?? 'Submission failed.' });
        return;
      }

      setStatus({ kind: 'success', message: body.message ?? 'Submitted for review' });
      setData(initial);
    } catch {
      setStatus({ kind: 'error', message: 'Network error while submitting deal.' });
    }
  };

  return (
    <div className="panel p-5 sm:p-6">
      <form onSubmit={onSubmit} className="grid gap-3">
        <input required type="text" placeholder="Dispensary name" value={data.dispensaryName} onChange={(e) => setData((prev) => ({ ...prev, dispensaryName: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <input required type="text" placeholder="City" value={data.city} onChange={(e) => setData((prev) => ({ ...prev, city: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <input required type="text" placeholder="Address" value={data.address} onChange={(e) => setData((prev) => ({ ...prev, address: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <input required type="text" placeholder="Deal title" value={data.title} onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <select required value={data.category} onChange={(e) => setData((prev) => ({ ...prev, category: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm">
          <option value="">Product category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input required min={1} max={100} type="number" placeholder="Discount %" value={data.discount} onChange={(e) => setData((prev) => ({ ...prev, discount: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <input required type="date" value={data.expirationDate} onChange={(e) => setData((prev) => ({ ...prev, expirationDate: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm" />
        <input required type="url" placeholder="Source URL" value={data.sourceUrl} onChange={(e) => setData((prev) => ({ ...prev, sourceUrl: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />
        <input required type="email" placeholder="Submitter email" value={data.submitterEmail} onChange={(e) => setData((prev) => ({ ...prev, submitterEmail: e.target.value }))} className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm placeholder:text-nashbud-muted" />

        <button disabled={status.kind === 'loading'} className="rounded-xl bg-nashbud-accent px-4 py-2 font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
          {status.kind === 'loading' ? 'Submitting...' : 'Submit Deal'}
        </button>
      </form>
      {status.kind === 'success' && <p className="mt-3 text-sm text-green-300">{status.message}</p>}
      {status.kind === 'error' && <p className="mt-3 text-sm text-red-300">{status.message}</p>}
    </div>
  );
}
