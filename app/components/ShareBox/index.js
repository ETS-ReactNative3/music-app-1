import React from 'react';
import { Dropdown } from 'react-bootstrap';

import {
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import './index.scss';

const ShareBox = () => (
  <>
    <Dropdown className="social-album-share">
      <Dropdown.Toggle id="dropdown-basic" as="span">
        ...
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <FacebookShareButton
            title="I am listening to songs on Bliiink"
            url={window.location.href}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Dropdown.Item>
        <Dropdown.Item>
          <WhatsappShareButton
            title="I am listening to songs on Bliiink"
            url={window.location.href}
            separator=" "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Dropdown.Item>
        <Dropdown.Item>
          <TwitterShareButton
            title="I am listening to songs on Bliiink"
            url={window.location.href}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
);

export default ShareBox;
