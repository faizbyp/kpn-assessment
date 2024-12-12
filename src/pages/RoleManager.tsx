import useFetch from "@/hooks/useFetch";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/hooks/useAuthStore";
import StandardTable from "@/components/StandardTable";
import { TableSkeleton } from "@/components/Skeleton";

const RoleManager = () => {
  const { data: role } = useFetch<any>("/admin/permission");
  const getPermission = useAuthStore((state) => state.getPermission);
  const navigate = useNavigate();

  const columns: any = useMemo(
    () => [
      {
        header: () => null,
        id: "expander",
        cell: ({ row }: { row: any }) => {
          return row.getCanExpand() ? (
            <IconButton
              {...{
                onClick: row.getToggleExpandedHandler(),
              }}
            >
              {row.getIsExpanded() ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          ) : null;
        },
      },
      {
        header: "Role",
        accessorKey: "role_name",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Created By",
        accessorKey: "created_by",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Created Date",
        accessorKey: "created_date",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Action",
        accessorKey: "id",
        meta: { align: "right" },
        cell: (props: any) => (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
            {getPermission("fupdate", 10) && (
              <IconButton
                onClick={() => navigate(`/admin/role/${props.getValue()}`)}
                aria-label="edit"
                size="small"
                edge="end"
                // color="warning"
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
        ),
      },
    ],
    []
  );

  const menuColumns: any = useMemo(
    () => [
      {
        header: "Menu",
        accessorKey: "menu_name",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Create",
        accessorKey: "fcreate",
        cell: (props: any) => <Checkbox checked={props.getValue()} color="success" />,
      },
      {
        header: "Read",
        accessorKey: "fread",
        cell: (props: any) => <Checkbox checked={props.getValue()} color="success" />,
      },
      {
        header: "Update",
        accessorKey: "fupdate",
        cell: (props: any) => <Checkbox checked={props.getValue()} color="success" />,
      },
      {
        header: "Delete",
        accessorKey: "fdelete",
        cell: (props: any) => <Checkbox checked={props.getValue()} color="success" />,
      },
    ],
    []
  );

  const menuTable = ({ row }: { row: any }) => {
    return (
      <>
        <StandardTable columns={menuColumns} data={row.original.permission} />
      </>
    );
  };

  return (
    <>
      <Typography variant="h1" color="primary">
        Role Manager
      </Typography>

      {role ? (
        getPermission("fread", 10) && (
          <StandardTable columns={columns} data={role?.data} renderSubComponent={menuTable} />
        )
      ) : (
        <TableSkeleton column={4} row={2} small />
      )}
    </>
  );
};
export default RoleManager;
