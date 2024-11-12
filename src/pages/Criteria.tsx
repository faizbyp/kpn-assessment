import useFetch from "@/hooks/useFetch";
import {
  Box,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useDialog from "@/hooks/useDialog";
import { useFieldArray, useForm } from "react-hook-form";
import { snack } from "@/providers/SnackbarProvider";
import { API } from "@/utils/api";
import DialogComp from "@/components/Dialog";
import TextFieldCtrl from "@/components/forms/TextField";
import CheckboxCtrl from "@/components/forms/Checkbox";
import { useLoading } from "@/providers/LoadingProvider";
import { useState } from "react";
import NumericFieldCtrl from "@/components/forms/NumericField";
import { BoxSkeleton } from "@/components/Skeleton";

interface CriteriaValues {
  criteria_name: string;
  minimum_score: number;
  maximum_score: number;
  is_active: boolean;
}

interface Criteria extends CriteriaValues {
  id: string;
  category_fk: string;
  created_by: string;
  created_date: Date;
}

interface CategoryValues {
  category_code: string;
  category_name: string;
  id_user: string;
  criteria: CriteriaValues[];
}

const Criteria = () => {
  const { showLoading, hideLoading } = useLoading();
  const { data: criteria, refetch } = useFetch<any>("/criteria");
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState({ id: "", name: "" });
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDialog();
  const { isOpen: isOpenForm, open: openForm, close: closeForm } = useDialog();
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      category_code: "",
      category_name: "",
      id_user: "",
      criteria: [
        {
          criteria_name: "",
          minimum_score: 0,
          maximum_score: 10,
          is_active: true,
        },
      ],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "criteria",
    control: control,
  });

  const handleCloseForm = () => {
    reset();
    closeForm();
  };

  // const handleOpenForm = () => {
  //   console.log("laskdjalsj");
  // };

  const handleOpenDelete = (id: string, name: string) => {
    setSelected({ id, name });
    openDelete();
  };

  const handleDelete = async (id: string) => {
    console.log(selected);
    showLoading();
    try {
      const res = await API.delete(`/criteria/${id}`);
      console.log(res);
      refetch();
      snack.success(`${res.data?.message}: ${res.data.name}`);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      closeDelete();
      hideLoading();
    }
  };

  const onCreate = async (values: CategoryValues) => {
    console.log("test", values);
    showLoading();
    try {
      const res = await API.post(`/criteria`, values);
      console.log(res);
      refetch();
      snack.success(`${res.data.message} ${res.data.category_name}`);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      handleCloseForm();
      hideLoading();
    }
  };

  const onEdit = async (values: CategoryValues) => {
    console.log(values);
    // showLoading();
    // try {
    //   const res = await API.patch(`/bu/${selectedBU.id}`, values);
    //   console.log(res);
    //   refetch();
    //   snack.success(`${res.data.message} ${res.data.bu_code}`);
    // } catch (error) {
    //   console.error(error);
    //   snack.error(error as string);
    // } finally {
    //   handleCloseForm();
    //   hideLoading();
    // }
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Criteria
        <Button startIcon={<AddIcon />} variant="outlined" onClick={openForm} sx={{ ml: 2 }}>
          Create Criteria
        </Button>
      </Typography>
      {criteria ? (
        <>
          <Grid container spacing={2}>
            {criteria.data.map((category: any, index: number) => (
              <Grid size={{ xs: 12, lg: 6 }} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                      {`${category.value_name} (${category.value_code})`}
                    </Typography>
                    {category.criteria.map((criteria: Criteria, index: number) => (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: index === category.criteria.length - 1 ? 0 : 2,
                        }}
                        key={index}
                      >
                        <TextField
                          label="Criteria"
                          value={criteria.criteria_name}
                          fullWidth
                          slotProps={{ input: { readOnly: true } }}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <TextField
                            label="Minimum Score"
                            value={criteria.minimum_score}
                            fullWidth
                            slotProps={{ input: { readOnly: true } }}
                          />
                          <TextField
                            label="Maximum Score"
                            value={criteria.maximum_score}
                            fullWidth
                            slotProps={{ input: { readOnly: true } }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "end", width: "100%" }}>
                      <Button variant="outlined" disabled>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDelete(category.value_id, category.value_name)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <BoxSkeleton />
      )}

      <DialogComp
        maxWidth="md"
        title={!isEdit ? "Create Criteria" : "Edit Criteria"}
        open={isOpenForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={!isEdit ? handleSubmit(onCreate) : handleSubmit(onEdit)}
              variant="contained"
              disabled={!isDirty}
            >
              {!isEdit ? "Create" : "Edit"}
            </Button>
          </>
        }
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextFieldCtrl
            control={control}
            label="Category Name"
            name="category_name"
            rules={{ required: "Field required" }}
          />
          <TextFieldCtrl
            control={control}
            label="Category Code"
            name="category_code"
            rules={{ required: "Field required" }}
          />
        </Box>
        {fields.map((field, index) => (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", my: 2 }} key={field.id}>
            <TextFieldCtrl
              control={control}
              label="Criteria Name"
              name={`criteria.${index}.criteria_name`}
              rules={{ required: "Field required" }}
              noMargin
            />
            <NumericFieldCtrl
              control={control}
              label="Minimum Score"
              name={`criteria.${index}.minimum_score`}
              rules={{
                required: "Field required",
                validate: {
                  minValue: (values) =>
                    index > 0
                      ? Number(values) ===
                          Number(watch(`criteria.${index - 1}.maximum_score`)) + 1 ||
                        "Must +1 from prev max"
                      : true,
                },
              }}
              decimalScale={0}
              noMargin
              min={0}
            />
            <NumericFieldCtrl
              control={control}
              label="Maximum Score"
              name={`criteria.${index}.maximum_score`}
              rules={{
                required: "Field required",
                validate: {
                  minValue: (values) =>
                    Number(values) >= Number(watch(`criteria.${index}.minimum_score`)) ||
                    "Must >= min",
                },
              }}
              decimalScale={0}
              noMargin
              min={0}
            />

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <IconButton color="error" disabled={index === 0} onClick={() => remove(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton
                disabled={index !== fields.length - 1}
                color="success"
                onClick={() =>
                  append({
                    criteria_name: "",
                    minimum_score: Number(getValues(`criteria.${index}.maximum_score`)) + 1,
                    maximum_score: Number(getValues(`criteria.${index}.maximum_score`)) + 11,
                    is_active: true,
                  })
                }
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <CheckboxCtrl name="is_active" control={control} label="Active" />
      </DialogComp>

      <DialogComp
        title="Delete Criteria"
        open={isOpenDelete}
        onClose={closeDelete}
        actions={
          <>
            <Button onClick={closeDelete} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(selected.id)} variant="contained" color="error">
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete ${selected.name}?`}</Typography>
      </DialogComp>
    </>
  );
};
export default Criteria;
