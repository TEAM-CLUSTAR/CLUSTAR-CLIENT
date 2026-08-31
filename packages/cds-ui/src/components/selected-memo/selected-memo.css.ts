import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '4rem',
  maxWidth: '16.5rem',
  padding: '0 1.2rem 0 0.8rem',
  border: `1px solid ${themeVars.color.blue300}`,
  borderColor: themeVars.color.blue300,
  borderRadius: '8px',
  backgroundColor: themeVars.color.blue50,
});

export const name = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.blue500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  minWidth: 0,
});
