import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(0.8rem)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const chatArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.6rem',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  flex: 1,
  minHeight: 0,
});

export const emptyText = recipe({
  base: {
    ...themeVars.fontStyles.title_m_20,
    color: themeVars.color.grey400,
  },
  variants: {
    isDragOver: {
      true: {
        color: themeVars.color.blue500,
      },
    },
  },
});

export const userMessage = style({
  alignSelf: 'flex-end',
  maxWidth: '36rem',
  padding: '1.6rem 1.8rem',
  borderRadius: '12px 4px 12px 12px',
  backgroundColor: themeVars.color.grey50,
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  whiteSpace: 'pre-wrap',
});

export const loadingMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  color: themeVars.color.grey500,
  ...themeVars.fontStyles.body_m_14,
  animation: `${fadeInUp} 240ms ease-out`,
});
