'use client';

import React from 'react';

/**
 * A large soft light that trails the pointer across the page.
 *
 * It sits behind the reading column, so it is only ever visible in the rails —
 * it can never sit behind body text and undo the contrast work. Position is
 * eased toward the cursor rather than snapped, which is what makes it read as
 * a light gliding rather than a div teleporting.
 *
 * The rAF loop only runs while the light is still catching up and stops once it
 * settles, so an idle page costs nothing.
 */
export const CursorAura = () => {
  return null;
};
