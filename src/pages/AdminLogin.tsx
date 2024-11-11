import { Box, Button, Container, Typography } from "@mui/material";
import TextFieldCtrl from "../components/forms/TextField";
import { useForm } from "react-hook-form";
import { PasswordWithEye } from "../components/forms/PasswordWithEye";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import useAuthStore from "@/hooks/useAuthStore";
import { Auth } from "@/types/AuthAdmin";

interface LoginValues {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const setAuth = useAuthStore((state: Auth) => state.setAuth);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { control, handleSubmit } = useForm<LoginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = async (values: LoginValues) => {
    console.log(values);
    showLoading();
    try {
      const res = await API.post(`/admin/login`, values);
      console.log(res.data.data);
      setAuth(res.data.data);
      snack.success(`${res.data.message}`);
      navigate("/admin");
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
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" color="primary">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onLogin)}>
          <TextFieldCtrl
            control={control}
            name="username"
            label="Username/Email"
            rules={{
              required: "Field required",
              validate: (value: any) => !/\s/.test(value) || "Field cannot contain white spaces",
            }}
          />
          <PasswordWithEye
            control={control}
            name="password"
            label="Password"
            rules={{
              required: "Field required",
              validate: (value: any) => !/\s/.test(value) || "Field cannot contain white spaces",
            }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default AdminLogin;
