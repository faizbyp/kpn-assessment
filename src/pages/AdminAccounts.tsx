import useFetch from "@/hooks/useFetch";
import { Button, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import StandardTable from "@/components/StandardTable";
import { TableSkeleton } from "@/components/Skeleton";
import { useNavigate } from "react-router-dom";

const AdminAccounts = () => {
  const navigate = useNavigate();
  const { data: admin } = useFetch<any>("/admin");

  const columns: any = useMemo(
    () => [
      {
        header: "Username",
        accessorKey: "username",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Full Name",
        accessorKey: "fullname",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Active",
        accessorKey: "is_active",
        cell: (props: any) => props.getValue().toString(),
      },
      {
        header: "Role",
        accessorKey: "role_name",
        cell: (props: any) => props.getValue(),
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
              <IconButton onClick={() => alert(id)} size="small" edge="end">
                <InfoIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Typography variant="h1" color="primary">
        Admin Accounts
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => navigate("/admin/accounts/create")}
          sx={{ ml: 2 }}
        >
          Add Admin
        </Button>
      </Typography>

      {admin ? (
        <StandardTable data={admin.data} columns={columns} />
      ) : (
        <TableSkeleton column={4} row={2} small />
      )}
    </>
  );
};
export default AdminAccounts;
