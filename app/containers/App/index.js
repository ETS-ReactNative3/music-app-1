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
      headerRef.current.classList.add('nav-bar');
    } else {
      headerRef.current.classList.remove('nav-bar');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      <div className={`wrapper ${wrapperClass}`}>
        <nav className="main-header fixed-top px-5 pb-3" ref={headerRef}>
          <div className="d-flex flex-row align-items-center">
            <a
              class="nav-link"
              data-widget="pushmenu"
              href="javascript:void(0);"
              role="button"
              className="text-white"
              onClick={handleSideBar}
            >
              <FontAwesomeIcon icon={faBars} />
            </a>
            <TopNavBar />
          </div>
        </nav>
        <LeftSideBar />
        <div className="content-wrapper">
          <section className="content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/album/:slug" component={Album} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
