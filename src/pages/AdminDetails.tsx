import { ListSkeleton } from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const AdminDetails = () => {
  const { id } = useParams();
  const { data: account } = useFetch<any>(`/admin/${id}`);

  return (
    <>
      {account ? (
        <>
          <Typography variant="h1" color="primary" mb={4}>
            {account.data.email}
          </Typography>
          <Typography fontWeight="bold" color="primary">
            Username
          </Typography>
          <Typography mb={1}>{account.data.username}</Typography>
          <Typography fontWeight="bold" color="primary">
            Full Name
          </Typography>
          <Typography mb={1}>{account.data.fullname}</Typography>
          <Typography fontWeight="bold" color="primary">
            Email
          </Typography>
          <Typography mb={1}>{account.data.email}</Typography>
          <Typography fontWeight="bold" color="primary">
            Active
          </Typography>
          <Typography mb={1}>{account.data.is_active.toString()}</Typography>
          <Typography fontWeight="bold" color="primary">
            Role
          </Typography>
          <Typography mb={1}>{account.data.role_name}</Typography>
          <Typography fontWeight="bold" color="primary">
            Created Date
          </Typography>
          <Typography>{account.data.created_date}</Typography>
        </>
      ) : (
        <ListSkeleton />
      )}
    </>
  );
};
export default AdminDetails;
