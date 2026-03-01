import { useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { extractErrorMessage } from "../../api/extractErrorMessage";
import { checkApplicationStatus } from "../../api/publicApi";

const validationSchema = Yup.object({
  phone_or_email: Yup.string().required("Phone or email is required"),
  national_id_number: Yup.string().required("National ID number is required"),
});

function StatusCheckForm() {
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    setResult(null);

    try {
      const response = await checkApplicationStatus(values);
      setResult(response?.data ?? null);
    } catch (errorPayload) {
      setErrorMessage(extractErrorMessage(errorPayload));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ phone_or_email: "", national_id_number: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              label="Phone or Email"
              name="phone_or_email"
              value={values.phone_or_email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone_or_email && Boolean(errors.phone_or_email)}
              helperText={touched.phone_or_email && errors.phone_or_email}
              fullWidth
            />
            <TextField
              label="National ID Number"
              name="national_id_number"
              value={values.national_id_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.national_id_number && Boolean(errors.national_id_number)}
              helperText={touched.national_id_number && errors.national_id_number}
              fullWidth
            />
            <Box>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Check Status
              </Button>
            </Box>
          </Stack>

          {errorMessage ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {result ? (
            <Paper sx={{ mt: 3, p: 2, border: "1px solid #d9e5e2" }} elevation={0}>
              <Typography variant="h6" gutterBottom>
                Application Result
              </Typography>
              <Typography>
                <strong>Status:</strong> {result.status}
              </Typography>
              <Typography>
                <strong>Submitted At:</strong> {new Date(result.submitted_at).toLocaleString()}
              </Typography>
            </Paper>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default StatusCheckForm;
