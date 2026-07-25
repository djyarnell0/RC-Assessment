"use client";

import { Stack, Select, MenuItem, Box, Button } from "@mui/material";
import { VehicleOptions } from "../data/mockData";
import { VehicleFilter } from "../types/types";

type VehicleDropdownsProps = {
  vehicleOptions: VehicleOptions;
  filters: VehicleFilter;
  updateFilters: (updates: Partial<VehicleFilter>) => void;
};

export const VehicleDropdowns = ({
  vehicleOptions,
  filters,
  updateFilters,
}: VehicleDropdownsProps) => {
  // get makes from vehicle options
  const makes =
    filters.year === "" ? [] : vehicleOptions.makesByYear[filters.year];

  // get models from vehicle options
  const models =
    filters.year === "" || filters.make === ""
      ? []
      : vehicleOptions.modelsByYearAndMake[filters.year][filters.make];

  // handle value changes for year make and model dropdowns
  const handleYearChange = (year: number | "") => {
    updateFilters({
      year,
      make: "",
      model: "",
    });
  };

  const handleMakeChange = (make: string) => {
    updateFilters({
      make,
      model: "",
    });
  };

  const handleModelChange = (model: string) => {
    updateFilters({
      model,
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box>
          <Select
            labelId="year-label"
            aria-label="year-select"
            value={filters.year}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            renderValue={(selected) => (selected ? selected : " Year")}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            {vehicleOptions.years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Select
            labelId="make-label"
            aria-label="make-select"
            value={filters.make}
            onChange={(e) => handleMakeChange(e.target.value)}
            displayEmpty
            renderValue={(selected) => (selected ? selected : "Make")}
            sx={{ minWidth: 120 }}
            disabled={!filters.year}
          >
            {filters.year &&
              makes.map((make) => (
                <MenuItem key={make.value} value={make.value}>
                  {make.label}
                </MenuItem>
              ))}
          </Select>
        </Box>
        <Box>
          <Select
            labelId="model-label"
            aria-label="model-select"
            value={filters.model}
            onChange={(e) => handleModelChange(e.target.value)}
            sx={{ minWidth: 120 }}
            disabled={!filters.make}
            displayEmpty
            renderValue={(selected) => (selected ? selected : "Model")}
          >
            {filters.make &&
              models.map((model) => (
                <MenuItem key={model.value} value={model.value}>
                  {model.label}
                </MenuItem>
              ))}
          </Select>
        </Box>
        <Button
          variant="outlined"
          onClick={() => updateFilters({ year: "", make: "", model: "" })}
          sx={{ mt: 2, color: "black", borderColor: "black" }}
        >
          Reset Filters
        </Button>
      </Stack>
    </>
  );
};
