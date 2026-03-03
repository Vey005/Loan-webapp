import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { createApplication } from "../../api/publicApi";
import { extractErrorMessage } from "../../api/extractErrorMessage";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_LOAN_AMOUNT = Number(import.meta.env.VITE_LOAN_MAX_AMOUNT || 100000);

const supportedDocumentTypes = ["jpg", "jpeg", "png", "pdf"];
const supportedSelfieTypes = ["jpg", "jpeg", "png"];

const validationSchema = Yup.object({
  full_name: Yup.string().required("Full name is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\-\s]{7,20}$/, "Invalid phone format")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  address: Yup.string().required("Address is required"),
  employment_status: Yup.string().required("Employment status is required"),
  monthly_income: Yup.number()
    .typeError("Enter a valid number")
    .moreThan(0, "Must be greater than 0")
    .required("Monthly income is required"),
  loan_amount: Yup.number()
    .typeError("Enter a valid number")
    .moreThan(0, "Must be greater than 0")
    .max(MAX_LOAN_AMOUNT, `Cannot exceed ${MAX_LOAN_AMOUNT}`)
    .required("Loan amount is required"),
  national_id_number: Yup.string().required("National ID number is required"),
  id_document: Yup.mixed()
    .required("ID document is required")
    .test("file-size", "File must be 5MB or smaller", (value) => (value ? value.size <= MAX_FILE_SIZE : false))
    .test("file-type", "Allowed types: jpg, jpeg, png, pdf", (value) => {
      if (!value) {
        return false;
      }
      const extension = value.name.split(".").pop()?.toLowerCase();
      return supportedDocumentTypes.includes(extension);
    }),
  selfie_image: Yup.mixed()
    .required("Selfie image is required")
    .test("file-size", "File must be 5MB or smaller", (value) => (value ? value.size <= MAX_FILE_SIZE : false))
    .test("file-type", "Allowed types: jpg, jpeg, png", (value) => {
      if (!value) {
        return false;
      }
      const extension = value.name.split(".").pop()?.toLowerCase();
      return supportedSelfieTypes.includes(extension);
    }),
});

const initialValues = {
  full_name: "",
  date_of_birth: "",
  phone: "",
  email: "",
  address: "",
  employment_status: "",
  monthly_income: "",
  loan_amount: "",
  national_id_number: "",
  id_document: null,
  selfie_image: null,
};

function LoanForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await createApplication(formData);
      navigate("/success", {
        state: {
          applicationId: response?.data?.application_id,
        },
      });
    } catch (errorPayload) {
      setErrorMessage(extractErrorMessage(errorPayload));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full legal name"
                    name="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.full_name && Boolean(errors.full_name)}
                    helperText={touched.full_name && errors.full_name}
                    autoComplete="name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of birth"
                    name="date_of_birth"
                    InputLabelProps={{ shrink: true }}
                    value={values.date_of_birth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.date_of_birth && Boolean(errors.date_of_birth)}
                    helperText={touched.date_of_birth && errors.date_of_birth}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    autoComplete="tel"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Residential address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    autoComplete="street-address"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Employment and loan request
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Employment status"
                    name="employment_status"
                    value={values.employment_status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.employment_status && Boolean(errors.employment_status)}
                    helperText={touched.employment_status && errors.employment_status}
                    placeholder="e.g. Employed full-time"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Monthly income"
                    name="monthly_income"
                    value={values.monthly_income}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.monthly_income && Boolean(errors.monthly_income)}
                    helperText={
                      touched.monthly_income && errors.monthly_income
                        ? errors.monthly_income
                        : "Use your local currency"
                    }
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Requested loan amount"
                    name="loan_amount"
                    value={values.loan_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.loan_amount && Boolean(errors.loan_amount)}
                    helperText={
                      touched.loan_amount && errors.loan_amount
                        ? errors.loan_amount
                        : `Maximum allowed: ${MAX_LOAN_AMOUNT}`
                    }
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="National ID number"
                    name="national_id_number"
                    value={values.national_id_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.national_id_number && Boolean(errors.national_id_number)}
                    helperText={touched.national_id_number && errors.national_id_number}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Verification documents
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <Button variant="outlined" component="label" sx={{ justifyContent: "flex-start" }}>
                      Choose ID document
                      <input
                        hidden
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] ?? null;
                          setFieldValue("id_document", file);
                          setFieldTouched("id_document", true, false);
                        }}
                      />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      {values.id_document?.name || "No file selected"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Accepted: JPG, JPEG, PNG, PDF up to 5MB
                    </Typography>
                    {touched.id_document && errors.id_document ? (
                      <Typography variant="caption" color="error">
                        {errors.id_document}
                      </Typography>
                    ) : null}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <Button variant="outlined" component="label" sx={{ justifyContent: "flex-start" }}>
                      Choose selfie image
                      <input
                        hidden
                        type="file"
                        accept=".jpg,.jpeg,.png,image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] ?? null;
                          setFieldValue("selfie_image", file);
                          setFieldTouched("selfie_image", true, false);
                        }}
                      />
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      {values.selfie_image?.name || "No file selected"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Accepted: JPG, JPEG, PNG up to 5MB
                    </Typography>
                    {touched.selfie_image && errors.selfie_image ? (
                      <Typography variant="caption" color="error">
                        {errors.selfie_image}
                      </Typography>
                    ) : null}
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems={{ sm: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                By submitting, you confirm that the details provided are accurate and current.
              </Typography>
              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ minWidth: 190 }}>
                {isSubmitting ? <CircularProgress color="inherit" size={22} /> : "Submit application"}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default LoanForm;
