"use client";

import { Typography, Card } from "@mui/material";
import { Container, Box, Grid } from "@mui/system";
import { useCallback, useEffect, useMemo } from "react";
import { MOCK_PRODUCTS } from "../data/mockData";
import { VehicleFilter } from "../types/types";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductCardItem";
import { VehicleDropdowns } from "./VehicleDropdowns";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { buildVehicleOptions } from "../utils/BuildVehicleOptionsUtil";
import { validateVehicleFilters } from "../utils/ValidateVehicleFilters";

export default function HomePage() {
  const vehicleOptions = useMemo(() => buildVehicleOptions(MOCK_PRODUCTS), []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const yearParam = searchParams.get("year");

  const rawFilters: VehicleFilter = {
    year: yearParam ? Number(yearParam) : "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
  };

  const filters = validateVehicleFilters(rawFilters, vehicleOptions);
  const updateFilters = useCallback(
    (updates: Partial<VehicleFilter>) => {
      const params = new URLSearchParams(searchParams);

      const nextFilters: VehicleFilter = {
        ...filters,
        ...updates,
      };

      if (nextFilters.year === "") {
        params.delete("year");
      } else {
        params.set("year", nextFilters.year.toString());
      }

      if (nextFilters.make === "") {
        params.delete("make");
      } else {
        params.set("make", nextFilters.make);
      }

      if (nextFilters.model === "") {
        params.delete("model");
      } else {
        params.set("model", nextFilters.model);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [filters, pathname, router, searchParams],
  );

  useEffect(() => {
    if (
      rawFilters.year !== filters.year ||
      rawFilters.make !== filters.make ||
      rawFilters.model !== filters.model
    ) {
      updateFilters(filters);
    }
  }, [rawFilters, filters, updateFilters]);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    return (
      product.year === filters.year &&
      product.make === filters.make &&
      product.model === filters.model
    );
  });

  const hasProducts = filteredProducts.length > 0;

  const filtersComplete =
    filters.year !== "" && filters.make !== "" && filters.model !== "";

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Part Finder
      </Typography>

      <Box
        sx={{
          p: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: "30em",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
        >
          SHOP PARTS FOR YOUR VEHICLE
        </Typography>
        <Box
          sx={{
            display: "flex",
            p: 3,
            justifyContent: "center",
            border: "1px solid red",
            borderRadius: "8px",
          }}
        >
          <VehicleDropdowns
            vehicleOptions={vehicleOptions}
            filters={filters}
            updateFilters={updateFilters}
          />
        </Box>
      </Box>
      <Card
        sx={{
          p: 2,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: "30em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!filtersComplete && (
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              paddingLeft: 5,
              paddingBottom: 5,
            }}
          >
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id}>
                <ProductListItem product={product} />
              </ProductCard>
            ))}
          </Grid>
        )}

        {filtersComplete &&
          (hasProducts ? (
            <>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Products for your{" "}
                <i>
                  {filters.year} {filters.make} {filters.model}:
                </i>
              </Typography>
              <ProductCard>
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </ProductCard>
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No products found for your vehicle.
            </Typography>
          ))}
      </Card>
    </Container>
  );
}
