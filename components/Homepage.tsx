"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { MOCK_PRODUCTS, VEHICLE_OPTIONS } from "../data/mockData";
import { VehicleFilter } from "../types/types";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductCardItem";
import { VehicleDropdowns } from "./VehicleDropdowns";
import { centeredBox } from "../styles/theme";

export default function Home() {
  // set state for year make and model selection
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>({
    year: "",
    make: "",
    model: "",
  });

  // filter products by selected year make and model
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    return (
      product.year === vehicleFilter.year &&
      product.make === vehicleFilter.make &&
      product.model === vehicleFilter.model
    );
  });

  // check if selected vehicle has products
  const hasProducts = filteredProducts.length > 0;

  // check if all 3 selections have been made
  const filtersComplete =
    vehicleFilter.year !== "" &&
    vehicleFilter.make !== "" &&
    vehicleFilter.model !== "";

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Part Finder
      </Typography>
      {/* centeredBox is a global reusable style */}
      <Box sx={centeredBox}>
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
            vehicleOptions={VEHICLE_OPTIONS}
            filters={vehicleFilter}
            setFilters={setVehicleFilter}
          />
        </Box>
      </Box>
      <Box sx={centeredBox}>
        <Typography variant="h4" sx={{ color: "black" }}>
          Products
        </Typography>
        {/* when filters are incomplete, show all available products */}
        {!filtersComplete && (
          <Grid
            container
            spacing={2}
            direction="row"
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id}>
                <ProductListItem product={product} />
              </ProductCard>
            ))}
          </Grid>
        )}
        {/* Show filtered products per vehicle selection - if vehicle has no products, show no products found message */}
        {filtersComplete &&
          (hasProducts ? (
            <>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Products for your{" "}
                <i>
                  {vehicleFilter.year} {vehicleFilter.make}{" "}
                  {vehicleFilter.model}:
                </i>
              </Typography>
              <Grid
                container
                spacing={2}
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductListItem product={product} />
                  </ProductCard>
                ))}
              </Grid>
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
              No products found for your vehicle.
            </Typography>
          ))}
      </Box>
    </Container>
  );
}
