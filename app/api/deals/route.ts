import { NextRequest, NextResponse } from 'next/server';
import { mockDeals } from '@/data/mockDeals';
import { mockSubmittedDeals } from '@/data/mockSubmittedDeals';
import { getSupabaseClient, hasSupabaseEnv } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  const scope = request.nextUrl.searchParams.get('scope');
  const status = request.nextUrl.searchParams.get('status');

  if (scope === 'submissions') {
    if (!hasSupabaseEnv()) {
      const rows = status
        ? mockSubmittedDeals.filter((deal) => deal.status === status)
        : mockSubmittedDeals;
      return NextResponse.json({ data: rows, source: 'mock' });
    }

    const supabase = getSupabaseClient(true);
    if (!supabase) return NextResponse.json({ data: mockSubmittedDeals, source: 'mock' });

    let query = supabase
      .from('submitted_deals')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const normalized = (data ?? []).map((row) => ({
      id: row.id,
      dispensaryName: row.dispensary_name,
      city: row.city,
      county: row.county,
      state: row.state,
      address: row.address,
      title: row.title,
      category: row.category,
      discount: row.discount,
      expirationDate: row.expiration_date,
      sourceUrl: row.source_url,
      submitterEmail: row.submitter_email,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json({ data: normalized, source: 'supabase' });
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.json({ data: mockDeals, source: 'mock' });
  }

  const supabase = getSupabaseClient(true);
  if (!supabase) return NextResponse.json({ data: mockDeals, source: 'mock' });

  const { data, error } = await supabase
    .from('deals')
    .select('id, title, category, discount, expiration_date, source_url, status, dispensaries(name, city, county, state)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const normalized = (data ?? []).map((row: any) => ({
    id: String(row.id),
    dispensaryName: row.dispensaries?.name ?? 'Unknown Dispensary',
    dispensarySlug: String(row.dispensaries?.name ?? 'unknown')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    city: row.dispensaries?.city ?? 'Unknown',
    county: row.dispensaries?.county ?? 'Middlesex',
    state: row.dispensaries?.state ?? 'NJ',
    distance: '—',
    title: row.title,
    category: row.category,
    discount: row.discount,
    expirationDate: row.expiration_date,
    sourceUrl: row.source_url,
    status: row.status,
  }));

  return NextResponse.json({ data: normalized, source: 'supabase' });
}
