import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Banner from './../../images/banner-bg.jpg';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import './index.scss';

function Header() {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner} alt="First slide" />
        <Carousel.Caption className="text-left slider-caption">
          <h1 className="">Kanye West</h1>
          <h2 className="mb-xl-5">10 Albums, 235 Songs</h2>
          <div className="d-flex align-items-center ml-xl-1">
            <FontAwesomeIcon
              icon={faPlayCircle}
              size="3x"
              color={PLAY_ICON_BG_COLOR}
            />{' '}
            <span className="px-2">Play Now</span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Header;
