"use client";

import { Typography, CircularProgress, Container, Box } from "@mui/material";
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
import { centeredBox } from "@/app/styles/theme";

export default function HomePage() {
  // Build vehicle options from the product data. Memoized to avoid recomputing on every render. In a production app, the products would likely come from an API or cache, and these options would be rebuilt only when that data changes.

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const vehicleOptions = useMemo(
    () => buildVehicleOptions(products),
    [products],
  );

  // get searchParams, router, and pathname initialized for URL search and modification
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // get year param
  const yearParam = searchParams.get("year");

  //get raw filters, then pass them into sanitization function
  const filters = validateVehicleFilters(
    yearParam ? Number(yearParam) : "",
    searchParams.get("make") ?? "",
    searchParams.get("model") ?? "",
    vehicleOptions,
  );

  // memoize so its reference only changes when its dependencies change.
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

  // filters products based on selected year make and model
  const filteredProducts = products.filter((product) => {
    return (
      product.year === filters.year &&
      product.make === filters.make &&
      product.model === filters.model
    );
  });

  //completion state for when all 3 values are filled.
  const filtersComplete =
    filters.year !== "" && filters.make !== "" && filters.model !== "";

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4, minWidth: { xs: "100%" } }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Part Finder
      </Typography>
      {error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : (
        <>
          <Box sx={centeredBox}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", textAlign: "center", color: "black" }}
              noWrap
            >
              SHOP PARTS FOR YOUR VEHICLE
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: {
                  xs: "100%",
                  sm: "fit-content",
                },
                p: 3,
                border: "1px solid red",
                borderRadius: 2,
              }}
            >
              <VehicleDropdowns
                vehicleOptions={vehicleOptions}
                filters={filters}
                updateFilters={updateFilters}
              />
            </Box>
          </Box>
          <Box sx={centeredBox}>
            {/* if filters are not completed, show all products */}
            {!filtersComplete && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product.id}>
                    <ProductListItem product={product} />
                  </ProductCard>
                ))}
              </Box>
            )}
            {/* Only shows filtered products when year, make, and model are filled, and are valid inputs. If the vehicle has no products, show no products message. */}
            {filtersComplete && (
              <>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Products for your{" "}
                  <i>
                    {filters.year} {filters.make} {filters.model}:
                  </i>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id}>
                      <ProductListItem product={product} />
                    </ProductCard>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
