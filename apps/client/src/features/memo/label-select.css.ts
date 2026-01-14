import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const selectBox = style({
  display: 'flex',

  width: '100%',
  height: '5.2rem',
  paddingLeft: '0.8rem',
  alignItems: 'center',
  gap: '0.8rem',

  backgroundColor: 'transparent',

  ':hover': {
    borderRadius: '8px',
    backgroundColor: themeVars.color.grey200,
  },
});

export const placeholder = style({
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey700,
});

export const chipContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
});

export const dropdown = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',

  padding: '1.8rem 1.4rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '0 0 0.8rem 0.8rem',
  borderRight: `1px solid ${themeVars.color.grey300}`,
  borderBottom: `1px solid ${themeVars.color.grey300}`,
  borderLeft: `1px solid ${themeVars.color.grey300}`,

  //   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', @TODO 전체 박스에 주입
});

export const labelText = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
});
