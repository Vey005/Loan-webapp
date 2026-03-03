import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import LoanForm from "../../components/public/LoanForm";

const applyPageImage = "https://images.pexels.com/photos/12934369/pexels-photo-12934369.jpeg?auto=compress&cs=tinysrgb&w=1200";

function ApplyPage() {
  return (
    <Stack spacing={3} className="section-reveal">
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: "1px solid", borderColor: "divider" }}>
        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Start your application
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Complete the form with accurate details and upload your ID plus selfie image. Submissions with complete
              information are reviewed faster.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={applyPageImage}
              alt="Ghanaian professional woman in Accra"
              loading="lazy"
              sx={{
                width: "100%",
                height: { xs: 180, md: 160 },
                objectFit: "cover",
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: "1px solid", borderColor: "divider" }}>
        <LoanForm />
      </Paper>
    </Stack>
  );
}

export default ApplyPage;
