// utils/fetchProducts.ts

import { MOCK_PRODUCTS } from "../data/mockData";

export const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return MOCK_PRODUCTS;
};
