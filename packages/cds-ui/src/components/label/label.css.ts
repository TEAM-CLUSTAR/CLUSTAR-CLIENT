import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const LABEL_CONTAINER_COLORS = {
  blue: {
    color: themeVars.color.label03,
    backgroundColor: themeVars.color.label04,
  },
  purple: {
    color: themeVars.color.label01,
    backgroundColor: themeVars.color.label02,
  },
  green: {
    color: themeVars.color.label05,
    backgroundColor: themeVars.color.label06,
  },
  pink: {
    color: themeVars.color.label07,
    backgroundColor: themeVars.color.label08,
  },
  grey: {
    color: themeVars.color.grey700,
    backgroundColor: themeVars.color.grey200,
  },
} as const;

const LABEL_INDICATOR_COLORS = {
  blue: { backgroundColor: themeVars.color.label03 },
  purple: { backgroundColor: themeVars.color.label01 },
  green: { backgroundColor: themeVars.color.label05 },
  pink: { backgroundColor: themeVars.color.label07 },
  grey: { backgroundColor: themeVars.color.grey700 },
} as const;

export const labelContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    borderRadius: '4px',
    width: 'fit-content',
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
      false: {
        cursor: 'default',
      },
    },
    labelSize: {
      lg: {
        ...themeVars.fontStyles.body_m_14,
        height: '2.1rem',
        padding: '0 0.8rem',
      },
      sm: {
        ...themeVars.fontStyles.label_m_12,
        height: '1.6rem',
        padding: '0 0.6rem',
      },
    },
    labelColor: LABEL_CONTAINER_COLORS,
  },
});

export const labelIndicator = recipe({
  variants: {
    labelSize: {
      lg: {
        width: '0.8rem',
        height: '0.8rem',
        borderRadius: '2px',
      },
      sm: {
        width: '0.6rem',
        height: '0.6rem',
        borderRadius: '1px',
      },
    },
    labelColor: LABEL_INDICATOR_COLORS,
  },
});
