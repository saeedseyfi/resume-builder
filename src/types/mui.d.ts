import '@mui/material/styles';

declare module '@mui/material/styles' {
  // material does not allow editing the current zIndex options, we had to create a custom config

  interface Theme {
    zIndexCustom: {
      planEditorTopBar: number;
    };
  }

  interface ThemeOptions {
    zIndexCustom: {
      planEditorTopBar?: number;
    };
  }
}
