/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Footer from '../../components/Footer';
import Album from '../Album/Loadable';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import routes from '../../utils/routes.json';

import '../../styles/global-style.scss';
import './index.scss';

const App = () => (
  <div className="wrapper">
    <TopNavBar />
    <LeftSideBar />
    <main className="content-wrapper" role="main">
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route path={routes.ALBUM} component={Album} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
