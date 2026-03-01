import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Apply", href: "/apply" },
  { label: "Track Status", href: "/status" },
];

function PublicLayout() {
  const location = useLocation();

  return (
    <Box className="fade-in">
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: "1px solid #d9e5e2" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1.5 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "Fraunces, serif" }}>
              Easy Loans
            </Typography>
            <Stack direction="row" spacing={1}>
              {links.map((item) => (
                <Button
                  key={item.href}
                  component={RouterLink}
                  to={item.href}
                  color={location.pathname === item.href ? "primary" : "inherit"}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default PublicLayout;
