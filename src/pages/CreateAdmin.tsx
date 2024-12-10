import { Box, Button, Container, IconButton, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import TextFieldCtrl from "@/components/forms/TextField";
import CheckboxCtrl from "@/components/forms/Checkbox";
import SelectCtrl from "@/components/forms/Select";
import useFetch from "@/hooks/useFetch";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { isAxiosError } from "axios";
import useAPI from "@/hooks/useAPI";

const CreateAdmin = () => {
  const API = useAPI();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { data: role } = useFetch<any>("/admin/role");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      is_active: true,
      role_id: "",
      created_by: "",
    },
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.post(`/admin`, values);
      snack.success(`${res.data.message}`);
      navigate("/admin/accounts");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        snack.error(data.message);
        console.error(error.response);
      } else {
        snack.error("Error, check log for details");
        console.error(error);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2" color="primary" mb={0}>
          New Admin
        </Typography>
      </Box>

      <Container maxWidth="sm">
        <TextFieldCtrl
          control={control}
          name="username"
          label="Username"
          rules={{
            required: "This field is required",
          }}
        />
        <TextFieldCtrl
          control={control}
          name="fullname"
          label="Full Name"
          rules={{
            required: "This field is required",
          }}
        />
        <TextFieldCtrl
          control={control}
          name="email"
          label="Email"
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
        />
        <SelectCtrl
          name="role_id"
          label="Role"
          control={control}
          rules={{
            required: "This field is required",
          }}
        >
          {role ? (
            role.data.map((data: any) => (
              <MenuItem key={data.id} value={data.id}>
                {data.role_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Loading...
            </MenuItem>
          )}
        </SelectCtrl>
        <CheckboxCtrl name="is_active" control={control} label="Active" noMargin />
        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default CreateAdmin;
