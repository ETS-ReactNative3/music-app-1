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
import {MyAccount} from '../MyAccount/Loadable';
import {Wallet} from '../Wallet/Loadable';
import AllActivites from '../AllActivities';
import AllReviews from '../AllReviews';
import CampaignSummary from '../Campaign/index';
import WalletHistory from '../Wallet/History';
import OrderSuccess from "../Wallet/success";
import {InfluencerRequestForm} from "../Influencer/Loadable";
import RequestListing from '../Requests/index';
import CampaignList from '../Campaign/list';

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

function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        auth ? (
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

function Application({history}) {
  return (
    <Dashboard>
      <Switch>
        <PrivateRoute exact path="/">
          <HomePage/>
        </PrivateRoute>
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
        <PrivateRoute exact path="/myaccount/activites">
          <AllActivites/>
        </PrivateRoute>
        <PrivateRoute exact path="/myaccount/reviews">
          <AllReviews/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet">
          <Wallet/>
        </PrivateRoute>
        <PrivateRoute exact path="/order/success">
          <OrderSuccess/>
        </PrivateRoute>
        <PrivateRoute exact path="/wallet/history">
          <WalletHistory/>
        </PrivateRoute>
        <PrivateRoute path="/tastemakers/:songId/campaign">
          <CampaignSummary/>
        </PrivateRoute>
        <PrivateRoute path="/campaigns">
          <CampaignList/>
        </PrivateRoute>
        <PrivateRoute path="/requests">
          <RequestListing/>
        </PrivateRoute>
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
