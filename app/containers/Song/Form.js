import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {useParams} from 'react-router-dom';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {getGenres, getSongRequest, postSongRequest, updateSongRequest} from './actions';
import reducer from './reducer';
import saga from './saga';
import {makeSelectedSong, makeSelectGenres, makeSelectSongFormLoader, makeSelectSongLoader} from './selectors';
import SongForm from '../../components/SongForm';
import PaperCard from "../../components/PaperCard";

function Form(
  {
    genres,
    getGenreList,
    getSongAction,
    postSongAction,
    song,
    editSong,
    loader,
    formLoader
  }) {
  useInjectReducer({key: 'song', reducer});
  useInjectSaga({key: 'song', saga});

  const [addSong, setAddSong] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getGenreList();
    if (id) {
      getSongAction(id);
      setAddSong(false);
    }
  }, [id]);

  const onSubmit = data => {
    if (addSong) {
      postSongAction(data);
    } else {
      editSong(data);
    }
  };

  return (
    <PaperCard title={addSong ? 'Add Song' : 'Edit Song'}>
      {
        addSong ? <SongForm formSubmit={values => onSubmit(values)} genres={genres} formLoader={formLoader}/>
          : <SongForm formSubmit={values => onSubmit(values)} genres={genres} song={song} formLoader={formLoader}/>
      }
    </PaperCard>
  );
}

Form.propTypes = {
  genres: PropTypes.array.isRequired,
  getGenreList: PropTypes.func.isRequired,
  getSongAction: PropTypes.func.isRequired,
  postSongAction: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  formLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  song: makeSelectedSong(),
  loader: makeSelectSongLoader(),
  formLoader: makeSelectSongFormLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSongAction: id => dispatch(getSongRequest(id)),
    postSongAction: data => dispatch(postSongRequest(data)),
    editSong: data => dispatch(updateSongRequest(data)),
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
