import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {useParams} from 'react-router-dom';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {getGenres, getMoodListAction, getSongRequest, postSongRequest, updateSongRequest} from './actions';
import reducer from './reducer';
import saga from './saga';
import {makeSelectedSong, makeSelectGenres, makeSelectMoods, makeSelectSongFormLoader, makeSelectSongLoader} from './selectors';
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
    formLoader,
    getMoodList,
    moods
  }) {
  useInjectReducer({key: 'song', reducer});
  useInjectSaga({key: 'song', saga});

  const [addSong, setAddSong] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    getMoodList();
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
      editSong({id, ...data});
    }
  };

  return (
    <PaperCard title={addSong ? 'Add Song' : 'Edit Song'}>
      {
        addSong ? <SongForm moods={moods} formSubmit={values => onSubmit(values)} genres={genres} formLoader={formLoader}/>
          : <SongForm moods={moods} formSubmit={values => onSubmit(values)} genres={genres} song={song} formLoader={formLoader}/>
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
  getMoodList: PropTypes.func,
  moods: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  moods: makeSelectMoods(),
  genres: makeSelectGenres(),
  song: makeSelectedSong(),
  loader: makeSelectSongLoader(),
  formLoader: makeSelectSongFormLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getMoodList: () => dispatch(getMoodListAction()),
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
