/**
 *
 * Asynchronously loads the component for Earnings
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import React from "react";

export const Team = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const AddTeam = loadable(() => import('./AddTeam'), {
  fallback: <LoadingIndicator />,
});

export const TeamSetting = loadable(() => import('./TeamSetting'), {
  fallback: <LoadingIndicator />,
});

export const TeamRequest = loadable(() => import('./TeamRequest'), {
  fallback: <LoadingIndicator />,
});
