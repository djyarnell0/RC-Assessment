import { VehicleOptions } from "../data/mockData";
import { VehicleFilter } from "../types/types";

export const validateVehicleFilters = (
  filters: VehicleFilter,
  vehicleOptions: VehicleOptions,
): VehicleFilter => {
  let { year, make, model } = filters;

  if (year !== "" && !vehicleOptions.years.includes(year)) {
    return {
      year: "",
      make: "",
      model: "",
    };
  }

  if (year !== "" && make !== "") {
    const validMakes =
      vehicleOptions.makesByYear[year]?.map((make) => make.value) ?? [];

    if (!validMakes.includes(make)) {
      return {
        year,
        make: "",
        model: "",
      };
    }
  }

  if (year !== "" && make !== "" && model !== "") {
    const validModels =
      vehicleOptions.modelsByYearAndMake[year]?.[make]?.map(
        (model) => model.value,
      ) ?? [];

    if (!validModels.includes(model)) {
      return {
        year,
        make,
        model: "",
      };
    }
  }

  return filters;
};
