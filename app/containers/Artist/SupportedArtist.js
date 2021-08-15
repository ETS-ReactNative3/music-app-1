import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import PaperCard from '../../components/PaperCard';
import {fetchSupportedArtistAction} from './actions';
import {makeSelectArtistFetching, makeSelectSupportedArtist} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import ArtistList from "../../components/ArtistList";

const SupportedArtist = ({fetchSupportedArtist, fetching, supportedArtistData}) => {
  useInjectReducer({key: 'artist', reducer});
  useInjectSaga({key: 'artist', saga});

  useEffect(() => {
    fetchSupportedArtist();
  }, [])

  return (
    <>
      {fetching ? <LoadingIndicator/> :
        <PaperCard title={"Supported Artist"}>
          {supportedArtistData.length === 0 && <h4>No Supported Artists</h4> }
          <ArtistList artists={supportedArtistData}/>
        </PaperCard>}
    </>
  )
}


SupportedArtist.propTypes = {
  fetchSupportedArtist: PropTypes.func,
  fetching: PropTypes.bool,
  supportedArtistData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectArtistFetching(),
  supportedArtistData: makeSelectSupportedArtist()

});

function mapDispatchToProps(dispatch) {
  return {
    fetchSupportedArtist: () => dispatch(fetchSupportedArtistAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SupportedArtist);
