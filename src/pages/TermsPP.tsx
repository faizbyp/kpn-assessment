import TextFieldCtrl from "@/components/forms/TextField";
import { BoxSkeleton } from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { API } from "@/utils/api";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TermsPPValues {
  terms: string;
  pp: string;
  update_date: Date;
}

const TermsPP = () => {
  const { data: termsPP, refetch } = useFetch<any>("/terms-pp");
  const { showLoading, hideLoading } = useLoading();
  const {
    control,
    reset,
    formState: { dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      terms: "",
      pp: "",
      update_date: new Date(),
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

  const onUpdateTerms = async (values: TermsPPValues) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.patch(`/terms-pp/terms`, {
        name: values.terms,
        update_date: values.update_date,
      });
      console.log(res);
      refetch();
      snack.success(`${res.data.message}`);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      hideLoading();
    }
  };

  const onUpdatePP = async (values: TermsPPValues) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.patch(`/terms-pp/pp`, {
        name: values.pp,
        update_date: values.update_date,
      });
      console.log(res);
      refetch();
      snack.success(`${res.data.message}`);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Terms & Privacy Policy
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          {termsPP ? (
            <>
              <TextFieldCtrl name="terms" label="Terms" control={control} multiline rows={6} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="text.secondary">
                  Last update: {termsPP && termsPP.data.terms.update_date}
                </Typography>
                <Button
                  variant="contained"
                  disabled={!dirtyFields.terms}
                  onClick={handleSubmit(onUpdateTerms)}
                >
                  Update
                </Button>
              </Box>
            </>
          ) : (
            <BoxSkeleton />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {termsPP ? (
            <>
              <TextFieldCtrl
                name="pp"
                label="Privacy Policy"
                control={control}
                multiline
                rows={6}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="text.secondary">
                  Last update: {termsPP && termsPP.data.pp.update_date}
                </Typography>
                <Button
                  variant="contained"
                  disabled={!dirtyFields.pp}
                  onClick={handleSubmit(onUpdatePP)}
                >
                  Update
                </Button>
              </Box>
            </>
          ) : (
            <BoxSkeleton />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default TermsPP;
