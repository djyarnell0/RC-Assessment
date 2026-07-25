import { Product, VehicleOptions } from "../data/mockData";

export const buildVehicleOptions = (products: Product[]): VehicleOptions => {
  const years = [...new Set(products.map((product) => product.year))].sort(
    (a, b) => a - b,
  );

  const makesByYear: VehicleOptions["makesByYear"] = {};
  const modelsByYearAndMake: VehicleOptions["modelsByYearAndMake"] = {};

  years.forEach((year) => {
    const yearProducts = products.filter((product) => product.year === year);

    const makes = [...new Set(yearProducts.map((product) => product.make))];

    makesByYear[year] = makes.map((make) => ({
      value: make,
      label: make,
    }));

    modelsByYearAndMake[year] = {};

    makes.forEach((make) => {
      const models = [
        ...new Set(
          yearProducts
            .filter((product) => product.make === make)
            .map((product) => product.model),
        ),
      ];

      modelsByYearAndMake[year][make] = models.map((model) => ({
        value: model,
        label: model,
      }));
    });
  });

  return {
    years,
    makesByYear,
    modelsByYearAndMake,
  };
};
