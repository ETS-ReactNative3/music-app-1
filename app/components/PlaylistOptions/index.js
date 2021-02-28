/**
 *
 * PlaylistOptions
 *
 */

import React, { memo } from 'react';
import '../ShareBox/index.scss';
import { Dropdown } from 'react-bootstrap';
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PlaylistOptions({ remove }) {
  return (
    <Dropdown className="social-album-share">
      <Dropdown.Toggle id="dropdown-basic" as="span">
          <FontAwesomeIcon icon={faEllipsisH}/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="cursor-pointer" onClick={remove}>
          Remove from this playlist
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

PlaylistOptions.propTypes = {};

export default memo(PlaylistOptions);
