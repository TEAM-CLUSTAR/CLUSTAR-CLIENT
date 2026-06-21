import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1.8rem',

  padding: '2.4rem',
  width: '38rem',
  minWidth: '34rem',
  height: '22rem',
  borderRadius: '12px',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.grey200}`,
  boxShadow: '0 0 24px 0 rgba(0, 0, 0, 0.03)',

  ':hover': {
    backgroundColor: themeVars.color.grey100,
    cursor: 'pointer',
  },
} as const;

const selectedStyle = {
  border: `1px solid ${themeVars.color.grey400}`,
  backgroundColor: themeVars.color.grey100,
} as const;

const draggingStyle = {
  backgroundColor: themeVars.color.blue50,
  cursor: 'grabbing',
} as const;

const isNewAiSelectedStyle = {
  border: `1px solid ${themeVars.color.grey400}`,
  background: themeVars.color.grey100,
  selectors: {
    '&:hover': {
      border: `1px solid ${themeVars.color.grey400}`,
      background: themeVars.color.grey100,
    },
  },
} as const;

const isNewAiStyle = {
  border: '1px solid transparent',
  background: `
    ${themeVars.color.gradient03} padding-box,
    ${themeVars.color.gradient01} border-box
  `,
  selectors: {
    '&:hover': {
      background: 'none',
      backgroundColor: `${themeVars.color.blue50}`,
      border: `1px solid ${themeVars.color.blue400}`,
    },
  },
} as const;

export const cardContainer = recipe({
  base: baseStyle,
  variants: {
    isSelected: { true: selectedStyle, false: {} },
    isDragging: { true: draggingStyle, false: {} },
    isNewAi: { true: isNewAiStyle, false: {} },
  },
  compoundVariants: [
    {
      variants: { isNewAi: true, isSelected: true },
      style: isNewAiSelectedStyle,
    },
  ],
});

export const mainInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.2rem',
});

export const tagContainer = style({
  display: 'flex',
  gap: '0.8rem',
});

export const contentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.1rem',
});

export const content = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey700,
  whiteSpace: 'wrap',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const subInfoContainer = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey500,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const countContainer = style({
  display: 'flex',
  gap: '0.4rem',
});

export const count = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});
