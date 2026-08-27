import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4rem 0 2.4rem 0',
  gap: '2.4rem',
});

export const titleFilterRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});
