import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeIn, themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
});

export const listContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.4rem 0.4rem 0.4rem 1.2rem',
    borderRadius: '8px',
    width: '44rem',
    height: '4rem',
    gap: '0.4rem',
  },
  variants: {
    isOpen: {
      true: {
        color: themeVars.color.blue500,
        border: `1px solid ${themeVars.color.blue400}`,
        backgroundColor: themeVars.color.blue50,
      },
      false: {
        color: themeVars.color.grey700,
        border: `1px solid transparent`,
        backgroundColor: themeVars.color.grey100,
      },
    },
  },
});

export const title = style({
  width: '100%',
  color: 'inherit',
  ...themeVars.fontStyles.body_m_16,
});

export const chevronButton = recipe({
  base: {
    width: '3.2rem',
    height: '3.2rem',
    padding: '0.6rem',
    aspectRatio: '1/1',
  },
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
      false: {},
    },
  },
});

export const itemsContainer = style({
  position: 'absolute',
  marginTop: '0.4rem',
  zIndex: themeVars.zIndex.button,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.grey300}`,
  gap: '0.4rem',
  padding: '1.2rem',
  borderRadius: '8px',
  width: '44rem',
  animation: `${fadeIn} 0.2s ease-out`,
});

export const itemContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0 0.4rem',
    width: '41.6rem',
    height: '3.6rem',
    borderRadius: '8px',
  },
  variants: {
    isDisabled: {
      true: {
        backgroundColor: 'transparent',
      },
      false: {
        backgroundColor: themeVars.color.white,
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.grey100,
          },
        },
      },
    },
  },
});

export const memo = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey800,
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const addMemo = recipe({
  base: {
    borderRadius: '4px',
  },
  variants: {
    isDisabled: {
      true: {},
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.grey200,
          },
        },
      },
    },
  },
});
