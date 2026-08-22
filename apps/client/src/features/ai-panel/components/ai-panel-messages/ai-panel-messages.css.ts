import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

const loadingTextShimmer = keyframes({
  '0%': {
    backgroundPosition: '100% 0',
  },
  '100%': {
    backgroundPosition: '-100% 0',
  },
});

export const userMessage = style({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const loadingMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
});

export const loadingMessageText = style({
  backgroundImage: `linear-gradient(90deg, ${themeVars.color.grey500} 0%, ${themeVars.color.grey300} 50%, ${themeVars.color.grey500} 100%)`,
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  animation: `${loadingTextShimmer} 1.4s ease-in-out infinite`,
});
