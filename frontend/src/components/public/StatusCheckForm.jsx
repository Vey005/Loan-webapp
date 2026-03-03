import { useState } from "react";
import { Alert, Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { extractErrorMessage } from "../../api/extractErrorMessage";
import { checkApplicationStatus } from "../../api/publicApi";

const validationSchema = Yup.object({
  phone_or_email: Yup.string().required("Phone or email is required"),
  national_id_number: Yup.string().required("National ID number is required"),
});

function toReadableStatus(status) {
  if (!status) {
    return "Status unavailable";
  }

  return status
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function getStatusColor(status) {
  const normalized = status?.toString().toLowerCase() || "";

  if (normalized.includes("approved")) {
    return "success";
  }

  if (normalized.includes("declin") || normalized.includes("reject")) {
    return "error";
  }

  if (normalized.includes("review") || normalized.includes("processing")) {
    return "info";
  }

  return "default";
}

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

  const submittedAt = result?.submitted_at ? new Date(result.submitted_at).toLocaleString() : "Not available";

  return (
    <Formik
      initialValues={{ phone_or_email: "", national_id_number: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Stack spacing={2.5}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Use the same contact details you provided during application to retrieve the latest status.
            </Typography>

            <TextField
              label="Phone number or email"
              name="phone_or_email"
              value={values.phone_or_email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone_or_email && Boolean(errors.phone_or_email)}
              helperText={touched.phone_or_email && errors.phone_or_email}
              fullWidth
            />
            <TextField
              label="National ID number"
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
                {isSubmitting ? "Checking..." : "Check status"}
              </Button>
            </Box>
          </Stack>

          {errorMessage ? (
            <Alert severity="error" sx={{ mt: 2.5 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {result ? (
            <Paper sx={{ mt: 3, p: 3, border: "1px solid", borderColor: "divider" }} elevation={0}>
              <Stack spacing={1.5}>
                <Typography variant="h6">Latest update</Typography>
                <Chip
                  label={toReadableStatus(result.status)}
                  color={getStatusColor(result.status)}
                  sx={{ width: "fit-content", fontWeight: 600 }}
                />
                {result.application_id ? (
                  <Typography variant="body2" color="text.secondary">
                    Reference ID: {result.application_id}
                  </Typography>
                ) : null}
                <Typography variant="body2" color="text.secondary">
                  Submitted: {submittedAt}
                </Typography>
              </Stack>
            </Paper>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default StatusCheckForm;
