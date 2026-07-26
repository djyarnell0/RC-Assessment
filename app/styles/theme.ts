import { SxProps, Theme } from "@mui/material/styles";

export const centeredBox: SxProps<Theme> = {
  width: "100%",
  maxWidth: 1400,
  mx: "auto",
  px: {
    xs: 2,
    sm: 4,
    md: 6,
  },
  py: {
    xs: 4,
    sm: 8,
  },
  mt: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  backgroundColor: "#f5f5f5",
};
