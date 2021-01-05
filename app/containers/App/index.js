/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/Loadable';

import '../../styles/global-style.scss';
import './index.scss';
import ThemeWrapper from './ThemeWrapper';
import Auth from './Auth';
import Application from './Application';
import { fetchUserDetailsData } from './actions';
import { connect } from 'react-redux';
import { compose } from 'redux';

const App = ({ fetchDashboardData }) => {
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Application} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeWrapper>
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchDashboardData: () => dispatch(fetchUserDetailsData()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
