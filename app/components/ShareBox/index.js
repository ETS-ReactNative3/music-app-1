import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  FacebookIcon,
  InstapaperIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import './index.scss';

const ShareBox = () => {
  return (
    <>
      <Dropdown className="social-album-share">
        <Dropdown.Toggle id="dropdown-basic">...</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as="button">
            <FacebookIcon size={32} round={true} />
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <WhatsappShareButton
              title="Title"
              url="http://localhost:3000/playlist/album-1"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </Dropdown.Item>
          <Dropdown.Item as="button">
            <InstapaperIcon size={32} round={true} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="dot-box-share border-0">
          ...
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="javascript:void(0)">
            <FacebookIcon size={32} round={true} />
          </Dropdown.Item>
          <Dropdown.Item href="javascript:void(0)">
            <WhatsappShareButton
              title="Title"
              url="http://localhost:3000/playlist/album-1"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </Dropdown.Item>
          <Dropdown.Item href="javascript:void(0)">
            <InstapaperIcon size={32} round={true} />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
};

export default ShareBox;
