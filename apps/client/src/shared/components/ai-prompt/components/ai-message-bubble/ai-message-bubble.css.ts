import { style } from '@vanilla-extract/css';

import { slideInUp, themeVars } from '@cds/ui';

export const aiMessageBubble = style({
  width: '100%',
  backgroundColor: themeVars.color.white,
  padding: '2.8rem',
  borderRadius: '0 8px 8px 0',
  borderLeft: `3px solid ${themeVars.color.blue300}`,
  animation: `${slideInUp} 0.7s ease-out`,
  whiteSpace: 'pre-wrap',
});
