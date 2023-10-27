import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "html, body": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
