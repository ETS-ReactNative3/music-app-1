import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from '../SectionHeading';
import { HOVER_PLAY_ICON_COLOR } from '../../utils/constants';
import { redirectOnAlbum } from '../../utils/redirect'
import './index.scss';

const CarouselCustom = props => {
  const {
    list,
    heading,
    onClickHandler,
    itemsToShow = 3,
    clasess = '',
  } = props;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: itemsToShow,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemsToShow,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <section className={`caraousel ${clasess}`}>
      <SectionHeading>{heading}</SectionHeading>
      <Carousel
        responsive={responsive}
        arrows={true}
        infinite={true}
        itemClass="px-3"
        containerClass="mx-n3"
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

export default CarouselCustom;
