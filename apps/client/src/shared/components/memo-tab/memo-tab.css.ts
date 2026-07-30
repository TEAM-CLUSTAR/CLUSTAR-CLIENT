import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = recipe({
  base: {
    display: 'flex',
    padding: '2rem 0.8rem 2rem 0.8rem',
    width: '18.8rem',
    justifyContent: 'flex-start',
    gap: '1rem',
    alignItems: 'center',
    borderBottom: '2.5px solid transparent',
  },

  variants: {
    isSelected: {
      true: {
        borderBottomColor: themeVars.color.blue400,
        color: themeVars.color.blue500,
      },
      false: {
        selectors: {
          '&:hover': {
            borderBottomColor: themeVars.color.grey500,
            color: themeVars.color.grey600,
          },
        },
      },
    },
  },
});

export const icon = style({
  flexShrink: 0,
});

export const memoContainer = style({
  display: 'flex',
  gap: '0.3rem',
  alignItems: 'center',
  minWidth: 0,
  flex: 1,
  color: themeVars.color.grey500,
});

export const closeMemo = style({
  opacity: 0,
  borderRadius: '0.8rem',
  padding: '0.4rem',
  backgroundColor: 'transparent',
  selectors: {
    [`${container.classNames.base}:hover &`]: {
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const memoTitle = recipe({
  base: {
    color: themeVars.color.grey500,
    ...themeVars.fontStyles.body_m_16,
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  variants: {
    isSelected: {
      true: {
        color: themeVars.color.blue500,
      },
      false: {
        selectors: {
          [`${container.classNames.base}:hover &`]: {
            color: themeVars.color.grey600,
          },
        },
      },
    },
  },
});
