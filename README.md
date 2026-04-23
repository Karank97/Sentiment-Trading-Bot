# NashBud MVP

NashBud is a polished MVP web app for adults to discover verified dispensary deals in **Middlesex County, New Jersey**.

> NashBud is a deal-discovery platform only. It does **not** support checkout, ordering, payments, or delivery.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase-ready project structure (currently local mock data)

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

## MVP Pages

- `/` Home page with 21+ age gate, location search, and CTA
- `/deals` Deals listing with filters and verified/pending status
- `/dispensary/[slug]` Dispensary profile with active deals and compliance note
- `/submit` Deal submission form with required-field validation and “Submitted for review” state
- `/admin` Mock admin review queue with approve/reject/edit buttons and status badges

## Core Components

- `components/AgeGate.tsx`
- `components/DealCard.tsx`
- `components/FiltersBar.tsx`
- `components/FooterDisclaimer.tsx`
- `components/SubmitDealForm.tsx`
- `components/AdminDealTable.tsx`

## Data + Validation

- Mock dataset: `data/mockDeals.ts` (10 demo deals in Middlesex County, NJ only)
- Validation utility: `lib/validateDeal.ts`
  - Validates required deal fields
  - Enforces `state = NJ` and `county = Middlesex`
  - Logs developer warnings when invalid entries are detected

## Compliance

Footer disclaimer (shown globally):

> NashBud is an informational deal-discovery platform. We do not sell cannabis, process orders, facilitate delivery, or provide medical advice. Users are responsible for following all New Jersey laws.

## MVP Roadmap

1. Supabase integration for submitted deals and admin moderation state.
2. Auth for admin reviewers and dispensary submitters.
3. Verification pipeline with source snapshotting and audit trail.
4. Geolocation search and distance calculations.
5. Alerts/watchlists for expiring deals.
6. Analytics dashboard for partner dispensaries.
