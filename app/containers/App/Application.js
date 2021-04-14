import React from 'react';
import jwtDecode from 'jwt-decode';
import {Switch, Route, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import Dashboard from '../Templates/Dashboard';
import HomePage from '../HomePage/Loadable';
import {Album, AlbumForm, AlbumList} from '../Album/Loadable';
import {SongList, SongForm} from '../Song/Loadable';
import {Playlist, PlaylistDetail} from '../Playlist/Loadable';
import {PlanDetails} from '../Plan/Loadable';
import Tastemaker from '../Tastemaker/Loadable';
import {EditAccount, MyAccount} from '../MyAccount/Loadable';
import {OrderSuccess, Wallet, WalletWithdrawal, History, WithdrawalRequestList} from '../Wallet/Loadable';
import AllActivites from '../AllActivities';
import AllReviews from '../AllReviews';
import CampaignSummary from '../Campaign/index';
import {
  InfluencerRequestForm,
  InfluencerRequests,
} from '../Influencer/Loadable';
import RequestListing from '../Requests/index';
import CampaignList from '../Campaign/list';
import CampaignDetails from '../Campaign/details';
import TransferRequest from '../Wallet/TransferRequest';
import {InfluencerVerify} from '../Campaign/Loadable';
import {Library} from '../Library/Loadable';
import {NewReleases} from '../NewReleases/Loadable';
import {DisputedCampaigns, FeaturedAlbums, UserList} from '../Admin/Loadable';
import {Browse, BrowseAlbums} from '../Browse/Loadable';
import {SubscriptionPlans, SubscriptionSuccess} from '../Subscription/Loadable';
import {ArtistProfile, SupportedArtist} from '../Artist/Loadable';
import {Earnings} from "../Earnings/Loadable";
import {AddTeam, Team} from "../Team/Loadable";


function useAuth() {
  const accessToken = localStorage.getItem('token');
  let isAuthorized = false;
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.exp < new Date().getTime() / 1000) {
      localStorage.removeItem('token');
    } else {
      isAuthorized = true;
    }
  }

  return isAuthorized;
}

function getRole() {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.role === 'administrator') {
      return true
    }
  }

  return false
}

function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        (auth || (rest.admin && getRole())) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
            }}
          />
        )
      }
    />
  );
}

function Application() {
  return (
    <Dashboard>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <PrivateRoute exact path="/album/add">
          <AlbumForm/>
        </PrivateRoute>
        <Route exact path="/album/:slug">
          <Album/>
        </Route>
        <PrivateRoute exact path="/albumList">
          <AlbumList/>
        </PrivateRoute>
        <PrivateRoute exact path="/album/edit/:id">
          <AlbumForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/songList">
          <SongList/>
        </PrivateRoute>
        <PrivateRoute exact path="/song/edit/:id">
          <SongForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/song/add">
          <SongForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/playlists">
          <Playlist/>
        </PrivateRoute>
        <PrivateRoute exact path="/tasteMaker/request/form">
          <InfluencerRequestForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/tastemakers/:songId">
          <Tastemaker/>
        </PrivateRoute>
        <PrivateRoute exact path="/playlist/:id">
          <PlaylistDetail/>
        </PrivateRoute>
        <PrivateRoute exact path="/plan">
          <PlanDetails/>
        </PrivateRoute>
        <PrivateRoute exact path="/myaccount">
          <MyAccount/>
        </PrivateRoute>
        <PrivateRoute exact path="/myaccount/edit">
          <EditAccount/>
        </PrivateRoute>
        <PrivateRoute exact path="/myaccount/activites">
          <AllActivites/>
        </PrivateRoute>
        <PrivateRoute exact path="/myaccount/reviews">
          <AllReviews/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet">
          <Wallet/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet/withdrawal">
          <WalletWithdrawal/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet/transfer">
          <TransferRequest/>
        </PrivateRoute>
        <PrivateRoute exact path="/order/success">
          <OrderSuccess/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet/history">
          <History/>
        </PrivateRoute>
        <PrivateRoute path="/tastemakers/:songId/campaign">
          <CampaignSummary/>
        </PrivateRoute>
        <PrivateRoute path="/campaigns" exact>
          <CampaignList/>
        </PrivateRoute>
        <PrivateRoute path="/campaigns/:id" exact>
          <CampaignDetails/>
        </PrivateRoute>
        <PrivateRoute path="/campaigns/:id/influencer/:influencerId" exact>
          <InfluencerVerify/>
        </PrivateRoute>
        <PrivateRoute path="/requests" exact>
          <RequestListing/>
        </PrivateRoute>
        <PrivateRoute path="/admin/tastemakers/requests" exact admin={true}>
          <InfluencerRequests/>
        </PrivateRoute>
        <PrivateRoute path="/admin/tastemakers/withdrawal/requests" exact admin={true}>
          <WithdrawalRequestList/>
        </PrivateRoute>
        <PrivateRoute exact path="/admin/users" admin={true}>
          <UserList/>
        </PrivateRoute>
        <PrivateRoute path="/library" exact>
          <Library/>
        </PrivateRoute>
        <Route exact path="/artist/:id">
          <ArtistProfile/>
        </Route>
        <Route exact path="/newReleases">
          <NewReleases/>
        </Route>
        <Route exact path="/browse">
          <Browse/>
        </Route>
        <PrivateRoute exact path="/admin/albums" admin={true}>
          <FeaturedAlbums/>
        </PrivateRoute>
        <PrivateRoute exact path="/subscription-plans">
          <SubscriptionPlans/>
        </PrivateRoute>
        <PrivateRoute exact path="/subscription/success">
          <SubscriptionSuccess/>
        </PrivateRoute>
        <PrivateRoute exact path="/user/supportedArtist">
          <SupportedArtist/>
        </PrivateRoute>
        <Route exact path="/browse/:genre">
          <BrowseAlbums/>
        </Route>
        <PrivateRoute exact path="/admin/campaigns/disputed" admin={true}>
          <DisputedCampaigns/>
        </PrivateRoute>
        <PrivateRoute exact path="/earnings">
          <Earnings/>
        </PrivateRoute>
        <PrivateRoute exact path="/team">
          <Team/>
        </PrivateRoute>
        <PrivateRoute exact path="/team/add">
          <AddTeam/>
        </PrivateRoute>
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
