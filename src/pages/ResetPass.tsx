import AuthLayout from "@/components/AuthLayout";
import { PasswordWithEye } from "@/components/forms/PasswordWithEye";
import TextFieldCtrl from "@/components/forms/TextField";
import useAPI from "@/hooks/useAPI";
import { useLoading } from "@/providers/LoadingProvider";
import { snack } from "@/providers/SnackbarProvider";
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

interface ResetPassValues {
  email: string;
  otpInput: string;
  newPass: string;
}

const ResetPass = () => {
  const API = useAPI();
  const navigate = useNavigate();
  const { email } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const [verified, setVerified] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: decodeURIComponent(email as string),
      otpInput: "",
      newPass: "",
    },
  });

  const onVerif = async (values: ResetPassValues) => {
    console.log(values);
    showLoading();

    try {
      const res = await API.post("/admin/reset-pass/verify", {
        email: values.email,
        otpInput: values.otpInput,
      });
      if (res?.status === 200) {
        snack.success(res.data.message);
        console.log(res);
        setVerified(true);
      } else {
        snack.error(res.data.message);
      }
    } catch (error: any) {
      if (error?.response.data) {
        snack.error(error.response.data.message);
      } else {
        snack.error("Server Error");
        console.log(error);
      }
    } finally {
      hideLoading();
    }
  };

  const resetPass = async (values: ResetPassValues) => {
    console.log(values);
    showLoading();

    try {
      const res = await API.patch("/admin/reset-pass/reset", {
        email: values.email,
        newPass: values.newPass,
      });
      if (res?.status === 200) {
        snack.success(res.data.message);
        navigate("/admin-login");
      } else {
        snack.error(res.data.message);
      }
    } catch (error: any) {
      if (error?.response.data) {
        snack.error(error.response.data.message);
      } else {
        snack.error("Server Error");
        console.log(error);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h1" color="primary">
        {!verified ? "OTP Reset Password" : "Set New Password"}
      </Typography>
      <Typography variant="h2">KPN Assessment</Typography>
      {!verified ? (
        <Box component="form" onSubmit={handleSubmit(onVerif)} sx={{ width: "100%" }}>
          <TextFieldCtrl
            name="email"
            control={control}
            label="Email"
            readOnly
            rules={{
              required: "Field required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          />
          <TextFieldCtrl
            control={control}
            label="OTP Code"
            name="otpInput"
            rules={{
              required: "Field required",
              validate: {
                length: (values) => values.length === 6 || "OTP is 6 character length",
              },
            }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained">
              Verify
            </Button>
          </Box>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit(resetPass)} sx={{ width: "100%" }}>
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
          <PasswordWithEye
            name="newPass"
            control={control}
            label="New Password"
            rules={{ required: "Field required" }}
          />
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <MuiLink component={Link} to="/admin-login">
          Login
        </MuiLink>
      </Box>
    </AuthLayout>
  );
};

export default ResetPass;
