import TextFieldCtrl from "@/components/forms/TextField";
import useFetch from "@/hooks/useFetch";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TermsPPValues {
  terms: string;
  pp: string;
}

const TermsPP = () => {
  const { data: termsPP } = useFetch<any>("/terms-pp");
  const {
    control,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      terms: "",
      pp: "",
    } as TermsPPValues,
  });

  useEffect(() => {
    if (termsPP) {
      const terms = termsPP.data.terms;
      const pp = termsPP.data.pp;
      reset({
        terms: terms.name,
        pp: pp.name,
      });
    }
  }, [termsPP]);

  return (
    <>
      <Typography variant="h1" color="primary">
        Terms & Privacy Policy
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldCtrl name="terms" label="Terms" control={control} multiline rows={6} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography color="text.secondary">
              Last update: {termsPP && termsPP.data.terms.update_date}
            </Typography>
            <Button variant="contained" disabled={!dirtyFields.terms}>
              Save Terms
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldCtrl name="pp" label="Privacy Policy" control={control} multiline rows={6} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography color="text.secondary">
              Last update: {termsPP && termsPP.data.pp.update_date}
            </Typography>
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
