import React from "react"
import ContentLoader from "react-content-loader"

const CarouselLoader = (props) => {
  return (
    <ContentLoader
      height={200} width={"100%"}
      speed={1}
      backgroundColor={'#000'}
      foregroundColor={'#041E3F'} {...props}>
      <rect x="25" y="0" rx="5" ry="5" width="190" height="200"/>
      <rect x="250" y="0" rx="5" ry="5" width="190" height="200"/>
      <rect x="480" y="0" rx="5" ry="5" width="190" height="200"/>
      <rect x="700" y="0" rx="5" ry="5" width="190" height="200"/>
      <rect x="920" y="0" rx="5" ry="5" width="190" height="200"/>
    </ContentLoader>
  )
}

export default CarouselLoader
