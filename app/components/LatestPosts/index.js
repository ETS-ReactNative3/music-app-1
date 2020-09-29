import React from 'react';
import Carousel from 'react-elastic-carousel'

import Wrapper from './Wrapper';

const LatestPosts = () => {
    return (
        <Wrapper>
            <div><h3>Featured Album</h3></div>
            <Carousel itemsToShow={3}>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
                <div>
                    <img 
                        src="https://potentiam-mobile-app.s3.eu-west-2.amazonaws.com/album-images/1581842052073%20-%20IMG_0005.JPG"
                        height="200"
                        />
                </div>
            </Carousel>
        </Wrapper>
    )
}

export default LatestPosts;