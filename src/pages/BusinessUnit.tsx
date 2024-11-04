import { Button, IconButton, Typography } from "@mui/material";
import StandardTable from "../components/StandardTable";
import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import { TableSkeleton } from "../components/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDialog from "../hooks/useDialog";
import { snack } from "../providers/SnackbarProvider";
import { API } from "../utils/api";
import { useLoading } from "../providers/LoadingProvider";
import DialogComp from "@/components/Dialog";
import { useForm } from "react-hook-form";
import TextFieldCtrl from "@/components/forms/TextField";
import CheckboxCtrl from "@/components/forms/Checkbox";
import AddIcon from "@mui/icons-material/Add";

interface BUValues {
  bu_name: string;
  bu_code: string;
  is_active: boolean;
}

const BusinessUnit = () => {
  const { showLoading, hideLoading } = useLoading();
  const { data: bu, refetch } = useFetch<any>("/bu");
  const [deleteBU, setDeleteBU] = useState({ id: "", bu_name: "" });
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDialog();
  const { isOpen: isOpenForm, open: openForm, close: closeForm } = useDialog();
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      bu_name: "",
      bu_code: "",
      is_active: true,
    } as BUValues,
  });

  const columns: any = useMemo(
    () => [
      {
        header: "BU Code",
        accessorKey: "bu_code",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "BU Name",
        accessorKey: "bu_name",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Active",
        accessorKey: "is_active",
        cell: (props: any) => props.getValue().toString(),
      },
      {
        header: "Action",
        accessorKey: "id",
        meta: { align: "right" },
        cell: (props: any) => {
          const id = props.getValue();
          const bu_name = props.row.original.bu_name;

          return (
            <>
              <IconButton
                onClick={() => {
                  handleOpenForm(props.row.original);
                }}
                aria-label="edit"
                size="small"
                edge="end"
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleOpenDelete(id, bu_name)}
                aria-label="delete"
                color="error"
                size="small"
                edge="end"
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    []
  );

  const handleCloseForm = () => {
    reset();
    closeForm();
  };

  const handleOpenDelete = (id: string, bu_name: string) => {
    setDeleteBU({ id, bu_name });
    openDelete();
  };

  const handleDelete = async (id: string) => {
    showLoading();
    try {
      const res = await API.delete(`/bu/${id}`);
      console.log(res);
      refetch();
      snack.success(res.data?.message);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      closeDelete();
      hideLoading();
    }
  };

  const handleOpenForm = (data?: BUValues) => {
    if (data) {
      reset(
        {
          bu_name: data.bu_name,
          bu_code: data.bu_code,
          is_active: data.is_active,
        },
        { keepDefaultValues: true, keepDirty: true }
      );
    }
    openForm();
  };

  const onCreate = async (values: BUValues) => {
    console.log("test", values);
    showLoading();
    try {
      const res = await API.post(`/bu`, values);
      console.log(res);
      refetch();
      snack.success(`${res.data.message} ${res.data.bu_code}`);
    } catch (error) {
      console.error(error);
      snack.error(error as string);
    } finally {
      handleCloseForm();
      hideLoading();
    }
  };

  const handleEdit = (id: string) => {
    alert(id);
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Business Unit
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => handleOpenForm()}
          sx={{ ml: 2 }}
        >
          Create BU
        </Button>
      </Typography>
      {bu ? (
        <StandardTable columns={columns} data={bu?.data} />
      ) : (
        <TableSkeleton column={4} row={2} small />
      )}

      <DialogComp
        title="Delete Business Unit"
        open={isOpenDelete}
        onClose={closeDelete}
        actions={
          <>
            <Button onClick={closeDelete} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deleteBU.id)} variant="contained" color="error">
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete ${deleteBU.bu_name}?`}</Typography>
      </DialogComp>

      <DialogComp
        title="Create Business Unit"
        open={isOpenForm}
        onClose={handleCloseForm}
        actions={
          <>
            <Button onClick={handleCloseForm} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit(onCreate)} variant="contained" disabled={!isDirty}>
              Create
            </Button>
          </>
        }
      >
        <TextFieldCtrl
          control={control}
          label="BU Name"
          name="bu_name"
          rules={{ required: "Field required" }}
        />
        <TextFieldCtrl
          control={control}
          label="BU Code"
          name="bu_code"
          rules={{ required: "Field required" }}
        />
        <CheckboxCtrl name="is_active" control={control} label="Active" />
      </DialogComp>
    </>
  );
};
export default BusinessUnit;
