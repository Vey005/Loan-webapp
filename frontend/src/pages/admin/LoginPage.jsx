import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import { extractErrorMessage } from "../../api/extractErrorMessage";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    try {
      await login(values.username, values.password);
      navigate(redirectTo, { replace: true });
    } catch (errorPayload) {
      setErrorMessage(extractErrorMessage(errorPayload));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background: "linear-gradient(165deg, rgba(15,118,110,0.08), rgba(249,115,22,0.15))",
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 420, border: "1px solid #d9e5e2" }} elevation={0}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Access the secure loan review console.
        </Typography>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                />

                {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Login"}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default LoginPage;
