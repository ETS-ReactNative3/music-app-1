import React from 'react';

import H3 from '../H3';
import CarouselCustom from '../CarouselCustom';

const FeaturedAlbum = ({albums, heading, itemsToShow}) => {
    return (
        <section>
            <H3>{heading}</H3>
            <CarouselCustom albums={albums} itemsToShow={itemsToShow}/>
        </section>
    )
}

export default FeaturedAlbum;