import { Button, IconButton, Typography } from "@mui/material";
import StandardTable from "../components/StandardTable";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { TableSkeleton } from "../components/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useDialog from "../hooks/useDialog";
import { snack } from "../providers/SnackbarProvider";

const BusinessUnit = () => {
  const { data: bu } = useFetch<any>("/bu");
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
                onClick={() => handleOpenDelete(id)}
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

  const handleOpenDelete = (id: any) => {
    const actions = (
      <>
        <Button onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(id)} variant="contained" color="error">
          Delete
        </Button>
      </>
    );

    const children = <Typography>Are you sure you want to delete?</Typography>;

    showDialog("Delete Confirmation", actions, children);
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for id:", id);
    alert(`Edit ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for id:", id);
    snack.success(`ID ${id} deleted`);
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
