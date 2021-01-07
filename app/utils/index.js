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
