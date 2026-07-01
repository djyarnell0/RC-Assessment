# Take-Home Assessment: Rough Country Next.js Part Finder

**Role:** Junior Next.js Developer
**Expected Time:** 2–3 hours
**Bonus work:** Optional; only attempt if time allows

## Overview

At Rough Country, customers often shop for products based on their vehicle. A common pattern on our site is a Year / Make / Model selector that helps customers find products that fit their truck, Jeep, or SUV.

Your task is to build a simple vehicle-based product finder using Next.js.

We are not looking for pixel-perfect styling. We care more about correctness, clean React code, good user experience, and your ability to explain your work.

---

## The Challenge

Build a product listing page with three dependent dropdowns:

1. Year
2. Make
3. Model

Rules:

* Make should be disabled until Year is selected.
* Model should be disabled until Make is selected.
* Changing Year should clear Make and Model.
* Changing Make should clear Model.
* Once Year, Make, and Model are selected, show matching products.
* If no matching products exist, show a helpful empty state.

Example URL:

```txt id="8jqb1f"
/part-finder?year=2021&make=ford&model=bronco
```

The selected filters should be reflected in the URL so the page can be refreshed or shared.

---

## Core Requirements

### 1. Build the Filter UI

Create a page with:

* A Year dropdown.
* A Make dropdown.
* A Model dropdown.
* A product grid or product list.

The dropdowns should update based on the user’s previous selections.

For example:

* A user selects `2021`.
* The Make dropdown becomes available.
* The user selects `Ford`.
* The Model dropdown becomes available.
* The user selects `Bronco`.
* Matching products appear.

---

### 2. Use the URL for Selected Filters

The selected vehicle should appear in the URL search parameters.

For example:

```txt id="3v6nj7"
?year=2021&make=ford&model=bronco
```

Expected behavior:

* Refreshing the page should keep the selected filters.
* Sharing the URL should load the same selected filters.
* Changing a dropdown should update the URL.

You may use Next.js routing tools such as `useRouter`, `usePathname`, and `useSearchParams`.

---

### 3. Handle Loading, Errors, and Empty Results

The mock API includes artificial delay and may throw an error.

Your UI should handle:

* Loading state while data is being fetched.
* Error state if the API fails.
* Empty state if no products match.
* Disabled dropdowns when selections are incomplete.

The error UI does not need to be fancy. A simple friendly message is fine.

---

### 4. Write Clean, Understandable Code

We are looking for code that is easy to read and reason about.

Please try to:

* Break the UI into reasonable components.
* Avoid putting everything into one giant file.
* Use TypeScript types where helpful.
* Use clear variable and function names.
* Keep styling simple.

---

## Deliverables

Please submit:

1. A public GitHub repository.
2. A `README.md` with:

   * Setup instructions.
   * A brief explanation of how your filter state works.
   * A brief explanation of how you handle loading, errors, and empty results.
   * Any tradeoffs or unfinished items.

A Loom video is not required for this junior assessment.

---

## Bonus Items

These are not required. They are only here if you finish early and want to show extra depth.

* Use slugs in the URL, such as `ford` instead of `Ford`.
* Add basic tests for filter behavior.
* Add simple responsive styling.
* Add a retry button when the API fails.
* Use React Suspense or Next.js loading/error files.
* Server-render the initial selected product results.
* Add basic page metadata for SEO.
* Validate invalid URL combinations and reset them gracefully.

---

## Mock API

Use the following mock API as your data source.

You may reorganize it if needed, but do not remove the artificial delay completely.

```ts id="tae9ji"
// mockApi.ts

export interface VehicleFilterData {
  years: number[];
  makes: Record<number, string[]>; // Year -> Makes
  models: Record<number, Record<string, string[]>>; // Year -> Make -> Models
}

const VEHICLE_DATA: VehicleFilterData = {
  years: [2021, 2022, 2023],
  makes: {
    2021: ["Ford", "Jeep", "Chevrolet"],
    2022: ["Ford", "Jeep", "Toyota"],
    2023: ["Ford", "Toyota", "Ram"],
  },
  models: {
    2021: {
      Ford: ["Bronco", "Ranger"],
      Jeep: ["Wrangler", "Grand Cherokee"],
      Chevrolet: ["Silverado", "Colorado", "Tahoe"],
    },
    2022: {
      Ford: ["F-150", "Ranger"],
      Jeep: ["Wrangler", "Gladiator"],
      Toyota: ["Tacoma", "4Runner"],
    },
    2023: {
      Ford: ["Bronco", "F-150"],
      Toyota: ["Tacoma", "Tundra", "4Runner"],
      Ram: ["1500", "2500"],
    },
  },
};

export interface Product {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  price: number;
  inStock: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "6-Inch Suspension Lift Kit",
    year: 2021,
    make: "Ford",
    model: "Bronco",
    price: 1299.95,
    inStock: true,
  },
  {
    id: "2",
    name: "Heavy Duty Front Bumper",
    year: 2021,
    make: "Ford",
    model: "Bronco",
    price: 749.99,
    inStock: true,
  },
  {
    id: "3",
    name: "Premium N3 Loaded Struts",
    year: 2022,
    make: "Ford",
    model: "F-150",
    price: 349.95,
    inStock: false,
  },
  {
    id: "4",
    name: "Dual Row LED Light Bar",
    year: 2021,
    make: "Jeep",
    model: "Wrangler",
    price: 189.99,
    inStock: true,
  },
  {
    id: "5",
    name: "Tubular Rock Sliders",
    year: 2022,
    make: "Jeep",
    model: "Wrangler",
    price: 429.95,
    inStock: true,
  },
  {
    id: "6",
    name: "Vertex Coilovers Pair",
    year: 2023,
    make: "Toyota",
    model: "Tundra",
    price: 1599.99,
    inStock: true,
  },
];

const MIN_LATENCY_MS = Number(process.env.MOCK_API_MIN_LATENCY_MS ?? 300);
const MAX_LATENCY_MS = Number(process.env.MOCK_API_MAX_LATENCY_MS ?? 1200);
const FAILURE_RATE = Number(process.env.MOCK_API_FAILURE_RATE ?? 0.1);

async function simulateNetwork() {
  const delay =
    Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS + 1)) +
    MIN_LATENCY_MS;

  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < FAILURE_RATE) {
    throw new Error("Something went wrong while loading data.");
  }
}

export async function fetchFilterData(): Promise<VehicleFilterData> {
  await simulateNetwork();
  return VEHICLE_DATA;
}

export async function fetchProducts(
  year: number,
  make: string,
  model: string
): Promise<Product[]> {
  await simulateNetwork();

  return MOCK_PRODUCTS.filter(
    (product) =>
      product.year === year &&
      product.make.toLowerCase() === make.toLowerCase() &&
      product.model.toLowerCase() === model.toLowerCase()
  );
}
```

---

## What We Will Be Looking For

### Correctness

* Dropdowns enable and disable correctly.
* Dependent selections reset correctly.
* Matching products display correctly.
* Empty and error states are handled.

### React Fundamentals

* Clear component structure.
* Sensible state management.
* Proper use of props and TypeScript types.
* Avoids unnecessary complexity.

### Next.js Basics

* Uses the App Router.
* Updates and reads URL search parameters.
* Preserves selected filters on refresh.

### User Experience

* Clear loading state.
* Clear error message.
* Clear empty state.
* Interface is usable even if styling is minimal.

### Communication

* README is clear.
* Setup steps work.
* Tradeoffs are explained honestly.
