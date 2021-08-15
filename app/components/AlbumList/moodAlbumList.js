/**
 *
 * AlbumList
 *
 */

import React, { memo } from 'react';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import defaultImage from "../../images/user.svg";

function MoodAlbumList({albums}) {
  return <section className="albumList pt-4">
    <div className="row">
      {albums.map(album => (
        <div className="col-md-3 my-3" key={album.id}>
          <div className="card bg-dark">
            <div className="card-body">
              <Link to={`/album/${album.slug}`}>
                <Image
                  width={200}
                  height={200}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={album.artwork}
                  alt="album image"
                />
                <div className="pt-4">
                  <h4>{album.title}</h4>
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

MoodAlbumList.propTypes = {};

export default memo(MoodAlbumList);
