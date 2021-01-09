import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Image } from 'react-bootstrap';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import { styles } from './MyActivity.style';

const MyActivity = ({ imagePath = '', name, role, rate }) => (
  <>
    <div
      style={{
        backgroundImage: 'linear-gradient(to right, #0053A5, #091924)',
      }}>
      <div style={styles.parentStyle}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Image src={imagePath} style={{ width: 40, height: 40 }} />

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
            <div style={styles.textStyle}>{name}</div>
            <div style={styles.secondTextStyle}>{role}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <div style={styles.textStyle}>{rate}</div>
            <FontAwesomeIcon
              size="2x"
              color={PLAY_ICON_BG_COLOR}
              icon={faAngleRight}
              style={{ marginLeft: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default MyActivity;
