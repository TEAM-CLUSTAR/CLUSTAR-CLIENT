import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const row = recipe({
  base: {
    display: 'flex',
    padding: '0.4rem',
    height: '4rem',

    ':hover': {
      backgroundColor: themeVars.color.grey100,
      borderRadius: '8px',
    },
  },
  variants: {
    showDivider: {
      true: {
        borderBottom: `1px solid ${themeVars.color.grey100}`,
      },
    },
  },
});

export const expandButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.6rem',
    borderRadius: '50%',
    transition: 'background-color 0.15s ease',

    ':hover': {
      backgroundColor: themeVars.color.grey200,
    },
  },
  variants: {
    isExpanded: {
      true: {
        backgroundColor: themeVars.color.grey200,
      },
    },
  },
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1',
});

export const checkboxBox = style({
  margin: '0.4rem',
});

export const tagName = style({
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey700,
  minWidth: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const branchContainer = recipe({
  base: {
    display: 'grid',
    gridTemplateRows: '0fr',
    transition: 'grid-template-rows 0.2s ease',
  },
  variants: {
    isExpanded: {
      true: {
        gridTemplateRows: '1fr',
      },
    },
  },
});

export const branchInner = style({
  overflow: 'hidden',
});
