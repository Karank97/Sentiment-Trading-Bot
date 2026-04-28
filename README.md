# NashBud MVP

NashBud is a polished MVP web app for adults to discover verified dispensary deals in **Middlesex County, New Jersey**.

> NashBud is a deal-discovery platform only. It does **not** support checkout, ordering, payments, delivery, or medical advice.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase-ready API/data layer with local mock fallback

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Supabase Setup (Backend-Ready)

1. Create a Supabase project.
2. Run SQL in `supabase/schema.sql` in the Supabase SQL editor.
3. Configure environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

### Required env vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (used by server API routes)

If these variables are missing, the app still runs using local fallback datasets (`mockDeals` and `mockSubmittedDeals`).

## API Routes

- `GET /api/deals`
  - Returns published deals.
  - Uses Supabase when configured; otherwise returns mock deals.
- `GET /api/deals?scope=submissions&status=pending`
  - Returns submitted deal queue for admin view.
- `POST /api/submit-deal`
  - Validates payload server-side and stores pending submissions.
- `PATCH /api/admin/deals/[id]`
  - Updates review status (`approved` / `rejected` / `pending`).

## MVP Pages

- `/` Home page with 21+ age gate, location search, and CTA
- `/deals` Deals listing with filters and verified/pending status
- `/dispensary/[slug]` Dispensary profile with active deals and compliance note
- `/submit` Deal submission form using API route + client-side validation
- `/admin` Admin review queue powered by API data and approve/reject actions

## What is still mock/demo

- Deal source links and distances are placeholders.
- Admin auth/roles are not yet enforced (UI and API structure exists but no auth integration yet).
- Submission moderation history/audit trail is not yet implemented.
- Supabase data sync is optional until env vars are configured.

## Compliance

Footer disclaimer (shown globally):

> NashBud is an informational deal-discovery platform. We do not sell cannabis, process orders, facilitate delivery, or provide medical advice. Users are responsible for following all New Jersey laws.

## MVP Roadmap

1. Supabase auth for admin reviewers and secure row-level policies.
2. Verification workflow with source snapshot metadata.
3. Geolocation search and real distance calculation.
4. Notification/watchlist workflows for expiring deals.
5. Analytics dashboard for dispensary partners.
