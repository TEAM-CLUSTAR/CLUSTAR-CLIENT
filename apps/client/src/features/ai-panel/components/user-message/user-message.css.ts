import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { slideInUp, themeVars } from '@cds/ui';

export const bubbleBox = style({
  display: 'inline-flex',
  flexDirection: 'column',
  padding: '1.6rem 1.8rem',
  borderRadius: '12px 4px 12px 12px',
  backgroundColor: themeVars.color.grey50,
  animation: `${slideInUp} 0.4s ease-out`,
  ...themeVars.fontStyles.body_m_16,
  maxWidth: '36rem',
  color: themeVars.color.grey800,
  gap: '1rem',
});

export const textContent = recipe({
  base: {
    overflow: 'hidden',
    whiteSpace: 'normal',
  },
  variants: {
    isExpanded: {
      false: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
      },
    },
  },
});

export const toggleBtn = style({
  display: 'flex',
  color: themeVars.color.grey500,
  ...themeVars.fontStyles.body_m_14,
});
