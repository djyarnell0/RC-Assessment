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
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        width: {
          xs: "100%",
          sm: 320,
        },
        minHeight: 180,
        elevation: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {children}
    </Card>
  );
};
