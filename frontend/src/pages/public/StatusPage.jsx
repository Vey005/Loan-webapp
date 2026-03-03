import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import StatusCheckForm from "../../components/public/StatusCheckForm";

const statusPageImage = "https://images.pexels.com/photos/11680701/pexels-photo-11680701.jpeg?auto=compress&cs=tinysrgb&w=1200";

function StatusPage() {
  return (
    <Stack spacing={3} className="section-reveal">
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: "1px solid", borderColor: "divider" }}>
        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Track your application
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Enter the same phone number or email used during submission, plus your national ID number, to see your
              latest status.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={statusPageImage}
              alt="Ghanaian woman using a smartphone"
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
        <StatusCheckForm />
      </Paper>
    </Stack>
  );
}

export default StatusPage;
