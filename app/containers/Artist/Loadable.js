/**
 *
 * Asynchronously loads the component for Artist
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export const ArtistProfile = loadable(() => import('./index.js'), {
    fallback: <LoadingIndicator />,
  });

  
  export const SupportedArtist = loadable(() => import('./SupportedArtist.js'), {
    fallback: <LoadingIndicator />,
  });
