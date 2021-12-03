import React from 'react';
import jwtDecode from 'jwt-decode';
import {Switch, Route, Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import Dashboard from '../Templates/Dashboard';
import {Homepage, WeeklyPlaylist} from '../HomePage/Loadable';
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
import {AddTeam, MyTeams, Team, TeamRequest, TeamSetting} from "../Team/Loadable";
import {PatronList} from '../Patron/Loadable';
import {Faq} from "../Faq/Loadable";
import {NotFoundPage, UnAuthorized} from '../NotFoundPage/Loadable';

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
    return decoded.role
  }

  return false
}

function roleCheck(auth, role, children, rest) {
  const userRole = getRole()
  if (userRole && userRole === role) {
    return (
      <Route
        {...rest}
        render={() => children}
      />
    );
  }

  return (
    <Redirect
      to={{
        pathname: '/unauthorized',
      }}
    />
  )
}

function PrivateRoute({children, ...rest}) {
  const auth = useAuth();
  // check admin role
  if (rest.admin && auth) {
    return roleCheck(auth, 'administrator', children, rest)
  }

  // check artist role
  if (rest.artist && auth) {
    return roleCheck(auth, 'artist', children, rest)
  }


  return (
    <Route
      {...rest}
      render={() =>
        (auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/unauthorized',
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
          <Homepage/>
        </Route>
        <PrivateRoute exact path="/album/add">
          <AlbumForm/>
        </PrivateRoute>
        <Route exact path="/album/:slug">
          <Album/>
        </Route>
        <Route exact path="/faq">
          <Faq/>
        </Route>
        <Route exact path="/unauthorized">
          <UnAuthorized/>
        </Route>
        <PrivateRoute exact path="/albumList" artist={true}>
          <AlbumList/>
        </PrivateRoute>
        <PrivateRoute exact path="/album/edit/:id" artist={true}>
          <AlbumForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/songList" artist={true}>
          <SongList/>
        </PrivateRoute>
        <PrivateRoute exact path="/song/edit/:id" artist={true}>
          <SongForm/>
        </PrivateRoute>
        <PrivateRoute exact path="/song/add" artist={true}>
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
        <Route exact path="/weeklyPlaylist">
          <WeeklyPlaylist/>
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
        <PrivateRoute exact path="/team/add" artist={true}>
          <AddTeam/>
        </PrivateRoute>
        <PrivateRoute exact path="/team/:id/setting" artist={true}>
          <TeamSetting/>
        </PrivateRoute>
        <PrivateRoute exact path="/team/request">
          <TeamRequest/>
        </PrivateRoute>
        <PrivateRoute exact path="/myteams">
          <MyTeams/>
        </PrivateRoute>
        <PrivateRoute exact path="/patron">
          <PatronList/>
        </PrivateRoute>
        <Route path="*">
          <NotFoundPage/>
        </Route>
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
