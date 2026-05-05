import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const title = style({
  ...themeVars.fontStyles.body_sb_14,
  color: themeVars.color.white,
});

export const description = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey200,
});
