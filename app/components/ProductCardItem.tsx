import { Product } from "../data/mockData";
import Typography from "@mui/material/Typography";

type ProductListItemProps = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {product.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {product.year} {product.make} {product.model}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, color: product.inStock ? "green" : "red" }}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </Typography>
    </>
  );
};
