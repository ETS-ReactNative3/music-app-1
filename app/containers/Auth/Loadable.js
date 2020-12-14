/**
 *
 * Asynchronously loads the component for Auth
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const Login = loadable(() =>
  import ('./Login'), {
  fallback: <LoadingIndicator/>,
});

export const Verification = loadable(() =>
  import ('./Verification'), {
  fallback: <LoadingIndicator/>,
});
