import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const sidebarProfileContainer = recipe({
  base: {
    position: 'relative',
    isolation: 'isolate',
    display: 'flex',
    alignItems: 'center',
    width: '22rem',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    selectors: {
      '&::before': {
        position: 'absolute',
        inset: '-2px',
        zIndex: themeVars.zIndex.back,
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
  },
  variants: {
    hasProfileImage: {
      true: {
        gap: '1rem',
        padding: '1rem 1rem',
      },
      false: {
        gap: '0.5rem',
        padding: '1rem 0.4rem',
      },
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

export const profileImage = style({
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '50%',
  objectFit: 'cover',
});
