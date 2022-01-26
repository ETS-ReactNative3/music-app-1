import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getGenres,
  getMoodListAction,
  getSongRequest,
  getTeamMembers,
  postSongRequest,
  updateSongRequest
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectedSong,
  makeSelectGenres,
  makeSelectMoods,
  makeSelectSongFormLoader,
  makeSelectSongLoader,
  makeSelectTeamMembers
} from './selectors';
import SongForm from '../../components/SongForm';
import PaperCard from "../../components/PaperCard";
import AlertDismissible from '../../components/AlertDismissible';
import UploadSongVideo from "../../components/UploadSongVideo";


function Form(
  {
    genres,
    getGenreList,
    getSongAction,
    postSongAction,
    song,
    editSong,
    loader,
    getMembers,
    members,
    formLoader,
    getMoodList,
    moods
  }) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  const [addSong, setAddSong] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getMoodList()
    getGenreList()
    getMembers()
    if (id) {
      getSongAction(id);
      setAddSong(false);
    }
  }, [id]);

  const onSubmit = data => {
    if (addSong) {
      postSongAction(data);
    } else {
      editSong({ id, ...data });
    }
  };

  return (
    <PaperCard title={addSong ? 'Add Song' : 'Edit Song'}>
       <AlertDismissible message={`Only upload music you fully own the rights to. DJ Mixes, Bootleg/Unofficial remixes are not allowed.
Disclaimer: Uploading music you don't fully own the rights to will result in account termination.`}/>
      <UploadSongVideo/>
      {
        addSong ? <SongForm moods={moods} members={members} formSubmit={values => onSubmit(values)} genres={genres} formLoader={formLoader} />
          : <SongForm moods={moods} members={members} formSubmit={values => onSubmit(values)} genres={genres} song={song} formLoader={formLoader} />
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
  moods: PropTypes.array,
  getMembers: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  moods: makeSelectMoods(),
  genres: makeSelectGenres(),
  song: makeSelectedSong(),
  loader: makeSelectSongLoader(),
  formLoader: makeSelectSongFormLoader(),
  members: makeSelectTeamMembers()
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getMoodList: () => dispatch(getMoodListAction()),
    getSongAction: id => dispatch(getSongRequest(id)),
    getMembers: () => dispatch(getTeamMembers()),
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
