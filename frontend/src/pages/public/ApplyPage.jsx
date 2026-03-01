import { Paper, Typography } from "@mui/material";

import LoanForm from "../../components/public/LoanForm";

function ApplyPage() {
  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, border: "1px solid #d9e5e2" }} elevation={0} className="slide-up">
      <Typography variant="h4" gutterBottom>
        Loan Application
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Fill all required fields and upload your ID plus selfie image.
      </Typography>
      <LoanForm />
    </Paper>
  );
}

export default ApplyPage;
