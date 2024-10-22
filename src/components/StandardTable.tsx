import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, memo, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";

interface TableProps<T> {
  data: T[] | null;
  columns: ColumnDef<T>[];
  renderSubComponent?: (row: any) => ReactNode;
}

const StandardTable = memo(function StandardTable<T>({
  data,
  columns,
  renderSubComponent,
}: TableProps<T>) {
  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
          maxHeight: 440,
          // overflow: "scroll",
        }}
      >
        <Table stickyHeader size="small" aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                sx={{
                  "& th": {
                    color: "white",
                    backgroundColor: "primary.main",
                    borderRight: 1,
                  },
                }}
              >
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {data ? (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      ) : (
                        <Typography>Loading</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {renderSubComponent && row.getIsExpanded() && (
                  <TableRow>
                    {/* 2nd row is a custom 1 cell row */}
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});
export default StandardTable;
