/**
 *
 * PlaylistOptions
 *
 */

import React, {memo} from 'react';
import '../ShareBox/index.scss';
import {Dropdown} from "react-bootstrap";

function PlaylistOptions({remove}) {
  return <Dropdown className="social-album-share">
    <Dropdown.Toggle id="dropdown-basic" as="span">...</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={remove}>
        Remove from this playlist
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>;
}

PlaylistOptions.propTypes = {};

export default memo(PlaylistOptions);
