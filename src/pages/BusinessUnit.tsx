import { Typography } from "@mui/material";
import StandardTable from "../components/StandardTable";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { TableSkeleton } from "../components/Skeleton";

const BusinessUnit = () => {
  const { data: bu } = useFetch<any>("/bu");
  console.log(bu);

  const columns = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code_business_unit",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "BU Name",
        accessorKey: "name_business_unit",
        cell: (props: any) => props.getValue(),
      },
      {
        header: "Active",
        accessorKey: "is_active",
        cell: (props: any) => props.getValue(),
      },
    ],
    []
  );

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
    </>
  );
};
export default BusinessUnit;
