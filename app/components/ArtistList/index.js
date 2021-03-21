/**
 *
 * ArtistList
 *
 */

import React, {memo} from 'react';
import defaultImage from "../../images/user.svg";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function ArtistList({artists}) {
  return <section className="artistList pt-4">
    <div className="row">
      {artists.map(artist => (
        <div className="col-md-3">
          <div className="card bg-dark" key={artist.id}>
            <div className="card-body">
              <Link to={`/artist/${artist.artist.id}`}>
                <Image
                  width={200}
                  height={200}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={artist.artist.avatar}
                  alt="user avatar"
                  roundedCircle
                />
                <div className="pt-4">
                  <h4>{artist.artist.name}</h4>
                  <h6>Artist</h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>;
}

ArtistList.propTypes = {};

export default memo(ArtistList);
