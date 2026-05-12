import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    spacing: 10,
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#9c27b0' : '#ce93d8',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: 'var(--font-space-grotesk), sans-serif',
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 400,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.6rem',
        lineHeight: 1.25,
      },
      body1: {
        lineHeight: 1.55,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            textTransform: 'none',
            fontWeight: 500,
            padding: '6px 16px',
          },
        },
      },
    },
  })