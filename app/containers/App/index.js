/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
  const [wrapperClass, setWrapperClass] = useState('');
  const headerRef = useRef('');
  const handleSideBar = () => {
    const classSideBar = wrapperClass === '' ? 'sidebar-collapse' : '';
    setWrapperClass(classSideBar);
  };
  const listenScrollEvent = e => {
    if (window.scrollY > 50) {
      headerRef.current.classList.add('bg-nav-bar');
    } else {
      headerRef.current.classList.remove('bg-nav-bar');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
  return (
      <div className={`wrapper ${wrapperClass}`}>
        <nav
          className="main-header fixed-top navbar navbar-expand navbar-dark"
          ref={headerRef}
        >
          <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="javascript:void(0)" onClick={handleSideBar} role="button"><FontAwesomeIcon icon={faBars} /></a>
      </li>
    </ul>
    <TopNavBar />
        </nav>
        <LeftSideBar />
        <main className="content-wrapper">
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
