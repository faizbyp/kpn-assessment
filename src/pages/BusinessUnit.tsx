import { Button, IconButton, Typography } from "@mui/material";
import StandardTable from "../components/StandardTable";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { TableSkeleton } from "../components/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDialog from "../hooks/useDialog";
import { snack } from "../providers/SnackbarProvider";
import { API } from "../utils/api";
import { useLoading } from "../providers/LoadingProvider";

const BusinessUnit = () => {
  const { showLoading, hideLoading } = useLoading();
  const { data: bu, refetch } = useFetch<any>("/bu");
  const { Dialog, showDialog, closeDialog } = useDialog();
  const columns: any = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "BU Name",
        accessorKey: "name",
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
          const name = props.row.original.name;

          return (
            <>
              <IconButton
                onClick={() => handleEdit(id)}
                aria-label="edit"
                size="small"
                edge="end"
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleOpenDelete(id, name)}
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

  const handleOpenDelete = (id: string, name: string) => {
    const actions = (
      <>
        <Button onClick={closeDialog} variant="outlined" color="error">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(id)} variant="contained" color="error">
          Delete
        </Button>
      </>
    );

    const children = <Typography>{`Are you sure you want to delete ${name}?`}</Typography>;

    showDialog("Delete Confirmation", actions, children);
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for id:", id);
    alert(`Edit ${id}`);
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
      closeDialog();
      hideLoading();
    }
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Business Unit
      </Typography>
      {bu ? (
        <StandardTable columns={columns} data={bu?.data} />
      ) : (
        <TableSkeleton column={4} row={2} small />
      )}
      {Dialog}
    </>
  );
};
export default BusinessUnit;
