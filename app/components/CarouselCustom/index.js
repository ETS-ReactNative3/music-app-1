import React from 'react';
import Carousel from 'react-elastic-carousel';

import H3 from '../H3';

const CarouselCustom = props => {
  const { list, heading, onClickHandler } = props;
  return (
    <section>
      <H3>{heading}</H3>
      <Carousel itemsToShow={4}>
        {list.map((ele, index) => {
          return (
            <div className="slider-box" key={index}>
              <div className="image-area">
                <img
                  src={require(`./../../images/${ele.imageKey}`)}
                  alt=""
                  className="slider-img"
                />
                <div className="hover-box">
                  <a
                    href="javascript:void(0);"
                    onClick={e => {
                      e.preventDefault();
                      onClickHandler(ele.slug);
                    }}
                  >
                    <img src={require('./../../images/play-icon.png')} alt="" />
                  </a>
                </div>
              </div>
              <div className="caption">
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
