import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const applicationId = location.state?.applicationId;

  return (
    <Paper
      elevation={0}
      className="section-reveal"
      sx={{ p: { xs: 3, md: 5 }, textAlign: "center", border: "1px solid", borderColor: "divider" }}
    >
      <Stack spacing={2.5} alignItems="center">
        <Box
          sx={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            backgroundColor: "primary.light",
            color: "primary.main",
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 34 }} />
        </Box>

        <Typography variant="h3">Application received</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.7 }}>
          Thank you for submitting your information. Your request is now in review, and you can check progress any time
          from the status page.
        </Typography>

        {applicationId ? (
          <Typography sx={{ fontWeight: 600 }}>
            Reference ID: <Box component="span" sx={{ color: "primary.main" }}>{applicationId}</Box>
          </Typography>
        ) : null}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button component={RouterLink} to="/status" variant="contained">
            Track status
          </Button>
          <Button component={RouterLink} to="/" variant="outlined">
            Return home
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SuccessPage;
