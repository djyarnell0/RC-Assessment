import { MOCK_PRODUCTS } from "../data/mockData";

// If you want to simulate an error state on the fetch, set shouldFail to true
export const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const shouldFail = false;

  if (shouldFail) {
    throw new Error("Simulated network error.");
  }

  return MOCK_PRODUCTS;
};
