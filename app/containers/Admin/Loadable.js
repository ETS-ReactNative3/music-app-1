/**
 *
 * Asynchronously loads the component for Song
 *
 */

 import React from 'react';
 import loadable from 'utils/loadable';
 import LoadingIndicator from 'components/LoadingIndicator';
 
 export const FeaturedAlbums = loadable(() => import('./FeaturedAlbum/index.js'), {
   fallback: <LoadingIndicator />,
 });
 