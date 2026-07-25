"use client";

import { Typography, Card } from "@mui/material";
import { Container, Box, Grid } from "@mui/system";
import { useState } from "react";
import { MOCK_PRODUCTS, VEHICLE_OPTIONS } from "../data/mockData";
import { VehicleFilter } from "../types/types";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductCardItem";
import { VehicleDropdowns } from "./VehicleDropdowns";

export default function Home() {
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>({
    year: "",
    make: "",
    model: "",
  });

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    return (
      product.year === vehicleFilter.year &&
      product.make === vehicleFilter.make &&
      product.model === vehicleFilter.model
    );
  });

  const hasProducts = filteredProducts.length > 0;

  const filtersComplete =
    vehicleFilter.year !== "" &&
    vehicleFilter.make !== "" &&
    vehicleFilter.model !== "";

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
            vehicleOptions={VEHICLE_OPTIONS}
            filters={vehicleFilter}
            setFilters={setVehicleFilter}
          />
        </Box>
      </Box>
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
        <Typography variant="h4" sx={{ color: "black" }}>
          Products
        </Typography>
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
