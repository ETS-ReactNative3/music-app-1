/**
 *
 * Influencer
 *
 */

import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {becomeAnInfluencer} from './actions';
import {makeSelectInfluencer, makeSelectFormLoader} from './selectors';
import reducer from './reducer';
import saga from './saga';

import PaperCard from '../../components/PaperCard';
import InfluencerForm from '../../components/InfluencerForm';
import reducerSong from '../Song/reducer';
import sagaSong from '../Song/saga';
import {getGenres} from '../Song/actions';
import {makeSelectGenres} from '../Song/selectors';

export function Requests(
  {}) {
  useInjectReducer({key: 'influencer', reducer});
  useInjectSaga({key: 'influencer', saga});

  useEffect(() => {

  }, []);

  const onSubmit = data => {

  };

  return (
    <PaperCard title="Tastemakers Requests">

    </PaperCard>
  );
}

Requests.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Requests);
