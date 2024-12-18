import AuthLayout from "@/components/AuthLayout";
import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { Typography, Box, Button, Link as MuiLink } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface ReqResetValues {
  email: string;
}

const ReqResetPass = () => {
  const API = useAPI();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const ReqReset = async (values: ReqResetValues) => {
    showLoading();
    console.log(values);

    try {
      const res = await API.post("/admin/reset-pass/req", values);
      if (res?.status === 200) {
        snack.success(res.data.message);
        navigate(`/reset-pass/${values.email}`);
      } else {
        snack.error("Failed to request", res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data) {
        snack.error(error.response.data.message);
      } else {
        snack.error("Server Error");
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h1" color="primary">
        Reset Password
      </Typography>
      <Typography variant="h2">KPN Assessment</Typography>
      <Box component="form" onSubmit={handleSubmit(ReqReset)} sx={{ width: "100%" }}>
        <TextFieldCtrl
          name="email"
          control={control}
          label="Email"
          rules={{
            required: "Field required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </Box>
      <Box>
        <MuiLink to="/admin-login" component={Link}>
          Login
        </MuiLink>
      </Box>
    </AuthLayout>
  );
};
export default ReqResetPass;
