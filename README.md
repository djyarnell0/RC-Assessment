# Take-Home Assessment: Rough Country Next.js Part Finder

**Role:** Senior Next.js Developer
**Expected Time:** 2–4 hours for core requirements
**Bonus Depth:** Optional, if you want to demonstrate additional senior-level judgment

## Overview

At Rough Country, performance, SEO, and fitment accuracy are critical. We need fast, crawlable product discovery experiences that help customers find parts for their specific vehicle.

Your task is to build a simplified **Year / Make / Model** part finder using the **Next.js App Router** and **TypeScript**.

We are not looking for pixel-perfect CSS. We are looking for clean architecture, strong rendering decisions, resilient data handling, and clear reasoning.

---

## Setup

1. Scaffold a new app with **Next.js (App Router)** and **TypeScript** (`create-next-app` is fine).
2. Copy `mockApi.ts` from this repo into your project (or import it as-is).
3. Build the part finder described below.

TypeScript is required. Do not submit a JavaScript-only app.

---

## The Challenge

Build a product listing page with three dependent dropdowns:

1. Year
2. Make
3. Model

Rules:

* Make cannot be selected until Year is chosen.
* Model cannot be selected until Make is chosen.
* Changing Year should clear Make and Model.
* Changing Make should clear Model.
* Once Year, Make, and Model are selected, matching mock products should display.

Example URL:

```txt
/part-finder?year=2021&make=ford&model=bronco
```

## Core Requirements

### 1. URL as the Source of Truth

Filter state must live in the URL search parameters.

A user should be able to:

* Refresh the page and preserve the selected filters.
* Share the URL and load the same filtered state.
* Navigate quickly between selections without the UI becoming stale or incorrect.

Use stable, readable URL values such as:

```txt
?year=2021&make=ford&model=grand-cherokee
```

Display labels may differ from URL values.

### 2. Server and Client Boundaries

Use the Next.js App Router thoughtfully.

We want to see that you understand where React Server Components and Client Components belong.

Expected behavior:

* Initial product results should be server-rendered when a valid full selection exists.
* Dropdowns should feel responsive on the client.
* Avoid making the entire page a Client Component unless you can clearly justify that decision.

### 3. Loading and Error States

The provided mock API includes artificial latency and optional random failures.

Your UI should gracefully handle:

* Loading states.
* Empty product results.
* Invalid URL combinations.
* API errors.

Use Suspense and/or route-level error handling where appropriate.

### 4. Caching Strategy

Vehicle filter data changes rarely. Product inventory may change more often.

Implement or clearly explain a caching strategy for:

* Year / Make / Model data.
* Product results.

Because this mock API is a local async utility rather than a real HTTP fetch, it is acceptable to explain how your strategy would map to real production data fetching.

### 5. Race Condition Safety

The UI should remain correct during rapid filter changes.

You may solve this through URL-driven navigation, request cancellation, keyed rendering, transition state, local derivation of dropdown options, or another appropriate approach.

Explain your decision in the README.

## Bonus Items

These are not required, but they may help demonstrate senior-level depth:

* Fine-grained Suspense boundaries.
* `error.tsx` boundaries with retry behavior.
* Metadata, canonical URL, or SEO strategy explanation.
* Accessibility improvements.
* Basic tests.
* Optimistic or pending UI with `useTransition`.
* Route normalization or redirects for invalid/stale params.
* A short Loom walkthrough.

## Mock API

Use `mockApi.ts` from this repository.

It exports:

* `fetchFilterData()` — Year / Make / Model options
* `fetchProducts({ year, make, model })` — matching products

Optional env tunables:

* `MOCK_API_FAILURE_RATE` (default `0.15`)
* `MOCK_API_MIN_LATENCY_MS` (default `500`)
* `MOCK_API_MAX_LATENCY_MS` (default `3000`)

You may adapt the file slightly if needed, but keep the async behavior, failure simulation, and TypeScript types.

## Deliverables

Please provide:

1. A link to a public GitHub repository.
2. A `README.md` explaining:

   * Your App Router structure.
   * What is server-rendered vs client-rendered.
   * How URL state is handled.
   * How loading and error states are handled.
   * Your caching strategy.
   * How your solution avoids stale UI or race conditions.
   * Any tradeoffs you made due to time.
3. Optional: a 3–5 minute Loom video walking through your architecture.

## What We Are Looking For

### Architecture

* Next.js App Router + TypeScript throughout.
* Clean App Router structure.
* Appropriate Server Component and Client Component boundaries.
* Clear separation between data access, validation, UI, and URL state.
* Sensible typing for filters, products, and component props.

### Performance

* Server-rendered product results when possible.
* Minimal unnecessary client-side rendering.
* Responsive filter interactions.
* Thoughtful caching decisions.

### Resilience

* Graceful loading states.
* Graceful error handling.
* Correct behavior during rapid filter changes.
* Safe handling of invalid or incomplete URL params.

### Senior-Level Judgment

We are not looking for the most complex solution.

We are looking for someone who can make practical technical decisions, explain tradeoffs clearly, and build something that resembles how they would approach production code.
