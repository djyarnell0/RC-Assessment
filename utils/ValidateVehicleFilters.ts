import { VehicleOptions } from "../data/mockData";
import { VehicleFilter } from "../types/types";

// this function validates URL params in order to avoid values that do not exist for year/make/model. If one is inputted, it cleans URL back to closest valid input.

export const validateVehicleFilters = (
  year: number | "",
  make: string,
  model: string,
  vehicleOptions: VehicleOptions,
): VehicleFilter => {
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

  return {
    year,
    make,
    model,
  };
};
