import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Banner from './../../images/banner-bg.jpg';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import HomePageHeader from '../HomePageHeader';
import LeftNav from '../LeftNav';
import './index.scss';

function Header() {
  return (
    <>
      {/* <LeftNav />
      <HomePageHeader /> */}
      <Carousel controls={false}>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner} alt="First slide" />
          <Carousel.Caption className="px-5">
            <div className="">
              <h1 className="text-left mb-3">Kanye West</h1>
              <h2 className="text-left">10 Albums, 235 Songs</h2>
              <div className="py-5 d-flex">
                <a href="javascript:void(0)" className="text-white">
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    size="3x"
                    color={PLAY_ICON_BG_COLOR}
                  />{' '}
                  <span>Play Now</span>
                </a>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Header;
