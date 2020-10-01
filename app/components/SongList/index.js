import React from 'react';

import H3 from '../H3';

const SongList = ({ list, heading }) => {
  return (
    <section>
      <H3>{heading}</H3>
      <div className="row">
        {list.map((ele, index) => {
          return (
            <div className="col-md-4" key={index}>
              <div className="weekly-list">
                <div className="no-box">0{index + 1}</div>
                <div className="img-thumb">
                  <img src={require(`./../../images/${ele.imageKey}`)} alt="" />
                </div>
                <div className="tag-box">
                  <h5>{ele.title}</h5>
                  <h6>{ele.description}</h6>
                </div>
                <div className="time-box">0:23</div>
                <div className="dot-box">...</div>
                <div className="play-box">
                  <a href="javascript:void(0);">
                    <img
                      src={require('./../../images/play-icon-blue.png')}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SongList;
