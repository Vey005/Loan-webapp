import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f97316",
    },
    background: {
      default: "#f7f9f8",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
    h1: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 700,
    },
  },
});

export default theme;
