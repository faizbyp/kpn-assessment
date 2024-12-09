import DialogComp from "@/components/Dialog";
import CheckboxCtrl from "@/components/forms/Checkbox";
import TextFieldCtrl from "@/components/forms/TextField";
import { ListSkeleton } from "@/components/Skeleton";
import useAPI from "@/hooks/useAPI";
import useAuthStore from "@/hooks/useAuthStore";
import useDialog from "@/hooks/useDialog";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { SeriesType, SeriesValues } from "@/types/MasterData";
import { Box, Button, Grid2 as Grid, List, ListItem, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Series = () => {
  const API = useAPI();
  const user_id = useAuthStore((state) => state.user_id);
  const { showLoading, hideLoading } = useLoading();
  const { data: series, refetch } = useFetch<any>("/series");
  const [curSeries, setCurSeries] = useState({ id: "", series_name: "" });
  const { isOpen: isOpenEdit, open: openEdit, close: closeEdit } = useDialog();
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDialog();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      series_name: "",
      created_by: user_id,
      is_active: false,
    },
  });

  const onSubmit = async (values: SeriesValues) => {
    try {
      showLoading();
      const res = await API.post("/series", values);
      console.log(res);
      reset();
      refetch();
      snack.success(`${res.data.message}`);
    } catch (error: any) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
        console.error(error.response);
      } else {
        snack.error("Error, check log for details");
        console.error(error);
      }
    } finally {
      hideLoading();
    }
  };

  const handleOpenEdit = (data: SeriesValues, id: string) => {
    setCurSeries({ id: id, series_name: data.series_name });
    reset(
      {
        series_name: data.series_name,
        is_active: data.is_active,
      },
      { keepDefaultValues: true, keepDirty: true }
    );
    openEdit();
  };

  const onEdit = async (values: SeriesValues) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.patch(`/series/${curSeries.id}`, { ...values, updated_by: user_id });
      console.log(res);
      reset();
      refetch();
      snack.success(`${res.data.message} ${res.data.series_name}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
        console.error(error.response);
      } else {
        snack.error("Error, check log for details");
        console.error(error);
      }
    } finally {
      handleCloseEdit();
      hideLoading();
    }
  };

  const handleCloseEdit = () => {
    reset();
    closeEdit();
  };

  const handleOpenDelete = (id: string, name: string) => {
    setCurSeries({ id: id, series_name: name });
    openDelete();
  };

  const handleDelete = async (id: string) => {
    showLoading();
    try {
      const res = await API.delete(`/series/${id}`);
      console.log(res);
      refetch();
      snack.success(`${res.data?.message} ${res.data?.id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
        console.error(error.response);
      } else {
        snack.error("Error, check log for details");
        console.error(error);
      }
    } finally {
      closeDelete();
      hideLoading();
    }
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Series
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldCtrl
            control={control}
            name="series_name"
            label="Series Name"
            rules={{ required: "Field required" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <CheckboxCtrl control={control} name="is_active" label="Active" noMargin />
            <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
              Create
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {series ? (
            <List>
              {series.data.map((seri: SeriesType) => (
                <ListItem key={seri.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color={seri.is_active ? "text.primary" : "text.secondary"}>
                    {seri.series_name}
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mr: 2 }}
                      onClick={() => handleOpenEdit(seri, seri.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDelete(seri.id, seri.series_name)}
                    >
                      Remove
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <ListSkeleton />
          )}
        </Grid>
      </Grid>

      <DialogComp
        title="Delete Series"
        open={isOpenDelete}
        onClose={closeDelete}
        actions={
          <>
            <Button onClick={closeDelete} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(curSeries.id)} variant="contained" color="error">
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete ${curSeries.series_name}?`}</Typography>
      </DialogComp>

      <DialogComp
        title="Edit Series"
        open={isOpenEdit}
        onClose={handleCloseEdit}
        actions={
          <>
            <Button onClick={handleCloseEdit} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onEdit)} variant="contained" disabled={!isDirty}>
              Edit
            </Button>
          </>
        }
      >
        <TextFieldCtrl
          control={control}
          label="Series Name"
          name="series_name"
          rules={{ required: "Field required" }}
        />
        <CheckboxCtrl name="is_active" control={control} label="Active" />
      </DialogComp>
    </>
  );
};

export default Series;
