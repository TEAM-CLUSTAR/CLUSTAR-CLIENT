import { style } from '@vanilla-extract/css';

export const workspace = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: 0,
});

export const content = style({
  flex: 1,
  minHeight: 0,
});
