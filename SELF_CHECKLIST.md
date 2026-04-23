# NashBud MVP Self-Checklist

- [x] All mock deals are in Middlesex County, NJ (`city` mapped to Middlesex County municipalities, `county = Middlesex`, `state = NJ`).
- [x] Every mock deal has an expiration date.
- [x] Every mock deal has a source URL placeholder.
- [x] Every page includes the compliance footer disclaimer via shared app layout.
- [x] 21+ age gate appears before browsing deals (Home + Deals + Dispensary pages).
- [x] No checkout/cart/payment/delivery functionality exists in the MVP.
- [x] Deal cards display verified/pending status badges.
- [x] Submit form validates required fields.
- [x] Mobile-first responsive layout is implemented with Tailwind grid and utility breakpoints.
- [x] No medical claims are made.

## Validation Notes

- `lib/validateDeal.ts` validates required fields and location guards (`NJ`, `Middlesex`).
- Mock deals are passed through `filterValidDeals()` before rendering.
- Invalid records log a developer warning to the console.
