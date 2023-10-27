import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

/**
 * Creates a theme object with custom styles for the app.
 *
 * @param {Object} options - The options object for the theme.
 * @param {Object} options.typography - The typography options for the theme.
 * @param {string} options.typography.fontFamily - The font family to use for the theme.
 * @param {Object} options.components - The component options for the theme.
 * @param {Object} options.components.MuiCssBaseline - The MuiCssBaseline component options for the theme.
 * @param {Object} options.components.MuiCssBaseline.styleOverrides - The style overrides for the MuiCssBaseline component.
 * @param {Object} options.components.MuiCssBaseline.styleOverrides["@global"] - The global style overrides for the MuiCssBaseline component.
 * @param {Object} options.components.MuiCssBaseline.styleOverrides["@global"].html - The HTML style overrides for the MuiCssBaseline component.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].html.height - The height of the HTML element.
 * @param {Object} options.components.MuiCssBaseline.styleOverrides["@global"].body - The body style overrides for the MuiCssBaseline component.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].body.height - The height of the body element.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].body.margin - The margin of the body element.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].body.display - The display property of the body element.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].body.alignItems - The align-items property of the body element.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"].body.justifyContent - The justify-content property of the body element.
 * @param {Object} options.components.MuiCssBaseline.styleOverrides["@global"]["#root"] - The #root style overrides for the MuiCssBaseline component.
 * @param {string} options.components.MuiCssBaseline.styleOverrides["@global"]["#root"].height - The height of the #root element.
 *
 * @returns {Object} The theme object.
 */

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          html: {
            height: "100%",
          },
          body: {
            height: "100%",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "#root": {
            height: "100%",
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
