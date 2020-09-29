import React from 'react';
import Carousel from 'react-elastic-carousel';

const CarouselCustom = ({albums, itemsToShow}) => {
    return (
        <Carousel itemsToShow={itemsToShow}>
            {albums.map((ele, index) => {
                return (
                <div className="slider-box" key={index}>
                    <div className="image-area">
                        <img src={ele.artwork} alt="kj" className="slider-img"/>
                        <div className="hover-box"><a href=""><img src={require('./../../images/play-icon.png')} alt=""/></a></div>
                    </div>
                    <div className="caption">
                        <h4>{ele.title}</h4>
                        <h6>{ele.description}</h6>
                    </div>
                </div>
                )
            })}
            </Carousel>
    )
}

export default CarouselCustom;