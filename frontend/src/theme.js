import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#154e75",
      dark: "#103a56",
      light: "#dce7ef",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b87432",
      dark: "#8f5a2a",
    },
    text: {
      primary: "#1d2731",
      secondary: "#5a6773",
    },
    background: {
      default: "#f3f4f1",
      paper: "#ffffff",
    },
    divider: "#d6dde3",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    h1: {
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 600,
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: "'Source Serif 4', serif",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: "1rem",
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "0 10px 20px rgba(21, 78, 117, 0.18)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "hidden",
        },
      },
    },
  },
});

export default theme;
