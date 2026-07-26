import { SxProps, Theme } from "@mui/material/styles";

export const centeredBox: SxProps<Theme> = {
  p: 2,
  mt: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minHeight: "30em",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
};
