import { Box, Button, Typography } from "@mui/material";

function MuiPreview() {
  return (
    <>
      <Typography variant="h1" color="primary">
        KPN Assessment
      </Typography>
      <Typography variant="h2" color="secondary">
        KPN Assessment
      </Typography>
      <Typography variant="h3" color="secondary">
        KPN Assessment
      </Typography>
      <Typography color="secondary">KPN Assessment</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
        <Button variant="contained" color="info">
          Info
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Box>
    </>
  );
}

export default MuiPreview;
