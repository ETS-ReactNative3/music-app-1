import React from 'react';
import Carousel from 'react-elastic-carousel';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { HOVER_PLAY_ICON_COLOR } from '../../utils/constants';
import { redirectOnAlbum } from '../../utils/redirect'
import './index.scss';

const CarouselFront = props => {
  const { list, heading, onClickHandler, clasess = '' } = props;
  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    { width: 550, itemsToShow: 3, itemsToScroll: 1 },
    { width: 768, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1024, itemsToShow: 6, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 6, itemsToScroll: 1 },
  ];
  return (
    <section className={clasess}>
      <h3 className="mb-5 pb-3 d-inline-block border-top-0 border-right-0 border-left-0">{heading}</h3>
      <Carousel
        breakPoints={breakPoints}
        itemPadding={[0, 15]}
        pagination={false}
      >
        {list.map((ele, index) => {
          return (
            <div key={index}>
              <div
                className="img-preview rounded"
                onClick={e => {
                  e.preventDefault();
                  redirectOnAlbum(ele.slug);
                }}
              >
                <img src={ele.artwork} alt="" className="rounded" />
                <div className="hover-box">
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="test"
                    size="3x"
                    color={HOVER_PLAY_ICON_COLOR}
                  />
                </div>
              </div>
              <div className="pt-4">
                <h4>{ele.title}</h4>
                <h6>{ele.description}</h6>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default CarouselFront;
