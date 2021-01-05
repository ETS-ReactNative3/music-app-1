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
