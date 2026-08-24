import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
  width: '100%',
});

export const listContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.4rem 0.4rem 0.4rem 1.2rem',
    borderRadius: '8px',
    width: '100%',
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
  textAlign: 'left',
});

export const chevronButton = recipe({
  base: {
    width: '3.2rem',
    height: '3.2rem',
    padding: '0.6rem',
  },
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

export const itemsContainer = recipe({
  base: {
    position: 'absolute',
    top: '4rem',
    left: 0,
    zIndex: themeVars.zIndex.button,
    marginTop: '0.4rem',
    flexDirection: 'column',
    backgroundColor: themeVars.color.white,
    border: `1px solid ${themeVars.color.grey300}`,
    gap: '0.8rem',
    padding: '1.2rem',
    borderRadius: '8px',
    width: '100%',
  },
  variants: {
    isOpen: {
      true: {
        display: 'flex',
      },
      false: {
        display: 'none',
      },
    },
  },
});

export const itemContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0 0.4rem',
  width: '100%',
  height: '3.6rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
    '&:has(button:hover):hover, &:has(button:focus):hover': {
      backgroundColor: themeVars.color.white,
    },
  },
});

export const memo = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey800,
  flex: 1,
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const addMemo = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginLeft: 'auto',
    gap: '0.2rem',
    height: '2.4rem',
    padding: '0.4rem 0.4rem 0.4rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid transparent',
    ...themeVars.fontStyles.label_m_12,
  },
  variants: {
    isSelected: {
      true: {
        color: themeVars.color.white,
        backgroundColor: themeVars.color.blue500,
        borderColor: themeVars.color.blue300,
        cursor: 'default',
      },
      false: {
        color: themeVars.color.grey700,
        backgroundColor: themeVars.color.grey100,
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.grey200,
          },
        },
      },
    },
  },
});
