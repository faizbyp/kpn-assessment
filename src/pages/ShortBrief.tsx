import TextFieldCtrl from "@/components/forms/TextField";
import { BoxSkeleton } from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { API } from "@/utils/api";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface BriefValues {
  short_brief_name: string;
  update_date: Date;
}

const ShortBrief = () => {
  const { data: brief, refetch } = useFetch<any>("/short-brief");
  const { showLoading, hideLoading } = useLoading();
  const {
    control,
    formState: { dirtyFields },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      short_brief_name: "",
      update_date: new Date(),
    } as BriefValues,
  });

  useEffect(() => {
    if (brief) {
      reset({
        short_brief_name: brief.short_brief_name,
      });
    }
  }, [brief]);

  const onUpdate = async (values: BriefValues) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.patch(`/short-brief`, {
        short_brief_name: values.short_brief_name,
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
        Short Brief
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          {brief ? (
            <>
              <TextFieldCtrl
                name="short_brief_name"
                label="Brief"
                control={control}
                multiline
                rows={6}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography color="text.secondary">Last update:</Typography>
                <Button
                  variant="contained"
                  disabled={!dirtyFields.short_brief_name}
                  onClick={handleSubmit(onUpdate)}
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
export default ShortBrief;
