import { Box, Button, Container, Typography } from "@mui/material";
import TextFieldCtrl from "../components/forms/TextField";
import { useForm } from "react-hook-form";
import { PasswordWithEye } from "../components/forms/PasswordWithEye";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = (values: LoginValues) => {
    console.log(values);
    navigate("/admin");
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
