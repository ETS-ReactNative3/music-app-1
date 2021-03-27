/**
 *
 * Asynchronously loads the component for Song
 *
 */

 import React from 'react';
 import loadable from 'utils/loadable';
 import LoadingIndicator from 'components/LoadingIndicator';
 
 export const UserList = loadable(() => import('./Users/index.js'), {
  fallback: <LoadingIndicator />,
});

export const FeaturedAlbums = loadable(() => import('./FeaturedAlbum/index.js'), {
   fallback: <LoadingIndicator />,
 });
 
 export const DisputedCampaigns = loadable(() => import('./DisputedCampaign/index.js'), {
  fallback: <LoadingIndicator />,
});