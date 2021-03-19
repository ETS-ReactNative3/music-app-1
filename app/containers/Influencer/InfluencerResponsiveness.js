import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchInfluencerStatsAction } from './actions';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../utils/injectReducer';
import influencerReducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import influencerSaga from './saga';
import { makeSelectInfluencerStats } from './selectors';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faComment } from '@fortawesome/free-regular-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

const InfluencerResponsiveness = ({ fetchInfluncerStats, id, influencerStats }) => {
  React.useEffect(() => {
    fetchInfluncerStats(id)
  }, []);

  useInjectReducer({ key: 'influencer', reducer: influencerReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });

  const renderStatsUI = (iconName, title, description) => {
    return (
      <div className="stats_UI_container">
        <FontAwesomeIcon icon={iconName}/>
        <div className="stats_title_description">
          <div className="stats_title">{title}</div>
          <div className="stats_description">{description}</div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {influencerStats && <>
      <h3>Activity on Bliiink</h3>
      {renderStatsUI(faComment, `${influencerStats.answeredTotal} answers given`, 'Since signing up')}
      {renderStatsUI(faChartBar, `${influencerStats.answerRate}% answer rate`, 'Last 30 days')}
      {renderStatsUI(faChartPie, `${influencerStats.acceptedRate}% acceptation rate`, 'Since signing up')}
      
      </>}
    </div>
  )
}


InfluencerResponsiveness.propTypes = {
  fetchInfluncerStats: PropTypes.func,
  influencerStats: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  influencerStats: makeSelectInfluencerStats()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchInfluncerStats: (id) => dispatch(fetchInfluencerStatsAction(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InfluencerResponsiveness);
