/*
 *
 * Tastemaker reducer
 *
 */
import produce from 'immer';
import { PUT_CAMPAIGN, SELECT_CAMPAIGN } from './constants';

export const initialState = {
  campaigns: [],
  selectedCampaign: {},
};

/* eslint-disable default-case, no-param-reassign */
const campaignReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_CAMPAIGN:
        draft.campaigns = action.data;
        break;
      case SELECT_CAMPAIGN:
        draft.selectedCampaign = draft.campaigns.find(
          campaign => campaign.id === Number(action.id),
        );
        break;
    }
  });

export default campaignReducer;
