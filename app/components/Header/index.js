import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './../../images/banner-bg.jpg';
import PlayBtn from './../../images/play-btn.png';
import UserImg from './../../images/user-img.jpg';
import messages from './messages';

function Header() {
  return (
    <div className="banner">
      <div className="top-slider-area">
        <div className="slide-area">
          <Img src={Banner} />
          <div className="slider-left">
            <div className="jumbotron">
              <hgroup>
                <h1>Kanye West</h1>
                <h2>10 Albums, 235 Songs</h2>
              </hgroup>
              <div className="play-row">
                <a href="#">
                  <Img src={PlayBtn} /> Play Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <A href="https://www.reactboilerplate.com/">
    //     <Img src={Banner} alt="react-boilerplate - Logo" />
    //   </A>
    //   <NavBar>
    //     <HeaderLink to="/">
    //       <FormattedMessage {...messages.home} />
    //     </HeaderLink>
    //     <HeaderLink to="/features">
    //       <FormattedMessage {...messages.features} />
    //     </HeaderLink>
    //   </NavBar>
    // </div>
  );
}

export default Header;
