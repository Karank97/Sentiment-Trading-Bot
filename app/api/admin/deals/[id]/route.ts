import { NextResponse } from 'next/server';
import { mockSubmittedDeals } from '@/data/mockSubmittedDeals';
import { getSupabaseClient, hasSupabaseEnv } from '@/lib/supabaseClient';

const allowed = new Set(['approved', 'rejected', 'pending']);

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = (await request.json()) as { status?: string };

  if (!body.status || !allowed.has(body.status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  }

  if (!hasSupabaseEnv()) {
    const target = mockSubmittedDeals.find((row) => row.id === params.id);
    if (!target) {
      return NextResponse.json({ error: 'Deal not found.' }, { status: 404 });
    }

    target.status = body.status as 'approved' | 'rejected' | 'pending';
    target.updatedAt = new Date().toISOString();
    return NextResponse.json({ message: 'Status updated', data: target, source: 'mock' });
  }

  const supabase = getSupabaseClient(true);
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase unavailable.' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('submitted_deals')
    .update({ status: body.status })
    .eq('id', params.id)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Status updated', data, source: 'supabase' });
}
