import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.2rem',
});

export const title = style({
  display: 'flex',
  alignItems: 'center',
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey800,
  paddingLeft: '0.4rem',
  paddingRight: '1.2rem',
});

export const actions = style({
  display: 'flex',
  marginLeft: 'auto',
});

export const actionContainer = style({
  position: 'relative',
  display: 'flex',
});

export const actionButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '8px',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.grey100,
    },
  },
});

export const tooltip = recipe({
  base: {
    position: 'absolute',
    top: 'calc(100% + 0.4rem)',
    zIndex: themeVars.zIndex.tooltip,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 120ms ease',
    selectors: {
      [`${actionContainer}:hover &`]: {
        opacity: 1,
      },
      [`${actionContainer}:focus-within &`]: {
        opacity: 1,
      },
    },
  },
  variants: {
    align: {
      center: {
        left: '50%',
        transform: 'translateX(-50%)',
      },
      end: {
        right: 0,
      },
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export const content = style({
  width: '100%',
  padding: '1.6rem 1.8rem',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  overflowWrap: 'anywhere',
  counterReset: 'aiAnswerOrdered',
});

globalStyle(`${content} [data-block]`, {
  margin: 0,
});

globalStyle(`${content} [data-block]:not(:first-child)`, {
  marginTop: '0.4rem',
});

globalStyle(`${content} [data-block="heading1"]`, {
  ...themeVars.fontStyles.title_sb_20,
});

globalStyle(`${content} [data-block="heading2"]`, {
  ...themeVars.fontStyles.title_sb_18,
});

globalStyle(`${content} [data-block="heading3"]`, {
  ...themeVars.fontStyles.body_sb_16,
});

globalStyle(`${content} [data-block^="heading"]:not(:first-child)`, {
  marginTop: '1.2rem',
});

globalStyle(`${content} [data-block="quote"]`, {
  paddingLeft: '1.2rem',
  borderLeft: `3px solid ${themeVars.color.grey300}`,
  color: themeVars.color.grey700,
});

globalStyle(`${content} [data-block="bullet"]`, {
  position: 'relative',
  paddingLeft: '1.6rem',
});

globalStyle(`${content} [data-block="bullet"]::before`, {
  content: '•',
  position: 'absolute',
  left: '0.4rem',
  color: themeVars.color.grey700,
});

globalStyle(`${content} [data-block="ordered"]`, {
  position: 'relative',
  paddingLeft: '1.8rem',
  counterIncrement: 'aiAnswerOrdered',
});

globalStyle(`${content} [data-block="ordered"]::before`, {
  content: "counter(aiAnswerOrdered) '.'",
  position: 'absolute',
  left: 0,
  color: themeVars.color.grey700,
});

globalStyle(`${content} [data-block]:not([data-block="ordered"])`, {
  counterReset: 'aiAnswerOrdered',
});

globalStyle(`${content} code`, {
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  backgroundColor: themeVars.color.grey100,
  ...themeVars.fontStyles.body_m_14,
  fontFamily: 'monospace',
});

globalStyle(`${content} [data-block="divider"]`, {
  marginTop: '1.2rem',
  marginBottom: '1.2rem',
  border: 0,
  borderTop: `1px solid ${themeVars.color.grey200}`,
});
