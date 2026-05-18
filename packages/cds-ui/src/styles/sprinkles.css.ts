import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { color, fontStyles, zIndex } from '@cds/token';

const properties = defineProperties({
  properties: {
    color,
    fontStyles,
    zIndex,
  },
});

export const sprinkles = createSprinkles(properties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
