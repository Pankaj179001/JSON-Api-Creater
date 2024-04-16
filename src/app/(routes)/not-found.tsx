// NotFound.js
import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
const NotFound = () => {
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <Grid item>
          <ErrorIcon fontSize="large" sx={{ color: "red" }} />
          <Typography variant="h3" gutterBottom>
            404 Not Found 
          </Typography>
          <Typography variant="body1">
            The page you are looking for does not exist.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;

