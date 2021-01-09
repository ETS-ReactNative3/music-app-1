/*
 *
 * Tastemaker actions
 *
 */

import { LAUNCH_CAMPAIGN } from './constants';


export function launchCampaignAction(data) {
  return {
    type: LAUNCH_CAMPAIGN,
    data,
  };
}
