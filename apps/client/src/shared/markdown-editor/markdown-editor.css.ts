/** 에디터가 만든 블록 엘리먼트에 직접 붙는 클래스. */
import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

const ORDERED_COUNTER = 'markdownOrdered';

/** 숫자 리스트 번호는 CSS 카운터로 매긴다. */
const block = style({
  margin: 0,
  selectors: {
    '&:not(:first-child)': {
      marginTop: '0.4rem',
    },
    '&:not([data-block="ordered"])': {
      counterReset: ORDERED_COUNTER,
    },
  },
});

const marker = {
  position: 'absolute',
  color: themeVars.color.grey700,
} as const;

export const container = style({
  position: 'relative',
  counterReset: ORDERED_COUNTER,
  selectors: {
    '&[data-empty="true"]::before': {
      content: 'attr(data-placeholder)',
      position: 'absolute',
      color: themeVars.color.grey400,
      pointerEvents: 'none',
    },
  },
});

export const paragraph = block;

export const heading1 = style([
  block,
  {
    ...themeVars.fontStyles.title_sb_24,
    selectors: { '&:not(:first-child)': { marginTop: '1.6rem' } },
  },
]);

export const heading2 = style([
  block,
  {
    ...themeVars.fontStyles.title_sb_20,
    selectors: { '&:not(:first-child)': { marginTop: '1.2rem' } },
  },
]);

export const heading3 = style([
  block,
  {
    ...themeVars.fontStyles.title_sb_18,
    selectors: { '&:not(:first-child)': { marginTop: '0.8rem' } },
  },
]);

export const quote = style([
  block,
  {
    paddingLeft: '1.2rem',
    borderLeft: `3px solid ${themeVars.color.grey300}`,
    color: themeVars.color.grey700,
  },
]);

export const bullet = style([
  block,
  {
    position: 'relative',
    paddingLeft: '1.6rem',
    selectors: {
      '&::before': { ...marker, content: '•', left: '0.4rem' },
    },
  },
]);

export const ordered = style([
  block,
  {
    position: 'relative',
    paddingLeft: '1.6rem',
    counterIncrement: ORDERED_COUNTER,
    selectors: {
      '&::before': {
        ...marker,
        content: `counter(${ORDERED_COUNTER}) '.'`,
        left: 0,
      },
    },
  },
]);

export const divider = style([
  block,
  {
    border: 0,
    borderTop: `1px solid ${themeVars.color.grey200}`,
    selectors: { '&:not(:first-child)': { marginTop: '1.2rem' } },
    marginBottom: '1.2rem',
  },
]);

export const code = style({
  ...themeVars.fontStyles.body_m_14,
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  backgroundColor: themeVars.color.grey100,
});
