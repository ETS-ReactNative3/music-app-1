/**
 *
 * Playlist
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import MyActivity from '../../components/MyActivity/MyActivity';

function AllActivites({ activities }) {
  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>My Account</h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '50%' }}>
        {activities &&
          activities.map(activity => (
            <MyActivity
              imagePath={activity.campaigns.song.artwork}
              name={activity.campaigns.song.title}
              rate={activity.campaigns.song.duration || '3.53'}
              role={activity.campaigns.user.name}
            />
          ))}
      </div>
    </div>
  );
}

AllActivites.propTypes = {
  activites: PropTypes.any,
};

export default AllActivites;
