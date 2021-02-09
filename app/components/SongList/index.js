import React from 'react';
import {
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import './index.scss';
import ShareBox from '../ShareBox';
import LoadingIndicator from "../LoadingIndicator";

const SongList = ({list, heading, singleSongHandler, currentSong, classes, loading}) => {
  const {playing, songIndex} = currentSong;
  return (
    <section className={`weekly-song-list ${classes}`}>
      <h3 className="mb-5 pb-3 d-inline-block border-top-0 border-right-0 border-left-0">{heading}</h3>
      {loading ? <LoadingIndicator/> :
        <div className="row">
          {list.map((ele, index) => {
            return (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                <div
                  className="d-flex border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-2"
                  key={index}
                >
                  <div className="song-number px-1 mw-65">
                    {('0' + (index + 1)).slice(-2)}
                  </div>
                  <div className="song-profile px-1">
                    <div className="song-img">
                      <img src={ele.artwork} alt="" className="rounded"/>
                    </div>
                  </div>
                  <div className="song-title px-1">
                    <h5>{ele.title}</h5>
                    <h6>{ele.artist}</h6>
                  </div>
                  <div className="song-duration px-1 ml-auto">4:25</div>
                  <div className="song-action px-1 ml-auto">
                  <span
                    className="cursor-pointer"
                    onClick={() => singleSongHandler(index)}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      color={PLAY_ICON_BG_COLOR}
                      icon={
                        songIndex === index && playing
                          ? faPauseCircle
                          : faPlayCircle
                      }
                    />
                  </span>
                  </div>
                  <div className="ml-auto d-flex align-self-center">
                    <ShareBox/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </section>
  );
};

export default SongList;
