import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = style({
  backgroundColor: themeVars.color.grey50,
  borderRadius: '16px',
  display: 'flex',
  width: '89.6rem',
  height: '78.4rem',
  flexDirection: 'column',
  overflowX: 'clip',
});

export const headerContainer = style({
  height: '100px',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
  position: 'relative',
  padding: '2.8rem 0 1.7rem 4.4rem',
});

export const closeButtonContainer = style({
  position: 'absolute',
  top: '2.8rem',
  right: '2.4rem',
});

export const imageContainer = style({
  padding: '1.9rem 0 1.9rem 4.4rem',
});

export const imageInnerContainer = style({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
  overflowX: 'auto',
  maxWidth: themeVars.width.full,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const textContentContainer = recipe({
  base: {
    overflowY: 'auto',
    flex: '1',
    minHeight: '0',
  },

  variants: {
    isImg: {
      true: {
        padding: '0.8rem 4.4rem 0 4.4rem',
      },

      false: {
        padding: '2.8rem 4.4rem 0 4.4rem',
      },
    },
  },
});

export const fileContainer = style({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
  padding: '3rem 4.4rem 0 4.4rem',
});

export const selectedMemoContainer = style({
  padding: '2.2rem 4.4rem 0 4.4rem',
  gap: '1.1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflow: 'auto',
});

export const selectedMemoCountContainer = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const selectedMemoContentContainer = style({
  display: 'flex',
  gap: '1.2rem',
});

export const aiGenerateButtonContainer = style({
  padding: '2.4rem 4.4rem 4.6rem 4.4rem',
});
