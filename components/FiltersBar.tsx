'use client';

export type FilterKey = 'city' | 'category' | 'discount' | 'expiringSoon' | 'verifiedOnly';

type Props = {
  cities: string[];
  categories: string[];
  city: string;
  category: string;
  discount: string;
  expiringSoon: boolean;
  verifiedOnly: boolean;
  onChange: (key: FilterKey, value: string | boolean) => void;
};

export default function FiltersBar(props: Props) {
  const { cities, categories, city, category, discount, expiringSoon, verifiedOnly, onChange } = props;

  return (
    <section className="panel mb-5 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
      <select
        value={city}
        onChange={(e) => onChange('city', e.target.value)}
        className="rounded-xl border border-white/20 bg-black/20 p-2 text-sm"
      >
        <option value="">All cities</option>
        {cities.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={category}
        onChange={(e) => onChange('category', e.target.value)}
        className="rounded-xl border border-white/20 bg-black/20 p-2 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={discount}
        onChange={(e) => onChange('discount', e.target.value)}
        className="rounded-xl border border-white/20 bg-black/20 p-2 text-sm"
      >
        <option value="0">Any discount</option>
        <option value="10">10%+</option>
        <option value="20">20%+</option>
        <option value="30">30%+</option>
      </select>
      <label className="flex items-center gap-2 rounded-xl border border-white/20 p-2 text-sm">
        <input
          type="checkbox"
          checked={expiringSoon}
          onChange={(e) => onChange('expiringSoon', e.target.checked)}
        />
        Expiring soon
      </label>
      <label className="flex items-center gap-2 rounded-xl border border-white/20 p-2 text-sm">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => onChange('verifiedOnly', e.target.checked)}
        />
        Verified only
      </label>
    </section>
  );
}
