import React from 'react';
import {
  faPause, faPlay
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import './index.scss';
import ShareBox from '../ShareBox';
import LoadingIndicator from "../LoadingIndicator";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const SongList = ({list, heading, singleSongHandler, currentSong, classes, loading}) => {
  const {playing} = currentSong;
  return (
    <section className={`weekly-song-list ${classes}`}>
      <h3 className="mb-5 pb-3 d-inline-block border-top-0 border-right-0 border-left-0">{heading}</h3>
      {loading ? <LoadingIndicator/> :
        <div className="row">
          {list.map((ele, index) => {
            return (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
                <div
                  className="top-songs d-flex border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-2"
                  key={index}
                >
                  <div className="song-number px-1 mw-65">
                    {('0' + (index + 1)).slice(-2)}
                  </div>
                  <div className="song-profile px-1">
                    <div className="song-img">
                      <img src={ele.albumSongs[0].album.artwork} alt="" className="rounded"/>
                    </div>
                  </div>
                  <div className="song-title px-1">
                    <OverlayTrigger
                      placement="top"
                      delay={{show: 250, hide: 400}}
                      overlay={<Tooltip id={`song-title-tooltip`}>{ele.title}</Tooltip>}
                    >
                      <h5>{ele.title}</h5>
                    </OverlayTrigger>
                    <Link to={`/artist/${ele.user.id}`}>
                      <small>{ele.user.name}</small>
                    </Link>
                  </div>
                  <div className="song-action px-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => singleSongHandler(ele.id)}
                  >
                    <FontAwesomeIcon
                      icon={
                        currentSong.songData.id === ele.id && playing
                          ? faPause
                          : faPlay
                      }
                    />
                  </span>
                  </div>
                  <div className="d-flex align-self-center">
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
