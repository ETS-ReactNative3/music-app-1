import React from 'react';
import {Image} from 'react-bootstrap';
import styles from './Reviews.style';
import Album from '../../images/album-1.jpg';

const Reviews = ({imagePath, name, time, message}) => (
  <>
    <div style={styles.container}>
      <div style={styles.profileStyle}>
        <Image
          src={Album}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      </div>
      <div style={styles.contentStyle}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={styles.nameStyle}>{name}</div>
          <div style={styles.timeStyle}>{time}</div>
        </div>
        <div style={styles.messageStyle}>{message}</div>
      </div>
    </div>
  </>
);

export default Reviews;
