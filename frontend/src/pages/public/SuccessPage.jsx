import { Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const applicationId = location.state?.applicationId;

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: "center", border: "1px solid #d9e5e2" }} elevation={0}>
      <Typography variant="h3" gutterBottom>
        Submission Successful
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Your application has been received and is currently pending review.
      </Typography>
      {applicationId ? (
        <Typography sx={{ mb: 3 }}>
          Reference ID: <strong>{applicationId}</strong>
        </Typography>
      ) : null}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
        <Button component={RouterLink} to="/status" variant="contained">
          Track Status
        </Button>
        <Button component={RouterLink} to="/" variant="outlined">
          Back to Home
        </Button>
      </Stack>
    </Paper>
  );
}

export default SuccessPage;
