import { Paper, Typography } from "@mui/material";

import StatusCheckForm from "../../components/public/StatusCheckForm";

function StatusPage() {
  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, border: "1px solid #d9e5e2" }} elevation={0} className="slide-up">
      <Typography variant="h4" gutterBottom>
        Check Application Status
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Enter your phone or email and national ID number to view current status.
      </Typography>
      <StatusCheckForm />
    </Paper>
  );
}

export default StatusPage;
