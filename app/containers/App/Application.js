import React from 'react';
import jwtDecode from 'jwt-decode';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Dashboard from '../Templates/Dashboard';
import HomePage from '../HomePage/Loadable';
import { Album, AlbumForm, AlbumList } from '../Album/Loadable';
import { SongList, SongForm } from '../Song/Loadable';
import Playlist from '../Playlist/Loadable';
import BecomeAnInfluencer from '../Influencer/Loadable';
import { Playlist, PlaylistDetail } from '../Playlist/Loadable';
import Tastemaker from '../Tastemaker/Loadable';

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

function PrivateRoute({ children, ...rest }) {
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

function Application({ history }) {
  return (
    <Dashboard>
      <Switch>
        <PrivateRoute exact path="/">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute exact path="/album/add">
          <AlbumForm />
        </PrivateRoute>
        <Route exact path="/album/:slug">
          <Album />
        </Route>
        <PrivateRoute exact path="/albumList">
          <AlbumList />
        </PrivateRoute>
        <PrivateRoute exact path="/album/edit/:id">
          <AlbumForm />
        </PrivateRoute>
        <PrivateRoute exact path="/songList">
          <SongList />
        </PrivateRoute>
        <PrivateRoute exact path="/song/edit/:id">
          <SongForm />
        </PrivateRoute>
        <PrivateRoute exact path="/song/add">
          <SongForm />
        </PrivateRoute>
        <PrivateRoute exact path="/playlists">
          <Playlist />
        </PrivateRoute>
        <PrivateRoute exact path="/become-an-influencer">
          <BecomeAnInfluencer />
        </PrivateRoute>
        <PrivateRoute exact path="/tastemakers/:songId">
          <Tastemaker />
        </PrivateRoute>
        <PrivateRoute exact path="/playlist/:id">
          <PlaylistDetail />
        </PrivateRoute>
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
