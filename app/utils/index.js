import React from 'react';
import { faFacebook, faInstagram, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

export const combineFollowers = influencerProfile => {
  let followers = 0;
  if (
    influencerProfile &&
    influencerProfile.facebook &&
    influencerProfile.facebook.followers
  )
    followers += influencerProfile.facebook.followers;
  if (
    influencerProfile &&
    influencerProfile.twitter &&
    influencerProfile.twitter.followers
  )
    followers += influencerProfile.twitter.followers;
  if (
    influencerProfile &&
    influencerProfile.instagram &&
    influencerProfile.instagram.followers
  )
    followers += influencerProfile.instagram.followers;
  if (
    influencerProfile &&
    influencerProfile.blog &&
    influencerProfile.blog.followers
  )
    followers += influencerProfile.blog.followers;
  if (
    influencerProfile &&
    influencerProfile.youtube &&
    influencerProfile.youtube.followers
  )
    followers += influencerProfile.youtube.followers;
  return followers;
};
export const formatFollowers = followers =>
  followers ? (Math.round(followers * 100) / 100).toFixed(1) : '';

export const calculateRating = (ratingScore, totalRating) => {
  const ratingArray = [0, 0, 0, 0, 0];
  let ratingScoreInternal = ratingScore;
  Array.from(Array(totalRating)).map((rate, index) => {
    if (ratingScoreInternal >= 1) {
      ratingArray[index] = 1;
      ratingScoreInternal -= 1;
    } else if (ratingScoreInternal > 0 && ratingScoreInternal <= 0.5) {
      ratingArray[index] = 0.5;
      ratingScoreInternal = 0;
    } else if (ratingScoreInternal > 0.5 && ratingScoreInternal <= 0.9) {
      ratingArray[index] = 1;
      ratingScoreInternal = 0;
    }
  });
  return ratingArray;
};

export function duration(t0, t1) {
  const d = new Date(t1) - new Date(t0);
  const weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
  const days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
  const hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
  const minutes = Math.floor(
    d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60,
  );
  const seconds = Math.floor(
    d / 1000 -
    weekdays * 7 * 24 * 60 * 60 -
    days * 24 * 60 * 60 -
    hours * 60 * 60 -
    minutes * 60,
  );
  const milliseconds = Math.floor(
    d -
    weekdays * 7 * 24 * 60 * 60 * 1000 -
    days * 24 * 60 * 60 * 1000 -
    hours * 60 * 60 * 1000 -
    minutes * 60 * 1000 -
    seconds * 1000,
  );
  const t = {};
  ['weekdays', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach(
    q => {
      if (eval(q) > 0) {
        t[q] = eval(q);
      }
    },
  );
  return t;
}
export const createDifferenenceTimeString = (start, end) => {
  const difference = duration(start, end);

  let timeDiffStr = '';

  if (difference.days > 0) timeDiffStr += `${difference.days} days, `;

  if (difference.hours > 0) timeDiffStr += `${difference.hours} hours, `;

  if (difference.minutes > 0) timeDiffStr += `${difference.minutes} minutes, `;

  return `${timeDiffStr} ago`;
};

export function getQueryVariable(search, variable) {
  let query = search.substring(1);
  var vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
}


export const zipRange = {
  US: /^\d{5}([\-]?\d{4})?$/,
  UK: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,
  DE: /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/,
  CA: /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/,
  FR: /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
  IT: /^(V-|I-)?[0-9]{5}$/,
  AU: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
  NL: /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/,
  ES: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/,
  DK: /^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$/,
  SE: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/,
  BE: /^[1-9]{1}[0-9]{3}$/,
  IN: /^\d{6}$/,
};

export const timeDifference = date => {
  const startDate = moment(date);
  const todaysDate = moment();

  return 10 - todaysDate.diff(startDate, 'days');
};

export const calculateExpiry = date => {
  const date1 = timeDifference(date);

  if (Math.abs(date1) > 10) {
    return 'Expired';
  } else {
    return `${Math.abs(date1)} days left`;
  }
};


export const renderSocialMediaIcons = (name, size = '1x', style= {}, color= 'white') => {
  switch (name) {
    case 'facebook': return <FontAwesomeIcon
      size={size}
      icon={faFacebook}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'instagram': return <FontAwesomeIcon
      size={size}
      icon={faInstagram}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'twitter': return <FontAwesomeIcon
      size={size}
      icon={faTwitter}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'blog': return <FontAwesomeIcon
      size={size}
      icon={faBlog}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'youtube': return <FontAwesomeIcon
      size={size}
      icon={faYoutube}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'radio': return <FontAwesomeIcon
      size={size}
      icon={faMusic}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
    case 'tiktok': return <FontAwesomeIcon
      size={size}
      icon={faTiktok}
      style={style}
      color={color}
      className="mr-2 cursor-pointer"
    />
  }
}

export const capatilizeText = (text) => {
  return <div style={{ textTransform: 'capitalize' }}>{text}</div>
}