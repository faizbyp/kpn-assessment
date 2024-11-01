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

const BusinessUnit = () => {
  const { showLoading, hideLoading } = useLoading();
  const { data: bu, refetch } = useFetch<any>("/bu");
  const [BU, setBU] = useState({ id: "", bu_name: "" });
  const { isOpen: isOpenDelete, open: openDelete, close: closeDelete } = useDialog();

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
                onClick={() => alert(id)}
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

  const handleOpenDelete = (id: string, bu_name: string) => {
    setBU({ id, bu_name });
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

      <DialogComp
        title="Delete BU"
        open={isOpenDelete}
        onClose={closeDelete}
        actions={
          <>
            <Button onClick={closeDelete} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(BU.id)} variant="contained" color="error">
              Delete
            </Button>
          </>
        }
      >
        <Typography>{`Are you sure you want to delete ${BU.bu_name}?`}</Typography>
      </DialogComp>
    </>
  );
};
export default BusinessUnit;
