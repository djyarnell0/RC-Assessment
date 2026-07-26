# Rough Country Part Finder

## Overview

This project is a simplified vehicle part finder built for the Rough Country Next.js take-home assessment.

The application allows users to select a vehicle by **Year**, **Make**, and **Model** to view compatible products. It was built with **Next.js App Router**, **React**, **TypeScript**, **Material UI**, and **Tailwind CSS**, with an emphasis on clean state management, reusable components, accessibility, and maintainable code.

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Material UI
- Tailwind CSS
- Emotion

---

## Completed Requirements

### Core Requirements

- ✅ Built with Next.js App Router and TypeScript
- ✅ Dependent Year → Make → Model dropdowns
- ✅ Correct filter reset behavior
- ✅ Dropdown options generated from `VEHICLE_OPTIONS`
- ✅ Products filtered using `MOCK_PRODUCTS`
- ✅ Empty state when no matching products are found
- ✅ Reset button clears all selected filters
- ✅ Clean, modular component structure

### Bonus Features

- ✅ Vehicle selections are synchronized with URL search parameters
- ✅ Dropdown options are dynamically derived from product data
- ✅ Asynchronous product data fetching with loading and error states
- ✅ Responsive, accessible UI using Material UI
- ✅ Keyboard-friendly form controls with proper labels
- ✅ Skeleton placeholders displayed while data is loading
- ✅ Strong TypeScript typing throughout the application
- ✅ Shared styling using reusable theme/style utilities

---

## Project Structure

```text
app/
├── components/
├── data/
├── styles/
├── types/
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser to:

```
http://localhost:3000
```

---

## Design Decisions

- Product results are derived from the current filter state rather than maintaining a separate results state.
- Filter dependencies prevent invalid Year/Make/Model combinations.
- Components are organized by responsibility to improve readability and maintainability.
- Material UI provides a consistent, accessible component library while Tailwind is used for utility styling where appropriate.
- TypeScript interfaces are shared across the application to ensure strong type safety.
- Product data is fetched asynchronously through a dedicated data-fetching utility to mirror how the application would consume an API in production.

---

## Development

### Simulating a Loading State

The application uses a mock asynchronous data-fetching utility (`fetchProducts`) to simulate an API request. A one-second delay is intentionally included so the loading skeletons can be observed during development.

### Simulating an Error

The data-fetching utility also supports testing the application's error handling.

In `utils/fetchProducts.ts`, change:

```ts
const shouldFail = false;
```

## Future Improvements

If this were expanded beyond the assessment, I would consider:

- Replace the simulated async data source with a real backend API
- Move product fetching to server-side rendering or React Server Components where appropriate
- Add request caching and revalidation for improved performance
- Adding unit and integration tests (Jest/Vitest + React Testing Library)
- Product pagination or virtualization for large datasets
- Product search and sorting
- Improved animation
- Error boundaries and retry handling for failed requests

---

## Notes

This project was completed using the provided mock data and follows the requirements outlined in the assessment while also implementing all optional bonus features.
