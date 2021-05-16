import React from 'react';
import HomeVideo from './../../images/Bliink V01.mp4';
import Banner from './../../images/banner-bg.jpg';
import './index.scss';

function Header() {
  return (
    <section className="home-container">
      <div className="video-container">
        <video
          src={HomeVideo}
          className="video"
          autoPlay
          loop
          playsInline
          muted
          poster={Banner}
        />
      </div>
    </section>
  );
}

export default Header;
