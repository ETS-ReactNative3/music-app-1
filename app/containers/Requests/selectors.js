import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CampaignStatus } from './constants';
/**
 * Direct selector to the album state domain
 */

const selectRequestDomain = state => state.request || initialState;

const makeSelectNewRequestList = () =>
  createSelector(
    selectRequestDomain,
    substate =>
      substate.requests
        ? substate.requests.filter(
          request => request.campaignStatusId === CampaignStatus.PEDNING,
        )
        : [],
  );

const makeSelectInProgressRequestList = () =>
  createSelector(
    selectRequestDomain,
    substate =>
      substate.requests
        ? substate.requests.filter(
          request =>
            request.campaignStatusId === CampaignStatus.ACCEPTED ||
            request.campaignStatusId === CampaignStatus['IN-PROGRESS'],
        )
        : [],
  );

const makeSelectCompletedRequestList = () =>
  createSelector(
    selectRequestDomain,
    substate =>
      substate.requests
        ? substate.requests.filter(
          request =>
            request.campaignStatusId === CampaignStatus.COMPLETED)
        : [],
  );

const makeSelectDeclinedRequestList = () =>
  createSelector(
    selectRequestDomain,
    substate =>
      substate.requests
        ? substate.requests.filter(
          request =>
            request.campaignStatusId === CampaignStatus.DECLINED,
        )
        : [],
  );


const makeSelectApprovedRequestList = () =>
createSelector(
  selectRequestDomain,
  substate =>
    substate.requests
      ? substate.requests.filter(
        request =>
          request.campaignStatusId === CampaignStatus.APPROVED,
      )
      : [],
);

export {
  makeSelectNewRequestList,
  makeSelectCompletedRequestList,
  makeSelectInProgressRequestList,
  makeSelectDeclinedRequestList,
  makeSelectApprovedRequestList
};
