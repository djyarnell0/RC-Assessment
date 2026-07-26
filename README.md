# Rough Country Part Finder

## Overview

This project is a simplified vehicle part finder built as part of the Rough Country take-home assessment. Users can select a vehicle by Year, Make, and Model to view compatible products.

The application was built with **Next.js App Router**, **TypeScript**, and **Material UI**, focusing on clean state management, reusable components, and readable code.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Material UI (MUI)

---

## Features

### Core Requirements

- Dependent Year → Make → Model dropdowns
- Make is disabled until a Year is selected
- Model is disabled until a Make is selected
- Changing Year resets Make and Model
- Changing Make resets Model
- Product filtering using the provided `MOCK_PRODUCTS`
- Dropdown options generated from `VEHICLE_OPTIONS`
- Empty state when no matching products exist
- Reset button clears all selected filters
- Modular component structure

---

## Project Structure

```
app/
components/
data/
styles/
types/
```

---

## Installation

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## What I Would Improve With More Time

- Add unit tests for filtering logic
- Improve animations and transitions
- Connect the UI to a real backend API
- Add pagination or virtualization for large product lists
- Improve mobile UX with additional responsive refinements
