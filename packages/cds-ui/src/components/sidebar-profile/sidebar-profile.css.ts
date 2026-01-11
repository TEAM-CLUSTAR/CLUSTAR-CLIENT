import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const sidebarProfileContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '22rem',
  padding: '1rem 0.4rem',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  selectors: {
    '&::before': {
      position: 'absolute',
      inset: '-2px',
      zIndex: themeVars.zIndex.deep,
      background: themeVars.color.gradient02,
      borderRadius: '8px',
      pointerEvents: 'none',
      content: '',
    },
    '&::after': {
      position: 'absolute',
      inset: '-2px',
      zIndex: themeVars.zIndex.back,
      border: '1px solid transparent',
      background: themeVars.color.gradient03,
      borderRadius: '8px',
      backgroundClip: 'content-box',
      pointerEvents: 'none',
      content: '',
    },
  },
});

export const userInfoTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  flex: 1,
});

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const userId = style({
  ...themeVars.fontStyles.body_sb_16,
  color: themeVars.color.grey700,
  ...ellipsisStyle,
});

export const userEmail = style({
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey500,
  ...ellipsisStyle,
});
