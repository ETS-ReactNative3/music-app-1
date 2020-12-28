/**
 *
 * Influencer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { becomeAnInfluencer } from './actions';
import { makeSelectInfluencer, makeSelectFormLoader } from './selectors';
import reducer from './reducer';
import saga from './saga';


import PaperCard from "../../components/PaperCard";
import InfluencerForm from '../../components/InfluencerForm';
import reducerSong from '../Song/reducer';
import sagaSong from '../Song/saga';
import { getGenres } from '../Song/actions';
import { makeSelectGenres } from '../Song/selectors';

export function Influencer({
  getGenreList,
  genres,
  formLoader,
  becomeAnInfluencerAction
}) {
  useInjectReducer({ key: 'influencer', reducer });
  useInjectSaga({ key: 'influencer', saga });
  useInjectReducer({ key: 'song', reducer: reducerSong });
  useInjectSaga({ key: 'song', saga: sagaSong });

  useEffect(() => {
    getGenreList();
  }, []);

  const onSubmit = data => {
    becomeAnInfluencerAction(data)
  };

  return (
    <PaperCard title="Become An Influencer">
      <InfluencerForm formSubmit={values => onSubmit(values)} genres={genres} formLoader={formLoader} />
    </PaperCard>
  );
}

Influencer.propTypes = {
  genres: PropTypes.array.isRequired,
  formLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  influencer: makeSelectInfluencer(),
  genres: makeSelectGenres(),
  formLoader: makeSelectFormLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    becomeAnInfluencerAction: (data) => dispatch(becomeAnInfluencer(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Influencer);
