'use client';

import { useEffect, useState } from 'react';

const KEY = 'nashbud_age_confirmed';

export default function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isConfirmed = window.localStorage.getItem(KEY) === 'yes';
    if (!isConfirmed) {
      setOpen(true);
    }
  }, []);

  const confirm = () => {
    window.localStorage.setItem(KEY, 'yes');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="panel w-full max-w-md p-6 shadow-glow">
        <h2 className="text-xl font-semibold">Age Verification Required</h2>
        <p className="mt-3 text-sm text-nashbud-muted">
          NashBud is for adults 21+. Confirm your age to view dispensary deal listings in Middlesex
          County, New Jersey.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={confirm}
            className="rounded-xl bg-nashbud-accent px-4 py-2 font-semibold text-black transition hover:brightness-110"
          >
            I am 21+
          </button>
          <a
            href="https://www.google.com"
            className="rounded-xl border border-white/20 px-4 py-2 text-center text-sm text-nashbud-muted transition hover:text-white"
          >
            Exit
          </a>
        </div>
      </div>
    </div>
  );
}
