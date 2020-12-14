import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getSongRequest, postSongRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectedSong, makeSelectSongLoader } from './selectors';
import { getGenres } from '../App/actions';
import { makeSelectGenres } from '../App/selectors';
import SongForm from '../../components/SongForm';

function Form({
  genres,
  getGenreList,
  getSongAction,
  postSongAction,
  song,
  loader,
}) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  const [addSong, setAddSong] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getGenreList();
    if (id) {
      getSongAction(id);
      setAddSong(false);
    }
  }, [id]);

  const onSubmit = data => {
    postSongAction(data);
  };

  return <SongForm formSubmit={values => onSubmit(values)} genres={genres} />;
}

Form.propTypes = {
  genres: PropTypes.array.isRequired,
  getGenreList: PropTypes.func.isRequired,
  getSongAction: PropTypes.func.isRequired,
  postSongAction: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  song: makeSelectedSong(),
  loader: makeSelectSongLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSongAction: id => dispatch(getSongRequest(id)),
    postSongAction: data => dispatch(postSongRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Form);
