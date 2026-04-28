import { NextResponse } from 'next/server';
import { mockSubmittedDeals } from '@/data/mockSubmittedDeals';
import { normalizeSubmittedDeal, SubmitDealInput, validateSubmitDealPayload } from '@/lib/dealValidation';
import { getSupabaseClient, hasSupabaseEnv } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const payload = (await request.json()) as SubmitDealInput;
  const validation = validateSubmitDealPayload(payload);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const normalized = normalizeSubmittedDeal(payload);

  if (!hasSupabaseEnv()) {
    const localRow = {
      ...normalized,
      id: `mock-${Date.now()}`,
    };
    mockSubmittedDeals.unshift(localRow);

    return NextResponse.json({ message: 'Submitted for review', data: localRow, source: 'mock' });
  }

  const supabase = getSupabaseClient(true);

  if (!supabase) {
    return NextResponse.json(
      {
        message: 'Submitted for review',
        data: { ...normalized, id: `mock-${Date.now()}` },
        source: 'mock',
      },
      { status: 202 },
    );
  }

  const { data, error } = await supabase
    .from('submitted_deals')
    .insert({
      dispensary_name: normalized.dispensaryName,
      city: normalized.city,
      county: normalized.county,
      state: normalized.state,
      address: normalized.address,
      title: normalized.title,
      category: normalized.category,
      discount: normalized.discount,
      expiration_date: normalized.expirationDate,
      source_url: normalized.sourceUrl,
      submitter_email: normalized.submitterEmail,
      status: 'pending',
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Submitted for review', data, source: 'supabase' });
}
