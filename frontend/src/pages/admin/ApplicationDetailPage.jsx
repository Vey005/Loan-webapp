import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

import {
  approveApplication,
  getApplicationDetail,
  rejectApplication,
  toggleFlag,
  updateNotes,
} from "../../api/adminApi";
import { extractErrorMessage } from "../../api/extractErrorMessage";

function DataLine({ label, value }) {
  return (
    <Typography>
      <strong>{label}:</strong> {value ?? "-"}
    </Typography>
  );
}

function ApplicationDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadDetail = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await getApplicationDetail(id);
      const payload = response?.data ?? null;
      setData(payload);
      setNotes(payload?.admin_notes || "");
    } catch (errorPayload) {
      setErrorMessage(extractErrorMessage(errorPayload));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const runAction = async (action) => {
    if (!data) {
      return;
    }

    setBusy(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await action();
      await loadDetail();
      setSuccessMessage("Application updated successfully.");
    } catch (errorPayload) {
      setErrorMessage(extractErrorMessage(errorPayload));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage && !data) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!data) {
    return <Alert severity="warning">Application not found.</Alert>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Application Detail</Typography>
      <Typography color="text.secondary">ID: {data.id}</Typography>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

      <Paper sx={{ p: 3, border: "1px solid #d9e5e2" }} elevation={0}>
        <Typography variant="h6" gutterBottom>
          Personal Data
        </Typography>
        <DataLine label="Full Name" value={data.full_name} />
        <DataLine label="DOB" value={data.date_of_birth} />
        <DataLine label="Phone" value={data.phone} />
        <DataLine label="Email" value={data.email} />
        <DataLine label="Address" value={data.address} />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Financial Data
        </Typography>
        <DataLine label="Employment Status" value={data.employment_status} />
        <DataLine label="Monthly Income" value={data.monthly_income} />
        <DataLine label="Loan Amount" value={data.loan_amount} />
        <DataLine label="Loan-to-Income Ratio" value={data.loan_to_income_ratio} />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Identification
        </Typography>
        <DataLine label="National ID Number" value={data.national_id_number} />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
          <Button variant="outlined" href={data.id_document_url} target="_blank" rel="noreferrer">
            View ID Document
          </Button>
          <Button variant="outlined" href={data.selfie_image_url} target="_blank" rel="noreferrer">
            View Selfie
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          System Data
        </Typography>
        <DataLine label="IP Address" value={data.ip_address} />
        <DataLine label="Submitted" value={new Date(data.created_at).toLocaleString()} />
        <DataLine label="Status" value={data.status} />
        <DataLine label="Flagged" value={data.flagged ? "Yes" : "No"} />
      </Paper>

      <Paper sx={{ p: 3, border: "1px solid #d9e5e2" }} elevation={0}>
        <Typography variant="h6" gutterBottom>
          Admin Actions
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item>
            <Button
              variant="contained"
              disabled={busy || data.status === "rejected"}
              onClick={() => runAction(() => approveApplication(id))}
            >
              Approve
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disabled={busy || data.status === "approved"}
              onClick={() => runAction(() => rejectApplication(id))}
            >
              Reject
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              disabled={busy}
              onClick={() => runAction(() => toggleFlag(id, !data.flagged))}
            >
              {data.flagged ? "Unflag" : "Flag"}
            </Button>
          </Grid>
        </Grid>

        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Internal Notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <Box>
            <Button variant="outlined" disabled={busy} onClick={() => runAction(() => updateNotes(id, notes))}>
              Save Notes
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ApplicationDetailPage;
