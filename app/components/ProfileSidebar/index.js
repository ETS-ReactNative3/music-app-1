/**
 *
 * ProfileSidebar
 *
 */

import React, {memo, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import defaultImage from "../../images/user.svg";
import {Image} from "react-bootstrap";
import PlanSvg from "../../images/svg/plan_icon_color.svg";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {renderSocialMediaIcons} from "../../utils";
import {Link} from "react-router-dom";
import ChangePassword from "../ChangePassword";

function ProfileSidebar({userDetails}) {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return <div className="card bg-dark mb-3">
    <div className="card-header">
      <h5 className="card-title mb-0">Profile Details</h5>
    </div>
    <div className="card-body text-center">
      <Image
        width={120}
        height={120}
        onError={e => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
        src={userDetails.avatar}
        className="mb-2"
        alt="avatar"
        roundedCircle
      />
      <h5 className="card-title mb-0">{userDetails.name}</h5>
      <div className="text-muted mb-2">
        {userDetails.roleId !== 1 && userDetails.role.title}
        {userDetails.roleId === 1 && userDetails.influencerId && 'Tastemaker'}
        {userDetails.roleId === 1 && !userDetails.influencerId && userDetails.role.title}
      </div>
      <div>
        <img
          src={PlanSvg}
          alt="wallet Logo"
          width={20}
          height={20}
        /><span className="font-weight-bold pl-2">  {userDetails.credit} credits</span>
      </div>
      <div className="mt-3">
        <Link to="/myaccount/edit">
          <button type="button" className="btn btn-sm btn-success">Edit Profile</button>
        </Link>
      </div>
      <div className="mt-3">
          <button type="button" className="btn btn-sm btn-success" onClick={() => setShowChangePassword(true)}>Change Password</button>
      </div>
    </div>
    <hr className="my-0"/>
    {userDetails.artistInformation &&
    <div className="card-body">
      <h5 className="h6 card-title">About</h5>
      <ul className="list-unstyled mb-0">
        {userDetails.artistInformation.country && <li className="mb-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2"/>
          From {userDetails.artistInformation.country.name}
        </li>}
        {userDetails.artistInformation.facebook && <li className="mb-1">
          {renderSocialMediaIcons('facebook')}
          <a href={userDetails.artistInformation.facebook} target="_blank">
            Facebook
          </a>
        </li>}
        {userDetails.artistInformation.twitter && <li className="mb-1">
          {renderSocialMediaIcons('twitter')}
          <a href={userDetails.artistInformation.twitter} target="_blank">
            Twitter
          </a>
        </li>}
        {userDetails.artistInformation.instagram && <li className="mb-1">
          {renderSocialMediaIcons('instagram')}
          <a href={userDetails.artistInformation.instagram} target="_blank">
            Instagram
          </a>
        </li>}
        {userDetails.artistInformation.blog && <li className="mb-1">
          {renderSocialMediaIcons('blog')}
          <a href={userDetails.artistInformation.blog} target="_blank">
            Blog
          </a>
        </li>}
        {userDetails.artistInformation.youtube && <li className="mb-1">
          {renderSocialMediaIcons('youtube')}
          <a href={userDetails.artistInformation.youtube} target="_blank">
            Youtube
          </a>
        </li>}
        {userDetails.artistInformation.radio && <li className="mb-1">
          {renderSocialMediaIcons('radio')}
          <a href={userDetails.artistInformation.radio} target="_blank">
            Radio
          </a>
        </li>}
        {userDetails.artistInformation.tiktok && <li className="mb-1">
          {renderSocialMediaIcons('tiktok')}
          <a href={userDetails.artistInformation.tiktok} target="_blank">
            Tiktok
          </a>
        </li>}
      </ul>
    </div>
    }
    <hr className="my-0"/>
    {userDetails.subscription &&
    <div className="card-body">
      <h5 className="h6 card-title">Subscription Plan</h5>
      <h5 className="card-title mb-0">{userDetails.subscription.title} ({userDetails.subscription.duration} days)</h5>
    </div>
    }
    <ChangePassword showChangePassword={showChangePassword} handleClose={() => setShowChangePassword(false)}/>
  </div>;
}

ProfileSidebar.propTypes = {
  userDetails: PropTypes.any
};

export default memo(ProfileSidebar);
