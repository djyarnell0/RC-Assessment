# Take-Home Assessment: Rough Country Vehicle Product Finder

**Role:** Junior Frontend / Junior Next.js Developer
**Expected Time:** 2–3 hours

## Overview

At Rough Country, customers need to find parts that fit their vehicle. A common shopping experience is selecting a Year, Make, and Model, then seeing matching products.

Your task is to build a simple vehicle product finder.

We are not looking for a perfect production system. We are looking for clean React code, good fundamentals, and clear thinking.

---

## The Challenge

Build a page that lets a user select:

1. Year
2. Make
3. Model

After the user selects all three, show a list of matching products.

---

## Core Requirements

### 1. Build Dependent Dropdowns

Create three dropdowns:

* Year
* Make
* Model

Behavior:

* The Make dropdown should be disabled until a Year is selected.
* The Model dropdown should be disabled until a Make is selected.
* When the Year changes, clear the selected Make and Model.
* When the Make changes, clear the selected Model.
* Only show Makes that are valid for the selected Year.
* Only show Models that are valid for the selected Year and Make.

Example:

If the user selects:

```txt id="v6x2nn"
2021 → Ford → Bronco
```

Then the page should show products matching a 2021 Ford Bronco.

---

### 2. Display Matching Products

Once Year, Make, and Model are selected, show matching products.

Each product should show:

* Name
* Price
* Whether it is in stock

If no products match, show a friendly message such as:

```txt id="ejtlts"
No products found for this vehicle.
```

Before all three selections are made, show a message such as:

```txt id="6ii0la"
Select your vehicle to see matching products.
```

---

### 3. Use Local React State

For the core assignment, it is okay to use React state with `useState`.

You do **not** need to use the URL as the source of truth for the core version.

We want to see that you understand:

* Component state.
* Derived options.
* Filtering data.
* Resetting dependent selections.
* Rendering conditional UI.

---

### 4. Keep the Code Clean

Please avoid putting everything into one large component.

A reasonable structure might look like:

```txt id="yvhpux"
app/
  part-finder/
    page.tsx
components/
  VehicleSelector.tsx
  ProductList.tsx
lib/
  mockData.ts
```

This structure is only a suggestion. You may organize it differently if you prefer.

---

## Provided Mock Data

Use this mock data as your starting point.

```ts id="0w4t4v"
// lib/mockData.ts

export interface VehicleFilterData {
  years: number[];
  makes: Record<number, string[]>;
  models: Record<number, Record<string, string[]>>;
}

export interface Product {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  price: number;
  inStock: boolean;
}

export const VEHICLE_DATA: VehicleFilterData = {
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

export const MOCK_PRODUCTS: Product[] = [
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
```

---

## README Requirements

Include a short `README.md` with:

1. Setup instructions.
2. A brief explanation of how the dropdowns work.
3. A brief explanation of how products are filtered.
4. Anything you would improve with more time.

---

## Bonus Requirements

Only attempt these if the core requirements are complete.

### Bonus 1: URL State

Update the URL when a vehicle is selected.

Example:

```txt id="w9t2ea"
/part-finder?year=2021&make=ford&model=bronco
```

Refreshing the page should preserve the selected vehicle.

---

### Bonus 2: Loading State

Create a fake async function that waits before returning products.

Show a loading message while products are being loaded.

Example:

```ts id="5mlxar"
export async function fetchProducts(
  year: number,
  make: string,
  model: string
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return MOCK_PRODUCTS.filter(
    (product) =>
      product.year === year &&
      product.make === make &&
      product.model === model
  );
}
```

---

### Bonus 3: Error State

Update the fake async function so it sometimes throws an error.

Show a friendly error message if product loading fails.

---

### Bonus 4: Basic Styling

Make the page clean and usable on desktop and mobile.

This does not need to match Rough Country’s website.

---

## What We Will Be Looking For

### React Fundamentals

* Correct use of state.
* Correct use of props.
* Correct conditional rendering.
* Good handling of dependent dropdowns.
* No invalid selections left behind when Year or Make changes.

### JavaScript Fundamentals

* Correct filtering logic.
* Clear variable names.
* Clean array/object usage.
* Avoiding unnecessary complexity.

### Code Organization

* Components are reasonably separated.
* Data is separated from UI.
* Code is readable.

### User Experience

* Disabled dropdowns behave correctly.
* Empty states are clear.
* Product results are easy to understand.
* The page does not feel broken when no vehicle is selected.

### Communication

* README is clear.
* Tradeoffs are explained honestly.
* The candidate can explain their code during the interview.
