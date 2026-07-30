"use server";

import { Suspense } from "react";
import HomePage from "../components/Homepage";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
