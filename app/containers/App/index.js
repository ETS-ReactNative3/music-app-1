/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { faBars, faSearch, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from '../../components/Footer';
import Album from 'containers/Album/Loadable';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import routes from '../../utils/routes.json';

import '../../styles/global-style.scss';
import './index.scss';

const App = () => {
  return (
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
};

export default App;
