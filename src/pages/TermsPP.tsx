import TextFieldCtrl from "@/components/forms/TextField";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface TermsPPValues {
  terms: string;
  pp: string;
}

const TermsPP = () => {
  const {
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      terms: "",
      pp: "",
    } as TermsPPValues,
  });

  return (
    <>
      <Typography variant="h1" color="primary">
        Terms & Privacy Policy
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldCtrl name="terms" label="Terms" control={control} multiline rows={6} />
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" disabled={!dirtyFields.terms}>
              Save Terms
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldCtrl name="pp" label="Privacy Policy" control={control} multiline rows={6} />
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" disabled={!dirtyFields.pp}>
              Save PP
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default TermsPP;
