import { Card } from "@mui/material";

type ProductCardProps = {
  children: React.ReactNode;
};

export const ProductCard = ({ children }: ProductCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        minHeight: "5em",
        minWidth: "20em",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid red",
      }}
    >
      {children}
    </Card>
  );
};
