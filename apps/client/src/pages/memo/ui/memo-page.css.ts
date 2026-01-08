import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  ...themeVars.fontStyles.display_sb_36,
  backgroundImage: themeVars.color.gradient02,
});
