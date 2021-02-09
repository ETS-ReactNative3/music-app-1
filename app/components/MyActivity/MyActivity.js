import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Image} from 'react-bootstrap';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';

const MyActivity = ({imagePath = '', role, rate}) => (
  <>
    <div className="d-flex align-items-center">
      <div>
        <Image src={imagePath} style={{width: 40, height: 40}}/>
      </div>
      <div className="ml-1">
        <div className="text-muted">{role}</div>
        <div>{rate}</div>
        <FontAwesomeIcon
          size="2x"
          color={PLAY_ICON_BG_COLOR}
          icon={faAngleRight}
          style={{marginLeft: 5}}
        />
      </div>
    </div>
  </>
);

export default MyActivity;
