import { SubmittedDeal } from '@/types/deal';

type Props = {
  deals: SubmittedDeal[];
  busyId?: string;
  onAction: (id: string, status: 'approved' | 'rejected') => void;
};

export default function AdminDealTable({ deals, onAction, busyId }: Props) {
  return (
    <div className="panel overflow-x-auto p-4">
      <table className="min-w-full text-left text-sm">
        <thead className="text-nashbud-muted">
          <tr>
            <th className="pb-2">Dispensary</th>
            <th className="pb-2">City</th>
            <th className="pb-2">Deal</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-t border-white/10 align-top">
              <td className="py-2">{deal.dispensaryName}</td>
              <td className="py-2">{deal.city}</td>
              <td className="py-2">
                <p>{deal.title}</p>
                <p className="text-xs text-nashbud-muted">-{deal.discount}% • expires {deal.expirationDate}</p>
              </td>
              <td className="py-2">
                <span className="rounded-full bg-yellow-400/10 px-2 py-1 text-xs text-yellow-300">
                  {deal.status}
                </span>
              </td>
              <td className="py-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={busyId === deal.id}
                    onClick={() => onAction(deal.id, 'approved')}
                    className="rounded-lg bg-green-500/20 px-2 py-1 text-green-300 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={busyId === deal.id}
                    onClick={() => onAction(deal.id, 'rejected')}
                    className="rounded-lg bg-red-500/20 px-2 py-1 text-red-300 disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button className="rounded-lg bg-white/10 px-2 py-1 text-white">Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
