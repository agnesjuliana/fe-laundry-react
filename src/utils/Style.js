import { createTheme } from "@mui/material";

const mdTheme = createTheme(
  {
    palette: {
      primary: {
        soft: '#f3e5f5',
        light: '#af52bf',
        main: '#9c27b0',
        dark: '#6d1b7b',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#f73378',
        main: '#f50057',
        dark: '#ab003c',
        contrastText: '#ffffff',
      },
      action: {
          hover: '#f3e5f5'
      }
    },
  }
)

export default mdTheme
