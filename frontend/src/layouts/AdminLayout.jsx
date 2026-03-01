import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Audit Logs", href: "/admin/audit-logs" },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontFamily: "Fraunces, serif" }}>
            Admin Console
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.href}
              component={RouterLink}
              to={item.href}
              selected={location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Stack sx={{ p: 2, mt: "auto" }}>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
