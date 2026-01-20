import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    width: themeVars.width.full,
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    type: {
      detail: {
        gap: '2.8rem',
      },
      prompt: {
        gap: '2rem',
      },
    },
  },
});

export const headerContainer = style({
  gap: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  minWidth: 0, // flex 아이템이 축소될 수 있도록
});

export const titleWrapper = style({
  flex: 1,
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0, // flex 아이템이 축소될 수 있도록
  },
  variants: {
    isAiResult: {
      true: { gap: '0.4rem' },
      false: {},
    },
  },
});

export const titleTextWrapper = style({
  flex: 1,
  minWidth: 0, // 제목이 넘칠 때 ellipsis가 작동하도록
  overflow: 'hidden',
});

export const icon = style({
  backgroundColor: themeVars.color.blue50,
  borderRadius: '8px',
});

export const aiSummary = style({
  ...themeVars.fontStyles.label_sb_12,
  padding: '0 0.2rem',
  color: themeVars.color.blue400,
});

export const content = style({
  width: themeVars.width.full,
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
});

globalStyle(`${content} h1`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
  fontSize: '2rem',
});

globalStyle(`${content} h2`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
  fontSize: '1.75rem',
});

globalStyle(`${content} h3`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

globalStyle(`${content} h4`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
});

globalStyle(`${content} h5`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
});

globalStyle(`${content} h6`, {
  marginTop: '1.6rem',
  marginBottom: '0.8rem',
  fontWeight: 'bold',
});

globalStyle(`${content} p`, {
  marginBottom: '1rem',
  lineHeight: '1.6',
});

globalStyle(`${content} ul`, {
  marginLeft: '2rem',
  marginBottom: '1rem',
});

globalStyle(`${content} ol`, {
  marginLeft: '2rem',
  marginBottom: '1rem',
});

globalStyle(`${content} li`, {
  marginBottom: '0.5rem',
});

globalStyle(`${content} blockquote`, {
  borderLeft: `4px solid ${themeVars.color.grey300}`,
  paddingLeft: '1.6rem',
  marginLeft: 0,
  marginBottom: '1rem',
  fontStyle: 'italic',
  color: themeVars.color.grey600,
});

globalStyle(`${content} code`, {
  backgroundColor: themeVars.color.grey100,
  padding: '0.2rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: 'monospace',
});

globalStyle(`${content} pre`, {
  backgroundColor: themeVars.color.grey100,
  padding: '1.6rem',
  borderRadius: '8px',
  overflow: 'auto',
  marginBottom: '1rem',
});

globalStyle(`${content} pre code`, {
  backgroundColor: 'transparent',
  padding: 0,
});

globalStyle(`${content} a`, {
  color: themeVars.color.blue500,
  textDecoration: 'underline',
});

globalStyle(`${content} a:hover`, {
  color: themeVars.color.blue600,
});

globalStyle(`${content} img`, {
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '1rem',
});

globalStyle(`${content} hr`, {
  border: 'none',
  borderTop: `1px solid ${themeVars.color.grey300}`,
  margin: '2rem 0',
});
