import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const content = style({
  overflow: 'hidden',
  width: '82rem',
  height: '62rem',
  border: `1px solid ${themeVars.color.grey400}`,
  borderRadius: '16px',
  boxShadow: '0 0 24px 8px rgba(0, 0, 0, 0.08)',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: themeVars.color.white,
});

export const body = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    flex: 1,
    minHeight: 0,
  },
  variants: {
    isEmpty: {
      true: {
        padding: 0,
      },
      false: {
        padding: '1.8rem 0.8rem 1.8rem 2rem',
      },
    },
  },
});

export const sectionTitle = style({
  padding: '0 1.4rem',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  paddingRight: '1.2rem',
  paddingLeft: '0.4rem',
  scrollbarWidth: 'thin',
  scrollbarColor: `${themeVars.color.grey300} transparent`,

  selectors: {
    '&::-webkit-scrollbar': {
      width: '0.8rem',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      border: 'none',
      borderRadius: '999px',
      backgroundColor: themeVars.color.grey300,
      backgroundClip: 'border-box',
    },
  },
});

export const emptyStateContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '8.1rem',
});
