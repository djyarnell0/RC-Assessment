"use client";

import { Typography, Card, CircularProgress } from "@mui/material";
import { Container, Box, Grid } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../data/mockData";
import { VehicleFilter } from "../types/types";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductCardItem";
import { VehicleDropdowns } from "./VehicleDropdowns";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { buildVehicleOptions } from "../utils/BuildVehicleOptionsUtil";
import { validateVehicleFilters } from "../utils/ValidateVehicleFilters";
import { fetchProducts } from "@/utils/fetchProducts";

export default function HomePage() {
  // Build vehicle options from the product data. Memoized to avoid recomputing on every render. In a production app, the products would likely come from an API or cache, and these options would be rebuilt only when that data changes.

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const vehicleOptions = useMemo(() => buildVehicleOptions(products), []);

  // get searchParams, router, and pathname initialized for URL search and modification
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // get year param
  const yearParam = searchParams.get("year");

  //get raw filters, then pass them into sanitization function
  const rawFilters: VehicleFilter = {
    year: yearParam ? Number(yearParam) : "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
  };
  const filters = validateVehicleFilters(rawFilters, vehicleOptions);

  // update filters when changed, useCallback ensures only runs on update.
  const updateFilters = useCallback(
    (updates: Partial<VehicleFilter>) => {
      const params = new URLSearchParams(searchParams);

      const nextFilters: VehicleFilter = {
        ...filters,
        ...updates,
      };
      //for each param, if they are empty, delete existing, otherwise set to value.
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

      // replace changes into URL
      router.replace(`${pathname}?${params.toString()}`);
    },
    [filters, pathname, router, searchParams],
  );

  // runs only on update, updates filters.
  useEffect(() => {
    if (
      rawFilters.year !== filters.year ||
      rawFilters.make !== filters.make ||
      rawFilters.model !== filters.model
    ) {
      updateFilters(filters);
    }
  }, [rawFilters, filters, updateFilters]);

  // filters products based on selected year make and model
  const filteredProducts = products.filter((product) => {
    return (
      product.year === filters.year &&
      product.make === filters.make &&
      product.model === filters.model
    );
  });

  // check to see if vehicle has associated products
  const hasProducts = filteredProducts.length > 0;

  //completion state for when all 3 values are filled.
  const filtersComplete =
    filters.year !== "" && filters.make !== "" && filters.model !== "";

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Part Finder
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
            {/* if filters are not completed, show all products */}
            {!filtersComplete && (
              <Grid
                container
                spacing={2}
                direction="row"
                sx={{
                  flexWrap: "wrap",
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductListItem product={product} />
                  </ProductCard>
                ))}
              </Grid>
            )}
            {/* Only shows filtered products when year, make, and model are filled, and are valid inputs. If the vehicle has no products, show no products message. */}
            {filtersComplete &&
              (hasProducts ? (
                <>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Products for your{" "}
                    <i>
                      {filters.year} {filters.make} {filters.model}:
                    </i>
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    sx={{
                      flexWrap: "wrap",
                    }}
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard>
                        <ProductListItem key={product.id} product={product} />
                      </ProductCard>
                    ))}
                  </Grid>
                </>
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  No products found for your vehicle.
                </Typography>
              ))}
          </Card>
        </>
      )}
    </Container>
  );
}
