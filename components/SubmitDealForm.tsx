'use client';

import { FormEvent, useState } from 'react';

const initial = {
  dispensaryName: '',
  city: '',
  address: '',
  title: '',
  category: '',
  discount: '',
  expirationDate: '',
  sourceUrl: '',
  submitterEmail: '',
};

export default function SubmitDealForm() {
  const [data, setData] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setData(initial);
  };

  return (
    <div className="panel p-5 sm:p-6">
      <form onSubmit={onSubmit} className="grid gap-3">
        {Object.entries(initial).map(([key]) => (
          <input
            key={key}
            required
            type={key.includes('email') ? 'email' : key.includes('Date') ? 'date' : 'text'}
            placeholder={key.replace(/([A-Z])/g, ' $1')}
            value={data[key as keyof typeof data]}
            onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value }))}
            className="rounded-xl border border-white/20 bg-black/20 p-3 text-sm capitalize placeholder:text-nashbud-muted"
          />
        ))}
        <button className="rounded-xl bg-nashbud-accent px-4 py-2 font-semibold text-black transition hover:brightness-110">
          Submit Deal
        </button>
      </form>
      {submitted && <p className="mt-3 text-sm text-green-300">Submitted for review</p>}
    </div>
  );
}
