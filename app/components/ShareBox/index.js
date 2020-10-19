import React from 'react';
import { Dropdown } from 'react-bootstrap';

import {
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import './index.scss';

const ShareBox = () => {
 
  return (
    <>
      <Dropdown className="social-album-share">
        <Dropdown.Toggle id="dropdown-basic" as="SafeAnchor">...</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <FacebookShareButton title="I am listening to songs on Blink"
              url={window.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>            
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <WhatsappShareButton
              title="I am listening to songs on Blink"
              url={window.location.href}
              separator=" "
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <TwitterShareButton title="I am listening to songs on Blink"
              url={window.location.href}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ShareBox;
