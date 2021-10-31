import { createTheme } from '@mui/material/styles';

const bodyFontFamily = 'sans-serif';
const headingFontFamily = ['Rubik', bodyFontFamily].join(', ');
const headingStyles = {
  fontFamily: headingFontFamily,
  fontWeight: 700,
  lineHeight: '1.3',
};

export const THEME = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          marginTop: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          '@media print': {
            display: 'none',
          },
        },
      },
    },
  },
  // https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=407088&secondary.color=ffb5b5&secondary.text.color=000000&primary.text.color=ffffff
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#09455b',
      light: '#6f9eb8',
      main: '#407088',
    },
    secondary: {
      contrastText: '#000',
      dark: '#ca8585',
      light: '#ffe8e7',
      main: '#ffb5b5',
    },
  },
  typography: {
    body1: { fontSize: '1.1429rem', lineHeight: '1.3' },
    body2: { fontSize: '1rem', lineHeight: '1.3' },
    fontFamily: bodyFontFamily,
    h1: { ...headingStyles, fontSize: '3rem' },
    h2: { ...headingStyles, fontSize: '2rem' },
    h3: { ...headingStyles, fontSize: '1.2rem' },
    h4: headingStyles,
    h5: headingStyles,
    h6: headingStyles,
    htmlFontSize: 12,
    subtitle1: headingStyles,
    subtitle2: headingStyles,
  },
  zIndexCustom: {
    planEditorTopBar: 2,
  },
});

export const RTL_THEME = createTheme(THEME, {
  direction: 'rtl',
});
