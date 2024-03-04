import { Typography, styled } from "@mui/material";

export const CustomText = styled(Typography)({
  fontWeight: "bold",
  background: "linear-gradient(45deg,#00ccff, #ff3366,#203f9c)",
  backgroundClip: "text",
  webkitBackgroundClip: "text",
  color: "transparent",
  textAlign: "center",
});
