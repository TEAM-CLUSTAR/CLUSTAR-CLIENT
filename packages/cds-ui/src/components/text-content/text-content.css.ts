import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    width: themeVars.width.full,
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    type: {
      detail: {
        gap: '2.8rem',
      },
      prompt: {
        gap: '2rem',
      },
    },
  },
});

export const headerContainer = style({
  gap: '1.2rem',
  display: 'flex',
  alignItems: 'center',
});
export const icon = style({
  backgroundColor: themeVars.color.blue50,
  borderRadius: '8px',
});

export const aiSummary = style({
  ...themeVars.fontStyles.label_sb_12,
  padding: '0 0.2rem',
  color: themeVars.color.blue400,
});

export const content = style({
  width: themeVars.width.full,
  whiteSpace: 'pre-wrap',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
});
