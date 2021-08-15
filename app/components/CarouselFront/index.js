import React from 'react';
import Carousel from 'react-elastic-carousel';
import PlayButton from '../../images/play-button.svg'
import {redirectOnAlbum} from '../../utils/redirect'
import './index.scss';
import {useHistory} from 'react-router-dom';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Link} from "react-router-dom";
import CarouselLoader from "./carouselLoader";

const CarouselFront = props => {
  const {list, heading, classes = '', loading, viewAll, type = 'album'} = props;
  const breakPoints = [
    {width: 1, itemsToShow: 2},
    {width: 550, itemsToShow: 3, itemsToScroll: 1},
    {width: 768, itemsToShow: 4, itemsToScroll: 1},
    {width: 1024, itemsToShow: 5, itemsToScroll: 1},
    {width: 1200, itemsToShow: 6, itemsToScroll: 1},
  ];
  const history = useHistory()
  return (
    <section className={classes}>
      <h3 className="mb-5 pb-3 d-inline-block border-top-0 border-right-0 border-left-0">{heading}</h3>
      {viewAll && <Link to={viewAll}>
        <span className="float-right pr-4">SEE ALL</span>
      </Link>}
      {loading ?
        <CarouselLoader/> :
        <Carousel
          breakPoints={breakPoints}
          itemPadding={[0, 15]}
          pagination={false}
        >
          {list.slice(0, 10).map((ele, index) => {
            return (
              <div className="carousel-container" key={index}>
                <div
                  className="hoverEffect carousel-image-container rounded cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    if (type === 'album') redirectOnAlbum(ele.slug);
                    else if (type === 'playlist') history.push(`/playlist/${ele.id}`)
                  }}
                >
                  <img
                    src={type === 'album' ? ele.artwork : ele.playlistSongs[0].song.albumSongs[0].album.artwork}
                    alt="album image" className="rounded carousel-image"/>
                  <div className="overlay">
                    <img src={PlayButton} alt="Play button" className="playButton"/>
                  </div>
                </div>
                <div className="pt-4">
                  <h4>{ele.title}</h4>
                  {ele.description && ele.description.length > 45 ?
                    <OverlayTrigger
                      placement="bottom"
                      delay={{show: 250, hide: 400}}
                      overlay={<Tooltip id={`song-title-tooltip`}>{ele.description}</Tooltip>}
                    >
                      <h6>{ele.description.substring(0, 45)}...</h6>
                    </OverlayTrigger> :
                    <h6>{ele.description}</h6>
                  }
                </div>
              </div>
            );
          })}
        </Carousel>
      }
    </section>
  );
};

export default CarouselFront;
