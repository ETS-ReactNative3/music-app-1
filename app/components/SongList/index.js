import React from 'react';
import { faPlayCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from '../SectionHeading';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import './index.scss';

const SongList = ({ list, heading, singleSongHandler }) => {
  return (
    <section>
      <SectionHeading>{heading}</SectionHeading>
      <div className="row">
        {list.map((ele, index) => {
          return (
            <div className="col-4" key={index}>
              <div
                className="d-flex border-bottom song-border align-items-center songs-ul py-2"
                key={index}
              >
                <div className="song-number px-1 mw-60">
                  {('0' + (index + 1)).slice(-2)}
                </div>
                <div className="song-profile px-1">
                  <div className="song-img">
                    <img
                      src={require(`./../../images/${ele.imageKey}`)}
                      alt=""
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="song-title px-1">
                  <h5>{ele.title}</h5>
                  <h6>{ele.artist}</h6>
                </div>
                <div className="song-duration px-1 ml-auto">4:25</div>
                <div className="song-action px-1 ml-auto">
                  <a
                    href="javascript:void(0);"
                    onClick={() => singleSongHandler(index)}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      color={PLAY_ICON_BG_COLOR}
                      icon={faPlayCircle}
                    />
                  </a>
                </div>
                <div className="ml-auto">
                  <FontAwesomeIcon size="1x" icon={faEllipsisH} />
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
