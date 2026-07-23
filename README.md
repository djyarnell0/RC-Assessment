# Take-Home Assessment: Rough Country Part Finder

**Role:** Junior / Mid-level Frontend Developer (React / Next.js)
**Expected Time:** 2–3 hours

## Overview

At Rough Country, customers find parts by selecting their vehicle. This exercise is a simplified version of that experience.

We want to see how you structure React (or Next.js) code, manage dependent UI state, and filter data cleanly.

We are not looking for pixel-perfect design or production architecture. A complete, readable solution beats an unfinished complex one.

---

## Setup

1. Scaffold a new app with **Next.js (App Router)** or **Vite + React**. Either is fine.
2. Copy `mockData.ts` from this repo into your project (or import it as-is).
3. Build the part finder UI described below.

Use TypeScript if you are comfortable with it. Plain JavaScript is acceptable.

---

## The Challenge

Build a product listing page with three **dependent** dropdowns:

1. **Year**
2. **Make**
3. **Model**

### Filter rules

- Make is disabled until a Year is selected.
- Model is disabled until a Make is selected.
- Changing Year clears Make and Model.
- Changing Make clears Model.
- When Year, Make, and Model are all selected, show matching products.
- When filters are incomplete, show either all products or a prompt to finish selecting — pick one approach and keep it consistent.

### Product list

Each product should display:

- Name
- Year / Make / Model
- Price
- In-stock status

### Empty state

If a full selection has no matching products, show a clear message (for example: “No products found for this vehicle.”).

### Reset

Include a control that clears all filters.

---

## Core Requirements Checklist

- [ ] Dependent Year → Make → Model dropdowns with the clearing rules above
- [ ] Dropdown options come from `VEHICLE_OPTIONS` in `mockData.ts` (not hardcoded lists)
- [ ] Products filter correctly using `MOCK_PRODUCTS`
- [ ] Empty state when a full selection has no matches
- [ ] Reset clears all filters
- [ ] Code is readable and reasonably organized (components are encouraged when they help)

---

## What You Do *Not* Need

Skip these unless you want them as bonuses. They are covered in our senior assessment:

- URL / search-param state
- React Server Components architecture writeups
- Caching strategies
- Race-condition handling
- Suspense / `error.tsx` / simulated API failures

Client-side state (`useState` / similar) is the expected approach.

---

## Bonus Tasks

Only after the core requirements work.

1. **URL state** — Put selected Year / Make / Model in the URL so refresh preserves filters.
2. **Derive options from products** — Instead of (or in addition to) `VEHICLE_OPTIONS`, build Make/Model choices from `MOCK_PRODUCTS` for the selected Year.
3. **Styling & accessibility** — Clean layout, keyboard-friendly controls, labels on selects.
4. **Loading affordance** — If you introduce async data fetching, show a simple loading state.

---

## Deliverables

1. A link to a public GitHub repository (or a zip if that is easier).
2. A short `README` covering:
   - How to install and run the project
   - What you completed (core + any bonuses)
   - What you would improve with more time

---

## What We Will Be Looking For

### React / UI

- Dependent dropdown behavior implemented correctly
- UI updates when filters change
- Clear empty and incomplete-filter states

### JavaScript

- Filtering arrays of objects cleanly
- Avoiding stale or inconsistent filter combinations
- Sensible use of derived values (e.g. available makes for a year)

### Code quality

- Readable names and structure
- Components split where it helps, not where it adds noise
- No unnecessary complexity

### Communication

- Can you explain what you built and what you would do next?

---

## Tips

- Start with the filter state and clearing rules, then wire up the product list.
- Prefer deriving filtered products from state rather than storing a second “results” list you have to keep in sync.
- If you get stuck on scaffolding, a single-page React app is enough — we care more about the filtering logic than the framework choice.
