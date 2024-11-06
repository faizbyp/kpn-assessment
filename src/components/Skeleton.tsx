import { Box, Skeleton } from "@mui/material";

interface TableSkeletonProps {
  row?: number;
  column: number;
  small?: boolean;
}

export const BoxSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rounded" width="100%" height={128} />
    </Box>
  );
};

export const ListSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Skeleton variant="rounded" width="100%" height={96} />
      <Skeleton variant="rounded" width="100%" height={64} />
      <Skeleton variant="rounded" width="100%" height={48} />
    </Box>
  );
};

export const POSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rounded" width="100%" height={96} />
        <Skeleton variant="rounded" width="100%" height={96} />
      </Box>
      <Skeleton variant="rounded" width="100%" height={64} />
      <Skeleton variant="rounded" width="100%" height={64} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rounded" width="100%" height={64} />
        <Skeleton variant="rounded" width="100%" height={64} />
      </Box>
    </Box>
  );
};

export const TableSkeleton = ({ row = 3, column, small }: TableSkeletonProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: small ? 1 : 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: small ? 1 : 2 }}>
        {[...Array(column)].map((_, index) => (
          <Skeleton key={index} variant="rounded" width="100%" height={small ? 48 : 64} />
        ))}
      </Box>
      {[...Array(row)].map((_, index) => (
        <Skeleton key={index} variant="rounded" width="100%" height={small ? 48 : 64} />
      ))}
    </Box>
  );
};
