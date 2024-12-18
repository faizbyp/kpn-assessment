import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
export default AuthLayout;
