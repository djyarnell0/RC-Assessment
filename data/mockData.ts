/**
 * Mock data for the Rough Country Part Finder assessment.
 * Copy this file into your project and import from it.
 */

export interface VehicleMake {
  label: string;
  value: string;
}

export interface VehicleModel {
  label: string;
  value: string;
}

export interface VehicleOptions {
  years: number[];
  /** Year → makes available for that year */
  makesByYear: Record<number, VehicleMake[]>;
  /** Year → make value → models available for that year/make */
  modelsByYearAndMake: Record<number, Record<string, VehicleModel[]>>;
}

export interface Product {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  price: number;
  inStock: boolean;
}

export const VEHICLE_OPTIONS: VehicleOptions = {
  years: [2021, 2022, 2023],
  makesByYear: {
    2021: [
      { label: "Ford", value: "Ford" },
      { label: "Jeep", value: "Jeep" },
      { label: "Chevrolet", value: "Chevrolet" },
    ],
    2022: [
      { label: "Ford", value: "Ford" },
      { label: "Jeep", value: "Jeep" },
      { label: "Toyota", value: "Toyota" },
    ],
    2023: [
      { label: "Ford", value: "Ford" },
      { label: "Toyota", value: "Toyota" },
      { label: "Ram", value: "Ram" },
    ],
  },
  modelsByYearAndMake: {
    2021: {
      Ford: [
        { label: "Bronco", value: "Bronco" },
        { label: "Ranger", value: "Ranger" },
      ],
      Jeep: [
        { label: "Wrangler", value: "Wrangler" },
        { label: "Grand Cherokee", value: "Grand Cherokee" },
      ],
      Chevrolet: [
        { label: "Silverado", value: "Silverado" },
        { label: "Colorado", value: "Colorado" },
      ],
    },
    2022: {
      Ford: [
        { label: "F-150", value: "F-150" },
        { label: "Ranger", value: "Ranger" },
      ],
      Jeep: [
        { label: "Wrangler", value: "Wrangler" },
        { label: "Gladiator", value: "Gladiator" },
      ],
      Toyota: [
        { label: "Tacoma", value: "Tacoma" },
        { label: "4Runner", value: "4Runner" },
      ],
    },
    2023: {
      Ford: [
        { label: "F-150", value: "F-150" },
        { label: "Bronco", value: "Bronco" },
      ],
      Toyota: [
        { label: "Tundra", value: "Tundra" },
        { label: "Tacoma", value: "Tacoma" },
      ],
      Ram: [
        { label: "1500", value: "1500" },
        { label: "2500", value: "2500" },
      ],
    },
  },
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "6-Inch Suspension Lift Kit",
    year: 2021,
    make: "Ford",
    model: "Bronco",
    price: 1299.95,
    inStock: true,
  },
  {
    id: "2",
    name: "Heavy Duty Front Bumper",
    year: 2021,
    make: "Ford",
    model: "Bronco",
    price: 749.99,
    inStock: true,
  },
  {
    id: "3",
    name: "Premium N3 Loaded Struts",
    year: 2022,
    make: "Ford",
    model: "F-150",
    price: 349.95,
    inStock: false,
  },
  {
    id: "4",
    name: "Dual Row LED Light Bar",
    year: 2021,
    make: "Jeep",
    model: "Wrangler",
    price: 189.99,
    inStock: true,
  },
  {
    id: "5",
    name: "Tubular Rock Sliders",
    year: 2022,
    make: "Jeep",
    model: "Wrangler",
    price: 429.95,
    inStock: true,
  },
  {
    id: "6",
    name: "Vertex Coilovers Pair",
    year: 2023,
    make: "Toyota",
    model: "Tundra",
    price: 1599.99,
    inStock: true,
  },
  {
    id: "7",
    name: "Steel Front Bumper",
    year: 2021,
    make: "Chevrolet",
    model: "Silverado",
    price: 899.95,
    inStock: true,
  },
  {
    id: "8",
    name: "Lift Kit with Shocks",
    year: 2023,
    make: "Ram",
    model: "1500",
    price: 1099.0,
    inStock: false,
  },
];
