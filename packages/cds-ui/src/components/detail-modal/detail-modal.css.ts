import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'clip',
  width: '89.6rem',
  height: '78.4rem',
  borderRadius: '16px',
  backgroundColor: themeVars.color.grey50,
});

export const headerContainer = style({
  position: 'relative',
  height: '10rem',
  padding: '2.8rem 0 1.7rem 4.4rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const closeButtonContainer = style({
  position: 'absolute',
  top: '2.8rem',
  right: '2.4rem',
});

export const contentContainer = style({
  flex: '1',
  overflowY: 'auto',
  minHeight: '0',
  scrollbarGutter: 'stable',
});

export const imageContainer = style({
  padding: '0.9rem 0 0.9rem 4.4rem',
  position: 'relative',
  overflowX: 'visible',
});

export const imageInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.4rem',
  overflowX: 'auto',
  maxWidth: themeVars.width.full,
  margin: '-0.5rem 0rem',
  padding: '0.5rem 2rem 0.5rem 0.5rem',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const textContentContainer = recipe({
  variants: {
    isImg: {
      true: {
        padding: '0.8rem 2rem 0 4.4rem',
      },
      false: {
        padding: '2.8rem 2rem 0 4.4rem',
      },
    },
  },
});

export const fileContainer = style({
  padding: '3rem 4.4rem 0.8rem 4.4rem',
});

export const fileInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.4rem',
  overflowX: 'auto',
  maxWidth: themeVars.width.full,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

export const selectedMemoContainer = style({
  padding: '2.2rem 4.4rem 0.8rem 4.4rem',
  gap: '1.1rem',
  display: 'flex',
  flexDirection: 'column',
});

export const selectedMemoContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflowX: 'auto',
  maxWidth: themeVars.width.full,
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

export const selectedMemoCountContainer = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const selectedMemoContentInnerContainer = style({
  display: 'flex',
  gap: '1.2rem',
});

export const createAiMemoButton = style({
  margin: '2.4rem 4.4rem 4.6rem 4.4rem',
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});
