import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const filterButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 1.2rem 0.4rem 0.8rem',
    borderRadius: '8px',
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: themeVars.color.blue50,
        border: `1px solid ${themeVars.color.blue400}`,
      },
      false: {
        border: `1px solid ${themeVars.color.grey400}`,
      },
    },
  },
});

export const label = recipe({
  base: {
    ...themeVars.fontStyles.body_m_16,
  },
  variants: {
    isActive: {
      true: {
        color: themeVars.color.blue500,
      },
      false: {
        color: themeVars.color.grey700,
      },
    },
  },
});
