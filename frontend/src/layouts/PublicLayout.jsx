import { AppBar, Box, Button, Container, Divider, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Apply", href: "/apply" },
  { label: "Track Status", href: "/status" },
];

function PublicLayout() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <Box className="page-enter">
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(243, 244, 241, 0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "space-between",
              py: { xs: 1, md: 0 },
            }}
          >
            <Stack spacing={0.2}>
              <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                Easy Loans
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Personal Loan Portal
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              {links.map((item) => {
                const isActive = location.pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    component={RouterLink}
                    to={item.href}
                    variant={isActive ? "contained" : "text"}
                    color={isActive ? "primary" : "inherit"}
                    sx={isActive ? undefined : { color: "text.primary" }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, minHeight: "calc(100vh - 248px)" }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "#ffffffb0" }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Easy Loans
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A secure portal for submitting applications and checking progress.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Need assistance? Please use the contact details provided by your loan officer.
            </Typography>
            <Divider />
            <Typography variant="caption" color="text.secondary">
              {currentYear} Easy Loans. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default PublicLayout;
