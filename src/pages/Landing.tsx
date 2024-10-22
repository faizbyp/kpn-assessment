import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Container maxWidth="sm" sx={{ height: "100svh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" color="primary" align="center">
          KPN Assessment
        </Typography>
        <Link to="admin-login">
          <Button variant="contained">Admin Login</Button>
        </Link>
      </Box>
    </Container>
  );
};
export default Landing;
