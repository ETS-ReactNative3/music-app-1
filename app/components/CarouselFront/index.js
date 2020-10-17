import React from 'react';
import Carousel from 'react-elastic-carousel';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from '../SectionHeading';
import { HOVER_PLAY_ICON_COLOR } from '../../utils/constants';
import './index.scss';

const CarouselFront = props => {
  const { list, heading, onClickHandler, clasess = '' } = props;
  const breakPoints = [
    { width: 1, itemsToShow: 3 },
    { width: 550, itemsToShow: 3, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 2 },
    { width: 1024, itemsToShow: 6, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 6, itemsToScroll: 1 },
  ];
  return (
    <section className={clasess}>
      <SectionHeading>{heading}</SectionHeading>
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
                  onClickHandler(ele.slug);
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
