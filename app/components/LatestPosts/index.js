import React from 'react';
// import Carousel from 'react-elastic-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from '../SectionHeading';
import './index.scss';

const LatestPosts = props => {
  const { list, heading, onClickHandler } = props;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
    <section className="py-5">
      <SectionHeading>{heading}</SectionHeading>
      <Carousel
        responsive={responsive}
        arrows={false}
        infinite={true}
        itemClass="px-3"
        containerClass="mx-n3"
        partialVisible={false}
        showDots={true}
      >
        {list.map((ele, index) => {
          return (
            <div key={index}>
              <div className="img-preview rounded">
                <img
                  src={require(`./../../images/${ele.imageKey}`)}
                  alt=""
                  className="rounded"
                />
                <div className="position-absolute caption py-3 pl-3">
                  <h4>{ele.title}</h4>
                  <h6>{ele.description}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default LatestPosts;
