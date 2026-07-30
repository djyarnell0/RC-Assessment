"use server";
import HomePage from "@/components/Homepage";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
