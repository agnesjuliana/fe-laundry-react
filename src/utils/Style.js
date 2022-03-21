import { createTheme } from "@mui/material";

const mdTheme = createTheme(
  {
    palette: {
      primary: {
        soft: '#e3f2fd',
        light: '#6ec5ff',
        main: '#2196f3',
        dark: '#0068bf',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#ffffb3',
        main: '#ffe082',
        dark: '#caae53',
        contrastText: '#ffffff',
      },
      action: {
        hover: '#e1f5fe'
      }
    },
  }
)

export default mdTheme
