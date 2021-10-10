import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@material-ui/core/styles';
//
import shape from './shape';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#00AB55',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#2c80ff',
          main: '#2c80ff',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#fff',
        },
        third: {
          light: '#000',
          main: '#000',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#000',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
      shape,
      typography,
      breakpoints,
      shadows,
      customShadows
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
