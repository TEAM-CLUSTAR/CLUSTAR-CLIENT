import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

const opacityShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const opacityHide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: themeVars.zIndex.modalOverlay,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100vw',
  height: '100vh',
  backgroundColor: themeVars.color.opacity35,
  selectors: {
    '&[data-state="open"]': {
      animation: `${opacityShow} 100ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${opacityHide} 100ms ease-in forwards`,
    },
  },
});

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '44.4rem',
  height: '27.2rem',
  borderRadius: '16px',

  backgroundColor: themeVars.color.grey50,
  boxShadow: `0 0 12px 0 rgba(0, 0, 0, 0.25)`,
});

export const close = style({
  position: 'absolute',
  top: '1.6rem',
  right: '1.6rem',
  cursor: 'pointer',
});

export const title = style({
  paddingTop: '0.8rem',
  ...themeVars.fontStyles.title_sb_20,
  color: themeVars.color.black,
});

export const description = style({
  paddingTop: '0.8rem',
  ...themeVars.fontStyles.title_m_18,
  color: themeVars.color.grey600,
});

export const buttonContainer = style({
  display: 'flex',
  gap: '1.2rem',
  paddingTop: '2.5rem',
});
