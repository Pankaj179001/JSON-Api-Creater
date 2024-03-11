import { Box, styled } from "@mui/material";

export const RemoveListItem = styled(Box)({
  position: "absolute",
  top: "-6px",
  right: "-3px",
  backgroundColor: "red",
  width: "20px",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor: "pointer",
  color: "#fff",
});
