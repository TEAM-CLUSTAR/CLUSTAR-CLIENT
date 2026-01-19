import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const editor = style({
  ...themeVars.fontStyles.body_m_16,
  width: '100%',
  padding: '1.2rem 1.6rem',
  borderRadius: '8px',
  border: `1px solid ${themeVars.color.grey200}`,
  backgroundColor: themeVars.color.white,
  height: '44.5rem',
  overflow: 'auto',
});

const Q = '[data-quill-scope]';

globalStyle(`${Q} :where(.ql-container.ql-snow)`, {
  border: '0 !important',
  fontFamily: 'inherit',
  background: 'transparent !important',
});

globalStyle(`${Q} .ql-editor`, {
  padding: '0 !important',
  margin: '0 !important',
  ...themeVars.fontStyles.body_m_16,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
});

// typography reset (color는 건드리지 않기)
globalStyle(`${Q} :where(.ql-editor *)`, {
  fontFamily: 'inherit',
});

globalStyle(`${Q} :where(.ql-editor p)`, {
  margin: '0.6rem 0',
});

globalStyle(`${Q} :where(.ql-editor h1, .ql-editor h2, .ql-editor h3)`, {
  display: 'block',
  lineHeight: '1.25',
  padding: 0,
  margin: 0,
});

globalStyle(`${Q} :where(.ql-editor blockquote)`, {
  borderLeft: `4px solid ${themeVars.color.grey300}`,
  background: themeVars.color.grey100,
  borderRadius: '0 8px 8px 0',
});

globalStyle(`${Q} :where(.ql-editor ul)`, {
  margin: '0.8rem 0',
  paddingLeft: '1.8rem',
});
globalStyle(`${Q} :where(.ql-editor ol)`, {
  margin: '0.8rem 0',
  paddingLeft: '1.8rem',
});
globalStyle(`${Q} :where(.ql-editor li)`, {
  margin: '0.3rem 0',
  padding: 0,
});

globalStyle(`${Q} :where(.ql-editor .ql-underline)`, {
  textDecoration: 'underline',
});

globalStyle(`${Q} :where(.ql-editor em)`, {
  fontStyle: 'normal',
});

globalStyle(`${Q} .ql-editor.ql-blank::before`, {
  ...themeVars.fontStyles.body_m_16,
  fontStyle: 'normal',
  color: themeVars.color.grey500,
});

globalStyle(`${Q} .ql-editor.ql-blank:focus::before`, {
  opacity: 0,
});

globalStyle('[data-quill-scope] .ql-editor hr', {
  border: 'none',
  borderTop: `1px solid ${themeVars.color.grey200}`,
  pointerEvents: 'none',
});
