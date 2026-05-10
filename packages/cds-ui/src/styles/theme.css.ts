import { createTheme } from '@vanilla-extract/css';

import { color, fontStyles, zIndex } from '@cds/token';

export const [themeClass, themeVars] = createTheme({
  color,
  fontStyles,
  zIndex,
});
