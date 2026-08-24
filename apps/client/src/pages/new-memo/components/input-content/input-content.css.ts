import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const editor = style({
  ...themeVars.fontStyles.body_m_16,
  width: '100%',
  padding: '1.2rem 1.6rem',
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.grey200}`,
  backgroundColor: themeVars.color.white,
  height: '44.5rem',
  overflow: 'auto',
  outline: 'none',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  selectors: {
    '&:focus': {
      borderColor: themeVars.color.blue400,
    },
    '&[data-empty="true"]::before': {
      content: 'attr(data-placeholder)',
      color: themeVars.color.grey500,
      whiteSpace: 'pre-wrap',
      pointerEvents: 'none',
      display: 'block',
      height: 0,
    },
  },
});
