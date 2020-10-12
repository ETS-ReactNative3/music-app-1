/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from '../../components/Footer';
import Playlist from 'containers/Playlist/Loadable';
import HomePageHeader from '../../components/HomePageHeader';
import LeftSideBar from '../../components/LeftSidebar';

import GlobalStyle from '../../global-styles';
import './index.css';
import './index.scss';

const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  // margin: 0 auto;
  // display: flex;
  // min-height: 100%;
  // padding: 0 16px;
  // flex-direction: column;
`;

const App = () => {
  const [wrapperClass, setWrapperClass] = useState('');
  const headerRef = useRef('');
  const handleSideBar = () => {
    const classSideBar = wrapperClass === '' ? 'sidebar-collapse' : '';
    setWrapperClass(classSideBar);
  };
  const listenScrollEvent = e => {
    if (window.scrollY > 50) {
      headerRef.current.classList.add('bg-body');
    } else {
      headerRef.current.classList.remove('bg-body');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      <GlobalStyle />
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
            <HomePageHeader />
          </div>
        </nav>
        <LeftSideBar />
        <div className="content-wrapper">
          <section className="content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/playlist/:slug" component={Playlist} />
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
