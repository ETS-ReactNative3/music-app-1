import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {CampaignStatus} from './constants';
/**
 * Direct selector to the album state domain
 */

const selectRequestDomain = state => state.request || initialState;

const value = [
  {
      "id": 1,
      "campaignsId": 4,
      "campaignStatusId": 1,
      "userId": "785e212e-d30c-4361-aa38-38ede330e98b",
      "feedback": null,
      "campaigns": {
          "id": 4,
          "price": 20,
          "createdDate": "2020-08-22T21:49:30.951Z",
          "userId": "b0ad498b-2e70-415d-bcc2-4efc74b6b55b",
          "songId": 1,
          "song": {
              "id": 1,
              "title": "song 1",
              "userId": "b0ad498b-2e70-415d-bcc2-4efc74b6b55b",
              "genreId": 3,
              "description": "song 1 desc",
              "artwork": "https://firebasestorage.googleapis.com/v0/b/potentiam-a3697.appspot.com/o/genre%2FalbumCover4.jpg?alt=media&token=258559b5-5a09-4d3b-979d-9f88395f13e6",
              "imageKey": "",
              "songKey": "",
              "url": "https://d1royv8y21rl5f.cloudfront.net/Post+Malone%2C+Swae+Lee+-+Sunflower+(Spider-Man_+Into+the+Spider-Verse).mp3",
              "top": false,
              "releaseDate": "2019-12-30T00:00:00.000Z"
          },
          "user": {
              "id": "b0ad498b-2e70-415d-bcc2-4efc74b6b55b",
              "name": "mayur gaud edit",
              "email": "myr@ss.com",
              "password": "$2b$10$XCpM4kLkMETTJovNjy5EruZq/W06WYN2xMhsXdFOMM0aCI.aAMozq",
              "avatar": "https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/user-avatar/1581870046539%20-%20IMG_0004.JPG",
              "avatarImageKey": "user-avatar/1581870046539 - IMG_0004.JPG",
              "phone": "+446787966",
              "block": false,
              "promote": true,
              "registerDate": "2019-12-19T19:05:21.522Z",
              "activation": "",
              "resetPassword": "aqsktwdw1s7",
              "roleId": 2,
              "influencerId": 11,
              "genderId": 1,
              "credit": 530,
              "genreId": 2,
              "location": "earth",
              "publicPhone": "3234234778",
              "publicEmail": "e@e.com",
              "bookingEmail": "b@b.com",
              "managementEmail": "m@m.com",
              "recordLabelManager": "man asd",
              "coverPhoto": "https://potentiam-mobile-app.s3.amazonaws.com/artist-coverPhoto/1581869937947%20-%20IMG_0005.JPG",
              "coverPhotoImageKey": "artist-coverPhoto/1581869937947 - IMG_0005.JPG",
              "biography": "mayur new bio edit",
              "deviceToken": "ebqVfSE580OyiXcK5TBn0R:APA91bFpFYanI0KncXCanLIACcRDdWghjnTPxVcR-EeC8fIg5vZDyv1XqCW-Qi4lv1SOZvXohlRpBGfwu_J-fDik8TAXICTUrDlJG6FWdfLiCaRcjGcwd0L_85grKendT-l65RlPjCAl"
          }
      }
  }
];

const makeSelectNewRequestList = () => {
  return createSelector(
    selectRequestDomain,
    substate => substate ? substate.filter(request => request.campaignStatusId === CampaignStatus.PEDNING) : []
  );
}
  

const makeSelectInProgressRequestList = () => {
  return createSelector(
    selectRequestDomain,
    substate => substate ? substate.filter(request => (request.campaignStatusId === CampaignStatus.ACCEPTED || request.campaignStatusId === CampaignStatus["IN-PROGRESS"])) : []
  );
}
  

const makeSelectCompletedRequestList = () => {
  return createSelector(
    selectRequestDomain,
    substate => substate ? substate.filter(request => (request.campaignStatusId === CampaignStatus.COMPLETED || request.campaignStatusId === CampaignStatus.APPROVED)) : []
  );
}
  

export {
  makeSelectNewRequestList,
  makeSelectCompletedRequestList
,
makeSelectInProgressRequestList
};
