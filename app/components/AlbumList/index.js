/**
 *
 * AlbumList
 *
 */

import React, { memo } from 'react';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import defaultImage from "../../images/user.svg";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function AlbumList({albums}) {
  return <section className="albumList pt-4">
    <div className="row">
      {albums.map(album => (
        <div className="col-md-3 my-3">
          <div className="card bg-dark" key={album.id}>
            <div className="card-body">
              <Link to={`/album/${album.album.slug}`}>
                <Image
                  width={200}
                  height={200}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={album.album.artwork}
                  alt="album image"
                />
                <div className="pt-4">
                  <h4>{album.album.title}</h4>
                  <h6>Album</h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>;
}

AlbumList.propTypes = {};

export default memo(AlbumList);
