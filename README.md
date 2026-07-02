# Take-Home Assessment: Rough Country Product Filter

**Role:** Junior Frontend / Junior Next.js Developer
**Expected Time:** 60–90 minutes

## Overview

At Rough Country, customers need to find products that match their vehicle.

This exercise is a small version of that idea. We want to see how you work with React components, state, lists, and basic filtering.

We are not looking for a perfect production system. We are looking for clean, understandable code.

---

## The Challenge

Build a simple product filter that allows a user to filter products by vehicle make.

The page should include:

1. A dropdown for Make.
2. A list of products.
3. A clear empty state when no products match.

---

## Core Requirements

### 1. Render the Product List

Display all products when no Make is selected.

Each product should show:

* Product name
* Vehicle year
* Vehicle make
* Vehicle model
* Price
* Whether it is in stock

---

### 2. Add a Make Dropdown

Create a dropdown that allows the user to select a Make.

Example options:

* All Makes
* Ford
* Jeep
* Toyota
* Ram
* Chevrolet

When a Make is selected, only products matching that Make should be shown.

---

### 3. Add an Empty State

If no products match the selected Make, show a helpful message.

Example:

```txt id="l12p5s"
No products found for this make.
```

---

### 4. Keep the Code Clean

Please try to:

* Use clear variable names.
* Keep the code readable.
* Break things into components if it makes sense.
* Avoid overcomplicating the solution.

A simple working solution is better than a complicated unfinished one.

---

## Provided Data

```ts id="o19w8b"
export interface Product {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  price: number;
  inStock: boolean;
}

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

## Bonus Tasks

Only attempt these if the core requirements are complete.

### Bonus 1: Add a Year Filter

Add a second dropdown for Year.

The user should be able to filter by:

* Make
* Year
* Make and Year together

---

### Bonus 2: Add a Reset Button

Add a button that clears all selected filters and shows all products again.

---

### Bonus 3: Improve Styling

Make the page clean and easy to use.

This does not need to match Rough Country’s website.

---

## README

Add a short README with:

1. How to run the project.
2. What you completed.
3. Anything you would improve with more time.

---

## What We Will Be Looking For

### React Fundamentals

* Can you render a list of data?
* Can you use state for the selected filter?
* Can you update the UI when state changes?
* Can you conditionally render an empty state?

### JavaScript Fundamentals

* Can you filter an array?
* Can you work with objects and arrays clearly?
* Can you avoid unnecessary complexity?

### Code Quality

* Is the code readable?
* Are names clear?
* Is the solution easy to follow?

### Communication

* Can you explain what you built?
* Can you describe what you would improve next?

