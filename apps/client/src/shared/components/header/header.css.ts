import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'inline-flex',
  justifyContent: 'center',
  width: '100%',
});

export const container = style({
  display: 'flex',

  gap: '5.6rem',
  width: '100rem',
  padding: '3.2rem 0 1.6rem 0',
});
