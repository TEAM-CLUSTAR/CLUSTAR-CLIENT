import { style } from '@vanilla-extract/css';

import { color, spacing } from '@cds/token/v2';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  // TODO: Figma에서 공백 문자로 간격을 표현, v2 spacing 미적용
  gap: spacing[8],
  // TODO: 하단 여백(42px)이 Figma 하드코딩 값
  paddingBottom: '4.2rem',
});

// TODO: Figma에서 v2 typography 미적용 (12px Regular, line-height normal)
const footerText = style({
  fontSize: '1.2rem',
  fontWeight: 400,
  lineHeight: 'normal',
  color: color.text.secondary,
});

export const text = style([footerText]);

export const dot = style([footerText]);
