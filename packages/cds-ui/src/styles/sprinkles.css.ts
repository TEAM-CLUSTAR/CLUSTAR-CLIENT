import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokens } from '../token';

const properties = defineProperties({
  properties: tokens,
});

export const sprinkles = createSprinkles(properties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
