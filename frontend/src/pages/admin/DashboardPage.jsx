import { useEffect, useState } from "react";
import { Alert, CircularProgress, Grid, Paper, Typography } from "@mui/material";

import { getDashboard } from "../../api/adminApi";
import { extractErrorMessage } from "../../api/extractErrorMessage";

function StatCard({ label, value }) {
  return (
    <Paper sx={{ p: 2.5, border: "1px solid #d9e5e2", height: "100%" }} elevation={0}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </Paper>
  );
}

function DashboardPage() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await getDashboard();
        setData(response?.data ?? null);
      } catch (errorPayload) {
        setErrorMessage(extractErrorMessage(errorPayload));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!data) {
    return <Alert severity="warning">No dashboard data available.</Alert>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Applications" value={data.total_applications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Pending" value={data.pending_applications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Approved" value={data.approved_applications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Rejected" value={data.rejected_applications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Flagged" value={data.flagged_applications} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Requested" value={data.total_requested_loan_sum} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Approved" value={data.total_approved_loan_sum} />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
