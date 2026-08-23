import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '82rem',
  height: '62rem',
  padding: '2rem 1.8rem',
  border: `1px solid ${themeVars.color.grey400}`,
  boxShadow: '0px 0px 24px 8px rgba(0, 0, 0, 0.03)',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '0.8rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const headerTitle = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const body = style({
  display: 'flex',
  gap: '1.2rem',
  flex: 1,
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const selectedLabel = style({
  margin: '1.6rem 0 0.8rem 0',
  ...themeVars.fontStyles.label_m_12,
  color: themeVars.color.grey600,
});

export const treeScroll = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
});

export const footer = style({
  display: 'flex',
  gap: '0.8rem',
  justifyContent: 'flex-end',
  paddingTop: '0.8rem',
});

/** TODO 임시 버튼 공통 버튼 수정후 교체하겠습니다. */
export const cancelButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '12rem',
  height: '3.6rem',
  border: `1px solid ${themeVars.color.grey400}`,
  borderRadius: '8px',
  backgroundColor: themeVars.color.white,
  color: themeVars.color.grey700,
  ...themeVars.fontStyles.body_m_16,
});

export const applyButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12rem',
    height: '3.6rem',
    borderRadius: '8px',
    color: themeVars.color.white,
    ...themeVars.fontStyles.body_m_16,
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: themeVars.color.grey500,
        cursor: 'not-allowed',
      },
      false: {
        backgroundColor: themeVars.color.blue500,
        selectors: {
          '&:hover': {
            backgroundColor: themeVars.color.blue700,
          },
        },
      },
    },
  },
});
