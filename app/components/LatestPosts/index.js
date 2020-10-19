import React from 'react';
import Carousel from 'react-elastic-carousel';

import SectionHeading from '../SectionHeading';
import './index.scss';

const LatestPosts = props => {
  const { list, heading, clasess } = props;

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1024, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 1 },
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
