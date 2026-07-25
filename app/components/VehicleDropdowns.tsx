"use client";

import { Stack, Select, MenuItem, Box, Button } from "@mui/material";
import { VehicleOptions } from "../data/mockData";
import { Dispatch, SetStateAction } from "react";
import { VehicleFilter } from "../types/types";

type VehicleDropdownsProps = {
  vehicleOptions: VehicleOptions;
  filters: VehicleFilter;
  setFilters: Dispatch<SetStateAction<VehicleFilter>>;
};

export const VehicleDropdowns = ({
  vehicleOptions,
  filters,
  setFilters,
}: VehicleDropdownsProps) => {
  const makes =
    filters.year === "" ? [] : vehicleOptions.makesByYear[filters.year];

  const models =
    filters.year === "" || filters.make === ""
      ? []
      : vehicleOptions.modelsByYearAndMake[filters.year][filters.make];

  const handleYearChange = (year: number) => {
    setFilters({ year, make: "", model: "" });
  };
  const handleMakeChange = (make: string) => {
    setFilters((prev) => ({
      ...prev,
      make,
      model: "",
    }));
  };
  const handleModelChange = (model: string) => {
    setFilters((prev) => ({
      ...prev,
      model,
    }));
  };

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <Select
          labelId="year-label"
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
          value={filters.make}
          onChange={(e) => handleMakeChange(e.target.value)}
          renderValue={(selected) => (selected ? selected : "Make")}
          displayEmpty
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
        onClick={() => setFilters({ year: "", make: "", model: "" })}
        sx={{ mt: 2, color: "black", borderColor: "black" }}
      >
        Reset Filters
      </Button>
    </Stack>
  );
};
