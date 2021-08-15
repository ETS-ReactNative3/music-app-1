/**
 *
 * Asynchronously loads the component for Song
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const Browse = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const BrowseAlbums = loadable(() => import('./browseAlbums'), {
  fallback: <LoadingIndicator />,
});
