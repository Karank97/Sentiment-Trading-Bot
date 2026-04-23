import { Deal } from '@/types/deal';

export default function AdminDealTable({ deals }: { deals: Deal[] }) {
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
            <tr key={deal.id} className="border-t border-white/10">
              <td className="py-2">{deal.dispensaryName}</td>
              <td className="py-2">{deal.city}</td>
              <td className="py-2">{deal.title}</td>
              <td className="py-2">
                <span className="rounded-full bg-yellow-400/10 px-2 py-1 text-xs text-yellow-300">
                  {deal.status}
                </span>
              </td>
              <td className="py-2">
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg bg-green-500/20 px-2 py-1 text-green-300">Approve</button>
                  <button className="rounded-lg bg-red-500/20 px-2 py-1 text-red-300">Reject</button>
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
