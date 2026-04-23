import { Deal } from '@/types/deal';

export default function DealCard({ deal }: { deal: Deal }) {
  const isVerified = deal.status === 'verified';

  return (
    <article className="panel p-5 shadow-glow">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-lg font-semibold">{deal.dispensaryName}</p>
          <p className="text-sm text-nashbud-muted">{deal.city}, NJ • {deal.distance}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isVerified
              ? 'bg-green-500/20 text-green-300'
              : 'border border-yellow-400/40 bg-yellow-400/10 text-yellow-300'
          }`}
        >
          {isVerified ? 'Verified' : 'Pending'}
        </span>
      </div>

      <h3 className="text-base font-semibold">{deal.title}</h3>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="tag">{deal.category}</span>
        <span className="tag">-{deal.discount}%</span>
        <span className="tag">Expires {deal.expirationDate}</span>
      </div>
      <a
        href={deal.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm font-medium text-green-300 hover:text-green-200"
      >
        View source
      </a>
    </article>
  );
}
