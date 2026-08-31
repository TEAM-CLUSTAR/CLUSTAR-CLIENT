import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  border: 'none',
  backgroundColor: 'transparent',
  padding: '0.4rem',
});
