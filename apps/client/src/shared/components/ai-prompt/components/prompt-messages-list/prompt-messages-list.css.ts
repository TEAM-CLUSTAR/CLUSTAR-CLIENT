import { style } from '@vanilla-extract/css';
import { keyframes } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const gradientShift = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  flex: 1,
  overflowY: 'auto',
  margin: '1.2rem 0 1.8rem 0',
  scrollBehavior: 'smooth',
});

export const messageContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const loadingSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const loadingText = style({
  ...themeVars.fontStyles.body_m_14,
  background: `linear-gradient(90deg, ${themeVars.color.grey600} 0%, ${themeVars.color.grey400} 50%, ${themeVars.color.grey600} 100%)`,
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: `${gradientShift} 2s ease-in-out infinite`,
});
